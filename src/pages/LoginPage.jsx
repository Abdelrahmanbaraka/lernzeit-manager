function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Lernzeit-Manager</h1>

        <p>
          Bitte melde dich an.
        </p>

        <form className="login-form">
          <input
            type="text"
            placeholder="Benutzername"
          />

          <input
            type="password"
            placeholder="Passwort"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <small>
          Hinweis: Alle Daten werden lokal im Browser gespeichert.
        </small>
      </div>
    </div>
  );
}

export default LoginPage;