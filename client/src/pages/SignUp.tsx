import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { googleLogin } from "../services/auth";
import SignUpForm from "../components/SignUpForm";
import { useUserContext } from "../context/UserContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export type SignUpData = {
  username: string;
  password: string;
  email: string;
  photo?: File[] | null;
};

const SignUp = () => {
  const { setUser } = useUserContext() ?? {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpData>({
    username: "",
    password: "",
    email: "",
    photo: null,
  });

  const handleInputChange = (
    field: keyof SignUpData,
    value: string | File | null
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const user = await googleLogin(credentialResponse.credential);
      setUser?.(user);
      navigate("/");
    } catch (err) {
      console.error("error login user", err);
      enqueueSnackbar("Failed to login with Google", { variant: "error" });
    }
  };

  const googleLoginError = () => {
    enqueueSnackbar("Failed to login with Google", { variant: "error" });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <div className="text-center mb-2">
          <h4 className="mt-2">PlantsUniverse</h4>
          <p className="text-muted">Sign Up Page</p>
        </div>
        <SignUpForm formData={formData} onInputChange={handleInputChange} />
        <div className="mt-2 px-5">
          <GoogleLogin
            text="signup_with"
            onSuccess={handleGoogleLogin}
            onError={googleLoginError}
          />
        </div>
        <p className="text-center mt-1">
          Already have an account?{" "}
          <a href="/" className="text-success">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
