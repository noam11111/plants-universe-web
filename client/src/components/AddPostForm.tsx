import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostData } from "../pages/AddPost"; // Update this path as necessary
import DropzoneComponent from "./Dropzone";

// Define schema with Zod
const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file === null || file.size > 0, {
      message: "A photo is required",
    }),
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

  const onSubmit = (data: PostData) => {
    // TODO
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          {...register("description")}
          type="text"
          className="form-control"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <DropzoneComponent
          onFileSelect={(file) => {
            setValue("photo", file); // Update react-hook-form state
            onInputChange("photo", file);
          }}
          selectedFile={formData.postPhoto ?? null}
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
