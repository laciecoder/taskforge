import Footer from "./_components/footer";
import NavBar from "./_components/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-200 h-full">
      <NavBar />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
    </div>
  );
}
