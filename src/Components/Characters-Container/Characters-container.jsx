import { useEffect, useState } from 'react';
import CharacterCard from './Components/character-card';
import styles from './characters-container.module.css';

export default function CharactersContainer({ location }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const residents = location.residents;
    let searchIds = '';
    if (!residents || !residents.length) {
      console.log('nada jaja');
    }
    for (let i = 0; i < residents.length; i++) {
      if (i === 5) break;
      const index = residents[i].lastIndexOf('/') + 1;
      searchIds += residents[i].slice(index) + ',';
    }

    fetch('https://rickandmortyapi.com/api/character/' + searchIds)
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  if (!location.residents || !location.residents.length) {
    return <h1> {location.name} no tiene habitantes</h1>;
  }

  return (
    <div className={styles.container}>
      <h1>Habitantes de {location.name}</h1>
      <div className={styles.charBox}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
          />
        ))}
      </div>
    </div>
  );
}
