import { useEffect } from 'react';
import styles from './character-modal.module.css';
import { useState } from 'react';

export default function CharacterModal({ character, toggleModal }) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const episodes = character.episode;
    let episodesID = '';
    for (let i = 0; i < character.episode.length; i++) {
      if (i === 3) break;
      const index = episodes[i].lastIndexOf('/') + 1;
      episodesID += episodes[i].slice(index) + ',';
    }
    console.log(episodesID);
  }, []);

  return (
    <>
      <div className={styles.modal}>
        <button onClick={() => toggleModal('close')}>X</button>
        <div>
          <img src={character.image}></img>
        </div>
        <div>
          <h2>Name: {character.name}</h2>
          <h3>Status: {character.status}</h3>
          <h3>Species: {character.species}</h3>
          <h3>Origin: {character.origin.name}</h3>
          <div>
            <h3>Episodes:</h3>
            {}
          </div>
        </div>
      </div>
      <span
        className={styles.modalBackground}
        onClick={() => toggleModal('close')}></span>
    </>
  );
}
