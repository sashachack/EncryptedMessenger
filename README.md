# Encrypted Messenger

Sasha Chackalackal (475454), Nash Solon (477477), Nisha Sahgal (472818)

## Setup Instructions

1. To run this project, begin by cloning the repository.
2. You will find two sub-folders, labeled `client` and `server`.
3. `cd` into `./client` and run `npm install`.
4. `cd` into `./server` and run `npm install`.
5. Start the `server` by running `npm start` in the `./server` directory.
6. Once the `server` is up and running, switch to the `./client` directory and run `npm run dev`.
7. The `client` will be accessible at `localhost:3000`.

## Testing

1. To test the project, first complete the setup instructions above and ensure that the `server` and `client` are running in the order described above.
2. Go to `localhost:3000` in a broswer window and sign up for an account as instructed
3. Open a secondary browser window and navigate to `localhost:3000` once again. Create a new account to behave as another user
4. From the first account, add the second user as a friend
5. From the second account, add the first user as a friend
6. Now you should be able to communicate between these users as expected.
7. To access our full procedure and the details of our encryption scheme, check out our full writeup here: 

https://docs.google.com/document/d/18Li7F0x1O2Ma4YN1CArGzslTvCvX7SwXIZuyzD2mMGc/edit?usp=sharing

## Encryption Scheme Documentation
The majority of our encryption work exists within the `encryption.js` file inside of the `functions` folder within our frontend as well as several frontend compoenents such as `main_window.jsx`, `login.jsx`, and `sign_up.jsx`. First, inside of `encryption.js`, we established all the encryption and decryption logic. We included a hash function for our password called `hashPassword`, which was used to hash our password in order to securely store this information in our database. In addition, our encryption scheme included using part of this hash to create a private key to symmetrically encrypt our asymmestric private key. This logic is also in this function.

Next, we defined our symmetric encryption and decryption functions. For these functions, we utilized the `crypto-js` library. With this library, we were able to use an AES symmetric cipher to encrypt and decrypt our private key. Theses functions serve as a way to securly store our private key within our database as we were able to encrypt and decrypt a user's private key using part of the password hash from a login or sign up attempt. Logic within the components `sign_in.jsx` shows how we first generated public and private keys. Then, we used our symmestric encryption function called `symm_encrypt` to encrypt our generated private key with the variabled called `remKey`. Since `remKey` was created through our secure password has, the new user's private key was then sent to the backend and safely stored as ciphertext.

On a login attempt, we had to implement similar logic to the logic seen in `sign_up.jsx`. However, in `login.jsx`, we can to grab the ciphertext private key and then symmetrically decrypt a user's private key. The private key in ciphertext form is pulled from the database. Then, the hash from a successful password attempt is grabbed from the `hashPassword` method. Finally, we were able to decrypt the user's private key using the `symm_decrypt` function. This allowed us to safely access the private key of a user as it is never stored in the proper object format in the backend or frontend.

Finally, we were also able to encrypt and decrypt messages using the asymmestric encryption and decryption functions also within the `encryption.js` file. These functions were mainly utilized within the `main_window.jsx` file. As a user sends their message in `main_window.js`, we were able to encrypt a message using the receipient's public key. Thus, when the receipient receives the message, they can also decrypt this message using our `asymm_decrypt` function and their own private key. This allowed secure communication between a sender and receipient connected to our system. 



## Additional Comments
1. We were unable to fully implement the project, due to some other issues we ran into late in the process.
2. One such issue was with our encryption mechanism. Specifically, a user is unable to decrypt messages they send since these messages are encrypted by their friend's public key.
3. However, the main asymmetric encryption functions, found in `./client/functions/encryption.js` work without issue, and properly encrypt/decrypt messages and hash passwords. As using asymmetric encryption in a web-based application was the main focus of this project, we consider this facet to be a success.
4. Given more time, we would likely have encrypted messages depending on if they belonged to the receipient or the sender. Since the sender has access to their own public/private key, we would need to implement a more complex encryption scheme. However, we do have some infrastructure that could make this possible.
5. If you have trouble reproducing results with a new users, go ahead and use our logins:
Username: sasha
Password: sasha

Username: nash
Password: nasha

## Video Demonstration
Here is a simple video demonstration of this project being run locally: 

https://drive.google.com/file/d/1Vfg_6OUijRmBAy0ibZhzHTjGAnbIIVKk/view?usp=share_link
