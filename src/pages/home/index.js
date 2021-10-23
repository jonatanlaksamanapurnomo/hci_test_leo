import React, {useEffect, useState} from 'react';
import "./index.css";
import photoA from "../../assets/images/1.png"
import photoB from "../../assets/images/2.png"
// eslint-disable-next-line
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

const Home = () => {
    // eslint-disable-next-line
    const [arrPos, setArrPos] = useState([0, 1, 2]);
    const [pos, setPos] = useState(0);
    const [timer, setTimer] = useState(3);
    const [isTimePage, setTimePage] = useState(false);
    useEffect(() => {
        setPos(arrPos.random())
    }, [])

    useEffect(() => {
        let myInterval = setInterval(() => {
            console.log(timer);
            if (timer > 0) {
                setTimer(timer - 1);
            } else {

                setTimePage(true);
                clearInterval(myInterval);
            }

        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, []);


    const handleCLickPhoto = (type) => {
        console.log(type)
    }
    const handleClickNext = (e) => {
        e.preventDefault();
        setTimePage(true);
        console.log("handle click");
    }

    if (isTimePage) {
        return (
            <>
                <div className="container">
                    <div style={{height: "100vh"}}
                         className="text-center  d-flex justify-content-center align-items-center ">
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
        )
    } else {
        return (
            <>
                <div className="container">
                    <div className="text-center mt-4 ">
                        <p>Manakah dari kedua gambar berikut yang merupakan</p>
                        <h1>KUCING</h1>
                    </div>
                    <div className="row   container-margin ">
                        <div className="col-6  d-flex justify-content-center">
                            <img src={photoA} onClick={() => handleCLickPhoto("a")} alt="a"/>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <img src={photoB} onClick={() => handleCLickPhoto("b")} alt="b"/>
                        </div>
                    </div>
                    <div className=" container-margin ">
                        <div className="row ">
                            <div className="col-4 d-flex justify-content-center ">
                                {pos === 0 && (
                                    <button onClick={handleClickNext} className="btn-primary ">Next</button>
                                )}

                            </div>
                            <div className="col-4 d-flex justify-content-center ">
                                {pos === 1 && (
                                    <button onClick={handleClickNext} className="btn-primary ">Next</button>
                                )}

                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                {pos === 2 && (
                                    <button onClick={handleClickNext} className="btn-primary ">Next</button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </>
        );
    }


};

export default Home
