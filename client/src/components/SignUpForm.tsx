import React from "react";
import { SignUpData } from "../pages/SignUp";

type SignUpFormProps = {
  formData: SignUpData;
  onInputChange: (field: keyof SignUpData, value: string | File | null) => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onInputChange }) => {
  return (
    <form>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="First Name*"
          value={formData.firstName}
          onChange={(e) => onInputChange("firstName", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name*"
          value={formData.lastName}
          onChange={(e) => onInputChange("lastName", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username*"
          value={formData.username}
          onChange={(e) => onInputChange("username", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password*"
          value={formData.password}
          onChange={(e) => onInputChange("password", e.target.value)}
          required
        />
      </div>
      <div
        className="mb-3 border p-3 text-center"
        style={{ borderStyle: "dashed", borderColor: "#ced4da" }}
      >
        <label htmlFor="photo" className="form-label d-block text-muted">
          Profile Photo
        </label>
        <input
          type="file"
          className="form-control-file"
          id="photo"
          onChange={(e) =>
            onInputChange("photo", e.target.files ? e.target.files[0] : null)
          }
        />
      </div>
      <button type="submit" className="btn btn-success w-100">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
