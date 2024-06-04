import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdItem = ({ ad }) => {
  return (
    <div className="min-h-24 flex flex-col">
      {ad?.files?.length > 0 && (
        <>
          <Link
            href={`/ad/${ad._id}`}
            className="rounded-md overflow-hidden w-40 mx-auto"
          >
            <Image
              src={ad.files[0]}
              height={500}
              width={500}
              alt="image"
              className="w-full size-32 object-cover"
            />
          </Link>
          <div className="mx-auto text-center">
            <p className="mt-1 font-bold">${ad.price}</p>
            <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdItem;
