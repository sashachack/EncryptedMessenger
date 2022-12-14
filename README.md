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

## Additional Comments
1. We were unable to fully implement the project, due to some other issues we ran into late in the process.
2. One such issue was with our encryption mechanism. Specifically, a user is unable to decrypt messages they send since these messages are encrypted by their friend's public key.
3. However, the main asymmetric encryption functions, found in `./client/functions/encryption.js` work without issue, and properly encrypt/decrypt messages and hash passwords. As using asymmetric encryption in a web-based application was the main focus of this project, we consider this facet to be a success.
4. If you have trouble reproducing results with a new users, go ahead and use our logins:
Username: sasha
Password: sasha

Username: nash
Password: nasha

## Video Demonstration
Here is a simple video demonstration of this project being run locally: 

https://drive.google.com/file/d/1Vfg_6OUijRmBAy0ibZhzHTjGAnbIIVKk/view?usp=share_link
