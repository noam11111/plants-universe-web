import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInData } from "../pages/SignIn";

type SignInFormProps = {
  formData: SignInData;
  onInputChange: (field: keyof SignInData, value: string | File | null) => void;
};
const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type formData = z.infer<typeof formSchema>;

const SignInForm: React.FC<SignInFormProps> = ({ formData, onInputChange }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignInData>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: formData) => {
    // TODO
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          {...register("username")}
          type="text"
          className="form-control"
          placeholder="Username*"
          value={formData.username}
          onChange={(e) => onInputChange("username", e.target.value)}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-3">
        <input
          {...register("password")}
          type="password"
          className="form-control"
          placeholder="Password*"
          value={formData.password}
          onChange={(e) => onInputChange("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className="btn btn-success w-100">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;