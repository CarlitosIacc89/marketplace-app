import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UploadImage from "./UploadImage";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const UploadArea = ({ files, setFiles }) => {
  return (
    <div className="bg-gray-100 p-4 rounded text-wrap">
      <h2 className="text-center text-xs text-gray-400 font-bold uppercase">
        Add photos your product
      </h2>
      <div className="flex flex-col">
        <FontAwesomeIcon icon={faImage} className="h-24 text-gray-300" />

        <UploadImage link={files} setLink={setFiles} />
      </div>
      <div className="flex gap-2 flex-wrap mt-2">
        {files?.map((file, index) => (
          <div key={index} className="rounded overflow-hidden">
            <Link href={file} target="_blank">
              <Image
                src={file}
                width={100}
                height={100}
                alt="image"
                className="size-16 object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadArea;
