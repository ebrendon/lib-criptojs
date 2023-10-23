const CryptoJS = require("crypto-js");
const fs = require("fs");

function encryptFile(inputFilePath, secretKey) {
    const plaintextBuffer = fs.readFileSync(inputFilePath);

    // Cifra o conteúdo
    const ciphertext = CryptoJS.AES.encrypt(
        plaintextBuffer.toString(),
        secretKey
    ).toString();

    const fileName = inputFilePath.split("/").pop();

    const outputFilePath = inputFilePath.replace(
        fileName,
        fileName.replace(/\.([^.]+)$/, "_cifrado.$1")
    );

    fs.writeFileSync(outputFilePath, ciphertext);

    console.log("Arquivo cifrado com sucesso em: " + outputFilePath);
}

// Verifica se os argumentos necessários foram fornecidos via linha de comando
if (process.argv.length !== 4) {
    console.log(
        "Uso: node cifrar.js <caminho_do_arquivo_de_entrada> <chave_secreta>"
    );
    process.exit(1);
}

const inputFilePath = process.argv[2];
const secretKey = process.argv[3];

encryptFile(inputFilePath, secretKey);
