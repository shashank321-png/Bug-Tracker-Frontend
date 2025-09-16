import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Bugs from "./pages/Bugs";
import UserList from "./components/User/UserList";
import BugList from "./components/Bug/BugList";
import ProjectList from "./components/Project/ProjectList";
import Projects from "./pages/Projects";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";
import Footer from "./components/Layout/Footer";
import IntroPage from "./components/Intro"; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showIntro, setShowIntro] = useState(true); // ✅ intro state

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.href = "/login"; // OR use navigate
  };

  if (showIntro) {
    // ✅ show intro first
    return <IntroPage onFinish={() => setShowIntro(false)} />;
  }

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header currentUser={currentUser} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/bugs" element={<Bugs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/bugs" element={<BugList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route
              path="/register"
              element={<RegisterPage currentUser={currentUser} />}
            />
            <Route
              path="/login"
              element={<LoginPage setCurrentUser={setCurrentUser} />}
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
