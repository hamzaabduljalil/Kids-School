import React, { useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ForgetPassword.module.css";
import { useNavigate } from "react-router-dom";
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/QrComponent", { state: { email } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>

          <input
            placeholder="Email"
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
          />
          <button className={styles.login} disabled={!validEmail}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
