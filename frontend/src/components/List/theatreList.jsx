import { useEffect, useState } from "react";
import { getTheatresByCity } from "../../services/theatreAPI";
import { useCity } from "../../context/CityContext";

import './theatreList.css'
const TheatreList = () => {
  const { selectedCity } = useCity();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCity?._id) {
      setTheatres([]);
      return;
    }

    const fetchTheatres = async () => {
      setLoading(true);
      try {
        const data = await getTheatresByCity(selectedCity._id);
        setTheatres(data);
      } catch (err) {
        console.error("Failed to fetch theatres", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [selectedCity]);

  if (!selectedCity) {
    return <p>Please select a city to see theatres.</p>;
  }

  if (loading) return <p>Loading theatres...</p>;

  return (
    <div>
      <h2>Theatres in {selectedCity.name}</h2>

      {theatres.length === 0 && <p>No theatres available</p>}

      {theatres.map((theatre) => (
        <div key={theatre._id}>
          <h4>{theatre.name}</h4>
          <p>{theatre.address}</p>
        </div>
      ))}
    </div>
  );
};

export default TheatreList;
