from flask import Flask, request, jsonify

app=Flask(__name__)

@app.route('/')
def hello_world():
    print('ciao')
    return jsonify(message='setup completed!!')

if __name__=='__main__':
    app.run(debug=True)
    
#prova switch to back-end