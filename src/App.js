import { Routes ,Route } from "react-router-dom";
import NavBar from "./components/nav";
import Standings from "./components/standings";
import Matches from "./components/matches";
import News from "./components/news";
import { createContext, useReducer } from "react";

export const ACTIONS = {
  LALIGA: "Change to La Liga",
  PREMIER_LEAGUE: "Change to Premier League",
  SERIE_A: "Change to Serie A",
  BUNDESLIGA: "Change to Bundesliga",
  LIGUE_1: "Change to Ligue 1",
};


function reducer(state, { type }) {
  switch (type) {
    case ACTIONS.LALIGA:
      return {
        ...state,
        LaLIGA: true,
        PREMIER_LEAGUE: false,
        SERIE_A: false,
        BUNDESLIGA: false,
        LIGUE_1: false,
      };

    case ACTIONS.LEAGUE1:
      return {
        ...state,
        LaLIGA: false,
        PREMIER_LEAGUE: false,
        SERIE_A: false,
        BUNDESLIGA: false,
        LIGUE_1: false,
      };

    case ACTIONS.PREMIER_LEAGUE:
      return {
        ...state,
        LaLIGA: false,
        PREMIER_LEAGUE: true,
        SERIE_A: false,
        BUNDESLIGA: false,
        LIGUE_1: false,
      };

    case ACTIONS.SERIE_A:
      return {
        ...state,
        LaLIGA: false,
        PREMIER_LEAGUE: false,
        SERIE_A: true,
        BUNDESLIGA: false,
        LIGUE_1: false,
      };

    case ACTIONS.BUNDESLIGA:
      return {
        ...state,
        LaLIGA: false,
        PREMIER_LEAGUE: false,
        SERIE_A: false,
        BUNDESLIGA: true,
        LIGUE_1: false,
      };

    case ACTIONS.LIGUE_1:
      return {
        ...state,
        LaLIGA: false,
        PREMIER_LEAGUE: false,
        SERIE_A: false,
        BUNDESLIGA: false,
        LIGUE_1: true,
      };

    default:
      return state;
  }
}




export const AppContext = createContext(null);
function App() {
  const[state,dispatch]=useReducer(reducer, {
    LaLIGA:true,
    PREMIER_LEAGUE: false,
    SERIE_A: false,
    BUNDESLIGA: false,
    LIGUE_1: true,
});
  return (
    <AppContext.Provider value={{state}}>
      <div>
        <NavBar dispatch={dispatch}/>
        <Routes>
          <Route path="/" element={<Standings />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
          <Route path="/news" element={<News/>}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}



export default App;
