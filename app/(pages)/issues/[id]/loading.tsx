import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuePage = () => {
  return (
    <div>
      <Skeleton width={300} />
      <div className="flex gap-6">
        <Skeleton width={50} />
        <Skeleton width={150} />
      </div>
      <Card className="max-w-[600px] prose">
        <CardContent className="py-4">
          <Skeleton width={400} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIssuePage;
