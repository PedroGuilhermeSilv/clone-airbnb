import Image from "next/image";
const MyReservationsPage = () => {
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-4">
      <h1 className="pt-6 my-6 text-2xl"> My reservations</h1>
      <div className="space-y-4">
        <div className=" mt-4 border shadow-md grid grid-cols-4 gap-4 p-5 border-gray-300 rounded-xl">
          <div className="col-span-4 md:col-span-1">
            <div className="relative overflow-hidden aspect-square rounded-xl">
              <Image
                fill
                src="/beach_1.jpg"
                alt="Property"
                className="hover:scale-110 object-cover rounded-xl transition w-full h-full"
              />
            </div>
          </div>
          <div className="col-span-3 space-y-2">
            <h2 className="mb-4 text-xl">Property Name</h2>
            <p>
              <strong>Check in date:</strong> 20/05/2024
            </p>
            <p>
              <strong>Check out date:</strong> 20/05/2024
            </p>
            <p>
              <strong>Number of nigths:</strong> 12
            </p>
            <p className="pb-4">
              <strong>Total price:</strong> $1200
            </p>
            <div className="mt-4 border rounded-xl inline-block bg-airbnb p-5 cursor-pointer text-white">
              Go to property
            </div>
          </div>
        </div>
      <div className=" mt-4 border shadow-md grid grid-cols-4 gap-4 p-5 border-gray-300 rounded-xl">
        <div className="col-span-4 md:col-span-1">
          <div className="relative overflow-hidden aspect-square rounded-xl">
            <Image
              fill
              src="/beach_1.jpg"
              alt="Property"
              className="hover:scale-110 object-cover rounded-xl transition w-full h-full"
            />
          </div>
        </div>
        <div className="col-span-3 space-y-2">
          <h2 className="mb-4 text-xl">Property Name</h2>
          <p>
            <strong>Check in date:</strong> 20/05/2024
          </p>
          <p>
            <strong>Check out date:</strong> 20/05/2024
          </p>
          <p>
            <strong>Number of nigths:</strong> 12
          </p>
          <p className="pb-4">
            <strong>Total price:</strong> $1200
          </p>
          <div className="mt-4 border rounded-xl inline-block bg-airbnb p-5 cursor-pointer text-white">
            Go to property
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default MyReservationsPage;
