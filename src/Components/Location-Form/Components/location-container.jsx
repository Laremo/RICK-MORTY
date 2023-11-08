import LocationCard from './location-card';

export default function LocationContainer({ locations, pages, setLocation }) {
  return (
    <>
      {locations.map((loc) => (
        <LocationCard
          key={loc.id}
          location={loc}
          setLocation={setLocation}
        />
      ))}
    </>
  );
}
