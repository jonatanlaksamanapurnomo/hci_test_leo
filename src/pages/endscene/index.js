import React from 'react';
import "./index.css";
import succsesIcon from "../../assets/images/succses.svg"
import instagramIcon from "../../assets/images/instagram.svg";
import linkedInIcon from "../../assets/images/linkedin.svg";

const EndScene = () => {

    const handleSocmedClick = (site) => {
        window.location.href = site
    }
    return (
        <div className=" thankyou-page ">
            <div className="row">
                <div className="col-12  margin-bottom d-flex justify-content-center  ">
                    <img src={succsesIcon} alt="succses-icon"/>
                </div>
                <div className="col-12 text-center margin-bottom">
                    <h1>TERIMA KASIH</h1>
                    <p>Hasil tes anda telah saya terima. </p>
                </div>
                <div className="col-12 text-center">
                    <p>Jangan lupa untuk mengikuti sosial media saya :)</p>
                    <div className="row">
                        <div onClick={() => handleSocmedClick("https://www.google.com/")}
                             className="col-6 d-flex justify-content-end">
                            <img className="socmed" src={instagramIcon} alt="succses-icon"/>
                        </div>
                        <div onClick={() => handleSocmedClick("https://www.google.com/")}
                             className="col-6  d-flex justify-content-start">
                            <img className="socmed" src={linkedInIcon} alt="succses-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EndScene;
