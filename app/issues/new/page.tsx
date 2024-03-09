"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { IoMdCheckmark } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validations";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";

type Issue = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>("");
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error is occured.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button variant="solid" disabled={isSubmitting}>
          <div className="flex items-center text-lg gap-2">
            <IoMdCheckmark /> New issue {isSubmitting && <Loader />}
          </div>
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
