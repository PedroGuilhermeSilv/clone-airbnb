import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/service/apiService";
import { getUserId } from "@/app/lib/actions";
const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const property = await apiService.get(`/api/properties/${params.id}`);
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-6">
      <div className="w-full h-[64vh] mb-9 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.image_url}
          alt="property"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className=" pb-6 pr-6 col-span-3">
          <h1 className=" mb-4 text-4xl">{property.title}</h1>
          <span className=" mb-6 block text-lg  text-gray-600">
            {property.guests} guets - {property.bedrooms} bedrooms -{" "}
            {property.bathrooms} bathrooms
          </span>
          <hr />
          <Link
            href={`/landlords/${property.landlord.id}`}
            className=" py-6 flex  items-center space-x-4"
          >
            {property.landlord.avatar_url && (
              <Image
                width={50}
                height={50}
                src={property.landlord.avatar_url}
                alt="user"
                className=" rounded-full"
              />
            )}
            <p>
              <strong>{property.landlord.name}</strong> is your host
            </p>
          </Link>
          <hr />
          <p className=" mt-6 text-lg">{property.description}</p>
        </div>
        <ReservationSidebar userId={userId} property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
