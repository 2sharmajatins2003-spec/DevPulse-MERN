import {
  lazy,
  Suspense,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

import "./Dashboard.css";

import type { User, ProfileResponse } from "../types";

// Lazy Loading
const ProfileHeader = lazy(() => import("../components/ProfileHeader"));
const SkillCard = lazy(() => import("../components/SkillCard"));
const EditProfile = lazy(() => import("../components/EditProfile"));
const GithubFeed = lazy(() => import("../components/GithubFeed"));

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get<ProfileResponse>("/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, []);

  // ✅ Hooks always before return
  const skills = useMemo(() => user?.skills ?? [], [user]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <div className="dashboard">
          <ProfileHeader user={user} />

          <SkillCard skills={skills} />

          <EditProfile
            user={user}
            setUser={updateUser}
          />

          <GithubFeed />
        </div>
      </Suspense>
    </>
  );
}

export default Dashboard;