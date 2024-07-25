import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPageList() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
}
