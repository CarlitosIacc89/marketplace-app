"use client";
import AdItem from "@/components/AdItem";
import SearchForm from "@/components/SearchForm";
import { defaultRadius } from "@/libs/helpers";

import { useState } from "react";

export default function Home() {
  const [ads, setAds] = useState(null);

  async function fetchAds(params = new URLSearchParams()) {
    if (!params) {
      params = new URLSearchParams();
    }
    if (!params.get("center")) {
      return;
    }
    if (!params.has("radius")) {
      params.set("radius", defaultRadius.toString());
    }
    const url = `/api/ads?${params?.toString() || ""}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Hubo un error al obtener los datos");
      }
      const adsDocs = await res.json();
      return setAds(adsDocs);
    } catch (error) {
      const err = error.message || "Ups! Ocurrio un error";
      return err;
    }
  }

  function handleSearch(formData) {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });
    fetchAds(params);
  }

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <SearchForm action={handleSearch} />
      <div className="p-4 grow w-full sm:w-3/4 bg-gray-100 ">
        <h2 className="font-bold mb-4 text-center">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 justify-center">
          {ads &&
            ads.length > 0 &&
            ads.map((ad) => <AdItem key={ad._id} ad={ad} />)}
        </div>
        {ads && ads.length === 0 && (
          <div className="text-gray-300">No products Found...</div>
        )}
        {ads === null && <div className="text-gray-300">Loading...</div>}
      </div>
    </div>
  );
}
