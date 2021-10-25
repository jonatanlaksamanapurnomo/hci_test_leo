import React, { useState, useEffect } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import circleActive from "../../assets/images/shapes/circle_active.svg";
import circleDeactive from "../../assets/images/shapes/circle_deactive.svg";
import pentagonActive from "../../assets/images/shapes/pentagon_active.svg";
import pentagonDeactive from "../../assets/images/shapes/pentagon_deactive.svg";
import triangleActive from "../../assets/images/shapes/triangle_active.svg";
import triangleDeactive from "../../assets/images/shapes/triangle_deactive.svg";
import squareActive from "../../assets/images/shapes/square-active.svg";
import squareDeactive from "../../assets/images/shapes/square_deactive.svg";
import starActive from "../../assets/images/shapes/star_active.svg";
import starDeactive from "../../assets/images/shapes/star_deactive.svg";
import rectangleActive from "../../assets/images/shapes/rectangle_active.svg";
import rectangleDeactive from "../../assets/images/shapes/rectangle_deactive.svg";
import Fire from "../../firebase";

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
  const [buttonClass] = useState(shuffle(buttonCombination));
  const [timer, setTimer] = useState(0);
  const history = useHistory();
  const loginedUser = JSON.parse(localStorage.getItem("userLogin"));
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
      history.push("/thankyou");
    }
    // eslint-disable-next-line
  }, [history?.location?.state?.idx]);

  const addRecord = () => {
    const db = Fire.firestore();
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
    obj.btnClass = buttonClass[idx];
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
    console.log(obj);
    setAnswer(obj);
  };
  const handleClickNext = (e) => {
    e.preventDefault();
    addRecord();
  };

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
};

export default Home;
