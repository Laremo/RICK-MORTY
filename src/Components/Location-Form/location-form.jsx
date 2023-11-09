import { useState } from 'react';
import LocationContainer from './Components/location-container';
import PageController from './Components/page-controller';

export default function LocationForm({ setLocation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState([]);
  const [pageControl, setPageControl] = useState({});

  const manageChangeSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const managePageNav = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const prev = data.info.prev;
        const next = data.info.next;
        setPageControl({ prev, next });
        setPages(data.info.pages);
        setLocations(data.results);
      });
  };

  const manageSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() === '') return;

    setError(null);
    setIsLoading(true);

    let searchURL = '';

    const searchByName = isNaN(Number(searchValue.trim()));
    if (searchByName)
      searchURL = 'https://rickandmortyapi.com/api/location/?name=';
    else searchURL = 'https://rickandmortyapi.com/api/location/';

    fetch(searchURL + searchValue)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError('This location does not exist');
          setLocations([]);
          return;
        } else {
          if (!searchByName) {
            setLocations([data]);
            return;
          }
          const prev = data?.info.prev;
          const next = data?.info?.next;
          setPageControl({ prev, next });
          setPages(data.info.pages);
          setLocations(data.results);
        }
      });
  };

  return (
    <>
      <form onSubmit={manageSearch}>
        <label>Search for a location: </label>
        <input
          type='text'
          value={searchValue}
          placeholder='enter a name or id'
          onChange={manageChangeSearch}
        />
        <button>Search</button>
      </form>

      {isLoading ? <h2>Loading...</h2> : null}

      {error ? <h3>{error}</h3> : null}

      {locations.length > 0 ? (
        <LocationContainer
          locations={locations}
          pages={pages}
          setLocation={setLocation}
        />
      ) : null}

      {pages > 1 ? (
        <PageController
          current={currentPage}
          pageControl={pageControl}
          managePageNav={managePageNav}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
}
