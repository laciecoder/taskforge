import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div
      className="fixed top-0 w-full h-14 px-4 border-b shadow-sm
     bg-white flex items-center"
    >
      <div className="md:max-w-screen-xl mx-auto flex w-full justify-between items-center">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/signup">Get TaskForge for Free</Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/signin">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
