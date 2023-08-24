import NavBar from "./components/nav";
import News from "./components/news";
import View from "./components/view";
import { createContext, useReducer } from "react";
import Title from "./images/soccer-ball.png"

export const ACTIONS = {
  "Primera Division": "Change to La Liga",
  "Premier League": "Change to Premier League",
  "Serie A": "Change to Serie A",
  "Bundesliga": "Change to Bundesliga",
  "Ligue 1": "Change to Ligue 1",
};

function reducer(state, { type }) {
  switch (type) {
    case "Primera Division":
      return {
        ...state,
        "Primera Division": true,
        "Premier League": false,
        "Serie A": false,
        "Bundesliga": false,
        "Ligue 1": false,
      };

    case "Ligue 1":
      return {
        ...state,
        "Primera Division": false,
        "Premier League": false,
        "Serie A": false,
        "Bundesliga": false,
        "Ligue 1": true,
      };

    case "Premier League":
      return {
        ...state,
        "Primera Division": false,
        "Premier League": true,
        "Serie A": false,
        "Bundesliga": false,
        "Ligue 1": false,
      };

    case "Serie A":
      return {
        ...state,
        "Primera Division": false,
        "Premier League": false,
        "Serie A": true,
        "Bundesliga": false,
        "Ligue 1": false,
      };

    case "Bundesliga":
      return {
        ...state,
        "Primera Division": false,
        "Premier League": false,
        "Serie A": false,
        "Bundesliga": true,
        "Ligue 1": false,
      };
    default:
      return state;
  }
}

export const AppContext = createContext(null);
function App() {
  const[state,dispatch]=useReducer(reducer, {
    "Primera Division": true,
    "Premier League": false,
    "Serie A": false,
    "Bundesliga": false,
    "Ligue 1": false,
});


  return (
    <AppContext.Provider value={{state}}>
      <div className="h-14 bg-Color text-2xl font-bold w-full flex justify-center items-center mb-2">
        <img className="h-12 w-12 " src={Title} alt=""></img>
        <h1 className="ml-2 text-Color ">
          The Football SpotLight 
        </h1>
      </div>

      <div className="flex flex-row h-full ">
        {/* News Div */}
        <div className="width-news bg-Color mr-2 rounded-xl">
            <News/>
        </div>
        
        
        <div className="width-view rounded-xl ">
          <View/>
        </div>

        <div className="width-navbar flex navbar">
          <NavBar dispatch={dispatch}/> 
        </div>
      </div>
    </AppContext.Provider>
  );
}



export default App;
