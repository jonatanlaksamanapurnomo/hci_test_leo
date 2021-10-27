import React, {useState} from 'react';
import Home from "./pages/home/index";
import Timer from "./pages/Timer";
import Register from "./pages/register";
import EndScene from "./pages/endscene";
import Exporter from "./pages/exporter";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

let buttonCombination = [
    {
        pos: 0,
        btnClass: "button-primary-lg-1",
    },
    {
        pos: 1,
        btnClass: "button-primary-lg-1",
    },
    {
        pos: 2,
        btnClass: "button-primary-lg-1",
    },
    {
        pos: 0,
        btnClass: "button-primary-lg-2",
    },
    {
        pos: 1,
        btnClass: "button-primary-lg-2",
    },
    {
        pos: 2,
        btnClass: "button-primary-lg-2",
    },
    {
        pos: 0,
        btnClass: "button-primary-lg-3",
    },
    {
        pos: 1,
        btnClass: "button-primary-lg-3",
    },
    {
        pos: 2,
        btnClass: "button-primary-lg-3",
    },
    {
        pos: 0,
        btnClass: "button-primary-md-3",
    },
    {
        pos: 1,
        btnClass: "button-primary-md-3",
    },
    {
        pos: 2,
        btnClass: "button-primary-md-3",
    },
    {
        pos: 0,
        btnClass: "button-primary-md-2",
    },
    {
        pos: 1,
        btnClass: "button-primary-md-2",
    },
    {
        pos: 2,
        btnClass: "button-primary-md-2",
    },
    {
        pos: 0,
        btnClass: "button-primary-md-1",
    },
    {
        pos: 1,
        btnClass: "button-primary-md-1",
    },
    {
        pos: 2,
        btnClass: "button-primary-md-1",
    },
    {
        pos: 0,
        btnClass: "button-primary-sm-1",
    },
    {
        pos: 1,
        btnClass: "button-primary-sm-1",
    },
    {
        pos: 2,
        btnClass: "button-primary-sm-1",
    },
    {
        pos: 0,
        btnClass: "button-primary-sm-2",
    },
    {
        pos: 1,
        btnClass: "button-primary-sm-2",
    },
    {
        pos: 2,
        btnClass: "button-primary-sm-2",
    },
    {
        pos: 0,
        btnClass: "button-primary-sm-3",
    },
    {
        pos: 1,
        btnClass: "button-primary-sm-3",
    },
    {
        pos: 2,
        btnClass: "button-primary-sm-3",
    },
];

function App() {

    const shuffle = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };
    const [buttonClass] = useState(shuffle(buttonCombination));
    return (
        <Router>
            <Switch>
                <Route exact path="/exporter" component={Exporter}/>
                <Route exact path="/home" component={() => <Home buttonClass={buttonClass}/>}/>
                <Route exact path="/timer" component={Timer}/>
                <Route exact path="/thankyou" component={EndScene}/>
                <Route exact path="/" component={Register}/>
            </Switch>
        </Router>
    );
}

export default App;
