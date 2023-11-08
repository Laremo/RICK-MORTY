import { useState } from 'react';
import LocationContainer from './Components/location-container';
import PageController from './Components/page-controller';

export default function LocationForm({ setLocation }) {
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
    setError(null);

    if (searchValue.trim() === '') return;
    fetch('https://rickandmortyapi.com/api/location/?name=' + searchValue)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError('Sin resultados para la búsqueda');
          setLocations([]);
          return;
        } else {
          const prev = data.info.prev;
          const next = data.info.next;
          setPageControl({ prev, next });
          setPages(data.info.pages);
          setLocations(data.results);
        }
      });
  };

  return (
    <>
      <form onSubmit={manageSearch}>
        <label>Selecciona o busca una localizacion</label>
        <input
          type='text'
          value={searchValue}
          onChange={manageChangeSearch}
        />
        <button>Buscar</button>
      </form>
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
