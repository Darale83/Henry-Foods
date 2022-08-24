import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import RecipeDetails from "./components/RecipeDetails";
import CreateRecipe from "./components/CreateRecipe";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        {/* <div className="nav">
          <Route path={["/home", "/recipes/detail/:id", "/create"]}>
            <NavBar />
          </Route>
        </div> */}

        {/* <div className="site"> */}
        <Switch>
          <Route path="/create" component={CreateRecipe} />
          <Route path="/home" component={Home} />
          <Route path="/recipes/detail/:id" component={RecipeDetails} />
        </Switch>
      </div>
      {/* </div> */}
    </Router>
  );
}

export default App;
