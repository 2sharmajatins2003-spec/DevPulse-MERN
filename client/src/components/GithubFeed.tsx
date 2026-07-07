import { memo } from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./GithubFeed.css";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

function GithubFeed() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      // Backend se GitHub profile lo
      const profileRes = await API.get("/profile/github");

      const username = profileRes.data.github.login;

      // GitHub API se latest 3 repos fetch karo
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`
      );

      const data = await response.json();

      setRepos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="github-card">Loading GitHub Repositories...</div>;
  }

  return (
    <div className="github-card">
      <h2>Latest GitHub Repositories</h2>

      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        repos.map((repo) => (
          <div className="repo" key={repo.id}>
            <h3>{repo.name}</h3>

            <p>
              🌐 Language: {repo.language || "Not Specified"}
            </p>

            <p>⭐ Stars: {repo.stargazers_count}</p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Repository
            </a>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default memo(GithubFeed);