import sqlite3 as sq
from userModel import User
from userStatsModel import UserStats
from werkzeug.security import check_password_hash

from datetime import datetime



#table qr_code
def get_qr_code():
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute('SELECT code FROM qr_code')
    data=[]

    for row in cursor:
        data.append({
            'code':row[0]
        }) 

    db.close()
    if len(data) != 1:return
    return data[0]

def post_qr_code(new_qr_code):
    db=sq.connect('data.db')
    cursor=db.cursor()
    
    try:
        # Esegui l'operazione di inserimento o sostituzione
        cursor.execute("INSERT OR REPLACE INTO qr_code (id, code) VALUES (1, ?)", (new_qr_code,))
        db.commit()
        return True
    except Exception as e:
        # Se si verifica un errore, esegui il rollback delle modifiche
        db.rollback()
        return False
    finally:
        # Chiudi la connessione al database
        db.close()
        

#table users
def get_user_byid(uid):
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("SELECT id, first_name, last_name, birthday, username FROM users where id = ?",[uid])
    data=cursor.fetchone()
    db.close()
    
    if data is None:
        return None
    return User(id=data[0],first_name=data[1],last_name=data[2],birthday=data[3],username=data[4])

def sign_in(username,password):
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("SELECT id, username,first_name, last_name, birthday, hash FROM users where username = ? ",[username])
    data=cursor.fetchone()
    db.close()

    
    if data is None:
        return None
    if not check_password_hash(data[5],password):
        return None
    return User(id=data[0],username=data[1],first_name=data[2], last_name=data[3],birthday=data[4])
    
#tables activeSessionTokens, activePauseTokens and deletedPauseTokens
def get_all_users_state():
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute('''
        SELECT 
            users.first_name, users.last_name, 
            activeSessionTokens.id AS session_id, 
            activePauseTokens.id AS pause_id 
        FROM 
            users 
        LEFT JOIN 
            activeSessionTokens ON users.id = activeSessionTokens.fkUser 
        LEFT JOIN 
            activePauseTokens ON users.id = activePauseTokens.fkUser 
    ''')
    data=[]

    for row in cursor:
        data.append({
            'first_name': row[0],
            'last_name': row[1],
            'session_id': row[2],
            'pause_id': row[3]
        })
    db.close()
    return data

def get_user_state(current_user_id):
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("""
        SELECT CASE
                   WHEN EXISTS (SELECT 1 FROM activePauseTokens WHERE fkUser = ?)
                   THEN 1
                   ELSE 0
               END AS result;
    """, [current_user_id])
    if cursor.fetchone()[0]:
        db.close()
        return 'p'#p stays for pause
    
    cursor.execute("""
        SELECT CASE
                   WHEN EXISTS (SELECT 1 FROM activeSessionTokens WHERE fkUser = ?)
                   THEN 1
                   ELSE 0
               END AS result;
    """,[current_user_id])
    if cursor.fetchone()[0]:
        db.close()  
        return 'a'#a stays for active
    
    db.close()
    
    return None

def upload_session_token(current_user_id):

    db=sq.connect('data.db')
    cursor=db.cursor()
    try:
        # Ottenere l'ora corrente in formato CEST
        now_cest = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Eseguire l'inserimento nel database
        cursor.execute("INSERT INTO activeSessionTokens (fkUser, created_at) VALUES (?, ?)", (current_user_id, now_cest))
        db.commit()
        return True 
    except: 
        db.rollback()
        return False
    finally:
        db.close()

def upload_pause_token(current_user_id):
    if get_user_state(current_user_id) !='a':
        return False

    db=sq.connect('data.db')
    cursor=db.cursor()
    try:
        # Ottenere l'ora corrente in formato CEST
        now_cest = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Eseguire l'inserimento nel database
        cursor.execute("INSERT INTO activePauseTokens (fkUser, created_at) VALUES (?, ?)", (current_user_id, now_cest))
        db.commit()
        return True 
    except: 
        db.rollback()
        return False
    finally:
        db.close()
    return

def delete_pause_token(current_user_id):
    if get_user_state(current_user_id) !='p':
        return False

    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor=db.cursor()
    cursor.execute("SELECT created_at FROM activePauseTokens where fkUser = ?",[current_user_id])
    data=cursor.fetchone()
    if not data:
        return False
    
    created_at=data[0]

    cursor.execute("DELETE FROM activePauseTokens WHERE fkUser = ?", [current_user_id])
    db.commit()

    try:
        # Ottenere l'ora corrente in formato CEST
        now_cest = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Eseguire l'inserimento nel database
        cursor.execute("INSERT INTO deletedPauseTokens (fkUser, created_at, deleted_at) VALUES (?, ?, ?)", (current_user_id,created_at, now_cest))
        db.commit()

        return True 
    except: 
        db.rollback()
        return False
    finally:
        db.close() 
    return

def delete_session_token(current_user_id):
    if get_user_state(current_user_id) !='a':
        return False

    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor=db.cursor()
    cursor.execute("""SELECT strftime('%H:%M:%S', created_at) AS start_time,
           strftime('%H:%M:%S', deleted_at) AS end_time
            FROM deletedPauseTokens
        WHERE fkUser = ?""",[current_user_id])
    data=cursor.fetchall()
    pauses = []
    if data:

        for item in data:
            start_time = item[0]
            end_time = item[1]
            pauses.append({'start_time': start_time, 'end_time': end_time})

        
        if(len(pauses)>0):
            cursor.execute("DELETE FROM deletedPauseTokens WHERE fkUser = ?", [current_user_id])
            db.commit()

    cursor.execute("""SELECT strftime('%Y-%m-%d', created_at) AS formatted_date,
                    strftime('%H:%M:%S', created_at) AS hour
                    FROM activeSessionTokens
                    WHERE fkUser = ?
                    """,[current_user_id])
    
     
    session=cursor.fetchone()
    if not session:
        return False

    cursor.execute("DELETE FROM activeSessionTokens WHERE fkUser = ?", [current_user_id])
    session_day = session[0]
    session_starting_hour = session[1]

    
    try:
        # Ottenere l'ora corrente in formato CEST
        now_cest = datetime.now().strftime('%H:%M:%S')

        # Eseguire l'inserimento nel database
        cursor.execute("INSERT INTO records (fkUser, day, entry_time, exit_time) VALUES (?, ?, ?, ?)", (current_user_id,session_day,session_starting_hour, now_cest))
        db.commit()
        recordId = cursor.lastrowid

        if(len(pauses)>0):
            for item in pauses:
                cursor.execute("INSERT INTO pauses (fkRecord,start_time, end_time) VALUES (?, ?, ?)", (recordId,item['start_time'],item['end_time']))
                db.commit() 

        print('returning')
        return True 
    except: 
        print ('exception')
        db.rollback()
        return False
    finally:
        db.close() 
    return 



#table admin
def get_admin():
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute('SELECT * FROM admin')
    data=[]

    for row in cursor:
        data.append({
            'username':row[0],
            'hash':row[1]
        }) 
    db.close()
    
    if (len(data)!=1):return None
    return data[0]

#view user_stats
def get_user_stats_byid(uid):
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("SELECT * FROM user_stats WHERE idUser = ?",[uid])
    data=cursor.fetchone()
    db.close()
    if data is None:
        return None
    return UserStats(avg_entry_time=data[1], avg_exit_time=data[2], avg_pause_duration=data[3])

def get_all_user_stats():
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("SELECT u.id, u.first_name, u.last_name, s.avg_entry_time, s.avg_exit_time, s.avg_pause_duration FROM user_stats s inner join users u on s.idUser = u.id")
    data=[]
    for row in cursor:
        data.append({
            'first_name': row[1],
            'last_name': row[2],
            'avg_entry_time': row[3],
            'avg_exit_time': row[4],
            'avg_pause_duration': row[5]
        })
    db.close()
    return data
#table records
def records(current_user_id, day):
    print(current_user_id, day)
    db = sq.connect('data.db')
    cursor = db.cursor()
    cursor.execute('SELECT entry_time, exit_time FROM records WHERE fkUser = ? AND day = ?', [current_user_id, day])
    data = []

    for row in cursor:
        data.append({
            'entry_time': row[0],
            'exit_time': row[1]
        })
    db.close()

    if len(data) == 0:
        return None
    return data