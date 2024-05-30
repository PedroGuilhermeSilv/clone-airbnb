import Image from "next/image";
import { PropertyType } from "./PropertyList";
import React from "react";

interface PropertyListItemProps {
  property: PropertyType;
}
const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
  return (
    <div className="cursor-pointer">
      <div className=" relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={property.image_url}
          sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
          alt="property"
          className="object-cover hover:scale-110 w-full h-full transition"
        />
      </div>
      <div className="mt2">
        <p className="text-lg font-bold"> {property.title}</p>
      </div>
      <div className="mt2">
        <p className="text-sm text-gray-500">
          {" "}
          <strong>Price ${property.price_per_night}</strong>
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
