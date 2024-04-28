from flask import Flask, request, jsonify,abort
from utils import create_qr_code, validate_qr_code

app=Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message='setup completed!!')

@app.route('/create_session_token')
def create_session_token():
    code=request.args.get('qr_code')

    if(validate_qr_code(code)):
        create_qr_code()
        return jsonify(message='codice valido')

    return jsonify(message='codice non valido')

if __name__=='__main__':
    app.run(debug=True)