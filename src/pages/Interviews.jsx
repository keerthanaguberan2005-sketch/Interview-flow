import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Interviews.css";

function Interviews() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newInterview, setNewInterview] = useState({
    company: "",
    role: "",
    date: "",
    time: "",
  });

  /* ================= LOAD INTERVIEWS ================= */

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = () => {
    try {
      const savedInterviews = localStorage.getItem(
        "interviewflowInterviews"
      );

      if (savedInterviews) {
        setInterviews(JSON.parse(savedInterviews));
      } else {
        setInterviews([]);
      }
    } catch (error) {
      console.error("Unable to load interviews:", error);
      setInterviews([]);
    }
  };

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewInterview((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ================= ADD INTERVIEW ================= */

  const handleAddInterview = (e) => {
    e.preventDefault();

    if (
      !newInterview.company.trim() ||
      !newInterview.role.trim() ||
      !newInterview.date ||
      !newInterview.time
    ) {
      alert("Please fill all interview details.");
      return;
    }

    const formattedDate = new Date(
      `${newInterview.date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const interview = {
      id: Date.now(),
      company: newInterview.company.trim(),
      role: newInterview.role.trim(),
      date: formattedDate,
      time: newInterview.time,
      status: "Upcoming",
      preparation: "Not Started",
    };

    const updatedInterviews = [
      ...interviews,
      interview,
    ];

    setInterviews(updatedInterviews);

    localStorage.setItem(
      "interviewflowInterviews",
      JSON.stringify(updatedInterviews)
    );

    setNewInterview({
      company: "",
      role: "",
      date: "",
      time: "",
    });

    setShowAddForm(false);
  };

  /* ================= OPEN DETAILS ================= */

  const handleOpenDetails = (interview) => {
    navigate(`/interview/${interview.id}`, {
      state: {
        interview,
      },
    });
  };

  /* ================= STATUS CLASS ================= */

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "completed";
    }

    if (status === "Ongoing") {
      return "ongoing";
    }

    return "upcoming";
  };

  /* ================= RESET FORM ================= */

  const resetForm = () => {
    setNewInterview({
      company: "",
      role: "",
      date: "",
      time: "",
    });

    setShowAddForm(false);
  };

  return (
    <div className="interviews-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="interviews-page-header">

        <div className="interviews-header-left">

          <button
            type="button"
            className="interviews-back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

          <span className="interviews-label">
            INTERVIEW MANAGEMENT
          </span>

          <h1>
            My Interviews
          </h1>

          <p>
            View and manage all your scheduled
            interviews in one place.
          </p>

        </div>

        <div className="total-interviews-card">

          <span>
            Total Interviews
          </span>

          <strong>
            {interviews.length}
          </strong>

        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="interviews-main">

        {/* ================= SECTION HEADER ================= */}

        <section className="interviews-section">

          <div className="interviews-section-heading">

            <div>

              <h2>
                Interview Schedule
              </h2>

              <p>
                Click on an interview to view complete
                details and preparation notes.
              </p>

            </div>

            <button
              type="button"
              className="add-interview-page-button"
              onClick={() =>
                setShowAddForm(!showAddForm)
              }
            >
              {showAddForm
                ? "× Close Form"
                : "+ Add Interview"}
            </button>

          </div>

          {/* =================================================
              ADD FORM
              ================================================= */}

          {showAddForm && (

            <div className="inline-add-interview">

              <div className="inline-add-header">

                <span>
                  NEW INTERVIEW
                </span>

                <h2>
                  Add Interview
                </h2>

                <p>
                  Enter your upcoming interview details.
                </p>

              </div>

              <form
                className="inline-interview-form"
                onSubmit={handleAddInterview}
              >

                {/* COMPANY */}

                <div className="inline-form-group">

                  <label htmlFor="company">
                    Company Name
                  </label>

                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Example: Infosys"
                    value={newInterview.company}
                    onChange={handleInputChange}
                  />

                </div>

                {/* ROLE */}

                <div className="inline-form-group">

                  <label htmlFor="role">
                    Job Role
                  </label>

                  <input
                    id="role"
                    type="text"
                    name="role"
                    placeholder="Example: Python Developer"
                    value={newInterview.role}
                    onChange={handleInputChange}
                  />

                </div>

                {/* DATE + TIME */}

                <div className="inline-form-row">

                  <div className="inline-form-group">

                    <label htmlFor="date">
                      Interview Date
                    </label>

                    <input
                      id="date"
                      type="date"
                      name="date"
                      value={newInterview.date}
                      onChange={handleInputChange}
                    />

                  </div>

                  <div className="inline-form-group">

                    <label htmlFor="time">
                      Interview Time
                    </label>

                    <input
                      id="time"
                      type="time"
                      name="time"
                      value={newInterview.time}
                      onChange={handleInputChange}
                    />

                  </div>

                </div>

                {/* FORM ACTIONS */}

                <div className="inline-form-actions">

                  <button
                    type="button"
                    className="inline-cancel-button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-save-button"
                  >
                    Add Interview
                  </button>

                </div>

              </form>

            </div>
          )}

          {/* =================================================
              EMPTY STATE
              ================================================= */}

          {interviews.length === 0 ? (

            <div className="interviews-empty">

              <div className="interviews-empty-icon">
                📅
              </div>

              <h3>
                No Interviews Scheduled
              </h3>

              <p>
                You don't have any interviews scheduled
                yet. Add your first interview above.
              </p>

              {!showAddForm && (

                <button
                  type="button"
                  onClick={() =>
                    setShowAddForm(true)
                  }
                >
                  Add Your First Interview
                </button>

              )}

            </div>

          ) : (

            /* =================================================
               INTERVIEW LIST
               ================================================= */

            <div className="interviews-list">

              {interviews.map((interview) => (

                <div
                  className="interview-list-card"
                  key={interview.id}
                  onClick={() =>
                    handleOpenDetails(interview)
                  }
                >

                  {/* CARD HEADER */}

                  <div className="interview-list-header">

                    <div>

                      <span className="job-role-label">
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
                      className={`interview-list-status ${getStatusClass(
                        interview.status
                      )}`}
                    >
                      {interview.status}
                    </span>

                  </div>

                  <div className="interview-list-divider" />

                  {/* DETAILS */}

                  <div className="interview-list-details">

                    <div className="interview-detail-item">

                      <div className="interview-detail-icon">
                        📅
                      </div>

                      <div>

                        <span>
                          Interview Date
                        </span>

                        <strong>
                          {interview.date}
                        </strong>

                      </div>

                    </div>

                    <div className="interview-detail-item">

                      <div className="interview-detail-icon">
                        🕐
                      </div>

                      <div>

                        <span>
                          Interview Time
                        </span>

                        <strong>
                          {interview.time}
                        </strong>

                      </div>

                    </div>

                    <div className="interview-detail-item">

                      <div className="interview-detail-icon">
                        📚
                      </div>

                      <div>

                        <span>
                          Preparation
                        </span>

                        <strong>
                          {interview.preparation ||
                            "Not Started"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* VIEW DETAILS */}

                  <div className="interview-view-details">

                    <span>
                      View Interview Details
                    </span>

                    <span>
                      →
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* =================================================
            BOTTOM
            ================================================= */}

        <div className="interviews-bottom-action">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default Interviews;