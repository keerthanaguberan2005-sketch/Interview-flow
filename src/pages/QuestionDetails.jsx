import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

    const savedStatus = localStorage.getItem(
      "interviewflowQuestionStatus"
    );

    if (savedStatus) {
      try {
        allStatus = JSON.parse(savedStatus);
      } catch (error) {
        allStatus = {};
      }
    }

    if (!allStatus[selectedTopic]) {
      allStatus[selectedTopic] = {};
    }

    allStatus[selectedTopic][questionIndex] = newStatus;

    localStorage.setItem(
      "interviewflowQuestionStatus",
      JSON.stringify(allStatus)
    );
  };

  const handleSaveNote = () => {
    let allNotes = {};

    const savedNotes = localStorage.getItem(
      "interviewflowQuestionNotes"
    );

    if (savedNotes) {
      try {
        allNotes = JSON.parse(savedNotes);
      } catch (error) {
        allNotes = {};
      }
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
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={goBack}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          ← Back to Questions
        </button>

        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h1>Question Not Found</h1>
          <p>
            The selected question does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={goBack}
          style={{
            padding: "10px 18px",
            marginBottom: "25px",
            border: "none",
            borderRadius: "8px",
            background: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          ← Back to Questions
        </button>

        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "18px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            <p
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {selectedTopic.toUpperCase()}
            </p>

            <h1 style={{ margin: 0 }}>
              Question {questionIndex + 1}
            </h1>

            <p style={{ color: "#64748b" }}>
              Question {questionIndex + 1} of{" "}
              {questions.length}
            </p>
          </div>

          <div
            style={{
              padding: "25px",
              background: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              marginBottom: "25px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {currentQuestion.question}
            </h2>
          </div>

          <div
            style={{
              padding: "25px",
              background: "#eff6ff",
              borderRadius: "12px",
              border: "1px solid #dbeafe",
              marginBottom: "25px",
            }}
          >
            <h3>Suggested Answer</h3>

            <p
              style={{
                lineHeight: "1.7",
                color: "#334155",
              }}
            >
              {currentQuestion.answer}
            </p>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              htmlFor="status"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Preparation Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
              }}
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

          <div>
            <h3>My Notes</h3>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Write your notes here..."
              rows="8"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "15px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                resize: "vertical",
              }}
            />

            <button
              type="button"
              onClick={handleSaveNote}
              style={{
                marginTop: "12px",
                padding: "12px 22px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save Note
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "35px",
              paddingTop: "25px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              type="button"
              onClick={goPrevious}
              disabled={questionIndex === 0}
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background:
                  questionIndex === 0
                    ? "#e5e7eb"
                    : "#334155",
                color:
                  questionIndex === 0
                    ? "#94a3b8"
                    : "#ffffff",
                cursor:
                  questionIndex === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={
                questionIndex === questions.length - 1
              }
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background:
                  questionIndex === questions.length - 1
                    ? "#e5e7eb"
                    : "#2563eb",
                color:
                  questionIndex === questions.length - 1
                    ? "#94a3b8"
                    : "#ffffff",
                cursor:
                  questionIndex === questions.length - 1
                    ? "not-allowed"
                    : "pointer",
              }}
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