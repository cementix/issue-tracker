"use client";

import { Issue, IssueStatus } from "@prisma/client";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-loading-skeleton/dist/skeleton.css";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: IssueStatus }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const changeStatus = (status: IssueStatus) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .then((res) => res.data);
  };

  return (
    <Select
      defaultValue={issue.status}
      onValueChange={(status) => changeStatus(status as IssueStatus)}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Assign.." />
      </SelectTrigger>
      <SelectContent>
        {statuses?.map((status) => (
          <SelectItem value={status.value!} key={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
