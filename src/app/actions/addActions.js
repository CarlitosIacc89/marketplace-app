"use server";

//import { AddModel } from "@/models/add";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AddModel } from "@/models/Add";
import { connect } from "../../libs/helpers";
import { revalidatePath } from "next/cache";

export async function createAdd(formData) {
  await connect();
  const { location, files, ...data } = Object.fromEntries(formData);

  const session = await getServerSession(authOptions);

  const addData = {
    ...data,
    files: JSON.parse(files),
    location: JSON.parse(location),
    userEmail: session?.user?.email,
  };
  const addDoc = await AddModel.create(addData);

  return JSON.parse(JSON.stringify(addDoc));
}

export async function updateAd(formData) {
  await connect();
  const { _id, location, files, ...data } = Object.fromEntries(formData);
  const session = await getServerSession(authOptions);
  const adDoc = await AddModel.findById(_id);

  if (!adDoc || adDoc.userEmail !== session?.user?.email) {
    return;
  }

  const addData = {
    ...data,
    files: JSON.parse(files),
    location: JSON.parse(location),
  };
  const newAdDoc = await AddModel.findByIdAndUpdate(_id, addData);
  revalidatePath(`/ad/${_id}`);
  return JSON.parse(JSON.stringify(newAdDoc));
}
