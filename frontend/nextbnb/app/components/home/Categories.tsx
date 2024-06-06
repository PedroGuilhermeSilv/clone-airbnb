import Image from "next/image";
const Categories = () => {
  return (
    <div className="cursor-pointer pt-3 pb-6 flex items-center space-x-12">
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Beach</span> 
      </div>
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Villas</span>  
      </div>
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Cabins</span> 
      </div>
    </div>
  );
};

export default Categories;
