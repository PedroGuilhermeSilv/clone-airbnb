import Image from "next/image";
import ContactButton from "@/app/components/landlords/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
const LandLordDetaiPage = () => {
  return (
    <main className="max-w-[1500px] mb-6 mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 border rounded-xl shadow-xl border-gray-300">
            <Image
            src="/profile_pic_1.jpg"
            alt="LandLord"
            width={200}
            height={200}
            className="rounded-full"/>
          <h1 className="mt-6 text-2xl"> LandLord Name</h1>
          <ContactButton/>
          </div>
        </aside>
        <div className="grid grid-cols-2 col-span-3 gap-4  md:grid-cols-4 ">
          <PropertyList />
        </div>
      </div>
    </main>
  );
};

export default LandLordDetaiPage;
