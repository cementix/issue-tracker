import dynamic from "next/dynamic";
import { Suspense } from "react";
import IssueFormSkeleton from "../IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/(pages)/issues/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <Suspense>
      <IssueForm />
    </Suspense>
  );
};

export default NewIssuePage;
