import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Preparation.css";


const defaultTopics = [
  {
    id: 1,
    name: "Python",
    description:
      "Python basics, OOP, functions, data structures and problem solving.",
    status: "Ongoing",
    progress: 60,
  },
  {
    id: 2,
    name: "SQL",
    description:
      "SQL queries, joins, subqueries, aggregate functions and database concepts.",
    status: "Ongoing",
    progress: 50,
  },
  {
    id: 3,
    name: "Django",
    description:
      "Django fundamentals, REST API, models, views and authentication.",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 4,
    name: "React",
    description:
      "Components, props, state, hooks, routing and API integration.",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 5,
    name: "JavaScript",
    description:
      "ES6, arrays, objects, functions, promises and DOM concepts.",
    status: "Completed",
    progress: 100,
  },
  {
    id: 6,
    name: "HR Interview",
    description:
      "Self introduction, strengths, weaknesses, project explanation and HR questions.",
    status: "Ongoing",
    progress: 40,
  },
];

/* ================= LOAD SAVED TOPICS ================= */

const getSavedTopics = () => {
  const savedTopics = localStorage.getItem(
    "interviewflowPreparation"
  );

  if (savedTopics) {
    try {
      return JSON.parse(savedTopics);
    } catch (error) {
      console.error(
        "Unable to load preparation data:",
        error
      );
    }
  }

  return defaultTopics;
};

function Preparation() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState(
    getSavedTopics
  );

  /* ================= SAVE TOPICS ================= */

  const saveTopics = (updatedTopics) => {
    setTopics(updatedTopics);

    localStorage.setItem(
      "interviewflowPreparation",
      JSON.stringify(updatedTopics)
    );
  };

  /* ================= STATUS CHANGE ================= */

  const handleStatusChange = (
    id,
    newStatus
  ) => {
    const updatedTopics = topics.map(
      (topic) => {
        if (topic.id !== id) {
          return topic;
        }

        let newProgress = topic.progress;

        if (
          newStatus === "Not Started"
        ) {
          newProgress = 0;
        }

        if (
          newStatus === "Ongoing"
        ) {
          if (topic.progress === 0) {
            newProgress = 25;
          }
        }

        if (
          newStatus === "Completed"
        ) {
          newProgress = 100;
        }

        return {
          ...topic,
          status: newStatus,
          progress: newProgress,
        };
      }
    );

    saveTopics(updatedTopics);
  };

  /* ================= STATISTICS ================= */

  const completedTopics =
    topics.filter(
      (topic) =>
        topic.status === "Completed"
    ).length;

  const ongoingTopics =
    topics.filter(
      (topic) =>
        topic.status === "Ongoing"
    ).length;

  const totalProgress =
    topics.length > 0
      ? Math.round(
          topics.reduce(
            (total, topic) =>
              total + topic.progress,
            0
          ) / topics.length
        )
      : 0;

  return (
    <div className="preparation-page">

      {/* ================= HEADER ================= */}

      <header className="preparation-header">

        <div>

          <span className="preparation-label">
            INTERVIEWFLOW
          </span>

          <h1>
            Preparation
          </h1>

          <p>
            Track your interview preparation
            and improve your skills step by step.
          </p>

        </div>

        <div className="preparation-progress">

          <span>
            Overall Progress
          </span>

          <strong>
            {totalProgress}%
          </strong>

        </div>

      </header>

      {/* ================= STATISTICS ================= */}

      <section className="preparation-stats">

        <div className="preparation-stat-card">

          <span>
            Total Topics
          </span>

          <strong>
            {topics.length}
          </strong>

        </div>

        <div className="preparation-stat-card">

          <span>
            Ongoing
          </span>

          <strong>
            {ongoingTopics}
          </strong>

        </div>

        <div className="preparation-stat-card">

          <span>
            Completed
          </span>

          <strong>
            {completedTopics}
          </strong>

        </div>

        <div className="preparation-stat-card">

          <span>
            Overall Progress
          </span>

          <strong>
            {totalProgress}%
          </strong>

        </div>

      </section>

      {/* ================= TOPICS ================= */}

      <section className="topics-section">

        <div className="topics-heading">

          <div>

            <h2>
              Preparation Topics
            </h2>

            <p>
              Select a topic and track your progress.
            </p>

          </div>

        </div>

        <div className="topics-grid">

          {topics.map((topic) => (

            <div
              className="topic-card"
              key={topic.id}
            >

              {/* ================= TOPIC HEADER ================= */}

              <div className="topic-card-header">

                <div className="topic-icon">

                  {topic.name ===
                    "Python" && "🐍"}

                  {topic.name ===
                    "SQL" && "🗄️"}

                  {topic.name ===
                    "Django" && "🌐"}

                  {topic.name ===
                    "React" && "⚛️"}

                  {topic.name ===
                    "JavaScript" && "📜"}

                  {topic.name ===
                    "HR Interview" && "💼"}

                </div>

                <span
                  className={`topic-status ${
                    topic.status
                      .toLowerCase()
                      .replace(" ", "-")
                  }`}
                >
                  {topic.status}
                </span>

              </div>

              {/* ================= TOPIC CONTENT ================= */}

              <h3>
                {topic.name}
              </h3>

              <p>
                {topic.description}
              </p>

              {/* ================= PROGRESS ================= */}

              <div className="topic-progress-header">

                <span>
                  Progress
                </span>

                <strong>
                  {topic.progress}%
                </strong>

              </div>

              <div className="topic-progress-bar">

                <div
                  className="topic-progress-fill"
                  style={{
                    width: `${topic.progress}%`,
                  }}
                ></div>

              </div>

              {/* ================= STATUS CONTROL ================= */}

              <div className="topic-status-control">

                <label
                  htmlFor={`status-${topic.id}`}
                >
                  Update Status
                </label>

                <select
                  id={`status-${topic.id}`}
                  value={topic.status}
                  onChange={(e) =>
                    handleStatusChange(
                      topic.id,
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

                {/* ================= VIEW QUESTIONS ================= */}

                <button
                  type="button"
                  className="view-questions-button"
                  onClick={() =>
                    navigate(
                      `/questions?topic=${encodeURIComponent(
                        topic.name
                      )}`
                    )
                  }
                >
                  View Questions →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Preparation;