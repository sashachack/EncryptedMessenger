import clientPromise from "./mongodb";

//API endpoint for grabbing user info

export default async(req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("EncryptedMessenger");
        let bodyObject = (JSON.parse(req.body))
            // let bodyObject = JSON.parse(req.body);
            // console.log(bodyObject)
            // console.log(bodyObject.id)
        const friend = await db.collection("users").find({ id: bodyObject.id }).toArray();

        const oPuk = friend[0].publicKey;
        console.log("OPUK")
        console.log(oPuk)

        res.json({ status: 200, data: oPuk });
    } catch (e) {
        console.log(e)
    }
}