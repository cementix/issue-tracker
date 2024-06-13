import dynamic from "next/dynamic";
import IssueFormSkeleton from "../IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/(pages)/issues/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
