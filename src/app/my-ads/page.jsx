import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connect } from "@/libs/helpers";
import { AddModel } from "@/models/Add";
import AdItem from "@/components/AdItem";

const MyAdsPage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return "No email found";
  }
  await connect();
  const adDocs = await AddModel.find({ userEmail: email });

  return (
    <div className="container mt-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your ads</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-4">
        {adDocs.map((ad) => (
          <AdItem key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default MyAdsPage;
