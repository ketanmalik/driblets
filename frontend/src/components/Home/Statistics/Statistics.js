import React, { useLayoutEffect, useRef, useState } from "react";
import StatsData from "../../UI/StatsData/StatsData";
import "./Statistics.css";

const Statistics = () => {
  const [show, doShow] = useState({ animate: false });
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const divPos = divRef.current.getBoundingClientRect().top;
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      if (divPos < scrollPos) {
        doShow((state) => ({ ...state, animate: true }));
      } else {
        doShow((state) => ({ ...state, animate: false }));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={divRef}
      className={`statistics-wrapper-${show.animate ? `visible` : `hidden`}`}
    >
      <StatsData
        icon={
          <i style={{ color: "#257ac0" }} className="fas fa-users fa-5x"></i>
        }
        header="80+"
        content="Residents reported leakage incidents"
      />
      <StatsData
        icon={
          <i style={{ color: "#257ac0" }} className="fas fa-passport fa-5x"></i>
        }
        header="100+"
        content="Recorded incidents in the country"
      />
      <StatsData
        icon={
          <i
            style={{ color: "#257ac0" }}
            className="fas fa-hand-holding-water fa-5x"
          ></i>
        }
        header="200+"
        content="Gallons of water saved due to rapid response"
      />
    </div>
  );
};

export default Statistics;
