import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi"; // Import the upload icon from react-icons

interface DropzoneComponentProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  onFileSelect,
  selectedFile,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="form-group">
      <label htmlFor="photo">Upload Photo</label>
      <div
        {...getRootProps({
          className:
            "dropzone rounded-circle border d-flex justify-content-center align-items-center",
        })}
        className="dropzone d-flex justify-content-center align-items-center m-1"
        style={{ border: "2px dashed", borderRadius: "5px", padding: "15px" }}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <div className="text-center">
            <FiUpload size={40} color="#007bff" />
            <p>Drag and drop an image, or click to select one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropzoneComponent;
