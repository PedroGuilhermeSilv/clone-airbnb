import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";

const NavBar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10 px-2">
      <div className="max-w-[1500px] mx-auto ">
        <div className="flex justify-between items-center">
          <Link href="">
            <Image width={180} height={38} alt="Logo bnb" src="/logo.png" />
          </Link>
          <div className="flex space-x-6">
            <SearchFilters />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
