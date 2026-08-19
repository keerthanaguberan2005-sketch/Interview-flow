import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("interviewflowUser") || "{}"
      );
    } catch {
      return {};
    }
  });

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [message, setMessage] = useState("");

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "interviewflowUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setMessage("Profile updated successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  /* ================= CLEAR PREPARATION ================= */

  const handleClearPreparation = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all preparation progress?"
    );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem(
      "interviewflowPreparation"
    );

    localStorage.removeItem(
      "interviewflowQuestionStatus"
    );

    localStorage.removeItem(
      "interviewflowQuestionNotes"
    );

    setMessage("Preparation data cleared.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  /* ================= CLEAR INTERVIEWS ================= */

  const handleClearInterviews = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all interviews?"
    );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem(
      "interviewflowInterviews"
    );

    setMessage("Interview data cleared.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "interviewflowUser"
    );

    navigate("/");
  };

  return (
    <div className="settings-page">

      {/* ================= HEADER ================= */}

      <header className="settings-header">

        <div>

          <span className="settings-label">
            INTERVIEWFLOW
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your profile and application
            preferences.
          </p>

        </div>

        <button
          type="button"
          className="settings-back-button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* ================= MESSAGE ================= */}

      {message && (
        <div className="settings-message">
          {message}
        </div>
      )}

      {/* ================= PROFILE ================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div>

            <span className="settings-section-label">
              PROFILE
            </span>

            <h2>
              Personal Information
            </h2>

            <p>
              Update your basic profile details.
            </p>

          </div>

        </div>

        <form
          className="settings-form"
          onSubmit={handleSaveProfile}
        >

          <div className="settings-form-group">

            <label htmlFor="settings-name">
              Full Name
            </label>

            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />

          </div>

          <div className="settings-form-group">

            <label htmlFor="settings-email">
              Email Address
            </label>

            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />

          </div>

          <button
            type="submit"
            className="settings-save-button"
          >
            Save Changes
          </button>

        </form>

      </section>

      {/* ================= APPLICATION ================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div>

            <span className="settings-section-label">
              APPLICATION
            </span>

            <h2>
              InterviewFlow Data
            </h2>

            <p>
              Manage your saved interview and
              preparation information.
            </p>

          </div>

        </div>

        <div className="settings-actions">

          <div className="settings-action-row">

            <div>

              <h3>
                Clear Preparation Data
              </h3>

              <p>
                Remove saved topic progress,
                question status and notes.
              </p>

            </div>

            <button
              type="button"
              className="settings-danger-button"
              onClick={
                handleClearPreparation
              }
            >
              Clear Preparation
            </button>

          </div>

          <div className="settings-action-row">

            <div>

              <h3>
                Clear Interview Data
              </h3>

              <p>
                Delete all saved interview
                schedules.
              </p>

            </div>

            <button
              type="button"
              className="settings-danger-button"
              onClick={
                handleClearInterviews
              }
            >
              Clear Interviews
            </button>

          </div>

        </div>

      </section>

      {/* ================= ACCOUNT ================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div>

            <span className="settings-section-label">
              ACCOUNT
            </span>

            <h2>
              Account Actions
            </h2>

            <p>
              Manage your InterviewFlow session.
            </p>

          </div>

        </div>

        <div className="settings-account-actions">

          <button
            type="button"
            className="settings-dashboard-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Go to Dashboard
          </button>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>

    </div>
  );
}

export default Settings;