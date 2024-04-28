import sqlite3 as sq



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
def get_users():
    db=sq.connect('data.db')
    cursor=db.cursor()
    cursor.execute('SELECT * FROM users')
    data=[]

    for row in cursor:
        data.append({
            'first_name':row[1],
            'last_name':row[2]
        }) 

    db.close()
    return data

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
    
    if (len(data)!=1):return
    return data[0]