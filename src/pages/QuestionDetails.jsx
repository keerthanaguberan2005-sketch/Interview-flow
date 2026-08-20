import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionDetails.css";

const questionData = {
  Python: [
    {
      question: "What is Python?",
      answer:
        "Python is a high-level, interpreted, general-purpose programming language known for its simple and readable syntax.",
    },
    {
      question: "What are Python data types?",
      answer:
        "Common Python data types include int, float, str, bool, list, tuple, set and dictionary.",
    },
    {
      question: "What is the difference between list and tuple?",
      answer:
        "A list is mutable, while a tuple is immutable.",
    },
    {
      question: "What is OOP in Python?",
      answer:
        "OOP stands for Object-Oriented Programming. It organizes code using classes and objects.",
    },
    {
      question: "Explain inheritance in Python.",
      answer:
        "Inheritance allows one class to acquire properties and methods from another class.",
    },
  ],

  SQL: [
    {
      question: "What is SQL?",
      answer:
        "SQL stands for Structured Query Language and is used to manage data in relational databases.",
    },
    {
      question: "What is a primary key?",
      answer:
        "A primary key uniquely identifies each record in a table.",
    },
    {
      question: "What is a foreign key?",
      answer:
        "A foreign key creates a relationship between two tables.",
    },
    {
      question: "What are SQL joins?",
      answer:
        "SQL joins combine data from two or more tables using related columns.",
    },
    {
      question: "What is GROUP BY?",
      answer:
        "GROUP BY groups rows so aggregate functions such as COUNT, SUM and AVG can be used.",
    },
  ],

  Django: [
    {
      question: "What is Django?",
      answer:
        "Django is a high-level Python web framework used to build secure and scalable web applications.",
    },
    {
      question: "What is MVT architecture?",
      answer:
        "MVT stands for Model, View and Template.",
    },
    {
      question: "What is a Django model?",
      answer:
        "A Django model is a Python class that represents database data.",
    },
    {
      question: "What is Django ORM?",
      answer:
        "Django ORM allows developers to interact with databases using Python objects and methods.",
    },
    {
      question: "What is Django REST Framework?",
      answer:
        "Django REST Framework is a toolkit used to build Web APIs using Django.",
    },
  ],

  React: [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used to build interactive user interfaces using reusable components.",
    },
    {
      question: "What is a component in React?",
      answer:
        "A component is a reusable piece of UI containing its own structure and logic.",
    },
    {
      question: "What are props?",
      answer:
        "Props are read-only inputs passed from a parent component to a child component.",
    },
    {
      question: "What is state in React?",
      answer:
        "State is data managed inside a component that can change over time.",
    },
    {
      question: "What is useState?",
      answer:
        "useState is a React Hook used to create and manage state in functional components.",
    },
  ],

  JavaScript: [
    {
      question: "What is JavaScript?",
      answer:
        "JavaScript is a programming language commonly used to make web pages interactive.",
    },
    {
      question: "What is the difference between var, let and const?",
      answer:
        "var has function scope, while let and const have block scope. const cannot be reassigned.",
    },
    {
      question: "What is hoisting?",
      answer:
        "Hoisting is JavaScript's behavior of processing certain declarations before code execution.",
    },
    {
      question: "What is a callback function?",
      answer:
        "A callback is a function passed to another function and executed later.",
    },
    {
      question: "What are promises?",
      answer:
        "A Promise represents the eventual completion or failure of an asynchronous operation.",
    },
  ],

  "HR Interview": [
    {
      question: "Tell me about yourself.",
      answer:
        "Give a short professional introduction covering your education, skills, projects, experience and career goal.",
    },
    {
      question: "Why should we hire you?",
      answer:
        "Explain how your skills, learning ability, problem-solving skills and project experience can contribute to the company.",
    },
    {
      question: "What are your strengths?",
      answer:
        "Mention genuine strengths relevant to the job such as quick learning, communication and problem solving.",
    },
    {
      question: "What are your weaknesses?",
      answer:
        "Mention a manageable weakness and explain how you are working to improve it.",
    },
    {
      question: "Explain your project.",
      answer:
        "Explain the project goal, technologies used, your responsibilities, features and challenges solved.",
    },
  ],
};

function QuestionDetails() {
  const navigate = useNavigate();
  const { topic, index } = useParams();

  const selectedTopic = decodeURIComponent(topic || "Python");
  const questionIndex = Number(index);

  const questions = questionData[selectedTopic] || [];
  const currentQuestion = questions[questionIndex];

  const [status, setStatus] = useState("Not Started");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedStatus = localStorage.getItem(
      "interviewflowQuestionStatus"
    );

    if (savedStatus) {
      try {
        const allStatus = JSON.parse(savedStatus);

        if (
          allStatus[selectedTopic] &&
          allStatus[selectedTopic][questionIndex]
        ) {
          setStatus(
            allStatus[selectedTopic][questionIndex]
          );
        }
      } catch (error) {
        console.error("Unable to load status:", error);
      }
    }

    const savedNotes = localStorage.getItem(
      "interviewflowQuestionNotes"
    );

    if (savedNotes) {
      try {
        const allNotes = JSON.parse(savedNotes);

        if (
          allNotes[selectedTopic] &&
          allNotes[selectedTopic][questionIndex]
        ) {
          setNotes(
            allNotes[selectedTopic][questionIndex]
          );
        }
      } catch (error) {
        console.error("Unable to load notes:", error);
      }
    }
  }, [selectedTopic, questionIndex]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    let allStatus = {};

    try {
      const savedStatus = localStorage.getItem(
        "interviewflowQuestionStatus"
      );

      if (savedStatus) {
        allStatus = JSON.parse(savedStatus);
      }
    } catch {
      allStatus = {};
    }

    if (!allStatus[selectedTopic]) {
      allStatus[selectedTopic] = {};
    }

    allStatus[selectedTopic][questionIndex] =
      newStatus;

    localStorage.setItem(
      "interviewflowQuestionStatus",
      JSON.stringify(allStatus)
    );
  };

  const handleSaveNote = () => {
    let allNotes = {};

    try {
      const savedNotes = localStorage.getItem(
        "interviewflowQuestionNotes"
      );

      if (savedNotes) {
        allNotes = JSON.parse(savedNotes);
      }
    } catch {
      allNotes = {};
    }

    if (!allNotes[selectedTopic]) {
      allNotes[selectedTopic] = {};
    }

    allNotes[selectedTopic][questionIndex] = notes;

    localStorage.setItem(
      "interviewflowQuestionNotes",
      JSON.stringify(allNotes)
    );

    alert("Note saved successfully!");
  };

  const goBack = () => {
    navigate(
      "/questions?topic=" +
        encodeURIComponent(selectedTopic)
    );
  };

  const goPrevious = () => {
    if (questionIndex > 0) {
      navigate(
        "/question/" +
          encodeURIComponent(selectedTopic) +
          "/" +
          (questionIndex - 1)
      );
    }
  };

  const goNext = () => {
    if (questionIndex < questions.length - 1) {
      navigate(
        "/question/" +
          encodeURIComponent(selectedTopic) +
          "/" +
          (questionIndex + 1)
      );
    }
  };

  if (!currentQuestion) {
    return (
      <div className="question-details-not-found">
        <div className="question-details-not-found-card">

          <div className="question-details-not-found-icon">
            📅
          </div>

          <h1>Question Not Found</h1>

          <p>
            The selected question does not exist.
          </p>

          <button
            type="button"
            onClick={goBack}
          >
            ← Back to Questions
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="question-details-page">

      <div className="question-details-container">

        {/* TOP BAR */}

        <div className="question-details-topbar">

          <button
            type="button"
            className="question-details-back-button"
            onClick={goBack}
          >
            ← Back to Questions
          </button>

          <div className="question-details-brand">
            InterviewFlow
          </div>

        </div>

        {/* MAIN CARD */}

        <div className="question-details-card">

          {/* INTRO */}

          <div className="question-details-intro">

            <div>

              <span className="question-details-topic">
                {selectedTopic.toUpperCase()}
              </span>

              <h1>
                Question {questionIndex + 1}
              </h1>

              <p className="question-details-counter">
                Question {questionIndex + 1} of{" "}
                {questions.length}
              </p>

            </div>

            <div className="question-details-progress-badge">

              <span>Status</span>

              <strong>
                {status}
              </strong>

            </div>

          </div>

          {/* QUESTION */}

          <div className="question-details-question-box">

            <span className="question-details-question-label">
              INTERVIEW QUESTION
            </span>

            <h2>
              {currentQuestion.question}
            </h2>

          </div>

          {/* ANSWER */}

          <div className="question-details-answer-box">

            <div className="question-details-answer-heading">

              <div className="question-details-answer-icon">
                💡
              </div>

              <h3>
                Suggested Answer
              </h3>

            </div>

            <p>
              {currentQuestion.answer}
            </p>

          </div>

          {/* FORM */}

          <div className="question-details-form-section">

            <div className="question-details-field">

              <label htmlFor="status">
                Preparation Status
              </label>

              <select
                id="status"
                className="question-details-select"
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
              >

                <option value="Not Started">
                  Not Started
                </option>

                <option value="Practicing">
                  Practicing
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            <div className="question-details-notes">

              <label htmlFor="question-notes">
                My Notes
              </label>

              <textarea
                id="question-notes"
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="Write your notes here..."
                rows={8}
              />

              <button
                type="button"
                className="question-details-save-note"
                onClick={handleSaveNote}
              >
                Save Note
              </button>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="question-details-navigation">

            <button
              type="button"
              className="question-details-nav-button question-details-prev"
              onClick={goPrevious}
              disabled={questionIndex === 0}
            >
              ← Previous
            </button>

            <button
              type="button"
              className="question-details-nav-button question-details-next"
              onClick={goNext}
              disabled={
                questionIndex === questions.length - 1
              }
            >
              Next →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default QuestionDetails;