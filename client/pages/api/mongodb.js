import { MongoClient } from 'mongodb'


//changed to try to connect to Nisha's database
const uri = process.env.MONGODB_URI;
console.log(uri)


let client
let clientPromise
try{
    // In production mode, it's best to not use a global variable.
client = new MongoClient(uri)
clientPromise = client.connect()
}
catch(e){
    console.log(e)
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
