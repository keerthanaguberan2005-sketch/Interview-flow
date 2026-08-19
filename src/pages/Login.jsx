import { useState } from "react";
const savedUser = JSON.parse(
  localStorage.getItem("interviewflowUser")
);
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // function handleSubmit(e) {
    //    e.preventDefault();

    //    console.log("Email:", email);
    //    console.log("Password:", password);
    // }
// 
function handleSubmit(e) {
  e.preventDefault();

  if (!email) {
    setError("Please enter your email.");
    return;
  }

  if (!password) {
    setError("Please enter your password.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    setError("Password must contain at least 1 capital letter.");
    return;
  }

  if (!/[0-9]/.test(password)) {
    setError("Password must contain at least 1 number.");
    return;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    setError("Password must contain at least 1 special character.");
    return;
  }

  setError("");

  if (!savedUser) {
    setError("No account found. Please sign up first.");
    return;
  }
  
  if (
    email !== savedUser.email ||
    password !== savedUser.password
  ) {
  setError("Invalid email or password.");
  return;
}
  setError("");
  navigate("/dashboard"); 


  console.log("Email:", email);
  console.log("Password:", password);
}
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back 👋</h1>

        <p>Sign in to continue your interview preparation.</p>

        <form onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            {/* <input
              type="email"
              placeholder="Enter your email"
            /> */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">
            Sign In
          </button>
        </form>

        {/* <p>
          Don't have an account? <span>Sign Up</span>
        </p> */}
        <p>
            Don't have an account?{" "}
          <a href="/signup" className="auth-link">
           Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;