import React from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

function Stats({ beginText, data, endText }) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/bills");
    // filter only unpaid bills later
  };

  const dataAnimation = useSpring({
    from: { number: 0 },
    to: { number: data },
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <div
      className="shadow-sm border border-solid rounded-lg border-gray-200 w-4/5 p-8 text-xl text-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-50"
      onClick={handleNavigation}
    >
      {beginText}
      <animated.span className="text-blue font-medium text-2xl px-2">
        {dataAnimation.number.to((n) =>
          Number(data) == data && data % 1 != 0 ? n.toFixed(2) : Math.round(n)
        )}
      </animated.span>
      {endText}
    </div>
  );
}

export default Stats;
