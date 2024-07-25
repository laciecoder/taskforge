import Sidebar from "../_components/Sidebar";

export default function OrganizationLayout({
  children,
}: {
  children: "string";
}) {
  return (
    <div className="pl-2 pt-14 md:pt-16 max-w-screen-2xl 2xl:max-w-screen-2xl mx-auto">
      <div className="flex gap-x-4">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
