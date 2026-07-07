export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  githubUsername: string;
  skills: string[];
}

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}

export interface GithubResponse {
  success: boolean;
  github: {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  repos: Repo[];
}