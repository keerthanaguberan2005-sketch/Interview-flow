function Header() {
  return (
    <header className="header">
      <div className="logo">
        InterviewFlow
      </div>

      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
      </nav>

      <div className="header-actions">
        {/* <button className="sign-in-btn">Sign In</button> */}
        <a href="/login" className="sign-in-btn">
             Sign In
        </a>
        <button className="sign-up-btn">Get Started</button>
      </div>
    </header>
  );
}

export default Header;