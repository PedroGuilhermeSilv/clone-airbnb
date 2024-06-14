"use client";

import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "../../service/apiService";
import { getUserId } from "@/app/lib/actions";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  favorited: boolean;
};

interface PropertyListProps {
  landloard?: string;
}
const PropertyList: React.FC<PropertyListProps> = ({ landloard }) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [userId, setUserId] = useState<string | undefined>();
  const markAsFavorite = (id: string, favorited: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id === id) {
        property.favorited = favorited;
        if (favorited) {
          console.log("Add to favorite list");
        } else {
          console.log("Remove from favorite list");
        }
      }
      return property;
    });
    setProperties(tmpProperties);
  };
  const getPropertyList = async () => {
    const id = await getUserId();
    let url = "/api/properties";
    if (landloard) {
      url = `/api/properties?landloard=${landloard}`;
    } else if (id) {
      url = `/api/properties?favorited=${id}`;
    }

    const response = await apiService.get(url);

    setProperties(response.data);
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
            markFavorite={(favorited: any) =>
              markAsFavorite(property.id, favorited)
            }
          />
        );
      })}
    </>
  );
};

export default PropertyList;
