import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import flipur from "@/assets/logos/flipur_logo.webp";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={flipur}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
        objectFit="contain"
      />

      <Image
        src={flipur}
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        objectFit="contain"
        height={100}
        width={70}
      />
    </div>
  );
}
