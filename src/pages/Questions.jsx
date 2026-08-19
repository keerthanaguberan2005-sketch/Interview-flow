import { useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import "./Questions.css";

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
        "Common Python data types include int, float, string, boolean, list, tuple, set and dictionary.",
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
      question: "What is inheritance in Python?",
      answer:
        "Inheritance allows one class to acquire properties and methods from another class.",
    },
    {
      question: "What is the difference between == and is?",
      answer:
        "== compares values, while is checks whether two references point to the same object.",
    },
    {
      question: "What are decorators in Python?",
      answer:
        "Decorators modify or extend the behavior of a function without changing its original source code.",
    },
    {
      question: "What is exception handling?",
      answer:
        "Exception handling manages runtime errors using try, except, else and finally blocks.",
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
      question: "What is INNER JOIN?",
      answer:
        "INNER JOIN returns only the records that have matching values in both tables.",
    },
    {
      question: "What is LEFT JOIN?",
      answer:
        "LEFT JOIN returns all records from the left table and matching records from the right table.",
    },
    {
      question: "What is GROUP BY?",
      answer:
        "GROUP BY groups rows so aggregate functions such as COUNT, SUM and AVG can be used.",
    },
    {
      question: "What is a subquery?",
      answer:
        "A subquery is a query written inside another SQL query.",
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
      question: "What is a Django view?",
      answer:
        "A Django view contains application logic and returns a response to a request.",
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
    {
      question: "What is useEffect?",
      answer:
        "useEffect is used to perform side effects such as API calls and subscriptions.",
    },
    {
      question: "What is React Router?",
      answer:
        "React Router is used to handle navigation and routing in React applications.",
    },
    {
      question: "What is Virtual DOM?",
      answer:
        "The Virtual DOM is a lightweight representation of the actual DOM used for efficient UI updates.",
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
      question: "What are JavaScript data types?",
      answer:
        "JavaScript has primitive types such as string, number, boolean, undefined, null, bigint and symbol, plus objects.",
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
    {
      question: "What is async/await?",
      answer:
        "async/await provides a cleaner way to work with asynchronous JavaScript and Promises.",
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "== allows type conversion, while === compares both value and type.",
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
      question: "Why do you want to join our company?",
      answer:
        "Connect your career goals and skills with the company's work and the role requirements.",
    },
    {
      question: "Why did you choose IT after completing your degree?",
      answer:
        "Explain your interest in technology and the IT skills you developed through your training and projects.",
    },
    {
      question: "Explain your project.",
      answer:
        "Explain the project goal, technologies used, your responsibilities, features and challenges solved.",
    },
    {
      question: "Where do you see yourself in five years?",
      answer:
        "Describe a realistic career goal such as becoming a strong software professional and taking more responsibility.",
    },
  ],
};

function getSavedStatus(topic) {
  try {
    const saved = localStorage.getItem(
      "interviewflowQuestionStatus"
    );

    if (!saved) {
      return {};
    }

    const data = JSON.parse(saved);

    return data[topic] || {};
  } catch {
    return {};
  }
}

function getSavedNotes(topic) {
  try {
    const saved = localStorage.getItem(
      "interviewflowQuestionNotes"
    );

    if (!saved) {
      return {};
    }

    const data = JSON.parse(saved);

    return data[topic] || {};
  } catch {
    return {};
  }
}

function Questions() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTopic =
    searchParams.get("topic") || "Python";

  const questions =
    questionData[selectedTopic] || [];

  const [questionStatus, setQuestionStatus] =
    useState(() =>
      getSavedStatus(selectedTopic)
    );

  const [notes, setNotes] = useState(() =>
    getSavedNotes(selectedTopic)
  );

  const [openAnswers, setOpenAnswers] =
    useState({});

  const saveStatus = (updatedStatus) => {
    setQuestionStatus(updatedStatus);

    let allStatus = {};

    try {
      const saved = localStorage.getItem(
        "interviewflowQuestionStatus"
      );

      if (saved) {
        allStatus = JSON.parse(saved);
      }
    } catch {
      allStatus = {};
    }

    allStatus[selectedTopic] = updatedStatus;

    localStorage.setItem(
      "interviewflowQuestionStatus",
      JSON.stringify(allStatus)
    );
  };

  const handleStatusChange = (
    index,
    status
  ) => {
    const updatedStatus = {
      ...questionStatus,
      [index]: status,
    };

    saveStatus(updatedStatus);
  };

  const toggleAnswer = (index) => {
    setOpenAnswers((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const handleNoteChange = (
    index,
    value
  ) => {
    setNotes((previous) => ({
      ...previous,
      [index]: value,
    }));
  };

  const saveNote = (index) => {
    let allNotes = {};

    try {
      const saved = localStorage.getItem(
        "interviewflowQuestionNotes"
      );

      if (saved) {
        allNotes = JSON.parse(saved);
      }
    } catch {
      allNotes = {};
    }

    allNotes[selectedTopic] = {
      ...(allNotes[selectedTopic] || {}),
      [index]: notes[index] || "",
    };

    localStorage.setItem(
      "interviewflowQuestionNotes",
      JSON.stringify(allNotes)
    );

    alert("Note saved successfully!");
  };

  const completedQuestions =
    questions.filter(
      (_, index) =>
        questionStatus[index] ===
        "Completed"
    ).length;

  const progress =
    questions.length > 0
      ? Math.round(
          (completedQuestions /
            questions.length) *
            100
        )
      : 0;

  return (
    <div className="questions-page">
      <header className="questions-header">
        <button
          type="button"
          className="questions-back-button"
          onClick={() =>
            navigate("/preparation")
          }
        >
          ← Back to Preparation
        </button>

        <div className="questions-brand">
          InterviewFlow
        </div>
      </header>

      <main className="questions-content">
        <section className="questions-title">
          <div>
            <span className="questions-label">
              INTERVIEW PREPARATION
            </span>

            <h1>
              {selectedTopic} Questions
            </h1>

            <p>
              Practice common {selectedTopic}{" "}
              interview questions and track your
              preparation progress.
            </p>
          </div>

          <div className="questions-progress">
            <span>Progress</span>

            <strong>
              {progress}%
            </strong>
          </div>
        </section>

        <section className="questions-summary">
          <div className="question-summary-card">
            <span>Total Questions</span>

            <strong>
              {questions.length}
            </strong>
          </div>

          <div className="question-summary-card">
            <span>Completed</span>

            <strong>
              {completedQuestions}
            </strong>
          </div>

          <div className="question-summary-card">
            <span>Remaining</span>

            <strong>
              {questions.length -
                completedQuestions}
            </strong>
          </div>
        </section>

        <section className="questions-section">
          <div className="questions-section-heading">
            <h2>
              Interview Questions
            </h2>

            <p>
              Click any question to open the
              detailed practice page.
            </p>
          </div>

          <div className="questions-list">
            {questions.map(
              (item, index) => (
                <div
                  className="question-item"
                  key={index}
                >
                  <button
                    type="button"
                    className="question-main-button"
                    onClick={() =>
                      navigate(
                        `/question/${encodeURIComponent(
                          selectedTopic
                        )}/${index}`
                      )
                    }
                  >
                    <span className="question-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="question-content">
                      <strong>
                        {item.question}
                      </strong>

                      <small>
                        Question {index + 1} of{" "}
                        {questions.length}
                      </small>
                    </span>

                    <span className="question-arrow">
                      →
                    </span>
                  </button>

                  <div className="question-controls">
                    <select
                      value={
                        questionStatus[index] ||
                        "Not Started"
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          index,
                          e.target.value
                        )
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

                    <button
                      type="button"
                      className="answer-button"
                      onClick={() =>
                        toggleAnswer(index)
                      }
                    >
                      {openAnswers[index]
                        ? "Hide Answer"
                        : "Show Answer"}
                    </button>
                  </div>

                  {openAnswers[index] && (
                    <div className="answer-box">
                      <strong>
                        Answer
                      </strong>

                      <p>
                        {item.answer}
                      </p>
                    </div>
                  )}

                  <div className="question-notes">
                    <label
                      htmlFor={`note-${index}`}
                    >
                      My Notes
                    </label>

                    <textarea
                      id={`note-${index}`}
                      value={
                        notes[index] || ""
                      }
                      onChange={(e) =>
                        handleNoteChange(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Write your notes or your own answer..."
                      rows={4}
                    />

                    <button
                      type="button"
                      className="save-note-button"
                      onClick={() =>
                        saveNote(index)
                      }
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Questions;