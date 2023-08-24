import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
function NavBar({dispatch}){
    const listOfExistingLeagues = [2002,2014,2015,2019,2021]
    const [leagues,setLeagues]=useState([]);

    useLayoutEffect(()=>{
        console.log("getting leagues in nav .... ")
       const getLeagues = async ()=>{
        try{
            const response = await axios.get("https://api.football-data.org/v4/competitions",{
                headers:{
                    "X-Auth-Token":"a4b408a61fec4bb99db984a6c7b67a50"
                }
            })
            const array_of_accepted_leagues = []
            for(let i = 0 ; i< response.data.competitions.length ; i++){
                if( listOfExistingLeagues.indexOf(response.data.competitions[i].id) !== -1){
                    array_of_accepted_leagues.push(response.data.competitions[i])
                }
            }
            setLeagues(array_of_accepted_leagues);
        }catch(err){
            console.log(err.message);
        }
    }
    getLeagues();

    // eslint-disable-next-line
    },[])



    return(
        <>
            <div className="bg-Color mx-2 rounded-xl navbar h-auto w-full">
                <div className="mx-auto text-2xl text-white pt-2 text-Color text-center " style={{backgroundColor:"#7d7c7c"}}>
                    LEAGUES
                </div>
                <ul className="flex flex-col pl-4 ">
                    {leagues.map((element)=>{
                        return <li className="pt-4  text-white  flex gap-x-4 items-center cursor-default nav-element" onClick={()=>dispatch({type:element.name})}>
                            <img src={element.emblem} alt="" className="nav-img" ></img>
                            {element.name}
                            </li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default NavBar