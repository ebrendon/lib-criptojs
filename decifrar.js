const CryptoJS = require("crypto-js");
const fs = require("fs");

function decryptFile(inputFilePath, secretKey) {
    const ciphertext = fs.readFileSync(inputFilePath);

    // Decifra o conteúdo
    const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    const fileName = inputFilePath.split("/").pop();

    const outputFilePath = inputFilePath.replace(
        fileName,
        fileName.replace(/_cifrado/, "_decifrado")
    );

    fs.writeFileSync(outputFilePath, plaintext, "binary");

    console.log("Arquivo decifrado com sucesso em: " + outputFilePath);
}

// Verifica se os argumentos necessários foram fornecidos via linha de comando
if (process.argv.length !== 4) {
    console.log(
        "Uso: node decifra-arquivo.js <caminho_do_arquivo_cifrado> <chave_secreta>"
    );
    process.exit(1);
}

const inputFilePath = process.argv[2];
const secretKey = process.argv[3];

decryptFile(inputFilePath, secretKey);
