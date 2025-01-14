import { useState } from "react";
import SignInForm from "../components/SignInForm";

export type SignInData = {
  username: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>({
    username: "",
    password: "",
  });

  const handleInputChange = (
    field: keyof SignInData,
    value: string | File | null
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <div className="text-center mb-2">
          <img
            src="/src/assets/logo.png"
            alt="PlantsUniverse Logo"
            style={{ width: "60px", height: "60px" }}
          />
          <h4 className="mt-2">PlantsUniverse</h4>
          <p className="text-muted">Sign In Page</p>
        </div>
        <SignInForm formData={formData} onInputChange={handleInputChange} />
        <p className="text-center mt-1">
          Don't have an account?{" "}
          <a href="/signup" className="text-success">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
