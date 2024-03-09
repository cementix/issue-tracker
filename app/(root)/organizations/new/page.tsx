import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div>
      <CreateOrganization afterCreateOrganizationUrl="/" />
    </div>
  );
}
