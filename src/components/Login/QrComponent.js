import React, { useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./QrComponent.css";
import { useLocation, useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const QrComponent = () => {
  const location = useLocation();
  const user = location.state?.email || "Default User";
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [pwd, matchPwd, file]);

  const handleFileChange = (e) => {
    setUploading(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setTimeout(() => {
        setFile(selectedFile);
        setUploading(false);
      }, 500);
    } else {
      setUploading(false);
    }
  };

  const createQRCode = async () => {
    const email = user;
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/generate_qr_code/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr_code.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setSuccessMsg("QR code generated successfully!");
    } catch (error) {
      setErrMsg("Error generating QR code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      setErrMsg("QR image file not provided");
      setIsLoading(false);
      return;
    }
    if (!pwd) {
      setErrMsg("New password not provided");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("qr_image", file);
    formData.append("password", pwd);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/reset_password/",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setErrMsg(`Failed to decode QR code, ${data.message}`);
      }
    } catch (error) {
      setErrMsg("Error decoding QR code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="qr-container">
      <h1>QR Code for {user}</h1>
      {errMsg && (
        <p className="error" aria-live="assertive">
          {errMsg}
        </p>
      )}
      {successMsg && (
        <p className="success" aria-live="polite">
          {successMsg}
        </p>
      )}
      <button className="qr-button" onClick={createQRCode}>
        Create QR Code
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="upload-container">
          <input type="file" className="qr-input" onChange={handleFileChange} />
          {uploading && <p className="loading">Uploading file...</p>}
        </div>
        <div className="info">
          <label htmlFor="password">
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
        </div>
        <input
          className="qr-input"
          placeholder="Password"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <label htmlFor="confirm_pwd">
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        <input
          placeholder="Confirm Password"
          type="password"
          id="confirm_pwd"
          className="qr-input"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <button
          className="qr-button"
          type="submit"
          disabled={!validPwd || !validMatch || isLoading}
        >
          {isLoading ? "Processing..." : "Decode QR Code"}
        </button>
      </form>
    </div>
  );
};

export default QrComponent;
