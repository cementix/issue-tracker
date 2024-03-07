"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { IoMdCheckmark } from "react-icons/io";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button variant="solid" color="crimson" style={{ cursor: "pointer" }}>
        <div className="flex items-center text-lg gap-2">
          <IoMdCheckmark /> New issue
        </div>
      </Button>
    </div>
  );
};

export default NewIssuePage;
