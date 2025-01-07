import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { user, loadingUser } = useUserContext() ?? {};

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#e4fcd9" }}
    >
      {loadingUser ? (
        <div
          className="spinner-border text-success"
          style={{ width: "15rem", height: "15rem" }}
        />
      ) : (
        <Router>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/add-post" element={<div>Add Post Page</div>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
              </>
            )}
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
