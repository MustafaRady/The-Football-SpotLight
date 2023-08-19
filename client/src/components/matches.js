
import axios from "axios";
import { useState,useLayoutEffect, useRef, useCallback } from "react";

export default function Matches({code}){
    const LeagueCode = code ;
    const [Matches,setMatches] = useState([]);
    const [response , setResponse] = useState(1); 
    const [empty, setEmpty] = useState(false); 
    const refSelectedDay = useRef(null);
    const [selectedByFinished,setSelectedByFinished] = useState(null);


   
    
    const getTeamsMatches= useCallback(
        async()=>{
            try{
                
                const response = await axios.get("https://api.football-data.org/v4/competitions/"+LeagueCode+"/matches",{
                    headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"}
                })
                setResponse(response);
    
                if(response === 1 ){
                    console.log("Response is 1 "); 
                    return ;
                } 
                const Array_Of_WEEK_Matches = [] ;
                let matchDay = getMatchDay();
    
                (response.data.matches).forEach((element)=>{
                    if(element.matchday === matchDay){
                        Array_Of_WEEK_Matches.push(element);
                    }
                })
    
                if(Array_Of_WEEK_Matches.length === 0 ){
                    setMatches([]);
                    setEmpty(true);
                    return ; 
                }
                setMatches(Array_Of_WEEK_Matches);
                setSelectedByFinished(true);
                }catch(err){
                    console.log(err.message);
            }
        }
    ,[LeagueCode]) 


    function getMatchDay(){
            let matchDay = -1 ; 
            
            for(var i = 0 ; i<response.data.matches.length ; i++){
                if(response.data.matches[i].score.winner === null ){
                    matchDay = response.data.matches[i].matchday;
                    break;
                }
            }
            return matchDay;
        }

    useLayoutEffect(()=>{
        getTeamsMatches();
    },[LeagueCode])

    

    function getDate(elementDay){
        var date = elementDay.substr(0,elementDay.indexOf("T"));
        var time = (elementDay.substr(elementDay.indexOf("T")+1)) ;
        time = time.substr(0,time.length -1); 
        return time+" / " + date ; 

    }

    function setMatchesByDate(date){
        let Matches = response.data.matches; 
        const array = [];
        Matches.forEach(element => {
           if(element.utcDate.substr(0,10) === date){
            array.push(element);
           }
        });

        if(array.length === 0 ){
            setEmpty(true);
            setMatches([]);
            return;
        }
        setEmpty(false);
        setMatches(array);
    }

    function setMatchesByToday(){
        var date = new Date();
        
        let Matches = response.data.matches; 
        const array = [] ; 
        Matches.forEach((element)=>{
            //2023-08-01
            let year = date.getFullYear();
            let month = date.getUTCMonth() +1 ;
            if(parseInt(month/10) === 0 ){
                month = "0"+month;
            } 
            let day = date.getUTCDate();
            
            const newTodayDate = year+"-"+month+"-"+day;
            if(element.utcDate.substr(0,10) === newTodayDate){
                array.push(element);
            }
        })

        if(array.length === 0){
            setEmpty(true);
            setMatches([]);
            return ; 
        }
        setEmpty(false);
        setMatches(array);
    }

    function setMatchesByWeek(){
        if(response === 1 ) return ;

        const Array_Of_WEEK_Matches = [] ;
        let matchDay = getMatchDay();

        (response.data.matches).forEach((element)=>{
            if(element.matchday === matchDay){
                Array_Of_WEEK_Matches.push(element);
            }
        })

        if(Array_Of_WEEK_Matches.length === 0 ){
            setMatches([]);
            setEmpty(true);
            return ; 
        }
        setMatches(Array_Of_WEEK_Matches);
        setSelectedByFinished(true);
    }

    

    function setMatchesByFinished(){
        if(response === 1 )return ; 
        const Array_Of_Finished_Matches = [] ;
        var matchDayToFind;
        for(var i = 0 ; i<(response.data.matches).length ; i++)
        {
            
            if( (response.data.matches[i].status) === "TIMED" ){
                
                matchDayToFind= (response.data.matches[i].matchday) ; 
                break ; 
            }
        }

        //Find the elements of the matchday of elementFound 
        
        (response.data.matches).forEach((element)=>{
            if( element.matchday === matchDayToFind && element.status === "FINISHED" ){
                Array_Of_Finished_Matches.push(element);
            }
        })

        if(Array_Of_Finished_Matches.length === 0 ){
            (response.data.matches).forEach((element)=>{
                if( element.matchday === matchDayToFind-1 ){
                    Array_Of_Finished_Matches.push(element);
                }
            })
            
        }
         setMatches(Array_Of_Finished_Matches);
         setSelectedByFinished(true)
    }


    
    return(
        <div className="md:container h-auto bg-Color py-2 " >
            <div className="flex flex-row justify-between">
                <div>
                <button className="rounded-full bg-white h-10 w-20 mx-1"  onClick={()=>setMatchesByToday()}>Today</button>
                <button className="rounded-full bg-white h-10 w-20 mx-1" onClick={()=>setMatchesByFinished()}>Finished</button>
                <button className="rounded-full bg-white h-10 w-20 mx-1"  onClick={()=>setMatchesByWeek()}>Weekly</button>
                </div>

                <input ref={refSelectedDay} type="date" className="rounded-full w-32" onChange={(event)=>setMatchesByDate(event.target.value)}/>
            </div>
            <div className=" grid grid-cols-1 gap-y-2  ">
            {Matches.length>0  &&
                Matches.map((element,index)=>{
                   return  <div key={index} className="container bg-black flex flex-col w-5/6 rounded-lg my-3 px-3  h-18 mx-auto">
                            <h1 className="text-center text-sm text-white">{getDate(element.utcDate)}</h1>
                            <div className=" flex md:flex-row flex-col justify-between items-center md:text-xl text-sm  ">
                                <img src={element.homeTeam.crest} className="h-8 w-8" alt="" ></img>
                                <span className="text-md text-white">{element.homeTeam.shortName}</span>
                                {!selectedByFinished &&<div className="text-white">X</div>}
                                {selectedByFinished && <div className="text-white">{element.score.fullTime.home} - {element.score.fullTime.away}  </div>}
                                <span className="text-md text-white">{element.awayTeam.shortName}</span>
                                <img src={element.awayTeam.crest} className="h-8 w-8" alt=""></img>
                            </div>
                    </div>
                })
                
                }
            </div>
            {Matches.length===0 && !empty && 
                <div className="text-center text-4xl font-bold " style={{height:"400px"}}>
                    Loading ...</div>
                }
            {empty && 
                <div className="text-center text-4xl font-bold mt-8">
                    No Matches Available at this Date</div>
                }
        </div>
    )
} 