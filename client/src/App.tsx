import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#e4fcd9" }}
    >
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
