import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Interviews.css";

function Interviews() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);

  /* ================= LOAD INTERVIEWS ================= */

  useEffect(() => {
    const savedInterviews = localStorage.getItem(
      "interviewflowInterviews"
    );

    if (savedInterviews) {
      try {
        setInterviews(JSON.parse(savedInterviews));
      } catch (error) {
        console.error(
          "Unable to load interviews:",
          error
        );
      }
    }
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedInterviews = interviews.filter(
      (interview) => interview.id !== id
    );

    setInterviews(updatedInterviews);

    localStorage.setItem(
      "interviewflowInterviews",
      JSON.stringify(updatedInterviews)
    );
  };

  /* ================= OPEN DETAILS ================= */

  const handleOpenDetails = (interview) => {
    navigate(`/interview/${interview.id}`, {
      state: {
        interview,
      },
    });
  };

  /* ================= BACK ================= */

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="interviews-page">

      {/* ================= HEADER ================= */}

      <header className="interviews-header">

        <button
          type="button"
          className="interviews-back-button"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>

        <div className="interviews-brand">
          InterviewFlow
        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="interviews-content">

        {/* ================= TITLE ================= */}

        <section className="interviews-title">

          <div>
            <span className="interviews-label">
              INTERVIEW MANAGEMENT
            </span>

            <h1>My Interviews</h1>

            <p>
              View and manage all your scheduled
              interviews in one place.
            </p>
          </div>

          <div className="interviews-count">
            <span>Total Interviews</span>

            <strong>
              {interviews.length}
            </strong>
          </div>

        </section>

        {/* ================= INTERVIEW LIST ================= */}

        <section className="interviews-section">

          <div className="interviews-section-heading">

            <div>
              <h2>Interview Schedule</h2>

              <p>
                Click on an interview to view
                complete details and preparation
                notes.
              </p>
            </div>

          </div>

          {interviews.length === 0 ? (

            /* ================= EMPTY ================= */

            <div className="interviews-empty">

              <div className="empty-icon">
                📅
              </div>

              <h2>
                No Interviews Scheduled
              </h2>

              <p>
                You don't have any interviews yet.
                Add an interview from your dashboard
                to start preparing.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Go to Dashboard
              </button>

            </div>

          ) : (

            /* ================= LIST ================= */

            <div className="interviews-list">

              {interviews.map((interview) => (

                <article
                  className="interview-page-card"
                  key={interview.id}
                >

                  {/* ================= CARD HEADER ================= */}

                  <div className="interview-page-card-header">

                    <div>

                      <span className="interview-role-label">
                        JOB ROLE
                      </span>

                      <h3>
                        {interview.role}
                      </h3>

                      <p>
                        {interview.company}
                      </p>

                    </div>

                    <span
                      className={`interview-page-status ${
                        interview.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {interview.status}
                    </span>

                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="interview-page-details">

                    <div className="detail-item">

                      <span>
                        📅
                      </span>

                      <div>
                        <small>
                          Interview Date
                        </small>

                        <strong>
                          {interview.date}
                        </strong>
                      </div>

                    </div>

                    <div className="detail-item">

                      <span>
                        🕐
                      </span>

                      <div>
                        <small>
                          Interview Time
                        </small>

                        <strong>
                          {interview.time}
                        </strong>
                      </div>

                    </div>

                    <div className="detail-item">

                      <span>
                        📚
                      </span>

                      <div>
                        <small>
                          Preparation
                        </small>

                        <strong>
                          {interview.preparation}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* ================= ACTIONS ================= */}

                  <div className="interview-page-actions">

                    <button
                      type="button"
                      className="view-interview-button"
                      onClick={() =>
                        handleOpenDetails(
                          interview
                        )
                      }
                    >
                      View Details →
                    </button>

                    <button
                      type="button"
                      className="delete-interview-page-button"
                      onClick={() =>
                        handleDelete(
                          interview.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Interviews;