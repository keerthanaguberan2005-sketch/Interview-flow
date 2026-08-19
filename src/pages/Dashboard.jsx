import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const defaultInterviews = [
  {
    id: 1,
    company: "ABC Technologies",
    role: "Python Developer",
    date: "August 25, 2026",
    time: "10:00 AM",
    status: "Upcoming",
    preparation: "Ongoing",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const [savedUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("interviewflowUser") || "{}"
      );
    } catch {
      return {};
    }
  });

  /* ================= LOAD INTERVIEWS ================= */

  const getSavedInterviews = () => {
    const savedInterviews = localStorage.getItem(
      "interviewflowInterviews"
    );

    if (savedInterviews) {
      try {
        return JSON.parse(savedInterviews);
      } catch (error) {
        console.error(
          "Unable to load saved interviews:",
          error
        );
      }
    }

    return defaultInterviews;
  };

  const [interviews, setInterviews] = useState(
    getSavedInterviews
  );

  /* ================= REFRESH DATA ================= */

  useEffect(() => {
    const savedInterviews = localStorage.getItem(
      "interviewflowInterviews"
    );

    if (savedInterviews) {
      try {
        setInterviews(JSON.parse(savedInterviews));
      } catch (error) {
        console.error(
          "Unable to refresh interviews:",
          error
        );
      }
    }
  }, []);

  /* ================= MODAL ================= */

  const [showAddInterview, setShowAddInterview] =
    useState(false);

  const [editingInterview, setEditingInterview] =
    useState(null);

  const [newInterview, setNewInterview] = useState({
    company: "",
    role: "",
    date: "",
    time: "",
  });

  /* ================= SAVE INTERVIEWS ================= */

  const saveInterviews = (updatedInterviews) => {
    setInterviews(updatedInterviews);

    localStorage.setItem(
      "interviewflowInterviews",
      JSON.stringify(updatedInterviews)
    );
  };

  /* ================= STATISTICS ================= */

  const stats = {
    upcomingInterviews: interviews.filter(
      (interview) =>
        interview.status === "Upcoming"
    ).length,

    ongoingInterviews: interviews.filter(
      (interview) =>
        interview.status === "Ongoing"
    ).length,

    ongoingPreparation: interviews.filter(
      (interview) =>
        interview.preparation === "Ongoing"
    ).length,

    completedInterviews: interviews.filter(
      (interview) =>
        interview.status === "Completed"
    ).length,
  };

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewInterview((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ================= SAVE INTERVIEW ================= */

  const handleSaveInterview = (e) => {
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
      newInterview.date + "T00:00:00"
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    /* ================= EDIT ================= */

    if (editingInterview) {
      const updatedInterviews = interviews.map(
        (interview) =>
          interview.id === editingInterview.id
            ? {
                ...interview,
                company:
                  newInterview.company.trim(),
                role:
                  newInterview.role.trim(),
                date: formattedDate,
                time: newInterview.time,
              }
            : interview
      );

      saveInterviews(updatedInterviews);
    }

    /* ================= ADD ================= */

    else {
      const interview = {
        id: Date.now(),
        company:
          newInterview.company.trim(),
        role:
          newInterview.role.trim(),
        date: formattedDate,
        time: newInterview.time,
        status: "Upcoming",
        preparation: "Not Started",
      };

      const updatedInterviews = [
        ...interviews,
        interview,
      ];

      saveInterviews(updatedInterviews);
    }

    resetForm();
  };

  /* ================= RESET FORM ================= */

  const resetForm = () => {
    setNewInterview({
      company: "",
      role: "",
      date: "",
      time: "",
    });

    setShowAddInterview(false);
    setEditingInterview(null);
  };

  /* ================= CLOSE MODAL ================= */

  const handleCloseModal = () => {
    resetForm();
  };

  /* ================= EDIT ================= */

  const handleEditInterview = (interview) => {
    setEditingInterview(interview);

    const parsedDate = new Date(
      interview.date
    );

    const year = parsedDate.getFullYear();

    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    setNewInterview({
      company: interview.company,
      role: interview.role,
      date: `${year}-${month}-${day}`,
      time: interview.time,
    });

    setShowAddInterview(true);
  };

  /* ================= DELETE ================= */

  const handleDeleteInterview = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedInterviews =
      interviews.filter(
        (interview) =>
          interview.id !== id
      );

    saveInterviews(updatedInterviews);
  };

  /* ================= STATUS ================= */

  const handleStatusChange = (
    id,
    newStatus
  ) => {
    const updatedInterviews =
      interviews.map((interview) =>
        interview.id === id
          ? {
              ...interview,
              status: newStatus,
            }
          : interview
      );

    saveInterviews(updatedInterviews);
  };

  /* ================= PREPARATION ================= */

  const handlePreparationChange = (
    id,
    newPreparation
  ) => {
    const updatedInterviews =
      interviews.map((interview) =>
        interview.id === id
          ? {
              ...interview,
              preparation: newPreparation,
            }
          : interview
      );

    saveInterviews(updatedInterviews);
  };

  /* ================= OPEN INTERVIEW DETAILS ================= */

  const handleOpenDetails = (interview) => {
    navigate(`/interview/${interview.id}`, {
      state: {
        interview: interview,
      },
    });
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "interviewflowUser"
    );

    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          InterviewFlow
        </div>

        <nav className="sidebar-menu">

          <a
            href="/dashboard"
            className="active"
          >
            Dashboard
          </a>

          <a href="/interviews">
            Interviews
          </a>

          <a href="/preparation">
            Preparation
          </a>

          <a href="/progress">
            Progress
          </a>

        </nav>

        <div className="sidebar-bottom">

          <a href="/settings">
            Settings
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="dashboard-content">

        {/* ================= HEADER ================= */}

        <header className="dashboard-header">

          <div>

            <h1>
              Good Morning,{" "}
              {savedUser?.name || "there"} 👋
            </h1>

            <p>
              Manage your interviews and
              preparation in one place.
            </p>

          </div>

          <div className="profile-area">

            <span>
              {savedUser?.name || "User"}
            </span>

            <div className="profile-avatar">

              {savedUser?.name
                ? savedUser.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>

          </div>

        </header>

        {/* ================= STATISTICS ================= */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <span>
              Upcoming Interviews
            </span>

            <strong>
              {stats.upcomingInterviews}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Ongoing Interviews
            </span>

            <strong>
              {stats.ongoingInterviews}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Ongoing Preparation
            </span>

            <strong>
              {stats.ongoingPreparation}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Completed Interviews
            </span>

            <strong>
              {stats.completedInterviews}
            </strong>

          </div>

        </section>

        {/* ================= UPCOMING INTERVIEWS ================= */}

        <section className="upcoming-section">

          <div className="section-heading">

            <div>

              <h2>
                Upcoming Interviews
              </h2>

              <p>
                Keep track of your interview
                schedule and preparation.
              </p>

            </div>

          </div>

          <div className="interview-list">

            {interviews.length === 0 ? (

              <div className="empty-interviews">

                <h3>
                  No interviews scheduled
                </h3>

                <p>
                  Add your first interview
                  to start preparing.
                </p>

              </div>

            ) : (

              interviews.map((interview) => (

                <div
                  className="interview-card"
                  key={interview.id}
                >

                  {/* ================= CARD TOP ================= */}

                  <div className="interview-card-top">

                    <div>

                      <h3>
                        {interview.role}
                      </h3>

                      <p>
                        {interview.company}
                      </p>

                    </div>

                    <div className="interview-card-actions">

                      <span
                        className={`interview-status ${
                          interview.status ===
                          "Completed"
                            ? "completed"
                            : interview.status ===
                              "Ongoing"
                            ? "ongoing"
                            : ""
                        }`}
                      >
                        {interview.status}
                      </span>

                      {/* EDIT */}

                      <button
                        type="button"
                        className="edit-interview-button"
                        onClick={() =>
                          handleEditInterview(
                            interview
                          )
                        }
                      >
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="delete-interview-button"
                        onClick={() =>
                          handleDeleteInterview(
                            interview.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="interview-details">

                    <span>
                      📅 {interview.date}
                    </span>

                    <span>
                      🕐 {interview.time}
                    </span>

                  </div>

                  {/* ================= CONTROLS ================= */}

                  <div className="interview-controls">

                    {/* STATUS */}

                    <div className="control-group">

                      <label>
                        Interview Status
                      </label>

                      <select
                        value={
                          interview.status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            interview.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Upcoming">
                          Upcoming
                        </option>

                        <option value="Ongoing">
                          Ongoing
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                      </select>

                    </div>

                    {/* PREPARATION */}

                    <div className="control-group">

                      <label>
                        Preparation
                      </label>

                      <select
                        value={
                          interview.preparation
                        }
                        onChange={(e) =>
                          handlePreparationChange(
                            interview.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Not Started">
                          Not Started
                        </option>

                        <option value="Ongoing">
                          Ongoing
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* ================= VIEW DETAILS BUTTON ================= */}

                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDetails(
                          interview
                        )
                      }
                      style={{
                        padding:
                          "11px 20px",
                        background:
                          "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "600",
                        fontSize:
                          "14px",
                      }}
                    >
                      View Interview Details →
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* ================= ADD INTERVIEW ================= */}

          <div className="add-interview-area">

            <button
              type="button"
              className="add-interview-button"
              onClick={() => {

                setEditingInterview(null);

                setNewInterview({
                  company: "",
                  role: "",
                  date: "",
                  time: "",
                });

                setShowAddInterview(true);

              }}
            >
              + Add Interview
            </button>

          </div>

        </section>

      </main>

      {/* ================= MODAL ================= */}

      {showAddInterview && (

        <div
          className="modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="add-interview-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingInterview
                    ? "Edit Interview"
                    : "Add Interview"}
                </h2>

                <p>
                  {editingInterview
                    ? "Update your interview details."
                    : "Add your upcoming interview details."}
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={handleCloseModal}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSaveInterview}
            >

              {/* COMPANY */}

              <div className="form-group">

                <label htmlFor="company">
                  Company Name
                </label>

                <input
                  id="company"
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={
                    newInterview.company
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

              {/* ROLE */}

              <div className="form-group">

                <label htmlFor="role">
                  Job Role
                </label>

                <input
                  id="role"
                  type="text"
                  name="role"
                  placeholder="Example: Python Developer"
                  value={
                    newInterview.role
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

              {/* DATE */}

              <div className="form-group">

                <label htmlFor="date">
                  Interview Date
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  value={
                    newInterview.date
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

              {/* TIME */}

              <div className="form-group">

                <label htmlFor="time">
                  Interview Time
                </label>

                <input
                  id="time"
                  type="time"
                  name="time"
                  value={
                    newInterview.time
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>

              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={
                    handleCloseModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-interview-button"
                >
                  {editingInterview
                    ? "Update Interview"
                    : "Add Interview"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;