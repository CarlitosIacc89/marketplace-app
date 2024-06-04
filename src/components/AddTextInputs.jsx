import { categories } from "@/libs/helpers";
import React from "react";

const AddTextInputs = ({ defaultValues }) => {
  return (
    <>
      <label htmlFor="titleIn">Title</label>
      <input
        id="titleIn"
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={defaultValues && defaultValues.title}
      />

      <label htmlFor="priceIn">Price</label>
      <input
        id="priceIn"
        type="number"
        name="price"
        placeholder="Price"
        defaultValue={defaultValues && defaultValues.price}
      />

      <label htmlFor="categoryIn">Category</label>
      <select
        name="category"
        id="categoryIn"
        defaultValue={(defaultValues && defaultValues.category) || ""}
      >
        <option disabled value="">
          Select category
        </option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.key}>
            {cat.label}
          </option>
        ))}
      </select>

      <label htmlFor="descriptionIn">Description</label>
      <textarea
        name="description"
        id="descriptionIn"
        placeholder="Description"
        defaultValue={defaultValues && defaultValues.description}
      ></textarea>

      <label htmlFor="contactIn">Contact information</label>
      <textarea
        name="contact"
        id="contactIn"
        placeholder="mobile: 3514599655"
        defaultValue={defaultValues && defaultValues.contact}
      ></textarea>
    </>
  );
};

export default AddTextInputs;
