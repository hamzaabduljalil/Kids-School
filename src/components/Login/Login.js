import { useRef, useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Login = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          password: pwd,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.access_token && data.refresh_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          localStorage.setItem("authToken", "true");

          setUser("");
          setPwd("");
          navigate("/Home");
        } else {
          setErrMsg("Tokens are missing in the response.");
        }
      } else {
        setErrMsg(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrMsg("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <section className={styles.container}>
        <div className={styles.box}>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {errMsg && (
              <p ref={errRef} className={styles.errmsg} aria-live="assertive">
                {errMsg}
              </p>
            )}
            <input
              placeholder="Email"
              type="text"
              id="username"
              ref={userRef}
              // autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <div className={styles.passwordWrapper}>
              <input
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button
                type="button"
                className={styles.showPwdBtn}
                onClick={() => setShowPwd((prev) => !prev)}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
            <Link to="/ForgetPassword">
              <p className={styles.forget}>Forget Password?</p>
            </Link>
            <button className={styles.login}>Login</button>
          </form>
          <p className={styles.info}>
            Don't have an Account? <Link to="/Register">Register</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
