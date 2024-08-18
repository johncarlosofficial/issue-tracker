"use client";
import { useState, useEffect } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [SimpleMDE, setSimpleMDE] = useState<any>(null);

  useEffect(() => {
    // Dynamically import SimpleMDE only on the client-side
    import("react-simplemde-editor").then((mod) => {
      setSimpleMDE(mod.default);
    });
  }, []);

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          console.log(error);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      {SimpleMDE && (
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
      )}
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
