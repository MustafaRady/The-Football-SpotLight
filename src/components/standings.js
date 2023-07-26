import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";

 function Standings(){
    const{state} = useContext(AppContext)
    const [LeagueCode,setLeagueCode] = useState(2014)
    const [Teams,setTeams]= useState([]);
    console.log({state})
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

        }
    },[state])


    useLayoutEffect(()=>{
        getTeamsStandings();
    },[LeagueCode])

    console.log("Standings rendered ...\n")
    console.log(Teams)
// When using useState or useReducer, 
//changing the state triggers a re-render of the component.
//  However, React batching mechanism may update the state and 
//  perform multiple re-renders in a single cycle. So, if you directly place the
//   switch statement outside of useEffect, it could lead to unexpected results because the state update
//    might not be immediately reflected in the LeagueCode value.

// By using useEffect, we ensure that the code inside it runs 
// after the state has been updated and the component has re-rendered.
//  This way, the LeagueCode value will be correctly set based on the latest state values.



    const[isChanging , setChanging] = useState(false);

    const getTeamsStandings = async()=>{
        try{
            const response = await axios.get("https://api.football-data.org//v4/competitions/"+ LeagueCode+"/standings",
            {
                headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"}
            })
            const array = response.data.standings[0].table ;
            setTeams(array);
        }catch(err){
            console.log(err.message);
        }
    }

    
   
    // setTimeout(()=>{
    //     setChanging(!isChanging);
    // },60000)

    return(
        <div className="container md:mx-auto w-full mx-3 my-10 ">
            <h1 className="font-bold text-white  w-full md:text-4xl flex md:py-10 md:px-2 underline"> Standings </h1>
            {Teams.length>0 &&
            <table className="drop-shadow-2xl md:w-full bg-white box-shadow rounded-lg ">
                    <tr className=" border-2 md:text-4xl font-bold  text-center">
                        <td></td>
                        <td></td>
                        <td>W</td>
                        <td>L</td>
                        <td>D</td>
                        <td>Pts</td>
                    </tr>
                    { Teams.map((element,index)=>{
                        return <tr key={index} className="text-center border-2 h-12 md:text-2xl text-sm font-bold hover:scale-y-150 hover:scale-100 hover:duration-300 hover:bg-blue-200">
                            <td>{element.position}</td>
                            <td className="flex "><img className="md:mx-10 mx-2 h-10 w-10" src={element.team.crest} />{element.team.name}</td>
                            <td>{element.won}</td>
                            <td>{element.lost}</td>
                            <td>{element.draw}</td>
                            <td>{element.points}</td>
                        </tr>
                    })}
            </table>
                }
            {Teams.length==0 && 
                <div className="text-center text-4xl font-bold">
                    Loading ...</div>
                }
        </div>
    )
}

export default Standings;