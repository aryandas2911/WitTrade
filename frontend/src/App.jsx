import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Landingpage";
import LearnerAuth from "./pages/LearnerAuth";
import StartupAuth from "./pages/StartupAuth";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner-auth" element={<LearnerAuth />} />
          <Route path="/startup-auth" element={<StartupAuth />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;