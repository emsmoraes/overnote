"use client";

import React, { useTransition } from "react";
import RichText from "./rich-text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { createNote } from "@/services/notes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  note: z.string().refine((value) => {
    const valueToValidate = value
      .replace(/<[^>]+>/g, "")
      .replace(/[\r\n\t]/g, "")
      .trim();

    return valueToValidate.length >= 5;
  }, "A nota precisa de no mínimo 5 caracteres"),
  visibility: z.enum(["public", "private"]).default("public"),
});

type FormData = z.infer<typeof formSchema>;

interface NoteFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

function NoteForm({ user }: NoteFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      visibility: "public",
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const payload = {
      content: formData.note,
      isPublic: formData.visibility === "public",
      userId: user.id,
    };

    startTransition(async () => {
      try {
        const savedNote = await createNote(payload);
        console.log("Nota salva com sucesso:", savedNote);
        toast("Nota salva com sucesso!");
        router.push("/dashboard/my-notes")
      } catch {
        alert("Ocorreu um erro ao salvar a nota. Tente novamente.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Nota:</FormLabel>
              <FormControl>
                <RichText content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Visibilidade:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-3 items-center"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">Público</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">Privado</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-11 flex items-end justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-[90px] font-semibold min-h-12 px-16 rounded-lg text-[16px]"
          >
            {isPending ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NoteForm;
