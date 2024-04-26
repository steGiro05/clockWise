from flask import Flask, request, jsonify
import subprocess
import time

app = Flask(__name__)

def generate_qrcode():
    # Chiamare lo script generateqrcode
    subprocess.run(["python", "create_QRcode.py"])

def init_app():
    """Initialize the core application."""
    app = Flask(__name__)


    with app.app_context():
        # before_first_request equivalent here
        try:
            while True:
                generate_qrcode()
                print('generate_qrcode() called')
                time.sleep(10)
        except:
            print ('exception occurred')
            return

        # Include our Routes

        # Register Blueprints
        #app.register_blueprint(auth.auth_bp)
        #app.register_blueprint(admin.admin_bp) 

        return app

@app.route('/')
def hello_world():
    print('ciao')
    return jsonify(message='setup completed!!')

@app.route('/get_QRcode')
def get_QRcode():
    return jsonify('ciao')

app=init_app()

if __name__ == '__main__':
    app.run(debug=True)

