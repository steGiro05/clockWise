from dotenv import load_dotenv
import qrcode,random,string

CODE='Ciao'
LENGHT=16

def validate_qr_code(code):

    if(code==CODE):return True
    return False 


def create_qr_code():
    characters = string.ascii_letters + string.digits
    CODE=''.join(random.choice(characters) for _ in range(LENGHT))
    qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
    )

    qr.add_data(CODE)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr/qr.png')