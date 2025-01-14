import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import DropzoneComponent from "./Dropzone";

interface UserProfileProps {
  username: string;
  email: string;
  profilePhoto: string | null;
  onSaveProfile: (
    updatedUsername: string,
    updatedProfilePhoto: string | null
  ) => void;
}

const UserProfile = ({
  username,
  email,
  profilePhoto,
  onSaveProfile,
}: UserProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newProfilePhoto, setNewProfilePhoto] = useState<File | null>(null);

  const handleSave = () => {
    onSaveProfile(
      newUsername,
      newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : profilePhoto
    );
    setEditMode(false);
  };

  return (
    <div
      className="post card mb-3"
      style={{ width: "30vw", minHeight: "300px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">User Profile</h5>
          <button
            className="btn btn-light"
            style={{ border: "none", background: "transparent" }}
            onClick={() => setEditMode((prev) => !prev)}
          >
            <FaEdit size={20} />
          </button>
        </div>

        {editMode ? (
          <div>
            <div className="mb-3">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <DropzoneComponent
                onFileSelect={(file) => setNewProfilePhoto(file)}
                selectedFile={null}
              />
            </div>

            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <div className="mb-3">
              <img
                src={profilePhoto || "/temp-user.png"}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
