import React from "react";
import { ACTIONS } from "../App";
function NavBar({dispatch}){
    return(
        <>
            <div className="bg-Color mx-2 rounded-xl navbar flex flex-col h-auto">
                <div className="mx-auto text-2xl text-white pt-2 text-Color">
                    LEAGUES
                </div>
                <ul className="flex flex-col pl-9  ">
                    <li className="pt-5 md:text-xl text-white text-l hover:scale-110" onClick={()=>dispatch({type:ACTIONS.LALIGA})}>La liga</li>
                    <li className="pt-5 md:text-xl text-white text-l hover:scale-110" onClick={()=>dispatch({type:ACTIONS.BUNDESLIGA})}>Bundesliga</li>
                    <li className="pt-5 md:text-xl text-white text-l hover:scale-110" onClick={()=>dispatch({type:ACTIONS.LIGUE_1})}>League 1</li>
                    <li className="pt-5 md:text-xl text-white text-l hover:scale-110" onClick={()=>dispatch({type:ACTIONS.PREMIER_LEAGUE})}>Premiere League</li>
                    <li className="pt-5 md:text-xl text-white text-l hover:scale-110" onClick={()=>dispatch({type:ACTIONS.SERIE_A})}>Seria A</li>
                </ul>
            </div>
        </>
    );
}

export default NavBar