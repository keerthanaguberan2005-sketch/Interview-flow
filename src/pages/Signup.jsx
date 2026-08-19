import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(e) {
  e.preventDefault();

  if (!name) {
    setError("Please enter your full name.");
    return;
  }

  if (!email) {
    setError("Please enter your email.");
    return;
  }

  if (!password) {
    setError("Please enter a password.");
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

  if (!confirmPassword) {
    setError("Please confirm your password.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");
  localStorage.setItem(
    "interviewflowUser",
     JSON.stringify({
       name,
       email,
       password
     })
  );
  
  setSuccess("Account created successfully!");

  setTimeout(() => {
  navigate("/login");
  }, 1500);

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
}
    

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create Account ✨</h1>

        <p>Create your InterviewFlow account.</p>

        <form onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
          <div className="form-group">
            <label>Full Name</label>
            {/* <input
              type="text"
              placeholder="Enter your name"
            /> */}
            <input
               type="text"
               placeholder="Enter your name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>

          <button type="submit">
            Create Account
          </button>
        </form>

        {/* <p>
          Already have an account? <span>Sign In</span>
        </p> */}
        <p>
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;