import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Landingpage";
import LearnerAuth from "./pages/LearnerAuth";
import StartupAuth from "./pages/StartupAuth";
import About from "./pages/About";
import LearnerDashboard from "./pages/LearnerDashboard";
import StartupDashboard from "./pages/StarterDashboard";
import ExploreProjects from "./pages/ExploreProjects";


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner-auth" element={<LearnerAuth />} />
          <Route path="/startup-auth" element={<StartupAuth />} />
          <Route path="/about" element={<About/>} />
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/startup-dashboard" element={<StartupDashboard />} />
          <Route path="/explore" element={<ExploreProjects />} />
        </Routes>
      <Footer/>
      </Router>
    </>
  );
}

export default App;