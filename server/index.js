import express from "express";
import cors from "cors";
import {routes} from "./routes/routes.js"


const app = express();
app.use(cors());

app.use("/getStandings",routes);

app.listen(8000,()=>{
    console.log("Listening ... ")
})