// "use server";
import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCar,
  faHome,
  faMobile,
  faTShirt,
} from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect() {
  return await mongoose.connect(process.env.MONGODB_URL);
}

export const categories = [
  { key: "cars", label: "Cars", icon: faCar },
  { key: "electronics", label: "Electronics", icon: faMobile },
  { key: "properties", label: "Properties", icon: faHome },
  { key: "clothes", label: "Clothes", icon: faTShirt },
];

export const defaultRadius = 50 * 1000;
