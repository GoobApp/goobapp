import { isRouteErrorResponse, useRouteError } from "react-router";
import "../../App.css";
const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <h2>Developer info: {error.data}</h2>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="error-page">
        <h1>Error!</h1>
        <h2>{error.message}</h2>
        <br />

        <h2>Developer info:</h2>
        <p>{error.stack}</p>
      </div>
    );
  } else {
    return (
      <div className="error-page">
        <h1>Unknown error!</h1>
      </div>
    );
  }
};

export default ErrorPage;
