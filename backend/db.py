import sqlite3 as sq


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