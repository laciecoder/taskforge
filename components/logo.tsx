import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import logo from "../public/logo.svg";

const font = localFont({ src: "../public/fonts/NotoSans_Condensed-Bold.ttf" });

export default function Logo() {
  return (
    <Link href="/">
      <div className="hover:shadow-sm items-center gap-x-2 hidden md:flex">
        <Image src={logo} alt="TaskForge" height={30} width={30} />
        <p className={cn("text-lg text-neutral-700 pb-1", font.className)}>
          TaskForge
        </p>
      </div>
    </Link>
  );
}
