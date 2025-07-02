"use client";

import React, { createContext, useContext, useRef } from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Update or replace with your own classNames function if needed

const Card3DContext = createContext({});

export const CardContainer = ({ children, className, containerClassName }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    mouseX.set(x);
    mouseY.set(y);

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Card3DContext.Provider value={{ rotateX, rotateY, mouseX, mouseY }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative flex items-center justify-center", containerClassName)}
        style={{
          perspective: 1000,
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={cn("relative w-full", className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </Card3DContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Comp = motion.div,
  children,
  className,
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateZ = 0,
  ...rest
}) => {
  const { rotateX: rx, rotateY: ry } = useContext(Card3DContext);
  const transform = useMotionTemplate`translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;

  return (
    <Comp
      {...rest}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </Comp>
  );
};