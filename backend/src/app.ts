import express from "express"
import {env} from "./config"
import { mongoConnect } from "./db/mongodb";
import cors from "cors"
import router from "./routes";

const app =express();
console.log("sunucu başlıyor...")

//middleware
app.use(cors());
app.use(express.json());

// DB connect 
mongoConnect();


//route
app.use("/api",router)
app.get("/test", (req, res) => {
  console.log("istek geldi");
  res.send("çalışıyor");
});

app.listen(env.port,()=>{
    console.log(`sunucu çalışıyor portu:  http://localhost:${env.port} `)
})