"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { Loader, Plus, SquarePenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().min(1, "Description is required"),
});

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue ? issue.title : "",
      description: issue ? issue.description : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!issue) {
      try {
        await axios.post("/api/issues", values);
        toast({
          title: "Success",
          className: "bg-emerald-600 text-white border-black",
          description: "You have successfully added a new issue!",
        });
        setIsLoading(false);
        router.push("/issues");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Unexpected Error!",
          description: "Oops! Unhandled error occured!",
        });
        setIsLoading(false);
      }
    } else {
      try {
        await axios.patch("/api/issues/" + issue.id, values);
        toast({
          title: "Success",
          className: "bg-emerald-600 text-white border-black",
          description: "You have successfully updated an issue!",
        });
        setIsLoading(false);
        router.push("/issues/" + issue.id);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Unexpected Error!",
          description: "Oops! Unhandled error occured!",
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="w-[500px] flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-2xl">
          {!issue ? "Create an issue" : "Edit an issue"}
        </h1>
        {!issue ? <Plus /> : <SquarePenIcon />}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Insert your title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl>
                  <SimpleMDE placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IssueForm;
