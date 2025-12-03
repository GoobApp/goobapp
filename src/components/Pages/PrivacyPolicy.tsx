import "./Other.css";

const PrivacyPolicy = () => {
  return (
    <div className="other-page">
      <h1>Privacy Policy</h1>
      <h4>Last updated: December 3, 2025</h4>
      <h2>Welcome to GoobApp!</h2>
      <p>The GoobApp developers ("we", "us", or "our") respect your privacy.</p>
      <h2>What we collect</h2>
      <p>To keep GoobApp secure and functional, we store:</p>
      <ul>
        <li>
          All information provided during sign-up, including but not limited to
          your email and encrypted password (we never store raw passwords).
        </li>
        <li>
          Any information approved during the OAuth sign-in process (such as
          your email or profile picture)
        </li>
        <li>Your current username and profile picture</li>
        <li>Every message you've ever sent</li>
        <li>
          Every username and profile picture you have used to send a message, to
          keep message history accurate.
        </li>
      </ul>
      <h2>Info you should know</h2>
      <ul>
        <li>
          All code is open-sourced under the MIT license, meaning you can look
          into everything collected deeper yourself
        </li>
        <li>
          The code is available on GitHub:{" "}
          <a
            href="https://github.com/GoobApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/GoobApp
          </a>{" "}
          (Note: This link contains all repositories hosted on GitHub, including
          but not limited to the frontend website).
        </li>
        <li>
          The frontend website has a Content-Security Policy (CSP), meaning all
          non-approved connections are blocked.
        </li>
        <li>
          We take reasonable measures to secure GoobApp, but no online service
          is ever completely secure.
        </li>
        <li>You must be 13 years of age or older to use GoobApp.</li>
        <li>We do not sell your data to any third-parties.</li>
        <li>We do not use tracking or advertising cookies.</li>
        <li>We hold the right to update this Privacy Policy at any time.</li>
      </ul>
      <h2>Third-parties</h2>
      <ul>
        <li>
          As this website is hosted on GitHub pages, GitHub collects basic
          information for internal purposes.{" "}
          <a
            href="https://github.com/github/docs/blob/main/content/site-policy/privacy-policies/github-general-privacy-statement.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </li>
        <li>
          Additionally, GoobApp's domain (goobapp.org) is handled and proxied by
          Cloudflare. While Cloudflare Analytics are turned off, they still
          collect essential data.{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </li>
        <li>
          The backend server is hosted on Koyeb.{" "}
          <a
            href="https://community.koyeb.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </li>
        <li>
          The database hosting the user and message data is Supabase.{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </li>
      </ul>
      <h2>Contact information</h2>
      <ul>
        <li>
          To contact the GoobApp developers, email{" "}
          <a href="mailto:support@goobapp.org">support@goobapp.org</a>.
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
