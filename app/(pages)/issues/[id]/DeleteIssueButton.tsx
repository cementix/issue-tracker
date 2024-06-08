"use client";

import { Button } from "@/components/ui/button";
import { Delete, Loader } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const deleteIssue = async () => {
    setIsLoading(true);
    try {
      await axios.delete("/api/issues/" + issueId);
      toast({
        title: "Success",
        className: "bg-emerald-600 text-white border-black",
        description: "You have successfully deleted an issue!",
      });
      router.push("/issues");
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unexpected Error!",
        description: "Oops! Unhandled error occured!",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="text-white font-bold max-w-[200px] bg-red-600 hover:bg-red-400 flex gap-2 items-center text-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          Delete Issue <Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You are going to delete this issue, the action cannot be undone.
        </DialogDescription>
        <div className="flex gap-5 justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={deleteIssue}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIssueButton;
