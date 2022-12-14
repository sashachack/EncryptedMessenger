import CryptoJS from 'crypto-js';

const k = "5A7134743777217A24432646294A404E635266556A586E3272357538782F413F"
const iv = "635166546A576E5A7134743777217A25432A462D4A614E645267556B58703273"


export const encrypt = (message, key) => {
    key = k; // obviously not this
    // Encrypt the message using the key

    const ciphertext = CryptoJS.AES.encrypt(message, key, { iv: iv });

    // Return the ciphertext as a string
    return ciphertext.toString();
    // return "HIHFOWIEH OF";
}

export const decrypt = (ciphertext, key) => {
    key = k; // obviously not this
    // Decrypt the ciphertext using the key
    const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });

    // Return the original message
    return bytes.toString(CryptoJS.enc.Utf8);
}