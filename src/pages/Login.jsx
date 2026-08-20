import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    /* ================= VALIDATION ================= */

    if (!email.trim()) {
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

    /* ================= GET USER ================= */

    let savedUser = null;

    try {
      const storedUser = localStorage.getItem(
        "interviewflowUser"
      );

      if (storedUser) {
        savedUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error(
        "Unable to read user data:",
        error
      );

      setError("Unable to read account information.");
      return;
    }

    /* ================= ACCOUNT CHECK ================= */

    if (!savedUser) {
      setError(
        "No account found. Please sign up first."
      );
      return;
    }

    /* ================= LOGIN CHECK ================= */

    if (
      email.trim().toLowerCase() !==
        String(savedUser.email || "")
          .trim()
          .toLowerCase() ||
      password !== savedUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    /* ================= LOGIN SUCCESS ================= */

    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Sign in to continue your interview preparation.
        </p>

        <form onSubmit={handleSubmit}>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button type="submit">
            Sign In
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <a
            href="/signup"
            className="auth-link"
          >
            Sign Up
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;