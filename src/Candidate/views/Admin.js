import React, { useState, useEffect } from "react";
import "./../styles/Admin.scss";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { useHistory } from "react-router-dom";

const axios = require("axios");

export default function Admin() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const getFile = (e) => {
    e.target.value = "Loading...";
    e.target.setAttribute("disabled", "true");
    setError("");
    setSuccess("");
    processFile(e);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  // JSON Convert

  const changeKeys = (json) => {
    let data = [];
    json.map((item, index) => {
      data.push({
        category: item["Category"],
        subCategory: item["Sub Category"],
        difficultyLevel: item["Difficulty level"],
        question: item["Question"],
        optionA: item["Option A"],
        optionB: item["Option B"],
        optionC: item["Option C"],
        optionD: item["Option D"],
        correct: item["Correct answer"],
      });
    });
    return data;
  };

  function processFile(e) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      let data = XLSX.utils.sheet_to_json(ws);
      data = changeKeys(data);
      /* Update state */
      if (data.length > 0) {
        addQuestions(data, e);
      } else {
        setError("No questions found!");
        reset(e);
      }
    };
    if (rABS) {
      reader.readAsBinaryString(acceptedFiles[0]);
    } else {
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }

  const reset = (e) => {
    e.target.value = "Add Questions";
    e.target.removeAttribute("disabled");
  };

  const addQuestions = async (data, e) => {
    let res = await axios.post("api/questions", data);
    let responce = res.data;
    if (responce.counter > 0) {
      setSuccess(
        `${responce.counter} questions are added. ${
          data.length - responce.counter !== 0
            ? (data.length - responce.counter).toString() +
              " questions are duplicate, therefore ignored."
            : ""
        }`
      );
      setTimeout(() => {
        refreshPage();
      }, 5000);
    } else {
      setError(
        "Error occured. Try again. Make sure your excel has one sheet only and the pattern is same."
      );
      reset(e);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    history.push("/signin");
  };

  return (
    <div className="__Admin">
      <div className="welcome">
        <span>Welcome Admin</span>
        <AutoAwesomeIcon />
      </div>
      <div className="process">
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drop or Select XLSX File</p>
          </div>
          {files.length > 0 ? (
            <aside>
              <h4>Selected File</h4>
              <ul>{files}</ul>
            </aside>
          ) : (
            ""
          )}
        </section>
      </div>
      <div className="submit">
        {error ? <span className="error">{error}</span> : ""}
        {success ? <span className="success">{success}</span> : ""}
        <input
          type="button"
          className="btn"
          value="Add Questions"
          onClick={getFile}
          disabled={acceptedFiles.length > 0 ? false : true}
        />
        <input
          type="button"
          className="btn mt-2"
          value="Logout"
          onClick={logout}
        />
      </div>
    </div>
  );
}
