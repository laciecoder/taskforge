import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          font.className
        )}
      >
        <div className="flex items-center border shadow-sm bg-blue-200 text-blue-800 rounded-full uppercase mb-4 p-4 hover:shadow-lg">
          <Medal className="h-6 w-6 mr-2" />
          World&apos;s Leading Management App
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-700 mb-6">
          TaskForge is where your goals
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-red-400 to-amber-400 rounded-md text-white p-2 px-4 w-fit">
          take shape
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-6 max-w-xs md:max-w-2xl text-center mx-auto mb-4">
        Transform your boldest ideas into actionable plans, track progress in
        real-time, and celebrate your wins together. TaskForge is the intuitive
        platform that turns your vision into reality.
      </div>
      <Button className="mt-2" asChild>
        <Link href="/signup">Get TaskForge for free</Link>
      </Button>
    </div>
  );
}
