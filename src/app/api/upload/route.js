import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json("No se selecciono ningun archivo", {
      status: 404,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `marketplace/${file.name}`,
          resource_type: "image",
          tags: "marketplace",
        },
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  return NextResponse.json(response.secure_url);
}
