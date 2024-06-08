import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <div>
      <Skeleton width={500} />
      <Skeleton height={600} width={500} />
    </div>
  );
};

export default LoadingNewIssuePage;
