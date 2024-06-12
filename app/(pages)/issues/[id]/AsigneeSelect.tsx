"use client";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AsigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) return <Skeleton width={200} height={35} />;

  if (error) return null;

  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Assign.." />
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => (
          <SelectItem value={user.name!}>{user.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AsigneeSelect;
