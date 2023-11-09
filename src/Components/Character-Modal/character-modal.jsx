import { useEffect } from 'react';
import styles from './character-modal.module.css';
import { useState } from 'react';

export default function CharacterModal({ character, toggleModal }) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    let episodesID = [];
    for (let i = 0; i < character.episode.length; i++) {
      if (i === 3) break;
      //   const index = episodes[i].lastIndexOf('/') + 1;
      //   episodesID += episodes[i].slice(index) + ',';
      episodesID.push(character.episode[i]);
    }
    setEpisodes(episodesID);
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
          <div className={styles.episodesContainer}>
            <h3>Episodes:</h3>
            <ul>
              {episodes.map((episode, i) => (
                <li
                  key={i}
                  className={styles.episode}>
                  <a href={episode}>{episode}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <span
        className={styles.modalBackground}
        onClick={() => toggleModal('close')}></span>
    </>
  );
}
