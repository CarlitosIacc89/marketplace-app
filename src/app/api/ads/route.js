import { connect } from "@/libs/helpers";
import { AddModel } from "@/models/Add";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  await connect();
  const phrase = req.nextUrl.searchParams.get("phrase") || null;
  const category = req.nextUrl.searchParams.get("category") || null;
  const min = req.nextUrl.searchParams.get("min") || null;
  const max = req.nextUrl.searchParams.get("max") || null;
  const radius = req.nextUrl.searchParams.get("radius") || null;
  const center = req.nextUrl.searchParams.get("center") || null;

  const filter = {};
  const aggregationSteps = [];
  if (phrase) {
    filter.title = { $regex: `.*` + phrase + `.*`, $options: "i" };
  }
  if (category) {
    filter.category = category;
  }
  if (min && !max) filter.price = { $gte: min };
  if (!min && max) filter.price = { $lte: max };
  if (min && max) filter.price = { $gte: min, $lte: max };
  if (radius && center) {
    const coords = center.split("_");
    const lat = parseFloat(coords[0]);
    const lng = parseFloat(coords[1]);

    aggregationSteps.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lat, lng],
        },
        distanceField: "distance",
        maxDistance: parseInt(radius),
        spherical: true,
      },
    });
  }

  aggregationSteps.push({
    $match: filter,
  });
  aggregationSteps.push({
    $sort: { createdAt: -1 },
  });

  const adsDocs = await AddModel.aggregate(aggregationSteps);

  if (!adsDocs) {
    return NextResponse.json({ message: "Hubo un error" });
  }

  return NextResponse.json(adsDocs);
}

export async function DELETE(req) {
  await connect();
  const _id = req.nextUrl.searchParams.get("id") || null;

  const adDoc = await AddModel.findById(_id);
  const session = await getServerSession(authOptions);
  if (!adDoc || adDoc?.userEmail !== session?.user?.email) {
    return NextResponse.json(false);
  }
  await AddModel.findByIdAndDelete(_id);
  return NextResponse.json("Articulo eliminado");
}
