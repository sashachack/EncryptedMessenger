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
        console.log(user)
        const fids = user[0].friends

        const arr = []
        
        for(let i = 0; i < fids.length; i++){
            arr.push(await db.collection("users").find({id: fids[i]}).toArray())
        }
    // console.log(arr)
        

        res.json({ status: 200, data: arr });
    }
    catch(e){
        console.log(e)
    }
}