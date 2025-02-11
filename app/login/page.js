"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push("/");
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for a confirmation link.");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login / Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        <button onClick={handleSignIn} className="auth-button">Login</button>
        <button onClick={handleSignUp} className="auth-button secondary">Sign Up</button>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #f4f4f4;
        }

        .auth-box {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 350px;
          text-align: center;
        }

        h2 {
          margin-bottom: 15px;
          color: #333;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .auth-button {
          width: 100%;
          padding: 10px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s ease;
        }

        .auth-button:hover {
          background: #005bb5;
        }

        .secondary {
          background: #444;
        }

        .secondary:hover {
          background: #222;
        }
      `}</style>
    </div>
  );
};

export default Login;
