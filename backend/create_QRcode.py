import qrcode, random, string,os

CODE_LENGHT=16
VARIABLE_NAME='QR_CODE'

def modify_env_file(file_path, variable_name, new_value):
    # Leggi il contenuto attuale del file .env
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Cerca la variabile da modificare nel file .env
    modified = False
    for i, line in enumerate(lines):
        if line.startswith(variable_name + '='):
            lines[i] = f"{variable_name}={new_value}\n"
            modified = True
            break

    # Se la variabile non esiste, aggiungila alla fine del file
    if not modified:
        lines.append(f"{variable_name}={new_value}\n")

    # Scrivi il nuovo contenuto nel file .env
    with open(file_path, 'w') as file:
        file.writelines(lines)

def create_code(lenght):
     # Caratteri alfanumerici possibili
    characters = string.ascii_letters + string.digits
    # Genera una stringa casuale di lunghezza 'length' selezionando casualmente i caratteri dalla lista 'characters'
    random_code = ''.join(random.choice(characters) for _ in range(lenght))
    return random_code

env_file_path = '.env'
new_value = create_code(CODE_LENGHT)

modify_env_file(env_file_path, VARIABLE_NAME, new_value)

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

qr.add_data(new_value)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('img/qr.png')
