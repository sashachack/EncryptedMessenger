import CryptoJS from 'crypto-js';

const buffToString = (buffer) => {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
}

const stringToBuff = (str) => {
    return new Uint8Array(str.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

export const genKeyPair = async() => {
    console.log('Reached genKeyPair')
    let keyPair = await window.crypto.subtle.generateKey({
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true, ["encrypt", "decrypt"]
    );
    let puk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
    let pik = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);

    puk = JSON.stringify(puk);
    pik = JSON.stringify(pik);

    // console.log("Before 2string")
    // console.log(puk)
    // console.log(pik)
    // console.log("After 2string")
    // puk = buffToString(puk);
    // pik = buffToString(pik);
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

export const asymm_encrypt = async(message, public_key) => {
    public_key = JSON.parse(public_key)
    const key = await window.crypto.subtle.importKey("jwk", public_key, {
        name: "RSA-OAEP",
        hash: "SHA-256"
    }, true, ["encrypt"])
    const ciphertext = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" },
        key, new TextEncoder().encode(message)
    )
    return ciphertext;
}

export const asymm_decrypt = async(ciphertext, private_key) => {
    private_key = JSON.parse(private_key)
    const key = await window.crypto.subtle.importKey("jwk", private_key, {
            name: "RSA-OAEP",
            hash: "SHA-256"
        }, true, ["decrypt"])
        // console.log(key)
    const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" },
        key, ciphertext
    )
    return new TextDecoder().decode(decrypted);
}

// GPT 3
// const keyPair = await window.crypto.subtle.generateKey(
//   {
//     name: "RSA-OAEP",
//     modulusLength: 2048,
//     publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
//     hash: "SHA-256"
//   },
//   true,
//   ["encrypt", "decrypt"]
// );

// const exportedPublicKey = await window.crypto.subtle.exportKey(
//   "jwk",
//   keyPair.publicKey
// );
// const exportedPrivateKey = await window.crypto.subtle.exportKey(
//   "jwk",
//   keyPair.privateKey
// );
// const importedPublicKey = await window.crypto.subtle.importKey(
//     "jwk",
//     exportedPublicKey, {
//         name: "RSA-OAEP",
//         hash: "SHA-256"
//     },
//     true, ["encrypt"]
// );