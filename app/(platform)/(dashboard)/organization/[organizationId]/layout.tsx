import { auth } from "@clerk/nextjs/server";
import OrgControl from "./_components/OrgControl";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
}

export default function OrganizationIdLayout({
  children,
}: {
  children: string;
}) {
  return (
    <div className="w-full">
      <OrgControl />
      {children}
    </div>
  );
}
