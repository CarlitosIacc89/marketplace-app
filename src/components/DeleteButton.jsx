"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ id }) => {
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    fetch(`/api/ads?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      setShowDeleteQuestion(false);
      router.push("/");
    });
  };

  if (showDeleteQuestion) {
    return (
      <div className="bg-black/90 inset-0 fixed flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-md">
          <h2>Do you really want to delete this ad?</h2>
          <div className="flex justify-center gap-2 mt-2">
            <button
              className="py-1 px-2 bg-red-600 text-white rounded"
              onClick={handleDelete}
            >
              Yes, delete!
            </button>
            <button
              className="px-2 py-1 border rounded "
              onClick={() => setShowDeleteQuestion(false)}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setShowDeleteQuestion(true)}
      className="border-red-600 text-red-600 border rounded-md py-1 px-4 inline-flex items-center gap-1 cursor-pointer"
    >
      <FontAwesomeIcon icon={faTrash} />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
