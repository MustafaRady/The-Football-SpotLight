import React, {useCallback, useLayoutEffect, useState } from "react";
import axios from "axios";
 function Standings({code}){

    const LeagueCode = code ; 
    const [Teams,setTeams]= useState([])
    
    const getTeamsStandings =useCallback(
        async ()=>{
            try{
                const response = await axios.get("https://api.football-data.org/v4/competitions/"+LeagueCode+"/standings" ,
                {
                    headers:{"X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"}
                })
                const array = response.data.standings[0].table;
                setTeams(array)
            }catch(err){
                console.log(err.message);
            }
            
        }
    ,[LeagueCode]) 
    useLayoutEffect(()=>{
        getTeamsStandings() ;
    },[LeagueCode,getTeamsStandings])

    

// When using useState or useReducer, 
//changing the state triggers a re-render of the component.
//  However, React batching mechanism may update the state and 
//  perform multiple re-renders in a single cycle. So, if you directly place the
//   switch statement outside of useEffect, it could lead to unexpected results because the state update
//    might not be immediately reflected in the LeagueCode value.

// By using useEffect, we ensure that the code inside it runs 
// after the state has been updated and the component has re-rendered.
//  This way, the LeagueCode value will be correctly set based on the latest state values.

// setTimeout(()=>{
// },2000)


    return(
        <>
        <div className="container bg-Color ">
            {Teams.length>0 &&
            <div className="w-5/6 mx-auto">
                <table className="drop-shadow-2xl md:w-full bg-white box-shadow rounded-lg ">
                        <tr className=" border-2 md:text-xl font-bold">
                            <td className="px-3">Rank</td>
                            <td></td>
                            <td className="w-10">G</td>
                            <td className="w-10">W</td>
                            <td className="w-10">L</td>
                            <td className="w-10">D</td>
                            <td className="w-10">Pts</td>
                        </tr>
                        {Teams.map((element,index)=>{
                            return <tr key={index} className="border-2 h-10 md:text-md text-sm font-bold">
                                <td className="px-5">{element.position}</td>
                                <td className="flex py-2 "><img className="md:mx-10 mx-2 h-6 w-6" alt="" src={element.team.crest} />{element.team.name}</td>
                                <td>{element.playedGames}</td>
                                <td>{element.won}</td>
                                <td>{element.lost}</td>
                                <td>{element.draw}</td>
                                <td>{element.points}</td>
                            </tr>
                        })}
                </table>
            </div>
            
                }
            {Teams.length===0 && 
                <div className="text-center text-4xl font-bold" style={{height:"400px"}}>
                    Loading ...</div>
                }
        </div>
        </>
    )
}

export default Standings;