import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";

function App() {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#e4fcd9" }}
    >
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/addPost" element={<AddPost></AddPost>} />
          <Route path="/profile" element={<Profile></Profile>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
