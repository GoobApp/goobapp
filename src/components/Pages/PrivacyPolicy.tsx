import "./Other.css";

const PrivacyPolicy = () => {
  return (
    <div className="other-page">
      <h1>Privacy Policy</h1>
      <h4>Last updated: December 25, 2025</h4>
      <h2>Welcome to GoobApp!</h2>
      <div>
        The GoobApp developers ("we", "us", or "our") respect your privacy.
      </div>
      <h2>What we collect</h2>
      <div>To keep GoobApp secure and functional, we store:</div>
      <ul>
        <li>
          All information provided during sign-up, including but not limited to
          your email and encrypted password (we never store raw passwords).
        </li>
        <li>
          Any information you approve during the OAuth sign-in process (such as
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
          All code is open source under the MIT license, meaning you can look
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
          non-approved connections are blocked. You can find the approved
          connections{" "}
          <a
            href="https://github.com/GoobApp/goobapp/blob/main/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </li>
        <li>
          We take reasonable measures to secure GoobApp, but no online service
          is ever completely secure.
        </li>
        <li>You must be 13 years of age or older to use GoobApp.</li>
        <li>We do not sell your data to any third parties.</li>
        <li>We do not use tracking or advertising cookies.</li>
        <li>We reserve the right to update this Privacy Policy at any time.</li>
      </ul>
      <h2>Third parties</h2>
      <ul>
        <li>
          Both GoobApp's domain (goobapp.org) and frontend hosting is handled by
          Cloudflare and Cloudflare Pages respectively. While Cloudflare
          Analytics are turned off, they still collect essential data.{" "}
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
        <li>
          When using Gooble search and search something (not direct URLs),
          results are provided through Google's Programmable Search Engine. This
          configuration may show ads, and Google's privacy policy may apply.{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
          {". "}
          To prevent this, do not use Gooble search.
        </li>
        <li>
          When uploading or viewing images on GoobApp, these images are hosted
          through ImgBB.{" "}
          <a
            href="https://imgbb.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </li>
        <li>User's profile pictures are loaded from user-provided URLs.</li>
        <li>
          The default profile pictures are provided by Lorem Picsum.{" "}
          <a
            href="https://picsum.photos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
          . NOTE: They do not have a privacy policy.
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
