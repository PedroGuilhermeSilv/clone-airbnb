"use client";

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "../../service/apiService";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const getPropertyList = async () => {
    const url = "/api/properties";
    const response = await apiService.get(url);

    setProperties(response.data);
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <>
      {properties.map((property) => {
        return <PropertyListItem key={property.id} property={property} />;
      })}
    </>
  );
};

export default PropertyList;
