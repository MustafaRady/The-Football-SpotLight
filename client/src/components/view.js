import Standings from "./standings"
import Matches from "./matches"
import { useContext, useState ,useLayoutEffect} from "react";
import { AppContext } from "../App";
function View(){

    const {state} = useContext(AppContext)
    const [toggleMatches ,setToggleMatches] = useState(false); 
    const [toggleStandings , setToggleStandings] = useState(true); 
    const [LeagueCode,setLeagueCode] = useState(2014);

    function changeToMatches(){
        setToggleStandings(false);
        setToggleMatches(true);

        var matches = document.getElementById("Matches");
        matches.classList.add("change")

        var standings = document.getElementById("Standings")
        standings.classList.remove("change");
        

        

    }
    function changeToStandings(){
        
        setToggleStandings(true);
        setToggleMatches(false);

        var matches = document.getElementById("Matches");
        matches.classList.remove("change")

        var standings = document.getElementById("Standings")
        standings.classList.add("change");
        
    }
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
            default:return;

        }
    },[state]) 

    return (
        <>
        <div className=" bg-Color h-10 flex justify-center items-center">
            <button className=" rounded-full  h-8 w-20 ml-6 change text-white" id="Standings" onClick={()=>changeToStandings()} >
                Standings
            </button>
            <button className="rounded-full  h-8 w-16 text-white " id="Matches" onClick={()=>changeToMatches()} >
                Matches
            </button>
            
        </div>
        <div>
            {toggleMatches && <Matches code={LeagueCode}/>}
            {toggleStandings && <Standings code={LeagueCode}/>}
        </div>
        
        </>
    )
}


export default View;