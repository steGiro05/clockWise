import qrcode, random, string

def create_code(lenght):
     # Caratteri alfanumerici possibili
    characters = string.ascii_letters + string.digits
    # Genera una stringa casuale di lunghezza 'length' selezionando casualmente i caratteri dalla lista 'characters'
    random_code = ''.join(random.choice(characters) for _ in range(lenght))
    return random_code

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(create_code(lenght=16))
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('img/qr.png')