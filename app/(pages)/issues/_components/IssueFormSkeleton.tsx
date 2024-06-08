import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueFormSkeleton = () => {
  return (
    <div>
      <Skeleton width={300} />
      <Skeleton width={500} />
      <Skeleton height={600} width={500} />
    </div>
  );
};

export default IssueFormSkeleton;
