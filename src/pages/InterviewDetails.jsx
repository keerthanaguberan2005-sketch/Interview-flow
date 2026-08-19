import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    navigate("/interviews");
  };

  if (!interview) {
    return (
      <div className="interview-details-page">
        <header className="interview-details-header">
          <button
            type="button"
            className="interview-details-back"
            onClick={handleBack}
          >
            ← Back to Interviews
          </button>

          <div className="interview-details-brand">
            InterviewFlow
          </div>
        </header>

        <main className="interview-details-content">
          <div className="interview-not-found">
            <div className="not-found-icon">📅</div>

            <h1>Interview Not Found</h1>

            <p>
              The interview you are looking for could not
              be found.
            </p>

            <button
              type="button"
              onClick={handleBack}
            >
              Back to Interviews
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="interview-details-page">
      {/* ================= HEADER ================= */}

      <header className="interview-details-header">
        <button
          type="button"
          className="interview-details-back"
          onClick={handleBack}
        >
          ← Back to Interviews
        </button>

        <div className="interview-details-brand">
          InterviewFlow
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="interview-details-content">
        {/* ================= TITLE ================= */}

        <section className="interview-details-title">
          <div>
            <span className="interview-details-label">
              INTERVIEW DETAILS
            </span>

            <h1>{interview.role}</h1>

            <p>{interview.company}</p>
          </div>

          <span
            className={`details-status ${
              interview.status
                ?.toLowerCase()
                .replace(/\s+/g, "-")
            }`}
          >
            {interview.status || "Upcoming"}
          </span>
        </section>

        {/* ================= OVERVIEW ================= */}

        <section className="details-card">
          <div className="details-card-heading">
            <div>
              <h2>Interview Overview</h2>

              <p>
                Important information about your
                scheduled interview.
              </p>
            </div>
          </div>

          <div className="details-grid">
            <div className="details-item">
              <div className="details-icon">🏢</div>

              <div>
                <span>Company</span>
                <strong>{interview.company}</strong>
              </div>
            </div>

            <div className="details-item">
              <div className="details-icon">💼</div>

              <div>
                <span>Job Role</span>
                <strong>{interview.role}</strong>
              </div>
            </div>

            <div className="details-item">
              <div className="details-icon">📅</div>

              <div>
                <span>Interview Date</span>
                <strong>{interview.date}</strong>
              </div>
            </div>

            <div className="details-item">
              <div className="details-icon">🕐</div>

              <div>
                <span>Interview Time</span>
                <strong>{interview.time}</strong>
              </div>
            </div>

            <div className="details-item">
              <div className="details-icon">📚</div>

              <div>
                <span>Preparation</span>
                <strong>
                  {interview.preparation ||
                    "Not Started"}
                </strong>
              </div>
            </div>

            <div className="details-item">
              <div className="details-icon">📌</div>

              <div>
                <span>Status</span>
                <strong>
                  {interview.status ||
                    "Upcoming"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PREPARATION ================= */}

        <section className="details-card">
          <div className="details-card-heading">
            <div>
              <h2>Preparation</h2>

              <p>
                Continue preparing for this
                interview.
              </p>
            </div>
          </div>

          <div className="preparation-message">
            <div className="preparation-message-icon">
              🎯
            </div>

            <div>
              <h3>
                Stay focused on your preparation
              </h3>

              <p>
                Review your technical questions,
                project explanation and HR
                interview topics before the
                interview.
              </p>
            </div>
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="primary-details-button"
              onClick={() =>
                navigate("/preparation")
              }
            >
              Go to Preparation →
            </button>

            <button
              type="button"
              className="secondary-details-button"
              onClick={() =>
                navigate("/questions?topic=Python")
              }
            >
              Practice Questions
            </button>
          </div>
        </section>

        {/* ================= BOTTOM ACTION ================= */}

        <div className="details-bottom">
          <button
            type="button"
            onClick={handleBack}
            className="back-list-button"
          >
            ← Back to Interview List
          </button>
        </div>
      </main>
    </div>
  );
}

export default InterviewDetails;