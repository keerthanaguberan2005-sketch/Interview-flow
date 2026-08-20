import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./InterviewDetails.css";

function InterviewDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [interview, setInterview] = useState(
    location.state?.interview || null
  );

  useEffect(() => {
    if (interview) {
      return;
    }

    const savedInterviews = localStorage.getItem(
      "interviewflowInterviews"
    );

    if (!savedInterviews) {
      return;
    }

    try {
      const interviews = JSON.parse(savedInterviews);

      const foundInterview = interviews.find(
        (item) => String(item.id) === String(id)
      );

      if (foundInterview) {
        setInterview(foundInterview);
      }
    } catch (error) {
      console.error("Unable to load interview:", error);
    }
  }, [id, interview]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePreparation = () => {
    navigate("/preparation");
  };

  const handleQuestions = () => {
    navigate("/questions?topic=Python");
  };

  if (!interview) {
    return (
      <div className="interview-details-page">
        <header className="details-header">
          <div className="details-header-inner">
            <button
              type="button"
              className="details-back-button"
              onClick={handleBack}
            >
              ← Back
            </button>

            <div className="details-logo">
              InterviewFlow
            </div>
          </div>
        </header>

        <main className="details-main">
          <div className="details-not-found">
            <div className="not-found-icon">📅</div>

            <h1>Interview Not Found</h1>

            <p>
              The interview you are looking for could not be
              found or may have been deleted.
            </p>

            <button
              type="button"
              className="not-found-button"
              onClick={handleBack}
            >
              ← Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  const statusClass =
    interview.status?.toLowerCase().replace(/\s+/g, "-") ||
    "upcoming";

  const preparationStatus =
    interview.preparation || "Not Started";

  return (
    <div className="interview-details-page">

      {/* ================= HEADER ================= */}

      <header className="details-header">
        <div className="details-header-inner">

          <button
            type="button"
            className="details-back-button"
            onClick={handleBack}
          >
            ← Back to Dashboard
          </button>

          <div className="details-logo">
            InterviewFlow
          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="details-main">

        {/* ================= BREADCRUMB ================= */}

        <div className="details-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <span>›</span>

          <button
            type="button"
            onClick={() => navigate("/interviews")}
          >
            Interviews
          </button>

          <span>›</span>

          <strong>Interview Details</strong>
        </div>

        {/* ================= TITLE ================= */}

        <section className="details-page-title">

          <div className="details-title-left">

            <span className="details-eyebrow">
              INTERVIEW DETAILS
            </span>

            <h1>{interview.role}</h1>

            <p>
              {interview.company}
            </p>

          </div>

          <div
            className={`details-status-badge ${statusClass}`}
          >
            <span className="status-dot"></span>
            {interview.status || "Upcoming"}
          </div>

        </section>

        {/* ================= OVERVIEW CARD ================= */}

        <section className="details-card">

          <div className="details-card-header">

            <div>
              <h2>Interview Overview</h2>

              <p>
                Important information about your scheduled
                interview.
              </p>
            </div>

          </div>

          <div className="details-grid">

            {/* COMPANY */}

            <div className="details-info-box">

              <div className="details-info-icon">
                🏢
              </div>

              <div className="details-info-content">
                <span>Company</span>

                <strong>
                  {interview.company}
                </strong>
              </div>

            </div>

            {/* ROLE */}

            <div className="details-info-box">

              <div className="details-info-icon">
                💼
              </div>

              <div className="details-info-content">
                <span>Job Role</span>

                <strong>
                  {interview.role}
                </strong>
              </div>

            </div>

            {/* DATE */}

            <div className="details-info-box">

              <div className="details-info-icon">
                📅
              </div>

              <div className="details-info-content">
                <span>Interview Date</span>

                <strong>
                  {interview.date}
                </strong>
              </div>

            </div>

            {/* TIME */}

            <div className="details-info-box">

              <div className="details-info-icon">
                🕐
              </div>

              <div className="details-info-content">
                <span>Interview Time</span>

                <strong>
                  {interview.time}
                </strong>
              </div>

            </div>

            {/* PREPARATION */}

            <div className="details-info-box">

              <div className="details-info-icon">
                📚
              </div>

              <div className="details-info-content">
                <span>Preparation</span>

                <strong>
                  {preparationStatus}
                </strong>
              </div>

            </div>

            {/* STATUS */}

            <div className="details-info-box">

              <div className="details-info-icon">
                📌
              </div>

              <div className="details-info-content">
                <span>Interview Status</span>

                <strong>
                  {interview.status || "Upcoming"}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* ================= PREPARATION CARD ================= */}

        <section className="details-card">

          <div className="details-card-header">

            <div>
              <h2>Preparation</h2>

              <p>
                Continue preparing for your upcoming
                interview.
              </p>
            </div>

          </div>

          <div className="preparation-box">

            <div className="preparation-icon">
              🎯
            </div>

            <div className="preparation-content">

              <h3>
                Stay focused on your preparation
              </h3>

              <p>
                Review your Python, SQL, Django, React and
                JavaScript concepts. Practice explaining your
                projects and prepare common HR interview
                questions.
              </p>

            </div>

          </div>

          <div className="details-actions">

            <button
              type="button"
              className="primary-action"
              onClick={handlePreparation}
            >
              Go to Preparation
              <span>→</span>
            </button>

            <button
              type="button"
              className="secondary-action"
              onClick={handleQuestions}
            >
              Practice Questions
            </button>

          </div>

        </section>

        {/* ================= QUICK SUMMARY ================= */}

        <section className="details-card summary-card">

          <div className="summary-header">
            <h2>Interview Summary</h2>

            <span>
              InterviewFlow
            </span>
          </div>

          <div className="summary-content">

            <div className="summary-item">
              <span>Role</span>
              <strong>{interview.role}</strong>
            </div>

            <div className="summary-item">
              <span>Company</span>
              <strong>{interview.company}</strong>
            </div>

            <div className="summary-item">
              <span>Date</span>
              <strong>{interview.date}</strong>
            </div>

            <div className="summary-item">
              <span>Time</span>
              <strong>{interview.time}</strong>
            </div>

          </div>

        </section>

        {/* ================= BOTTOM ================= */}

        <div className="details-bottom">

          <button
            type="button"
            className="bottom-back-button"
            onClick={handleBack}
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default InterviewDetails;