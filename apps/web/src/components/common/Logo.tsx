import Link from "next/link";

interface Props {
  isMobile?: boolean;
}

const Logo = ({ isMobile }: Props) => {
  return (
    <Link href={"/"}>
      <div className="flex gap-2 items-center">
        <img src="/images/pin.svg" width={26} height={26} alt="logo" />
        {!isMobile ? (
          <h1 className="font-montserrat text-black text-3xl sm:text-[35px] not-italic font-normal leading-[90.3%] tracking-[-0.875px]">
            pathpal
          </h1>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
