import { useState, useEffect } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [validOld, setValidOld] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidOld(oldPassword.trim().length >= 8);
  }, [oldPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd, oldPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/change-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: oldPassword,
            new_password: pwd,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setErrMsg(data.error);
        } else {
          setErrMsg("Failed to change password. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      setOldPassword("");
      setPwd("");
      setMatchPwd("");
      setSuccessMsg("Password changed successfully!");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/Home");
      }, 3000);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.changePassword}>
      {errMsg && (
        <p className={styles.error} aria-live="assertive">
          {errMsg}
        </p>
      )}
      {successMsg && (
        <p className={styles.success} aria-live="assertive">
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <input
            type="password"
            id="oldPassword"
            placeholder="Old Password"
            autoComplete="off"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.label}>
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? styles.hide : styles.invalid}
            />
          </label>
          <input
            type="password"
            id="password"
            placeholder="New Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.label}>
            {" "}
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? styles.hide : styles.invalid}
            />
          </label>

          <input
            type="password"
            id="confirm_pwd"
            placeholder="Confirm New Password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </div>

        <button
          type="submit"
          disabled={!validOld || !validPwd || !validMatch || isLoading}
          className={styles["change-password-btn"]}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
