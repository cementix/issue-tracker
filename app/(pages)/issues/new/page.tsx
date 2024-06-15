import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import IssueFormSkeleton from "../IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/(pages)/issues/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <IssueForm />
    </Suspense>
  );
};

export default NewIssuePage;
