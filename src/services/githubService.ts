// src/services/githubService.ts

const BASE_URL = "https://api.github.com";

// 🔐 Optional: Use token to avoid rate limit (recommended)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers: HeadersInit = GITHUB_TOKEN
  ? {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    }
  : {
      Accept: "application/vnd.github+json",
    };

// ----------------------------
// Generic fetch helper
// ----------------------------
const githubFetch = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
  });

  // Rate limit handling
  if (response.status === 403) {
    throw new Error("GitHub API rate limit exceeded");
  }

  // Not found / other errors
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "GitHub API error");
  }

  return response.json();
};

// ----------------------------
// Get GitHub User Profile
// ----------------------------
export const getGitHubUser = async (username: string) => {
  return githubFetch(`/users/${username}`);
};

// ----------------------------
// Get User Repositories
// ----------------------------
export const getGitHubRepos = async (username: string) => {
  return githubFetch(
    `/users/${username}/repos?per_page=30&sort=updated`
  );
};

// ----------------------------
// Get Followers
// ----------------------------
export const getGitHubFollowers = async (username: string) => {
  return githubFetch(`/users/${username}/followers?per_page=30`);
};

// ----------------------------
// Get Following
// ----------------------------
export const getGitHubFollowing = async (username: string) => {
  return githubFetch(`/users/${username}/following?per_page=30`);
};

// ----------------------------
// Get Repository Languages
// ----------------------------
export const getRepoLanguages = async (
  owner: string,
  repo: string
) => {
  return githubFetch(`/repos/${owner}/${repo}/languages`);
};
