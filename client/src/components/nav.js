import React from "react";
import { Link } from "react-router-dom";
import TheFootballSpotLight from "../images/soccer-ball.png" 
import { ACTIONS } from "../App";
import Main from "../images/main-menu.png"
function NavBar({dispatch}){
    function addSelection(){
        var selection = document.getElementById("selection");
        selection.classList.toggle("hidden")
    }
    function addSelectionMenu(){
        var selection = document.getElementById("selection-Menu");
        selection.classList.toggle("hidden")
    }

    function addMenu(){
        var selection = document.getElementById("menu");
        var selection_menu = document.getElementById("selection-Menu")
        selection_menu.classList.add("hidden")
        selection.classList.toggle("hidden")
    }


    return(
        <>
        <div className="h-20 bg-blue-900 flex items-center">
            <div className="container flex items-center">
                <img src={TheFootballSpotLight} alt=""  className="pl-10 w-24"></img>
                <h1 className="text-l text-white font-bold ml-2 md:text-3xl">The FootballSpotlight</h1>
            </div>
            <nav className="lg:container lg:flex lg:justify-end lg:w-full lg:mr-5 hidden">
                <ul className="flex gap-20  ">
                    <li className="md:font-bold md:text-3xl text-white text-l hover:scale-110">
                        <Link to="/">Standings</Link>
                    </li>
                    <li className="md:font-bold md:text-3xl text-white text-l hover:scale-110">
                        <Link to="/matches">Matches</Link>
                    </li>
                    <li className="md:font-bold md:text-3xl  text-white text-l hover:scale-110">
                        <Link to="/news">News</Link>
                    </li>
                    <li className="md:font-bold md:text-3xl cursor  text-white text-l">
                        <div>
                            <h3 onClick={()=>{addSelection()}}>League</h3>
                            <div id="selection" className="hidden flex flex-cols bg-blue-700 text-lg absolute text-center overflow-visible">
                                <ul >
                                    <li onClick={()=>dispatch({type:ACTIONS.LALIGA})}>La liga</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.BUNDESLIGA})}>Bundesliga</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.LIGUE_1})}>League 1</li>
                                    <li style={{fontSize:"0.9rem"}} onClick={()=>dispatch({type:ACTIONS.PREMIER_LEAGUE})}>Premiere League</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.SERIE_A})}>Seria A</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <nav className="lg:hidden flex w-1/2 items-center justify-center" >
                <img src={Main} className="h-10 w-10" alt="" onClick={()=>addMenu()}></img>

            </nav>
        </div>
        <div id="menu" className="w-full h-94 bg-blue-800 lg:hidden">
                <ul className="flex flex-row gap-10 top-0 justify-center">
                    <li className="lg:font-bold lg:text-3xl text-white text-l hover:scale-110">
                        <Link to="/">Standings</Link>
                    </li>
                    <li className="lg:font-bold lg:text-3xl text-white text-l hover:scale-110">
                        <Link to="/matches">Matches</Link>
                    </li>
                    <li className="lg:font-bold lg:text-3xl  text-white text-l hover:scale-110">
                        <Link to="/news">News</Link>
                    </li>
                    <li className="lg:font-bold cursor  text-white text-md">
                        <div>
                            <h3 onClick={()=>{addSelectionMenu()}}>League</h3>
                            <div id="selection-Menu" className="hidden flex bg-blue-700   flex-cols absolute text-sm overflow-visible">
                                <ul className="">
                                    <li onClick={()=>dispatch({type:ACTIONS.LALIGA})}>La liga</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.BUNDESLIGA})}>Bundesliga</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.LIGUE_1})}>League 1</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.PREMIER_LEAGUE})}>Premiere League</li>
                                    <li onClick={()=>dispatch({type:ACTIONS.SERIE_A})}>Seria A</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    

                </ul>
            </div>
        </>
        
        
    );
}

export default NavBar