import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <Link href={"/"}>
      <nav className=" flex justify-between w-full">
        <Image
          className="h-[38px] w-auto"
          src="/images/s-icon.png"
          width={27}
          height={38}
          alt="s-icon"
          priority
        />

        <Image
          className="h-[38px] w-auto"
          src="/images/hv-circle-white.png"
          width={38}
          height={38}
          alt="hivoco circular logo"
          priority
        />
      </nav>
    </Link>
  );
};

export default NavBar;
