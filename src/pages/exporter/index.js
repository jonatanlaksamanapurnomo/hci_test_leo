import React, {useEffect, useState} from 'react';
import ReactExport from "react-export-excel";
import Fire from "../../firebase";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// eslint-disable-next-line
const dataSet1 = [
    {
        name: "Kristanto",
        age: "20",
        time: "12:12:75 ",
        question: "SEGI TIGA",
        answer: "SEGI TIGA",
        isMale: true,
        btnClass: {
            btnClass: "button-primary-md-2",
            pos: 0
        }
    }
];

const Exporter = () => {
    let [result, setRes] = useState([]);
    useEffect(() => {
        let db = Fire.firestore();
        let res = db.collection("records").get();
        let arr = []
        res.then(snapshot => {
            snapshot.forEach(item => {
                if (item.data().btnClass) {
                    arr.push(item.data())
                }

            })
            setRes(arr)
        })
    }, [])
    const handleGenderOption = (col) => {
        if (col.isMale === true) {
            return "Pria";
        } else {
            return "Wanita";
        }
    }
    const handleButtonParser = (col) => {
        if (col.btnClass) {
            return col.btnClass.btnClass;
        } else {
            return "err"
        }

    }
    const handleButtonPosParser = (col) => {
        if (col.btnClass) {
            return col.btnClass.pos;
        } else {
            return "err"
        }

    }
    if (result.length > 0) {

        return (
            <ExcelFile>
                <ExcelSheet data={result} name="Employees">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Question" value="question"/>
                    <ExcelColumn label="Answer" value="answer"/>
                    <ExcelColumn label="Waktu" value="time"/>
                    <ExcelColumn label="Jenis Kelamin"
                                 value={handleGenderOption}/>
                    <ExcelColumn label="Button" value={handleButtonParser}/>
                    <ExcelColumn label="Button Pos" value={handleButtonPosParser}/>
                </ExcelSheet>
            </ExcelFile>
        );
    } else {
        return (
            <p>loading</p>
        )
    }

};

export default Exporter;
