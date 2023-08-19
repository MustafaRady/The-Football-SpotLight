import express from "express"
import axios from "axios";
const router = express.Router();

router.get("/standings/:code" , async (req,res)=>{
    const code = req.params.code;
    try{
        const response = await axios.get("https://api.football-data.org//v4/competitions/"+code+"/standings",
            {
                headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"},
                
            })
        res.json(response.data); 

    }catch(err){
        res.json({error : err.message});

    }
})
router.get("/matches/:code" , async (req,res)=>{
    const code = req.params.code;
    try{
        const response = await axios.get("https://api.football-data.org/v4/competitions/"+code+"/matches",
            {
                headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"},
                
            })
        
        res.json(response.data); 

    }catch(err){
        res.json({error : err.message});

    }
})

export {router as routes } ; 