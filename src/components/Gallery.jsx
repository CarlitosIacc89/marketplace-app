"use client";
import {
  faChevronCircleLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ files }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length
    );
  };

  return (
    <div
      className="w-full sm:w-3/5 grow text-white bg-no-repeat bg-cover flex flex-col items-center relative"
      style={{ backgroundImage: `url(${files[activeIndex]})` }}
    >
      <div className="absolute inset-0 bg-black/85"></div>
      <div className="grow flex items-center p-8 relative">
        {files.length > 0 && (
          <>
            <div className="w-full lg:w-[680px]">
              <Image
                src={files[activeIndex]}
                width={1280}
                height={1280}
                alt="imagen"
                className="w-full max-h-[500px]"
              />
            </div>
            <div className="absolute inset-4 flex items-center justify-between">
              <button onClick={prev}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  className="h-8 hover:text-gray-300 transition-all duration-300"
                />
              </button>
              <button onClick={next}>
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className="h-8 hover:text-gray-300 transition-all duration-300"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex gap-4 z-10">
        {files.map((file, index) => (
          <div
            key={index}
            className={`rounded overflow-hidden cursor-pointer ${
              activeIndex === index && "border-2 border-white"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={file}
              width={100}
              height={100}
              alt="image"
              className="size-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
