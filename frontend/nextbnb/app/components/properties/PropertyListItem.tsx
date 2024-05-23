import Image from "next/image";
const PropertyListItem = () => {

    return <div className="cursor-pointer" >
        <div className=" relative overflow-hidden aspect-square rounded-xl">
            <Image
                fill
                src="/beach_1.jpg"
                sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                alt="property"
                className="object-cover hover:scale-110 w-full h-full transition"
            />
        </div>
        <div className="mt2">
            <p className="text-lg font-bold"> Title</p>

        </div>
        <div className="mt2">
            <p className="text-sm text-gray-500"> <strong>Price $200</strong></p>
    </div>
    </div>
}

export default PropertyListItem;