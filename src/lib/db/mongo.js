// MongoDB connection placeholder
import {MongoClient} from "mongodb"; 
let client; let clientPromise; 
if(!process.env.MONGODB_URI){throw new Error("Add MONGODB_URI in .env.local");} 
client=new MongoClient(process.env.MONGODB_URI); 
clientPromise=client.connect(); 
export default clientPromise;
