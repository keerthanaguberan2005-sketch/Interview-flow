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

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/preparation"
          element={<Preparation />}
        />

        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/interview/:id"
          element={<InterviewDetails />}
        />

        <Route
          path="/question/:topic/:index"
          element={<QuestionDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;