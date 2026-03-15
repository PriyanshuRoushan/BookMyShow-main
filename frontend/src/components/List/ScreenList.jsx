import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScreensByTheatre } from "../../services/screenAPI.js";

const ScreenList = () => {
  const { theatreId } = useParams();
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!theatreId) return;

    const fetchScreens = async () => {
      setLoading(true);
      try {
        const data = await getScreensByTheatre(theatreId);
        setScreens(data);
      } catch (err) {
        console.error("Failed to fetch screens", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, [theatreId]);

  if (loading) return <p>Loading screens...</p>;

  return (
    <div>
      <h2>Screens</h2>

      {screens.length === 0 && <p>No screens available</p>}

      {screens.map((screen) => (
        <div key={screen._id}>
          <h4>{screen.name}</h4>
          <p>Type: {screen.screenType}</p>
        </div>
      ))}
    </div>
  );
};

export default ScreenList;
