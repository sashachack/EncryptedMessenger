import clientPromise from "./mongodb";

//API endpoint for grabbing messages
export default async(req, res) => {
    try{
        const client = await clientPromise;
        const db = client.db("main");
        let bodyObject = JSON.parse(req.body);
        // console.log(bodyObject)

        const body = await db.collection("messages").find({uid: bodyObject.uid}).toArray();
        // console.log(body)
        if(body.length != 0){
            const all_messages = body[0].convos;
            // console.log(all_messages)
            let messages;
            for(let i = 0; i < all_messages.length; i++){
                if(all_messages[i].ouid == bodyObject.ouid){
                    messages = all_messages[i].messages
                }
            }
            // console.log(messages)
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
