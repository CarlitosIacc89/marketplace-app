import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteButton from "@/components/DeleteButton";
import Gallery from "@/components/Gallery";
import LocationMap from "@/components/LocationMap";
import NotFound from "@/components/NotFound";
import { connect } from "@/libs/helpers";
import { AddModel } from "@/models/Add";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const SingleAddPage = async ({ params }) => {
  await connect();
  const session = await getServerSession(authOptions);

  const addDoc = await AddModel.findById(params.id);
  if (!addDoc) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col sm:flex-row absolute inset-0 top-14">
      <Gallery files={addDoc.files} />
      <div className="w-full sm:w-2/5 p-8  sm:overflow-y-auto text-center sm:text-start ">
        <h1 className="text-lg font-bold">{addDoc?.title}</h1>
        {session && session?.user?.email === addDoc.userEmail && (
          <div className="flex mt-2 gap-2 edit justify-center sm:justify-start">
            <Link
              href={`/edit/${addDoc._id}`}
              className="border-blue-600 text-blue-600"
            >
              <FontAwesomeIcon icon={faPencil} />
              <span>Edit</span>
            </Link>
            <DeleteButton id={addDoc._id} />
          </div>
        )}
        <label>price</label>
        <p>${parseInt(addDoc.price).toLocaleString("es-ES")}</p>
        <label>category</label>
        <p>{addDoc?.category}</p>
        <label>Description</label>
        <p className="text-sm">{addDoc?.description}</p>
        <label>Contact</label>
        <p className="text-sm">{addDoc?.contact}</p>
        <label>Location</label>
        <LocationMap className="w-full h-44" location={addDoc.location} />
      </div>
    </div>
  );
};

export default SingleAddPage;
