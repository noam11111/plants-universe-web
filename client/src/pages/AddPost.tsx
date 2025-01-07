import React, { useState } from "react";
import PostForm from "../components/AddPostForm";

export interface PostData {
  description: string;
  postPhoto: File | null;
}

const AddPost: React.FC = () => {
  const [formData, setFormData] = useState<PostData>({
    description: "",
    postPhoto: null,
  });

  const handleInputChange = (
    field: keyof PostData,
    value: string | File | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <div className="text-center mb-2">
          <h4 className="mt-2">Add post</h4>
        </div>
        <PostForm formData={formData} onInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default AddPost;
