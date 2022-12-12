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

Setup my testing database
- Connected to next.js api routes for users/friends
    - If we have a userid, we can grab their friends
- What to do for messages?
    - Socketio emits message to user, should we also establish a connection in the server to save messages?
- User context setup
    - Username/id on login is now stored in a UserContext
- User grabs friends from MongoDB and displays on side
- Messages are now displayed in main window given the proper data structure in MongoDB

- Messages now sending using socket and stored in MongoDB. But user needs to click on friend to do this.

    