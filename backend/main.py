#IMPORT
from flask import Flask, request, jsonify,abort, render_template, send_file
from flask_httpauth import HTTPBasicAuth
from flask_socketio import SocketIO
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_admin
from utils import create_qr_code, validate_qr_code

#INITIALIZATION
app=Flask(__name__)
app.config['DEBUG']=True
app.config['SECRET_KEY']='secret'
auth=HTTPBasicAuth()
socketio = SocketIO(app)

#ROUTES
@auth.verify_password
def verify_password(username, password):
    admin=get_admin()
    if username==admin['username'] and check_password_hash(admin['hash'], password):
        return admin['username']

#admin routes to display qrCode
#to log out use this url http://log:out@localhost:5000
@app.route('/')
@auth.login_required
def qr_page():
    return render_template('main.html')

@app.route('/get_qr_code')
@auth.login_required
def get_qr_code():
    return send_file('qr/qr.png',mimetype='image/png')

#users routes
@app.route('/create_session_token')
def create_session_token():
    user_code=request.args.get('qr_code')
    if not user_code: abort(400)

    if(validate_qr_code(user_code)):
        if not create_qr_code(): abort(500)
        #sending mesage to client to refresh qrcode
        socketio.emit('session_created')
        return jsonify(message='codice valido')

    return jsonify(message='codice non valido')

    

if __name__=='__main__':
    socketio.run(app)