import Standings from "./standings"
import Matches from "./matches"
import Dashboard from "./dashboard";
import { useContext, useState ,useLayoutEffect} from "react";
import { AppContext } from "../App";



function View(){

    const {state} = useContext(AppContext)
    const [toggleMatches ,setToggleMatches] = useState(false); 
    const [toggleDashboard ,setToggleDashboard] = useState(true); 
    const [toggleStandings , setToggleStandings] = useState(false); 
    const [LeagueCode,setLeagueCode] = useState(2014);

    

    function changeToMatches(){
        setToggleStandings(false);
        setToggleMatches(true);
        setToggleDashboard(false);

        var matches = document.getElementById("Matches");
        matches.classList.add("change")

        var standings = document.getElementById("Standings")
        standings.classList.remove("change");

        var Dashboard = document.getElementById("Dashboard")
        Dashboard.classList.remove("change");
    }

    function changeToDashboard(){
        setToggleStandings(false);
        setToggleMatches(false);
        setToggleDashboard(true);

        var matches = document.getElementById("Matches");
        matches.classList.remove("change")

        var standings = document.getElementById("Standings")
        standings.classList.remove("change");

        var Dashboard = document.getElementById("Dashboard")
        Dashboard.classList.add("change");
    }

    function changeToStandings(){
        
        setToggleStandings(true);
        setToggleDashboard(false)
        setToggleMatches(false);

        var matches = document.getElementById("Matches");
        matches.classList.remove("change")

        var standings = document.getElementById("Standings")
        standings.classList.add("change");

        var Dashboard = document.getElementById("Dashboard")
        Dashboard.classList.remove("change");
        
    }
    useLayoutEffect(()=>{
        switch(true){
            case state["Primera Division"]:
                setLeagueCode(2014);
                break
            case state["Ligue 1"]:
                setLeagueCode(2015);
                break;
            case state["Premier League"]:
                setLeagueCode(2021);
                break;
            case state["Serie A"]:
                setLeagueCode(2019);
                 break;
            case state["Bundesliga"]:
                setLeagueCode(2002);
                break;
            default:return;

        }
    },[state]) 

    return (
        <>
        <div className=" bg-Color h-10 flex justify-center items-center">
            <button className="rounded-full  h-8 w-20 text-white change" id="Dashboard" onClick={()=>changeToDashboard()} >
                Dashboard
            </button>

            <button className=" rounded-full  h-8 w-20  text-white" id="Standings" onClick={()=>changeToStandings()} >
                Standings
            </button>
            <button className="rounded-full  h-8 w-20 text-white " id="Matches" onClick={()=>changeToMatches()} >
                Matches
            </button>
            
            
        </div>
        <div>
            {toggleMatches && <Matches code={LeagueCode}/>}
            {toggleStandings && <Standings code={LeagueCode}/>}
            {toggleDashboard && <Dashboard code={LeagueCode}/>}
        </div>
        
        </>
    )
}


export default View;