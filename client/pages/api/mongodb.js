import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://nash_user:01j6qjGrnu851R47@cluster0.3lehonp.mongodb.net/?retryWrites=true&w=majority';


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
