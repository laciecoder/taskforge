import { OrganizationProfile } from "@clerk/nextjs";

export default function Settings() {
  return (
    <div className="w-full">
      <OrganizationProfile
        // routing="hash" // fix didn't work
        // appearance={{
        //   elements: {
        //     rootBox: {
        //       boxShadow: "none",
        //       width: "100%",
        //       backgroundColor: "white",
        //     },
        //     card: {
        //       backgroundColor: "white",
        //       border: "1px solid #e5e5e5",
        //       boxShadow: "none",
        //       width: "100%",
        //     },
        //   },
        // }}
      />
    </div>
  );
}
