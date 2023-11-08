import styles from './location-container.module.css';

export default function LocationCard({ location, setLocation }) {
  const manageLocationSelection = (e) => {
    e.preventDefault();
    setLocation(location);
  };

  return (
    <div
      className={styles.row}
      onClick={manageLocationSelection}>
      <h2>{location.name}</h2>
      <h4>Tipo: {location.type}</h4>
      <h4>Dimensión: {location.dimension}</h4>
    </div>
  );
}
