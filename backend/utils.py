import qrcode,random,string,os
from db import get_qr_code, post_qr_code
from datetime import datetime
from cryptography.fernet import Fernet
from dotenv import load_dotenv

QR_CODE_LENGHT=16

def validate_qr_code(user_code):
    data=get_qr_code()
    qr_code=data['code']
    if(user_code==qr_code):return True
    return False 


def create_qr_code():
    characters = string.ascii_letters + string.digits
    new_qr_code=''.join(random.choice(characters) for _ in range(QR_CODE_LENGHT))
    qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
    )

    qr.add_data(new_qr_code)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr/qr.png')
    status=post_qr_code(new_qr_code)
    return status

def craft_token(user_id):
    load_dotenv()
    key=os.getenv('KEY')
    cipher=Fernet(key)
    
    now=datetime.now()
    date_format="%Y-%m-%d %H:%M:%S"
    formatted_date=now.strftime(date_format)
    token=user_id+formatted_date.replace(' ','')
    
    encrypted_token=cipher.encrypt(token.encode())
    return encrypted_token