import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = login(
      username,
      password
    );

    if (!user) {
      setError(
        "Falsche Anmeldedaten. Passwort und/oder Benutzername falsch."
      );

      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Lernzeit-Manager</h1>

        <p>
          Bitte melde dich an.
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>
        </form>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <small>
          Hinweis: Alle Daten werden lokal
          im Browser gespeichert.
        </small>
      </div>
    </div>
  );
}

export default LoginPage;
