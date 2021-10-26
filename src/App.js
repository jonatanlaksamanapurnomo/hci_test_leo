// import Home from "./pages/home/index";
// import Timer from "./pages/Timer";
import Register from "./pages/register";
// import EndScene from "./pages/endscene";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                {/*<Route exact path="/home" component={Home}/>*/}
                {/*<Route exact path="/timer" component={Timer}/>*/}
                {/*<Route exact path="/thankyou" component={EndScene}/>*/}
                <Route exact path="/" component={Register}/>
            </Switch>
        </Router>
    );
}

export default App;
