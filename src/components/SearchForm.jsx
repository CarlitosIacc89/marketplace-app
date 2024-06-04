import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { categories, defaultRadius } from "@/libs/helpers";
import DistancePicker from "./DistancePicker";

const SearchForm = ({ action }) => {
  const [radius, setRadius] = useState(defaultRadius);
  const [center, setCenter] = useState(null);
  const [prevCenter, setPrevCenter] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (center && !prevCenter) {
      formRef.current?.requestSubmit();
      setPrevCenter(center);
    }
  }, [center]);

  return (
    <form
      ref={formRef}
      className="bg-white grow w-full sm:w-1/4 p-4 border-r flex-col gap-4"
      action={action}
    >
      <input
        type="text"
        name="phrase"
        className="rounded mb-4"
        placeholder="Search Marketplace"
      />
      <div className="mx-auto sm:mx-0 flex sm:flex-col justify-center">
        <label className="radio-btn group">
          <span className="icon group-has-[:checked]:bg-blue-500 group-has-[:checked]:text-white">
            <FontAwesomeIcon icon={faStore} />
          </span>
          <input
            onClick={() => formRef.current.requestSubmit()}
            type="radio"
            name="category"
            className="hidden"
            value={""}
            defaultChecked
          />
          <span className="hidden sm:block">All categories</span>
        </label>
        {categories.map(({ key, label, icon }) => (
          <label key={key} className="radio-btn group">
            <span className="icon group-has-[:checked]:bg-blue-500 group-has-[:checked]:text-white">
              <FontAwesomeIcon icon={icon} />
            </span>
            <input
              onClick={() => formRef.current.requestSubmit()}
              type="radio"
              className="hidden"
              name="category"
              value={key}
            />
            <span className="hidden sm:block">{label}</span>
          </label>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-center sm:text-start">Filter by price</label>
        <div className="flex gap-4">
          <input name="min" type="number" placeholder="min" />
          <input name="max" type="number" placeholder="max" />
        </div>
      </div>
      <div>
        <input type="hidden" name="radius" value={radius} />
        <input
          type="hidden"
          name="center"
          value={`${center?.lat}_${center?.lng}`}
        />
        <DistancePicker
          onChange={({ center, radius }) => {
            setRadius(radius);
            setCenter(center);
          }}
          defaultRadius={defaultRadius}
        />
      </div>
      <div className="w-full text-center sm:text-start">
        <SubmitButton>Search</SubmitButton>
      </div>
    </form>
  );
};

export default SearchForm;
