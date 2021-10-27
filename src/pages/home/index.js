import React, {useState, useEffect} from "react";
import "./index.css";
import {useHistory} from "react-router-dom";

import Fire from "../../firebase";

let circleActive = "https://ik.imagekit.io/Leo/circle_active_pJ8NQrOYn.svg?updatedAt=1635222270619";
let circleDeactive = "https://ik.imagekit.io/Leo/circle_deactive_t_ex7OmLYD-.svg?updatedAt=1635222272326";
let pentagonActive = "https://ik.imagekit.io/Leo/pentagon_active_EAsWM6f3s.svg?updatedAt=1635222274207";
let pentagonDeactive = "https://ik.imagekit.io/Leo/pentagon_deactive_vn1zj31_x3T.svg?updatedAt=1635222275904";
let triangleActive = "https://ik.imagekit.io/Leo/triangle_active_hejRH5Bm2.svg?updatedAt=1635222288343";
let triangleDeactive = "https://ik.imagekit.io/Leo/triangle_deactive_sgFmjuXb5.svg?updatedAt=1635222269001";
let squareActive = "https://ik.imagekit.io/Leo/square-active_YqsX2bSmC.svg?updatedAt=1635222283023";
let squareDeactive = "https://ik.imagekit.io/Leo/square_deactive_6TVAzPP_8.svg?updatedAt=1635222281200";
let starActive = "https://ik.imagekit.io/Leo/star_active_KAJE4WOFt.svg?updatedAt=1635222284795";
let starDeactive = "https://ik.imagekit.io/Leo/star_deactive_UMg42bW5h.svg?updatedAt=1635222286519";
let rectangleActive = "https://ik.imagekit.io/Leo/rectangle_active_sh0qc1--U.svg?updatedAt=1635222277730";
let rectangleDeactive = "https://ik.imagekit.io/Leo/rectangle_deactive_xKs9imc6Dk3.svg?updatedAt=1635222279467";
// eslint-disable-next-line
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

let questions = [
    {
        answer: "LINGKARAN",
        active: circleActive,
        deactive: circleDeactive,
    },
    {
        answer: "SEGI LIMA",
        active: pentagonActive,
        deactive: pentagonDeactive,
    },
    {
        answer: "SEGI TIGA",
        active: triangleActive,
        deactive: triangleDeactive,
    },
    {
        answer: "PERSEGI",
        active: squareActive,
        deactive: squareDeactive,
    },
    {
        answer: "BINTANG",
        active: starActive,
        deactive: starDeactive,
    },
    {
        answer: "PERSEGI PANJANG",
        active: rectangleActive,
        deactive: rectangleDeactive,
    },
];

const Home = (props) => {
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
    // eslint-disable-next-line
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);
    const [answer, setAnswer] = useState({});
    const [pos, setPos] = useState(-1);
    const [question] = useState(shuffle(questions).slice(0, 2));
    const [idx] = useState(Math.floor(Math.random() * 2));
    const [btnClass, setButtonClass] = useState("");
    // eslint-disable-next-line
    const [buttonClass] = useState(props.buttonClass);
    const [timer, setTimer] = useState(0);
    const history = useHistory();
    const loginedUser = JSON.parse(localStorage.getItem("userLogin"));


    useEffect(() => {
        if (loginedUser === null) {
            history.push("/");
        }

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        let myInterval = setInterval(() => {
            // console.log(timer);
            setTimer((oldTimer) => (oldTimer += 10));
        }, 10);
        return () => {
            clearInterval(myInterval);
        }; // eslint-disable-next-line
    }, [timer]);

    useEffect(() => {
        let idx =
            history?.location?.state?.idx === undefined
                ? 0
                : history?.location?.state?.idx;
        if (idx < 27) {
            setButtonClass(buttonClass[idx].btnClass);
            setPos(buttonClass[idx].pos);
        } else {
            localStorage.clear();
            setTimeout(() => {
                history.push("/thankyou");
            }, 1000);
        }
        // eslint-disable-next-line
    }, [history?.location?.state?.idx]);

    const addRecord = () => {
        const db = Fire.firestore();
        answer.timeStamp = new Date(Date.now());
        db.collection("records")
            .add(answer)
            .then(() => {
                history.push("/timer", {
                    idx:
                        history?.location?.state?.idx === undefined
                            ? 0
                            : history?.location?.state?.idx,
                });
            });
    };
    const handleCLickPhoto = (type) => {
        let obj = {};
        obj.name = loginedUser.name;
        obj.age = loginedUser.usia;
        obj.isMale = loginedUser.isMale;
        obj.question = question[idx].answer;
        obj.btnClass = {};
        obj.btnClass.pos = pos;
        obj.btnClass.btnClass = btnClass;
        obj.time = `${("0" + Math.floor((timer / 60) % 60000)).slice(-2)}:${(
            "0" + Math.floor((timer / 60) % 1000)
        ).slice(-2)}:${("0" + Math.floor((timer / 10) % 1000)).slice(-2)} `;
        if (type === "left") {
            obj.answer = question[0].answer;
            setLeftActive(true);
            setRightActive(false);
        } else {
            obj.answer = question[1].answer;
            setLeftActive(false);
            setRightActive(true);
        }
        setAnswer(obj);
    };
    const handleClickNext = (e) => {
        e.preventDefault();
        addRecord();
    };
    if (buttonClass.length > 0) {

        return (
            <>
                <div className="  margin-center ">
                    <div>
                        <div className="width-764">
                            <div className="text-center margin-16">
                                <div id="heading-s" className="margin-16">
                                    Manakah dari kedua gambar berikut yang merupakan
                                </div>
                                <h1 className="margin-80">{question[idx].answer}</h1>
                            </div>
                            <div className="row    ">
                                <div className="col-6 p-0 d-flex justify-content-start">
                                    <img
                                        className="image-border"
                                        src={question[0][leftActive ? "active" : "deactive"]}
                                        onClick={() => handleCLickPhoto("left")}
                                        alt="a"
                                    />
                                </div>
                                <div className="col-6 p-0 d-flex justify-content-end">
                                    <img
                                        className="image-border"
                                        src={question[1][rightActive ? "active" : "deactive"]}
                                        onClick={() => handleCLickPhoto("right")}
                                        alt="b"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="margin-inside">
                            <div className="row ">
                                <div className="col-4 d-flex justify-content-start ">
                                    {pos === 0 && (
                                        <button onClick={handleClickNext} className={btnClass}>
                                            Next
                                        </button>
                                    )}
                                </div>
                                <div className="col-4 d-flex justify-content-center ">
                                    {pos === 1 && (
                                        <button onClick={handleClickNext} className={btnClass}>
                                            Next
                                        </button>
                                    )}
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    {pos === 2 && (
                                        <button onClick={handleClickNext} className={btnClass}>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (<p>Loading</p>)
    }

};

export default Home;
