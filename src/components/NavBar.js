import Image from "next/image";

const NavBar = () => {
  return (
    <nav className=" flex justify-between w-full">
      <Image
        src="/images/s-icon.png"
        width={27}
        height={38}
        alt="s-icon"
        priority
      />

      <Image
        src="/images/hv-circle.png"
        width={40}
        height={38}
        alt="hivoco circular logo"
        priority
      />
    </nav>
  );
};

export default NavBar;
