import { useEffect, useState } from 'react';
import LocationForm from '../Location-Form/location-form';
import CharactersContainer from '../Characters-Container/Characters-container';
import styles from './main-container.module.css';

export default function MainContainer() {
  const [location, setLocation] = useState(null);
  const [background, setBackGround] = useState('');

  useEffect(() => {
    if (!location) return;
    if (location.id <= 50) {
      setBackGround(styles.less50);
    }
    if (location.id > 80) {
      setBackGround(styles.more80);
    }
    if (location.id > 50 && location.id <= 80) {
      setBackGround(styles.midling);
    }
  }, [location]);

  if (!location)
    return (
      <>
        <LocationForm
          location={Location}
          setLocation={setLocation}
        />
      </>
    );

  return (
    <div className={background}>
      <button
        onClick={() => {
          setLocation(null);
        }}>
        return
      </button>
      <CharactersContainer location={location} />
    </div>
  );
}
