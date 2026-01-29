// Modified from tutorial: https://mobisoftinfotech.com/resources/blog/app-development/supabase-react-typescript-tutorial

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Provider } from "@supabase/supabase-js";
import { FormEvent, useEffect, useRef, useState } from "react";
import "../../App.css";
import useClickOutside from "../../hooks/useClickOutside";
import isTauri from "../../utils/EnvironmentInfo";
import { Client } from "../supabase/Client";
import "./Profile.css";

const LoginPanel = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [logInLoading, setLogInLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError(null);
      setLogInLoading(true);

      if (!Client) return;
      const { error } = await Client.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });
      if (error) throw error;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign in",
      );
    } finally {
      setLogInLoading(false);
      if (!turnstileRef.current) return;
      turnstileRef.current.reset();
    }
  };

  const handleSignInWithProvider = async (provider: Provider) => {
    try {
      setError(null);
      setLogInLoading(true);

      if (!Client) return;
      const { data, error } = await Client.auth.signInWithOAuth({
        provider: provider,
      });

      if (error) throw error;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign up",
      );
    } finally {
      setLogInLoading(false);
    }
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.focus();
  }, []);

  const panelRef = useClickOutside(onClose);

  return (
    <div tabIndex={-1} ref={panelRef}>
      <form
        className={
          isTauri
            ? "login-panel-form panel-form tauri-panel-form"
            : "login-panel-form panel-form"
        }
        onSubmit={handleLogIn}
      >
        <Turnstile
          siteKey="0x4AAAAAACDL09dyN0WgJyZL"
          onSuccess={(token) => {
            setCaptchaToken(token);
          }}
          ref={turnstileRef}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={logInLoading}
          className="login-signup-input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          disabled={logInLoading}
          className="login-signup-input"
        />
        <br />
        <button
          type="submit"
          disabled={logInLoading || email == "" || password == ""}
          className="login-signup-panel-button"
        >
          {logInLoading ? "Loading..." : "Sign In"}
        </button>
        <hr className="login-signup-panel-divider"></hr>
        <div className="flex-horizontal">
          <button
            type="button"
            className="OAuth-button"
            onClick={() => handleSignInWithProvider("google")}
          >
            Google
          </button>
          <button
            type="button"
            className="OAuth-button"
            onClick={() => handleSignInWithProvider("github")}
          >
            GitHub
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPanel;
