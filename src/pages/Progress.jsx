import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Progress.css";

function Progress() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [topics, setTopics] = useState([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    /* Interviews */

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
      console.error(
        "Unable to load interviews:",
        error
      );

      setInterviews([]);
    }

    /* Preparation Topics */

    try {
      const savedTopics = localStorage.getItem(
        "interviewflowPreparation"
      );

      if (savedTopics) {
        setTopics(JSON.parse(savedTopics));
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error(
        "Unable to load preparation topics:",
        error
      );

      setTopics([]);
    }
  };

  /* ================= INTERVIEW STATISTICS ================= */

  const totalInterviews = interviews.length;

  const completedInterviews = interviews.filter(
    (interview) =>
      interview.status === "Completed"
  ).length;

  const ongoingInterviews = interviews.filter(
    (interview) =>
      interview.status === "Ongoing"
  ).length;

  const upcomingInterviews = interviews.filter(
    (interview) =>
      interview.status === "Upcoming"
  ).length;

  const interviewProgress =
    totalInterviews > 0
      ? Math.round(
          (completedInterviews /
            totalInterviews) *
            100
        )
      : 0;

  /* ================= PREPARATION STATISTICS ================= */

  const totalTopics = topics.length;

  const completedTopics = topics.filter(
    (topic) =>
      topic.status === "Completed"
  ).length;

  const ongoingTopics = topics.filter(
    (topic) =>
      topic.status === "Ongoing"
  ).length;

  const preparationProgress =
    totalTopics > 0
      ? Math.round(
          topics.reduce(
            (total, topic) =>
              total +
              Number(topic.progress || 0),
            0
          ) / totalTopics
        )
      : 0;

  /* ================= OVERALL PROGRESS ================= */

  const overallProgress =
    totalInterviews === 0 &&
    totalTopics === 0
      ? 0
      : Math.round(
          (interviewProgress +
            preparationProgress) /
            2
        );

  /* ================= PROGRESS MESSAGE ================= */

  const getProgressMessage = () => {
    if (overallProgress === 0) {
      return "Start your preparation journey today.";
    }

    if (overallProgress < 30) {
      return "Good start! Keep building your preparation.";
    }

    if (overallProgress < 60) {
      return "You're making progress. Keep going!";
    }

    if (overallProgress < 90) {
      return "Great work! You're getting interview ready.";
    }

    return "Excellent! You are well prepared.";
  };

  /* ================= REFRESH ================= */

  const handleRefresh = () => {
    loadProgressData();
  };

  return (
    <div className="progress-page">

      {/* ================= HEADER ================= */}

      <header className="progress-header">

        <div>

          <span className="progress-label">
            INTERVIEWFLOW
          </span>

          <h1>
            Progress
          </h1>

          <p>
            Track your interview preparation
            and overall progress.
          </p>

        </div>

        <button
          type="button"
          className="progress-refresh-button"
          onClick={handleRefresh}
        >
          ↻ Refresh
        </button>

      </header>

      {/* ================= OVERALL PROGRESS ================= */}

      <section className="overall-progress-card">

        <div className="overall-progress-content">

          <div>

            <span className="overall-label">
              OVERALL PROGRESS
            </span>

            <h2>
              {overallProgress}%
            </h2>

            <p>
              {getProgressMessage()}
            </p>

          </div>

          <div className="progress-circle">

            <div className="progress-circle-inner">
              <strong>
                {overallProgress}%
              </strong>

              <span>
                Complete
              </span>
            </div>

          </div>

        </div>

        <div className="overall-progress-bar">

          <div
            className="overall-progress-fill"
            style={{
              width: `${overallProgress}%`,
            }}
          ></div>

        </div>

      </section>

      {/* ================= SUMMARY ================= */}

      <section className="progress-summary">

        <div className="progress-stat-card">

          <span>
            Total Interviews
          </span>

          <strong>
            {totalInterviews}
          </strong>

        </div>

        <div className="progress-stat-card">

          <span>
            Completed Interviews
          </span>

          <strong>
            {completedInterviews}
          </strong>

        </div>

        <div className="progress-stat-card">

          <span>
            Preparation Topics
          </span>

          <strong>
            {totalTopics}
          </strong>

        </div>

        <div className="progress-stat-card">

          <span>
            Completed Topics
          </span>

          <strong>
            {completedTopics}
          </strong>

        </div>

      </section>

      {/* ================= INTERVIEW PROGRESS ================= */}

      <section className="progress-section">

        <div className="progress-section-heading">

          <div>

            <span className="section-label">
              INTERVIEW TRACKING
            </span>

            <h2>
              Interview Progress
            </h2>

            <p>
              Track the status of your scheduled
              interviews.
            </p>

          </div>

          <strong className="section-percentage">
            {interviewProgress}%
          </strong>

        </div>

        <div className="section-progress-bar">

          <div
            className="section-progress-fill"
            style={{
              width: `${interviewProgress}%`,
            }}
          ></div>

        </div>

        <div className="interview-progress-stats">

          <div>
            <span>Upcoming</span>
            <strong>
              {upcomingInterviews}
            </strong>
          </div>

          <div>
            <span>Ongoing</span>
            <strong>
              {ongoingInterviews}
            </strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {completedInterviews}
            </strong>
          </div>

        </div>

      </section>

      {/* ================= PREPARATION PROGRESS ================= */}

      <section className="progress-section">

        <div className="progress-section-heading">

          <div>

            <span className="section-label">
              PREPARATION TRACKING
            </span>

            <h2>
              Preparation Progress
            </h2>

            <p>
              Track your learning progress across
              interview topics.
            </p>

          </div>

          <strong className="section-percentage">
            {preparationProgress}%
          </strong>

        </div>

        <div className="section-progress-bar">

          <div
            className="section-progress-fill"
            style={{
              width: `${preparationProgress}%`,
            }}
          ></div>

        </div>

        <div className="interview-progress-stats">

          <div>
            <span>
              Total Topics
            </span>

            <strong>
              {totalTopics}
            </strong>
          </div>

          <div>
            <span>
              Ongoing
            </span>

            <strong>
              {ongoingTopics}
            </strong>
          </div>

          <div>
            <span>
              Completed
            </span>

            <strong>
              {completedTopics}
            </strong>
          </div>

        </div>

      </section>

      {/* ================= TOPIC BREAKDOWN ================= */}

      <section className="topic-progress-section">

        <div className="progress-section-heading">

          <div>

            <span className="section-label">
              TOPIC BREAKDOWN
            </span>

            <h2>
              Preparation Topics
            </h2>

            <p>
              See your progress for each topic.
            </p>

          </div>

        </div>

        {topics.length === 0 ? (

          <div className="progress-empty">

            <div className="progress-empty-icon">
              📚
            </div>

            <h3>
              No Preparation Data
            </h3>

            <p>
              Start preparing topics to see your
              progress here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/preparation")
              }
            >
              Go to Preparation
            </button>

          </div>

        ) : (

          <div className="topic-progress-list">

            {topics.map((topic) => (

              <div
                className="topic-progress-item"
                key={topic.id}
              >

                <div className="topic-progress-info">

                  <div>

                    <h3>
                      {topic.name}
                    </h3>

                    <span>
                      {topic.status}
                    </span>

                  </div>

                  <strong>
                    {topic.progress || 0}%
                  </strong>

                </div>

                <div className="topic-progress-bar">

                  <div
                    className="topic-progress-fill"
                    style={{
                      width: `${
                        topic.progress || 0
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================= ACTIONS ================= */}

      <section className="progress-actions">

        <button
          type="button"
          onClick={() =>
            navigate("/preparation")
          }
        >
          📚 Continue Preparation
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/interviews")
          }
        >
          📅 View Interviews
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </section>

    </div>
  );
}

export default Progress;