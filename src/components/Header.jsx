import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <Link to="/" className="logo">
        InterviewFlow
      </Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="header-actions">

        <Link
          to="/login"
          className="sign-in-btn"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="sign-up-btn"
        >
          Get Started
        </Link>

      </div>

    </header>
  );
}

export default Header;