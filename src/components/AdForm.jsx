"use client";
import React, { useState } from "react";
import UploadArea from "./UploadArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import LocationPicker from "./LocationPicker";
import AddTextInputs from "./AddTextInputs";
import SubmitButton from "./SubmitButton";
import { updateAd } from "@/app/actions/addActions";
import { redirect } from "next/navigation";

const AdForm = ({ defaultFiles, defaultLocation, defaultText, id }) => {
  const [files, setFiles] = useState(defaultFiles || []);
  const [location, setLocation] = useState(defaultLocation);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (formData) => {
    formData.set("location", JSON.stringify(location));
    formData.set("files", JSON.stringify(files));

    if (id) {
      formData.set("_id", id);
    }

    const result = id ? await updateAd(formData) : await createAdd(formData);
    redirect(`/ad/${result._id}`);
  };

  return (
    <form
      action={handleSubmit}
      className="max-w-xl flex flex-col sm:flex-row mx-auto gap-12 break-words justify-center items-center sm:items-start mb-12 sm:mb-0"
    >
      <div className="grow pt-8 w-[75%] sm:w-[50%]">
        <UploadArea {...{ files, setFiles }} />
        <div className="grow mt-8">
          <div className="mt-2  min-h-12 rounded overflow-hidden text-gray-400 text-center">
            <div className="flex justify-between items-center mb-1">
              <label className="m-0 p-2">Where is it located?</label>
              <div>
                <button
                  type="button"
                  className=" border p-1 text-gray-600 rounded"
                  onClick={handleGeolocation}
                >
                  <FontAwesomeIcon
                    icon={faLocationCrosshairs}
                    className="h-5 flex items-center"
                  />
                </button>
              </div>
            </div>
            <LocationPicker {...{ location, setLocation }} />
          </div>
        </div>
      </div>
      <div className="grow pt-2  w-[75%] sm:w-[50%]">
        <AddTextInputs defaultValues={defaultText} />
        <SubmitButton>{id ? "Save" : "Publish"}</SubmitButton>
      </div>
    </form>
  );
};

export default AdForm;
