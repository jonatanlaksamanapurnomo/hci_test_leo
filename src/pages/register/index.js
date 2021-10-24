import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import "./index.css";
import photoGuide from "../../assets/images/guide.png";

const Register = () => {
    const [step, setStep] = useState(0);
    const [payload, setPayload] = useState({isMale: true});
    const [isMale, setMale] = useState(true);
    const history = useHistory();
    const handleNextStep = (e) => {
        e.preventDefault()
        if (step !== 2) {
            localStorage.setItem("userLogin", JSON.stringify(payload))
            setStep(step => step + 1);
        } else {
            history.push("/home")
        }
    }
    const handleOnChangeField = (e, attr) => {
        let newPayload = {...payload};
        newPayload[`${attr}`] = e.target.value;
        setPayload(newPayload);
    }
    const handleGenderOnCLick = (e, type) => {
        console.log(type)
        if (type === "male") {
            setMale(true);
            let newPayload = {...payload};
            newPayload[`isMale`] = true;
            setPayload(newPayload);
        } else {
            setMale(false);
            let newPayload = {...payload};
            newPayload[`isMale`] = false;
            setPayload(newPayload);
        }
    }

    if (step === 0) {
        return (
            <div className="register container-fluid">
                <div className="card w-100">
                    <div className="item-center text-center">
                        <h1>Human-Computer Interaction Test</h1>
                        <h2>Leotan Saputra, S.T.</h2>
                        <input className="btn btn-primary mt-4" onClick={handleNextStep} type="submit"
                               value="Begin Test"/>
                    </div>

                </div>
            </div>
        );
    }
    if (step === 1) {
        return (
            <div className="register container-fluid">
                <div className="card ">
                    <div className="card-body">
                        <div className="register-container">
                            <h1 className="card-title text-center text-bold mb-4">REGISTER</h1>
                            <form action="">
                                <div className="row">

                                    <div className="col-12 mb-4">
                                        <p className="mb-0">Nama</p>
                                        <input required={true} onChange={(e) => handleOnChangeField(e, 'name')}
                                               type="text" name="" id=""
                                               className="text-field w-100"
                                               placeholder="Masukkan nama anda"/>
                                    </div>
                                    <div className="col-12 mb-4 ">
                                        <p className="mb-0">Usia</p>
                                        <input required={true} onChange={(e) => handleOnChangeField(e, 'usia')}
                                               type="text" name="" id="" className="text-field w-100"
                                               placeholder="Masukkan usia anda"/>
                                    </div>
                                    <div className="col-12 mb-4 ">
                                        <p className="mb-0">Gender</p>
                                        <div className="row">
                                            <fieldset>
                                                <div className="col-6 ">
                                                    <input onClick={(e) => handleGenderOnCLick(e, 'male')} type="radio"
                                                           checked={isMale} name="gender" id="gender"/>
                                                    <label htmlFor="pria">Pria</label>
                                                </div>
                                                <div className="col-6">
                                                    <input onClick={(e) => handleGenderOnCLick(e, 'female')}
                                                           checked={!isMale} type="radio" name="gender" id="gender"/>
                                                    <label htmlFor="wanita">Wanita</label>
                                                </div>
                                                <div className="col-12 d-flex justify-content-center">
                                                    <input onClick={handleNextStep} className="btn btn-primary"
                                                           type="submit"
                                                           value="Submit"/>
                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    if (step === 2) {
        return (
            <div className="register container-fluid">
                <div className="card  w-50 h-100">
                    <div className=" text-center">
                        <div className="row">
                            <div className="col-12">
                                <h1>Petunjuk Pengerjaan</h1>
                            </div>
                            <div className="col-12">
                                <img src={photoGuide} alt="guide" height={"300px"}/>
                            </div>
                            <div className="mt-4 pt-4 col-12    ">
                                <div
                                    style={{textAlign: "left", display: "inline-block"}}>
                                    <p>1. Pada pengujian ini, anda akan diminta untuk memilih jawaban yang tepat dari
                                        2
                                        gambar
                                        yang diberikan.
                                    </p>
                                    <p> 2. Setelah memilih, anda akan diminta untuk menekan tombol next.</p>
                                    <p className="text-danger"> 3. Kerjakanlah tugas yang ada secepat mungkin!</p>
                                </div>
                            </div>

                            <div className="col-12">
                                <input className="btn btn-primary mt-4" onClick={handleNextStep} type="submit"
                                       value="Mulai"/>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

};

export default Register;


