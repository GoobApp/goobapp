import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "../../App.css";
import "./Other.css";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearch, setIsSearch] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTestRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; // AAAA THANK YOU SO MUCH TO https://gist.github.com/StaticCloud/c58069c315c9c8191f1f9ebf377bf52d

  useEffect(() => {
    searchInputRef.current?.focus();

    const searchParam = searchParams.get("q");
    if (searchParam) {
      setPageURL(searchParam);
      setIsSearch(!urlTestRegex.test(searchParam));
      if (searchInputRef.current) searchInputRef.current.value = searchParam;
    } else {
      searchInputRef.current?.select();
    }
  }, [location]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    let value = searchInputRef.current?.value;
    if (!value) return;

    if (urlTestRegex.test(value)) {
      if (!value.includes("https://") && !value.includes("http://")) {
        value = "https://" + value;
      }
    }

    setPageURL("");
    setSearchParams({ q: value });
    window.location.reload();
  };

  return (
    <div className="search-page">
      <form onSubmit={submitForm}>
        <input
          placeholder="Search Gooble or type a URL"
          className="search"
          id="searchInput"
          ref={searchInputRef}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoComplete="off"
        ></input>
      </form>

      {isSearch ? (
        <div className="search-view">
          <script
            async
            src="https://cse.google.com/cse.js?cx=23d18495b2d8a47f5"
          ></script>
          <div className="gcse-searchresults-only"></div>
        </div>
      ) : (
        <div className="search-view">
          {pageURL != "" && (
            <iframe className="search-frame" src={pageURL}></iframe>
          )}
          {pageURL != "" && (
            <p>
              Not able to view?{" "}
              <Link to={pageURL} target="_blank" viewTransition={true}>
                Click here
              </Link>{" "}
              for the website to open in a new tab!{" "}
              <Link to="/extras/search/learnmore" viewTransition={true}>
                Learn why this happens.
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
