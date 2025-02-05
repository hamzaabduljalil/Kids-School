import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          email: email,
          password: pwd,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setErrMsg(data.message || "Register failed");
      }
    } catch (error) {
      setErrMsg("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <div>
        <div className="container">
          <div className="register-left">
            <h2>
              Welcome <br />
              to the kids web
            </h2>
            <div className="login-container">
              <p>Do you have an account ?</p>
              <Link to="/">
                <button className="login">Login</button>
              </Link>
            </div>
          </div>
          <div className="register-right">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <div className="register-heading">Apply as a Student</div>
            <div className="register-form">
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="username">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </label>

                <input
                  placeholder="User Name"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />

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
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <div className="info">
                  <p
                    className={
                      pwdFocus && pwd && !validPwd
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    8 to 24 characters. Must include uppercase and lowercase
                    letters, a number and a special character. Allowed special
                    characters: <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
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
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <button
                  onClick={handleSubmit}
                  className="signup"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
