import React from "react";

export default function OrbitingCircles({
  children,
  radius = 120,
  iconSize = 50,
  speed = 20,
  reverse = false,
}) {
  const orbitClass = reverse ? "spin-reverse" : "spin";

  return (
    <>
      {/* Inline styles for keyframes (no tailwind.config.js needed) */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .spin {
            animation: spin ${speed}s linear infinite;
          }
          .spin-reverse {
            animation: spin-reverse ${speed}s linear infinite;
          }
        `}
      </style>

      <div className="relative w-full h-[400px] flex items-center justify-center">
        <div
          className={`relative ${orbitClass}`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
          }}
        >
          {React.Children.map(children, (child, i) => {
            const angle = (360 / children.length) * i;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius + radius - iconSize / 2;
            const y = Math.sin(rad) * radius + radius - iconSize / 2;

            return (
              <div
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}