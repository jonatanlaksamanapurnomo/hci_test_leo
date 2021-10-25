import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Timer = () => {
    const history = useHistory();
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer((oldTimer) => (oldTimer -= 1));
            } else {
                clearInterval(myInterval);
                history.push("/home", {
                    idx: history?.location?.state?.idx + 1,
                });
            }
        }, 300);
        return () => {
            clearInterval(myInterval);
        }; // eslint-disable-next-line
    }, [timer]);
    return (
        <>
            <div className="container">
                <div
                    style={{height: "100vh"}}
                    className="text-center  d-flex justify-content-center align-items-center "
                >
                    <div className="row">
                        <div className="col-12">
                            <h1>Next Questions</h1>
                        </div>
                        <div className="col-12">
                            <h1 className="timer-text">{timer}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Timer;
