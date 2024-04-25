from flask import Flask, request, jsonify
from db import * 
import qrcode
import subprocess

app=Flask(__name__)

def generate_qrcode():
    # Chiamare lo script generateqrcode
    subprocess.run(["python", "create_QRcode.py"])

@app.before_first_request
def before_first_request():
    # Questo verrà eseguito solo una volta, prima della prima richiesta HTTP
    generate_qrcode()
    

@app.route('/')
def hello_world():
    print('ciao')
    return jsonify(message='setup completed!!')

@app.route('/get_QRcode')
def get_QRcode():
    
    return jsonify(data)

if __name__=='__main__':
    app.run(debug=True)
    