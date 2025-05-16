import mongoose from "mongoose"; //just mongoose import!

//Database connection here!
 const dbConnection  = ()=>{
    mongoose.connect(process.env.DB_URL,{
       dbName: "Informal_Job_Portal_DB"

    }).then(()=>{ 
       console.log("MongoDB Connected")
    }).catch((error)=>{
        console.log(`Failed to connect ${error}`)
    })
    
}
export default dbConnection;