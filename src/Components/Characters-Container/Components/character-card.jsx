import { useState } from 'react';
import styles from './character-card.module.css';
import CharacterModal from '../../Character-Modal/character-modal';

export default function CharacterCard({ character }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (mode) => {
    if (!mode) return;
    if (mode === 'close') {
      setShowModal(false);
      return;
    }
    if (mode === 'open') {
      setShowModal(true);
      return;
    }
  };

  return (
    <>
      <div
        className={styles.charCard}
        onClick={() => {
          toggleModal('open');
        }}>
        <img
          src={character.image}
          alt={character.name}
        />
        <h3>Name: {character.name}</h3>
        <h5>Status: {character.status}</h5>
        <h5>Species: {character.species}</h5>
        <h5>Origin: {character.origin.name}</h5>
      </div>
      {showModal ? (
        <CharacterModal
          character={character}
          toggleModal={toggleModal}
        />
      ) : null}
    </>
  );
}
