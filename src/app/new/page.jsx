"use client";

import React from "react";

import AdForm from "@/components/AdForm";

const locationDefault = { lat: -31.3995427760327, lng: -64.18568939852453 };

const NewAdPage = () => {
  return <AdForm defaultLocation={locationDefault} />;
};

export default NewAdPage;
