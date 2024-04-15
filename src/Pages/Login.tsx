import React, { useRef, useState } from "react";

import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // useState
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // handlers
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      setError("");

      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      setError("Failed to log in.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page-container">
      <div className="login-contents">
        <h1 className="header">Sign in</h1>
        {error && <div>{error}</div>}
        <form action="" className="login-form" onSubmit={handleLogin}>
          <div className="login-inputs">
            <input
              type="email"
              className="email"
              placeholder="Email"
              ref={emailRef}
              required={true}
            />
          </div>
          <div className="login-inputs">
            <input
              type="password"
              className="password"
              placeholder="Password"
              ref={passwordRef}
              required={true}
            />
          </div>
          <div className="submit-button">
            <button className="submit" disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
