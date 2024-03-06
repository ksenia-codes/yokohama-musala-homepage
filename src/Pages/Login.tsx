import React, { useState } from "react";

import { supabase } from "../supabase";

function Login() {
  // useState
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handlers
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      //   localStorage.setItem("supabaseSession", JSON.stringify(data));
      console.log("success!");
    }
    setLoading(false);
  };

  return (
    <div className="login-page-container">
      <div className="login-contents">
        <h1 className="header">Sign in</h1>
        <form action="" className="login-form" onSubmit={handleLogin}>
          <div className="login-inputs">
            <input
              type="email"
              className="email"
              placeholder="Email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-inputs">
            <input
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
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
