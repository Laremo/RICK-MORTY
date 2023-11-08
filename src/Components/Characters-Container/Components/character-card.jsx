import styles from './character-card.module.css';

export default function CharacterCard({ character }) {
  return (
    <div className={styles.charCard}>
      <img
        src={character.image}
        alt={character.name}
      />
      <h3>Nombre: {character.name}</h3>
      <h5>Estado: {character.status}</h5>
      <h5>Especie: {character.species}</h5>
      <h5>Origen: {character.origin.name}</h5>
    </div>
  );
}
