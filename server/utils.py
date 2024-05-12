import qrcode,random,string,os
from db import get_qr_code, post_qr_code

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