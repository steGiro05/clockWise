#IMPORT
#basic request response for apis
from flask import Flask, request, jsonify,abort, render_template, send_file
#header allow origin
from flask_cors import CORS
#auth
from werkzeug.security import generate_password_hash, check_password_hash
from db import (
    get_admin, 
    get_user_byid, 
    sign_in, 
    upload_session_token,
    upload_pause_token,
    delete_pause_token,
    delete_session_token, 
    get_user_state, 
    get_user_stats_byid, 
    get_all_user_stats as all_user_stats,
    records, 
    get_all_users_state, 
    change_password as change_password_db
)#admin auth
from flask_httpauth import HTTPBasicAuth
#users auth
from flask_login import LoginManager,login_user, logout_user, current_user, login_required
#dynamic admin pages
from flask_socketio import SocketIO
#utils
from utils import create_qr_code, validate_qr_code
#date
from datetime import date

#INITIALIZATION
app=Flask(__name__)
app.config['DEBUG']=True
app.config['SECRET_KEY']='secret'
socketio = SocketIO(app)
#admin authentication:
auth=HTTPBasicAuth()

#users authentication
login_manager=LoginManager(app) 

CORS(app, supports_credentials=True)

@login_manager.user_loader
def load_user(uid):
    user=get_user_byid(uid)
    return user

#ROUTES

#web pages

@app.route('/',methods=['GET'])
@auth.login_required
def qr_page():
    return render_template('main.html')

@app.route('/all_user_page',methods=['GET'])
@auth.login_required
def all_user_page():
    return render_template('all_user_stats.html')   

@app.route('/user_states',methods=['GET'])
@auth.login_required
def user_states():
    return render_template('active_users.html') 

#admin routes
#to log out from thee admin account use this url http://log:out@localhost:5000
#display the qr code

@auth.verify_password
def verify_password(username, password):
    admin=get_admin()
    if username==admin['username'] and check_password_hash(admin['hash'], password):
        return admin['username']
    
@app.route('/get_qrcode', methods=['GET'])
@auth.login_required
def get_qr_code():
    return send_file('qr/qr.png',mimetype='image/png')

#display all users stats
@app.route('/get_all_users_stats',methods=['GET'])
@auth.login_required
def get_all_users_stats():
    return jsonify(all_user_stats())

#display all user status
@app.route('/get_user_states',methods=['GET'])
@auth.login_required
def get_user_states():
    return jsonify(get_all_users_state()),200
 
#users routes
#users login
@app.route('/get_user')
def get_user():
    if current_user.is_authenticated:
        return jsonify({
            'user_id': str(current_user.id),
            'first_name': current_user.first_name,
            'last_name': current_user.last_name,
            'birthday': current_user.birthday,
            'username': current_user.username
        }), 200
    else:
        return jsonify({'message': 'Not logged in'}), 401

@app.route('/login', methods=['POST'])
def login():
     # Verifica che la richiesta sia di tipo POST
    if request.method == 'POST':
        # Ottieni i dati inviati nel corpo della richiesta
        data = request.get_json()  

        # Verifica che i parametri 'username' e 'password' siano presenti nei dati
        if 'username' in data and 'password' in data:
            username = data['username']
            password = data['password']

            # Controlla se l'utente esiste e la password è corretta
            user=sign_in(username,password)
            if user is not None:
                # Restituisci un messaggio di successo
                login_user(user)
                return jsonify({'user': user.to_dict(), 'message':'Successfully logged in'}), 200
            else:
                # Restituisci un messaggio di errore se l'utente non esiste o la password è errata
                return jsonify({'message': 'Invalid username or password'}), 401
        else:
            # Restituisci un messaggio di errore se mancano i parametri 'username' o 'password'
            return jsonify({'message': 'Missing username or password'}), 400
    else:
        # Restituisci un messaggio di errore se la richiesta non è di tipo POST
        return jsonify({'message': 'Method not allowed'}), 405
    

@app.route('/logout',methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Success'}), 200

#cambio pw
@app.route('/change_password',methods=['POST'])
@login_required
def change_password():
    data = request.get_json()
    if 'old_password' in data and 'new_password' in data:
        old_password = data['old_password']
        new_password = data['new_password']
        if sign_in(current_user.username,old_password) is not None:
            if change_password_db(id=current_user.id,old_password=old_password, new_password=new_password):
                return jsonify({'message': 'Password changed successfully'}), 200
            else:
                return jsonify({'message': 'Error changing password'}), 500
        else:
            return jsonify({'message': 'Invalid password'}), 401
    else:
        return jsonify({'message': 'Missing parameters'}), 400
    
    
#gestione pause e entrate
@app.route('/get_state')
@login_required
def get_state():
    state = get_user_state(current_user.id)
    code=0

    if state == 'p':
        message = 'User in pause'
        code=2
    elif state == 'a':
        message = 'User is active'
        code=1
    else:
        message = 'No session'
    
    return jsonify({'message': message,"code":code})
    
@app.route('/create_session_token',methods=['POST'])
@login_required
def create_session_token():
    user_qr_code=request.args.get('qr_code')
    if not user_qr_code: abort(400)

    if(validate_qr_code(user_qr_code)):
        #upload del token se non va a buon fine la insert triggeriamo errore
        if not upload_session_token(current_user.id):
            abort(500)
        #controllo che generateqrcode non generi errori
        if not create_qr_code(): abort(500)
        
        #sending mesage to client to refresh qrcode
        socketio.emit('session_created')
        return jsonify(message='codice valido',status=200)
    return abort(401)
    
    

@app.route('/create_pause',methods=['POST'])
@login_required
def create_pause():
    user_qr_code=request.args.get('qr_code')
    if not user_qr_code: abort(400)

    if(validate_qr_code(user_qr_code)):
        #upload del token se non va a buon fine la insert triggeriamo errore
        if not upload_pause_token(current_user.id):
            abort(500)
        #controllo che generateqrcode non generi errori
        if not create_qr_code(): abort(500)
        
        #sending mesage to client to refresh qrcode
        socketio.emit('session_created')
        return jsonify(message='codice valido',status=200)
    return abort(401)

@app.route('/delete_pause',methods=['DELETE'])
@login_required
def delete_pause():
    user_qr_code=request.args.get('qr_code')
    if not user_qr_code: abort(400)

    if(validate_qr_code(user_qr_code)):
        #upload del token se non va a buon fine la insert triggeriamo errore
        if not delete_pause_token(current_user.id):
            abort(500)
        #controllo che generateqrcode non generi errori
        if not create_qr_code(): abort(500)
        
        #sending mesage to client to refresh qrcode
        socketio.emit('session_created')
        return jsonify(message='codice valido',status=200)
    return abort(401)

@app.route('/delete_session',methods=['DELETE'])
@login_required
def delete_session():
    user_qr_code=request.args.get('qr_code')
    if not user_qr_code: abort(400)

    if(validate_qr_code(user_qr_code)):
        #upload del token se non va a buon fine la insert triggeriamo errore
        if not delete_session_token(current_user.id):
            abort(500)
        #controllo che generateqrcode non generi errori
        if not create_qr_code(): abort(500)
        
        #sending mesage to client to refresh qrcode
        socketio.emit('session_created')
        return jsonify(message='codice valido',status=200)
    return abort(401)

#extract user data for analysis and stats
@app.route('/get_user_stats',methods=['GET'])
@login_required
def get_user_data():
    user_data=get_user_stats_byid(current_user.id)
    if user_data is not None:
        return jsonify(user_data.to_dict()),200
    return abort(404)

#extract data from records for dashboard
@app.route('/get_records')
@login_required
def get_records():
    day = request.args.get('day')
    data = records(current_user.id, day)
    if data is None:
        return jsonify({'message': 'No data found'}), 404
    
    return jsonify({'message': data}), 200

if __name__=='__main__':
    socketio.run(app,host= '0.0.0.0')