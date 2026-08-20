import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Preparation from "./pages/Preparation";
import InterviewDetails from "./pages/InterviewDetails";
import Interviews from "./pages/Interviews";
import Questions from "./pages/Questions";
import QuestionDetails from "./pages/QuestionDetails";


function Home() {
  return (
    <main className="hero">

      <h1>
        Prepare Better. Interview Smarter.
      </h1>

      <p>
        Manage your interviews, preparation and
        progress in one simple workspace.
      </p>

    </main>
  );
}


function Features() {
  return (
    <main className="hero">

      <h1>
        Everything You Need to Prepare
      </h1>

      <p>
        Manage interviews, practice questions,
        track preparation and monitor your progress
        in one simple workspace.
      </p>

    </main>
  );
}


function About() {
  return (
    <main className="hero">

      <h1>
        About InterviewFlow
      </h1>

      <p>
        InterviewFlow is a simple interview
        preparation workspace designed to help
        candidates prepare better and interview smarter.
      </p>

    </main>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* HEADER PAGES */}
        <Route
          path="/features"
          element={<Features />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* INTERVIEWS */}
        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route
          path="/interview/:id"
          element={<InterviewDetails />}
        />

        {/* PREPARATION */}
        <Route
          path="/preparation"
          element={<Preparation />}
        />

        {/* QUESTIONS */}
        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/question/:topic/:index"
          element={<QuestionDetails />}
        />

        {/* PROGRESS */}
        <Route
          path="/progress"
          element={<Progress />}
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;