import sqlite3 as sq
from userModel import User
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
    cursor.execute("SELECT id, username FROM users where id = ?",[uid])
    data=cursor.fetchone()
    db.close()
    
    if data is None:
        return None
    return User(data[0],data[1])

def sign_in(username,password):
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute("SELECT id, username, hash FROM users where username = ? ",[username])
    data=cursor.fetchone()
    db.close()
    
    if data is None:
        return None
    if not check_password_hash(data[2],password):
        return None
    return User(data[0],data[1])
    
#tables activeSessionTokens, activePauseTokens and deletedPauseTokens
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

def upload_token(current_user_id):

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