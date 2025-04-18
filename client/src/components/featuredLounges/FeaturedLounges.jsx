import "./featuredLounges.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const FeaturedLounges = () => {
  const { data, loading, error } = useFetch("/lounges?featured=true&limit=3");
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/lounges/${id}`);
  };

  return (
    <div className="featuredLounges">
      {loading ? (
        "Loading featured lounges..."
      ) : (
        <>
          {data.map((lounge) => (
            <div
              className="featuredLoungesItem"
              key={lounge._id}
              onClick={() => handleClick(lounge._id)}
            >
              <img
                src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                alt={lounge.name}
                className="featuredLoungesImg"
              />
              <div className="featuredLoungesTitles">
                <h1>{lounge.name}</h1>
                <h2>{lounge.city}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedLounges;
