"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueStatus } from "@prisma/client";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const statuses: { label: string; value?: IssueStatus }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <Select
        defaultValue={searchParams.get("status") || "ALL"}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          status && params.append("status", status);
          searchParams.get("orderBy") &&
            params.append("orderBy", searchParams.get("orderBy")!);
          searchParams.get("orderDirection") &&
            params.append(
              "orderDirection",
              searchParams.get("orderDirection")!
            );

          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem value={status.value || "ALL"} key={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Suspense>
  );
};

export default IssueStatusFilter;
