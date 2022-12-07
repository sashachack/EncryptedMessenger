This is our project for an Encrypted Messenger.

** Database structure:
- Users
    - {id, username, password, friends: []}
    - ex. {id: 0, username: "sashachack", password: "SDKLafasf2g0", friends: [1, 2, 3]}
- Messages
    - {uid, convos: 
        [
            {ouid, messages: [ {text: "SDLI77", fromMe: T/F, timestamp: ""}, ... ]}
        ]
      }