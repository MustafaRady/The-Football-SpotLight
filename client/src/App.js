import NavBar from "./components/nav";
import News from "./components/news";
import View from "./components/view";
import { createContext, useReducer } from "react";
import Title from "./images/soccer-ball.png"

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
      <div className="h-14 bg-Color text-2xl font-bold w-full flex justify-center items-center mb-2">
        <img className="h-12 w-12 " src={Title} alt=""></img>
        <h1 className="ml-2 text-Color ">
          The Football SpotLight 
        </h1>
      </div>

      <div className="flex flex-row h-full">
        {/* News Div */}
        <div className="w-1/4 bg-Color mr-2 rounded-xl">
          <News/>
        </div>

        <div className="w-2/3 rounded-xl ">
          <View/>
        </div>

        <div className="w-1/6 flex navbar">
          <NavBar dispatch={dispatch}/> 
        </div>
      </div>
    </AppContext.Provider>
  );
}



export default App;
