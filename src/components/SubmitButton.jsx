import React from "react";
import { useFormStatus } from "react-dom";
import Spinner from "./icon/Spinner";

const SubmitButton = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className=" mt-2 w-[105px] bg-blue-600 text-white px-3 py-2 rounded "
      >
        {pending ? (
          <div className="flex w-full justify-between items-center">
            Saving
            <Spinner size="w-5 h-5" />
          </div>
        ) : (
          <span>{children}</span>
        )}
      </button>
    </>
  );
};

export default SubmitButton;
