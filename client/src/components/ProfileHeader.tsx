import { memo } from "react";
import "./ProfileHeader.css";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    bio?: string;
    githubUsername?: string;
  };
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="profile-card">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=2563eb&color=fff&size=120`}
        alt="Profile"
      />

      <h2>{user.name}</h2>

      <p>{user.email}</p>

      <p>
        <strong>Bio:</strong>{" "}
        {user.bio || "No bio added yet"}
      </p>

      {user.githubUsername && (
        <p>
          <strong>GitHub:</strong> @{user.githubUsername}
        </p>
      )}
    </div>
  );
}

export default memo(ProfileHeader);