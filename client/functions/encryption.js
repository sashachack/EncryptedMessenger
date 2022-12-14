import CryptoJS from 'crypto-js';
import { generateKeyPair, publicEncrypt, privateDecrypt } from 'crypto';
// const bcrypt = require("bcrypt");


// const k = "5A7134743777217A24432646294A404E635266556A586E3272357538782F413F"
// const iv = "635166546A576E5A7134743777217A25432A462D4A614E645267556B58703273"


// export const encrypt = (message, key) => {
//     key = k; // obviously not this
//     // Encrypt the message using the key

//     const ciphertext = CryptoJS.AES.encrypt(message, key, { iv: iv });

//     // Return the ciphertext as a string
//     return ciphertext.toString();
//     // return "HIHFOWIEH OF";
// }

// export const decrypt = (ciphertext, key) => {
//     key = k; // obviously not this
//     // Decrypt the ciphertext using the key
//     const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });

//     // Return the original message
//     return bytes.toString(CryptoJS.enc.Utf8);
// }

// export const genKeyPair = () => {
//     // const { publicKey, privateKey }
//     console.log('Reached genKeyPair')
//     let puk = null;
//     let pik = null;
//     generateKeyPair('rsa', {
//         modulusLength: 2048,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem'
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem'
//         }
//     }, (err, publicKey, privateKey) => {
//         if (err) {
//             throw err;
//         }

//         // Print the public and private keys
//         // console.log('Public Key: \n' + publicKey + '\n');
//         // console.log('Private Key: \n' + privateKey + '\n');

//         // Encrypt a message with the public key
//         // const message = 'Hello World';
//         // const encrypted = publicEncrypt(publicKey, Buffer.from(message));
//         // console.log('Encrypted: \n' + encrypted.toString('base64') + '\n')

//         // Decrypt the encrypted message with the private key
//         // const decrypted = privateDecrypt(privateKey, encrypted);
//         // console.log(decrypted.toString('utf8')); // "Hello World"
//         puk = publicKey;
//         pik = privateKey;
//     });
//     return { puk, pik };
// }

const buffToString = (buffer) => {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
}

export const genKeyPair = async() => {
    console.log('Reached genKeyPair')
    let keyPair = await window.crypto.subtle.generateKey({
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true, ["encrypt", "decrypt"]
    );
    let puk = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    let pik = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
    puk = buffToString(puk);
    pik = buffToString(pik);
    return { puk, pik };
}

export const hashPassword = async(password) => {
    const passHash = CryptoJS.SHA3(password);
    // const passHash = await bcrypt.hash(password, salt);
    const full = passHash.toString(CryptoJS.enc.Hex);

    return { hashword: full.substring(0, full.length / 2), remKey: full.substring(full.length / 2) };
}

export const symm_encrypt = async(message, key) => {
    // Encrypt the message using the key
    const ciphertext = CryptoJS.AES.encrypt(message, key);

    // Return the ciphertext as a string
    return ciphertext.toString();
}

export const symm_decrypt = async(ciphertext, key) => {
    // Decrypt the ciphertext using the key
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);

    // Return the original message
    return bytes.toString(CryptoJS.enc.Utf8);
}