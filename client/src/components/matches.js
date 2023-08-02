
import axios from "axios";
import { useState ,useContext,useLayoutEffect } from "react";
import { AppContext } from "../App";
export default function Matches(){
    const [Matches,setMatches] = useState([]);
    const{state} = useContext(AppContext)
    const [LeagueCode,setLeagueCode] = useState(2014)
    useLayoutEffect(()=>{
        switch(true){
            case state.LaLIGA:
                setLeagueCode(2014);
                break
            case state.LIGUE_1:
                setLeagueCode(2015);
                break;
            case state.PREMIER_LEAGUE:
                setLeagueCode(2021);
                break;
            case state.SERIE_A:
                setLeagueCode(2019);
                break;
            case state.BUNDESLIGA:
                setLeagueCode(2002);
                break;
            default:
                return ; 
        }
    },[state])


    useLayoutEffect(()=>{
        getTeamsMatches();
    })
    
    const getTeamsMatches=async()=>{
        try{
            const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
            

            const response = await axios.get("https://api.football-data.org/v4/competitions/"+LeagueCode+"/matches",
            {
                headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50" ,'Accept-Encoding': ''} 
            })

            const date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var matchDay = 0 ; 

            for(var i = 0 ; i<(response.data.matches).length ; i++)
            {
                if(day >= getDayMatch((response.data.matches[i])) && month === getMonthMacth((response.data.matches[i]))){ 
                    matchDay = response.data.matches[i].matchday
                    break;
                }
                
            }
            if(matchDay === 0 ){
                matchDay = 1 ; 
            }
            var new_array = (response.data.matches).filter((element)=>element.matchday === 1);
            setMatches(new_array);
            }catch(err){
                console.log(err.message);
            }
    }
    const getMonthMacth= ()=>{
        var date = "2023-07-14";
        return date.substr(5,2)
    }
    const getDayMatch= ()=>{
        var date = "2023-07-14";
        return date.substr(8,2)
    }
    function getDate(elementDay){
        var date = elementDay.substr(0,elementDay.indexOf("T"));
        var time = (elementDay.substr(elementDay.indexOf("T")+1)) ;
        time = time.substr(0,time.length -1); 
        return time+" / " + date ; 

    }

    return(
        <div className="md:container h-full md:mx-auto">
            <h1 className="font-bold text-white  w-full md:text-4xl flex py-10 px-2 underline"> Matches </h1>
            <div className=" grid grid-cols-2 md:gap-x-5 gap-x-2 gap-y-2  ">
            {Matches.length>0 &&
                Matches.map((element,index)=>{
                   return  <div key={index} className="container bg-white  flex flex-col rounded-lg my-3 px-3 h-40 justify-center">
                            <h1 className="text-center">{getDate(element.utcDate)}</h1>
                            <div className="flex md:flex-row flex-col justify-between items-center md:text-3xl text-sm ">
                                <img src={element.homeTeam.crest} className="h-6 w-6" alt="" ></img>
                                <span className="text-lg">{element.homeTeam.shortName}</span>
                                X
                                <span className="text-lg">{element.awayTeam.shortName}</span>
                                <img src={element.awayTeam.crest} className="h-6 w-6" alt=""></img>
                            </div>
                    </div>
                })
                
                }
            </div>
            {Matches.length===0 && 
                <div className="text-center text-4xl font-bold">
                    Loading ...</div>
                }
        </div>
    )
} 