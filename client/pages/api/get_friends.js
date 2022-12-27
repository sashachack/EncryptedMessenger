import clientPromise from "./mongodb";

//API endpoint for grabbing user info

export default async(req, res) => {
    try{
        const client = await clientPromise;
        const db = client.db("EncryptedMessenger");
        let bodyObject = (JSON.parse(req.body))
        // let bodyObject = JSON.parse(req.body);
        console.log(bodyObject)
        console.log(bodyObject.id)

  
    
        const user = await db.collection("users").find({id: bodyObject.id}).toArray();
        const f_objs = user[0].friends
        const fids = []

        for(let i = 0; i < f_objs.length; i++){
            fids.push(f_objs[i].id)
        }

        const arr = []
        
        for(let i = 0; i < fids.length; i++){
            arr.push(await db.collection("users").find({id: fids[i]}).toArray())
        }
        
        res.json({ status: 200, data: arr });
    }
    catch(e){
        console.log(e)
    }
}