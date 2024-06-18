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
  favorites?: boolean;
}
const PropertyList: React.FC<PropertyListProps> = ({
  landloard,
  favorites,
}) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
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
    } else if (favorites) {
      url = `/api/properties?favorites=${favorites}`;
    }

    const response = await apiService.get(url);

    setProperties(
      response.data.map((property: PropertyType) => {
        if (response.favorites.includes(property.id)) {
          property.favorited = true;
        } else {
          property.favorited = false;
        }
        return property;
      })
    );
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
