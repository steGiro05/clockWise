#IMPORT
#basic request response for apis
from flask import Flask, request, jsonify,abort, render_template, send_file
#header allow origin
from flask_cors import CORS
#auth
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_admin, get_user_byid, sign_in, upload_session_token,upload_pause_token,delete_pause_token,delete_session_token, get_user_state
#admin auth
from flask_httpauth import HTTPBasicAuth
#users auth
from flask_login import LoginManager,login_user, logout_user, current_user, login_required
#dynamic admin pages
from flask_socketio import SocketIO
#utils
from utils import create_qr_code, validate_qr_code

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
@auth.verify_password
def verify_password(username, password):
    admin=get_admin()
    if username==admin['username'] and check_password_hash(admin['hash'], password):
        return admin['username']

#admin routes to display qrCode
#to log out frfom thee admin account use this url http://log:out@localhost:5000
@app.route('/')
@auth.login_required
def qr_page():
    return render_template('main.html')

@app.route('/get_qrcode')
@auth.login_required
def get_qr_code():
    return send_file('qr/qr.png',mimetype='image/png')

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
        return jsonify(message='codice valido')
    return jsonify(message='codice non valido')
    
    

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
        return jsonify(message='codice valido')
    return jsonify(message='codice non valido')

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
        return jsonify(message='codice valido')
    return jsonify(message='codice non valido')

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
        return jsonify(message='codice valido')
    return jsonify(message='codice non valido')


if __name__=='__main__':
    socketio.run(app,host= '0.0.0.0')