import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

// const url = "https://hn.algolia.com/api/v1/search?query=redux";
// const url = "https://hn.algolia.com/api/v1/search?query=axios%20javascript";
// const url = "https://hn.algolia.com/api/v1/search?query=google";
// const url = "https://hn.algolia.com/api/v1/search?query=";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <React.Fragment>
      <form
        onSubmit={(event) => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
        >
          Search
        </Button>
      </form>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}

export default App;

// https://www.robinwieruch.de/react-hooks-fetch-data
