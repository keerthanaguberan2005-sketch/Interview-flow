import { useState } from "react";
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

  /* ================= INTERVIEWS ================= */

  const [interviews, setInterviews] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "interviewflowInterviews"
      );

      if (saved) {
        return JSON.parse(saved);
      }

      return defaultInterviews;
    } catch {
      return defaultInterviews;
    }
  });

  /* ================= MODAL ================= */

  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);

  const [newInterview, setNewInterview] = useState({
    company: "",
    role: "",
    date: "",
    time: "",
  });

  /* ================= SAVE ================= */

  const saveInterviews = (updatedInterviews) => {
    setInterviews(updatedInterviews);

    localStorage.setItem(
      "interviewflowInterviews",
      JSON.stringify(updatedInterviews)
    );
  };

  /* ================= STATISTICS ================= */

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Upcoming"
  ).length;

  const ongoingInterviews = interviews.filter(
    (interview) => interview.status === "Ongoing"
  ).length;

  const ongoingPreparation = interviews.filter(
    (interview) => interview.preparation === "Ongoing"
  ).length;

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  ).length;

  /* ================= INPUT ================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewInterview((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ================= OPEN ADD ================= */

  const handleAddInterview = () => {
    setEditingInterview(null);

    setNewInterview({
      company: "",
      role: "",
      date: "",
      time: "",
    });

    setShowModal(true);
  };

  /* ================= SAVE / UPDATE ================= */

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
      `${newInterview.date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    /* EDIT */

    if (editingInterview) {
      const updatedInterviews = interviews.map(
        (interview) =>
          interview.id === editingInterview.id
            ? {
                ...interview,
                company: newInterview.company.trim(),
                role: newInterview.role.trim(),
                date: formattedDate,
                time: newInterview.time,
              }
            : interview
      );

      saveInterviews(updatedInterviews);
    }

    /* ADD */

    else {
      const interview = {
        id: Date.now(),
        company: newInterview.company.trim(),
        role: newInterview.role.trim(),
        date: formattedDate,
        time: newInterview.time,
        status: "Upcoming",
        preparation: "Not Started",
      };

      saveInterviews([
        ...interviews,
        interview,
      ]);
    }

    closeModal();
  };

  /* ================= CLOSE MODAL ================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingInterview(null);

    setNewInterview({
      company: "",
      role: "",
      date: "",
      time: "",
    });
  };

  /* ================= EDIT ================= */

  const handleEditInterview = (interview) => {
    const parsedDate = new Date(interview.date);

    const year = parsedDate.getFullYear();

    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    setEditingInterview(interview);

    setNewInterview({
      company: interview.company,
      role: interview.role,
      date: `${year}-${month}-${day}`,
      time: interview.time,
    });

    setShowModal(true);
  };

  /* ================= DELETE ================= */

  const handleDeleteInterview = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedInterviews = interviews.filter(
      (interview) => interview.id !== id
    );

    saveInterviews(updatedInterviews);
  };

  /* ================= STATUS ================= */

  const handleStatusChange = (id, newStatus) => {
    const updatedInterviews = interviews.map(
      (interview) =>
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
    const updatedInterviews = interviews.map(
      (interview) =>
        interview.id === id
          ? {
              ...interview,
              preparation: newPreparation,
            }
          : interview
    );

    saveInterviews(updatedInterviews);
  };

  /* ================= DETAILS ================= */

  const handleOpenDetails = (interview) => {
    navigate(`/interview/${interview.id}`, {
      state: {
        interview,
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

  /* ================= USER NAME ================= */

  const userName =
    savedUser?.name || "there";

  const avatarLetter =
    savedUser?.name
      ? savedUser.name.charAt(0).toUpperCase()
      : "U";

  /* ================= JSX ================= */

  return (
    <div className="dashboard">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

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
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="dashboard-content">

        {/* ================= HEADER ================= */}

        <header className="dashboard-header">

          <div>

            <h1>
              Good Morning, {userName} 👋
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
              {avatarLetter}
            </div>

          </div>

        </header>

        {/* =====================================================
            STATISTICS
            ===================================================== */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <span>
              Upcoming Interviews
            </span>

            <strong>
              {upcomingInterviews}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Ongoing Interviews
            </span>

            <strong>
              {ongoingInterviews}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Ongoing Preparation
            </span>

            <strong>
              {ongoingPreparation}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Completed Interviews
            </span>

            <strong>
              {completedInterviews}
            </strong>

          </div>

        </section>

        {/* =====================================================
            UPCOMING INTERVIEWS
            ===================================================== */}

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

          {/* ================= INTERVIEW LIST ================= */}

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

                  {/* ================= DATE / TIME ================= */}

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

                  {/* ================= VIEW DETAILS ================= */}

                  <div className="view-details-area">

                    <button
                      type="button"
                      className="view-details-button"
                      onClick={() =>
                        handleOpenDetails(
                          interview
                        )
                      }
                    >
                      View Interview Details →
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* ================= ADD BUTTON ================= */}

          <div className="add-interview-area">

            <button
              type="button"
              className="add-interview-button"
              onClick={handleAddInterview}
            >
              + Add Interview
            </button>

          </div>

        </section>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={closeModal}
        >

          <div
            className="add-interview-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ================= MODAL HEADER ================= */}

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
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            {/* ================= FORM ================= */}

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

              {/* ACTION BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
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