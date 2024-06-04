"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const UploadImage = ({ link, setLink }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      try {
        setUploading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const url = await response.json();
          setLink((prev) => [...prev, url]);
          setUploading(false);
          return;
        }
        throw new Error("Algo salio mal");
      } catch (error) {
        setUploading(false);
        return error.message || "Hubo un error al subir la imagen";
      }
    }
  };
  return (
    <>
      <label>
        <input
          type="file"
          disabled={uploading}
          className={`hidden`}
          onChange={handleFileChange}
        />
        <p
          className={
            uploading
              ? `mt-2 pointer-events-none select-none w-full text-base font-semibold cursor-wait border border-gray-400 text-gray-400 px-4 py-2 rounded inline-flex items-center gap-1 justify-center`
              : `mt-2  w-full text-base font-semibold hover:bg-gray-300 cursor-pointer border border-blue-600 text-blue-600 px-4 py-2 rounded inline-flex items-center gap-1 justify-center`
          }
        >
          {uploading ? "" : <FontAwesomeIcon icon={faPlus} />}
          <span className="text-sm">
            {uploading ? "Loading file..." : "Add photo"}
          </span>
        </p>
      </label>
    </>
  );
};

export default UploadImage;
