import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./EditProfile.css";

import type { User } from "../types";

interface Props {
  user: User;
  setUser: (user: User) => void;
}

function EditProfile({ user, setUser }: Props) {
  const [bio, setBio] = useState(user.bio ?? "");
  const [githubUsername, setGithubUsername] = useState(
    user.githubUsername ?? ""
  );

  const [skills, setSkills] = useState(
    user.skills?.join(", ") ?? ""
  );

  const handleSave = async () => {
    try {
      const res = await API.put("/profile", {
        bio,
        githubUsername,
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setUser(res.data.user);

      toast.success("Profile Updated Successfully");
    } catch (err: any) {
      console.log(err.response?.data || err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>

      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Enter your bio"
      />

      <input
        type="text"
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
        placeholder="Enter GitHub Username"
      />

      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="React, Node.js, MongoDB"
      />

      <button onClick={handleSave}>
        Save Profile
      </button>
    </div>
  );
}

export default EditProfile;