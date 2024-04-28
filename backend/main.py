from flask import Flask, request, jsonify,abort
from utils import create_qr_code, validate_qr_code

app=Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message='setup completed!!')

@app.route('/create_session_token')
def create_session_token():
    user_code=request.args.get('qr_code')
    if not user_code: abort(400)

    if(validate_qr_code(user_code)):
        if not create_qr_code(): abort(500)
        return jsonify(message='codice valido')

    return jsonify(message='codice non valido')

if __name__=='__main__':
    app.run(debug=True)