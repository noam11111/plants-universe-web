import { z } from "zod";
import { useForm } from "react-hook-form";
import DropzoneComponent from "./Dropzone";
import { PostData } from "../pages/AddPost";
import { createPost } from "../services/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../context/UserContext";
import { ACCEPTED_IMAGE_TYPES } from "../constants/files";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import axiosRetry from 'axios-retry';


const instance = axios.create();
axiosRetry(instance, { retries: 0 });

const formSchema = z.object({
  content: z.string().min(1, "Description is required"),
  photo: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type FormData = z.infer<typeof formSchema>;

interface PostFormProps {
  formData: PostData;
  onInputChange: (field: keyof PostData, value: string | File | null) => void;
}

const PostForm = ({ formData, onInputChange }: PostFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const { user } = useUserContext() ?? {};

  const onSubmit = async ({ content, photo }: PostData) => {
    try {
      if (isEmpty(errors)) {
        await createPost({ content, photo, owner: user!._id });
        navigate("/");
      }
    } catch (error) {
      console.error("error creating post", error);
      enqueueSnackbar("Failed to create post", { variant: "error" });
    }
  };

  const improveTextWithAI = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo",
          prompt: `Improve the following text: "${formData.content}"`,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const improvedText = response.data.choices[0].text.trim();
      onInputChange("content", improvedText);
    } catch (error) {
      console.error("Error improving text:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 position-relative">
        <textarea
          {...register("content")}
          className="form-control"
          placeholder="Enter content"
          value={formData.content}
          onChange={(e) => onInputChange("content", e.target.value)}
          rows={6}
          style={{ paddingBottom: "40px" }}
        />
        <button
          type="button"
          className="btn btn-sm position-absolute"
          style={{
            bottom: "10px",
            left: "10px",
            backgroundColor: "#90EE90",
            color: "black",
          }}
          onClick={improveTextWithAI}
        >
          Improve with AI
        </button>
        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-3">
        <DropzoneComponent
          onFileSelect={(file) => {
            setValue("photo", file);
            onInputChange("photo", file);
          }}
          selectedFile={formData.photo ?? null}
        />
        {errors.photo && <p className="text-danger">Photo is required</p>}
      </div>

      <button type="submit" className="btn btn-success w-100">
        Add Post
      </button>
    </form>
  );
};

export default PostForm;
