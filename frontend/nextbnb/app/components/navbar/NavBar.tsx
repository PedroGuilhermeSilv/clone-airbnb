import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";

const NavBar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-3">
        <div className="flex justify-between items-center">
          <Link href="">
            <Image width={180} height={38} alt="Logo bnb" src="/logo.png" />
          </Link>
          <div className="flex space-x-6">
            <SearchFilters></SearchFilters>
          </div>
          <div className="flex space-x-6">Add property</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
