import { isRouteErrorResponse, useRouteError } from "react-router";
import "../../App.css";
const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <h2>Developer info: {error.data}</h2>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <h1>Error!</h1>
        <h2>{error.message}</h2>
        <br />

        <h2>Developer info:</h2>
        <pre>{error.stack}</pre>
      </main>
    );
  } else {
    return (
      <main>
        <h1>Unknown error!</h1>
      </main>
    );
  }
};

export default ErrorPage;
