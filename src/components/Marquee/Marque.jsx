import Marquee from "react-fast-marquee";
import "./Marquee.scss";
import { useEffect, useState } from "react";
import Api_Service from "../../Service/api_service";
const Marque = ({ url }) => {
  const [posters, setPosters] = useState()


  const getApi = async () => {
    let request = await Api_Service.getData(url);
    setPosters(request.results);
  };

  useEffect(() => {
    getApi();
  }, []);


  

  return (
    <div className="bg-black overflow-hidden flex items-center ">
      <Marquee
        speed={30}
        gradient={false}
        pauseOnHover={false}
        direction="left"
      >
        {posters &&
          posters.map((item) => (
            <img
              key={item.id + Math.random() * 1500}
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt={`poster-${item.overview}`}
              className="morque-img w-[151px] h-[226px] object-cover rounded-xl mx-[5px] poster-img"
            />
          ))}
      </Marquee>
    </div>
  );
};

export default Marque;
