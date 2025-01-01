import React from "react";
import { SignUpData } from "../pages/SignUp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type SignUpFormProps = {
  formData: SignUpData;
  onInputChange: (field: keyof SignUpData, value: string | File | null) => void;
};
const formSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(6).max(10),
  password: z.string().min(6).max(10),
});

type formData = z.infer<typeof formSchema>;

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onInputChange }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpData>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: formData) => {
    // TODO
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          {...register("name")}
          type="text"
          className="form-control"
          placeholder="Name*"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
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
