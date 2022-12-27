import clientPromise from "./mongodb";

//API endpoint for grabbing messages
export default async(req, res) => {
    try{
        const client = await clientPromise;
        const db = client.db("EncryptedMessenger");
        let bodyObject = JSON.parse(req.body);
        console.log(bodyObject)
        console.log("HERE")

        //grabbing messages from main user and other user
        // const body = await db.collection('messages').find(
        //     {$and: [
        //         {uid: bodyObject.uid}, 
        //         {convos: {$elemMatch: {ouid: bodyObject.ouid}}}
        //     ]}).toArray();

        // console.log(body)

        //putting message into user's messages
        db.collection('messages').updateOne(
            {$and: [
                        {uid: bodyObject.uid}, 
                        {convos: {$elemMatch: {ouid: bodyObject.ouid}}}
                    ]},
            {$push: {"convos.$.messages": {text: bodyObject.user_message, fromMe: true}}}
        )

        //putting message into other user's messages
        db.collection('messages').updateOne(
            {$and: [
                        {uid: bodyObject.ouid}, 
                        {convos: {$elemMatch: {ouid: bodyObject.uid}}}
                    ]},
            {$push: {"convos.$.messages": {text: bodyObject.message, fromMe: false}}}
        )

        const body = await db.collection("messages").find({uid: bodyObject.uid}).toArray();
        if(body.length != 0){
            const all_messages = body[0].convos;
            let messages;
            for(let i = 0; i < all_messages.length; i++){
                if(all_messages[i].ouid == bodyObject.ouid){
                    messages = all_messages[i].messages
                }
            }
            res.send({status: 200, data: messages})
        }
        else{
            res.send({status: 200, data: null})
        }
    }
    
    catch(e){
        console.log(e)
    }
}
