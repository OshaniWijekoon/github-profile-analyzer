import { useState } from "react";
import type { GitHubUser } from "../types/github";
import "../styles/home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    if (!username) return;

    setError("");
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");

      const data = (await res.json()) as GitHubUser;
      setUser(data);
    } catch {
      setError("GitHub user not found");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="card-title">GitHub Profile Search</h1>

        <input
          className="search-input"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className="card-button" onClick={fetchUser}>
          Analyze
        </button>

        {error && <p className="error">{error}</p>}

        {user && (
          <div className="profile-card">
            <img src={user.avatar_url} alt="avatar" />
            <h3>{user.name || user.login}</h3>
            {user.bio && <p>{user.bio}</p>}

            <div className="stats">
              <span>Repos: {user.public_repos}</span>
              <span>Followers: {user.followers}</span>
              <span>Following: {user.following}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default Home;
