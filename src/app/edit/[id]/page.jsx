import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdForm from "@/components/AdForm";
import NotFound from "@/components/NotFound";
import { connect } from "@/libs/helpers";
import { AddModel } from "@/models/Add";
import { getServerSession } from "next-auth";
import React from "react";

const EditPage = async ({ params }) => {
  const id = params.id;
  await connect();

  const session = await getServerSession(authOptions);
  const adDoc = await AddModel.findById(id);
  if (!adDoc) {
    return <NotFound />;
  }
  if (session?.user?.email !== adDoc?.userEmail) {
    return "Not yours";
  }
  return (
    <AdForm
      id={adDoc._id}
      defaultFiles={adDoc.files}
      defaultLocation={adDoc.location}
      defaultText={adDoc}
    />
  );
};

export default EditPage;
