"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ColourfulText } from "./colourful-text";
import { ContainerTextFlip } from "./container-text-flip";

export const HeroParallax = ({
  products
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  
  return (
    <div
      ref={ref}
      className="h-[330vh] py-0 antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] mb-0 overflow-hidden">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="overflow-hidden">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <div className="min-h-max bg-gray-300 flex justify-center p-8 rounded-lg shadow-lg dark:bg-neutral-800">
        <ColourfulText
          text="Hello, I'm Wajid Ali"
          className="text-7xl font-bold tracking-tight text-center block"
        />
      </div>

      {/* Row with gradient + flip text + gradient */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10 text-center">
        <h1 className="text-2xl md:text-7xl font-bold text-black">
          Crafting Exceptional
        </h1>

        <ContainerTextFlip
          className="mx-2"
          textClassName="bg-gradient-to-r from-fuchsia-500 via-red-500 to-yellow-500 bg-clip-text text-black"
          words={[
            "SaaS",
            "CRM",
            "ERP",
            "E-commerce",
            "Messaging",
            "Mobile Apps",
            "Frontend",
            "Backend",
            "Full Stack",
          ]}
        />

        <h1 className="text-2xl md:text-7xl font-bold text-black">
          Digital Experiences
        </h1>
      </div>

      <div className="flex justify-center">
        <p className="text-center text-base md:text-xl mt-8 dark:text-neutral-200">
          I design and build fast, elegant, and scalable web products that solve
          real-world problems. Whether you're launching a startup or refining an
          existing product — I bring your ideas to life with precision and care.
        </p>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -15 }}
      key={product.title}
      className="group/product h-48 w-56 relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          width="224"
          height="192"
          alt={product.title}
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
      <h2 className="absolute bottom-3 left-3 opacity-0 group-hover/product:opacity-100 text-white text-sm font-medium">
        {product.title}
      </h2>
    </motion.div>
  );
};