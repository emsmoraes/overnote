"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { showNote, updateNote } from "../services/notes";
import { debounce } from "@/utils/debounce";
import { cleanHtmlText } from "@/utils/cleanHtmlText";
import NoteSaveStatus from "./note-save-status";

type SaveStatus =
  | "Saved"
  | "Saving"
  | "SaveError"
  | "InvalidContent"
  | "Unauthorized";

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

interface UpdateNoteFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  noteId: string;
}

function UpdateNoteForm({ user, noteId }: UpdateNoteFormProps) {
  const [isPendingFindNote, startFindNoteTransition] = useTransition();
  const [valueDebounce, setValueDebounce] = useState("");
  const [changed, setChanged] = useState(false);
  const [contentStatus, setContentStatus] = useState<SaveStatus | null>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      visibility: "public",
    },
  });

  const isPublic = form.watch("visibility");

  const handleSubmit = async (formData: FormData) => {
    if (!changed) return;

    const payload = {
      content: formData.note,
      isPublic: formData.visibility === "public",
    };

    try {
      await updateNote(payload, user.id, noteId);
      toast("Nota editada com sucesso!");
      setChanged(true);
      setContentStatus("Saved");
    } catch {
      toast("Não foi possivel criar");
      setContentStatus("SaveError");
    }
  };

  const handleTyping = useCallback(
    debounce((value: string) => {
      const validValue = cleanHtmlText(value);
      setValueDebounce(value);

      if (validValue.length >= 5) {
        setChanged(true);
      } else {
        setContentStatus("InvalidContent");
        setChanged(false);
      }
    }, 600),
    []
  );

  useEffect(() => {
    const getNote = () => {
      startFindNoteTransition(async () => {
        try {
          const findedNote = await showNote(noteId, user.id);
          setValueDebounce(findedNote.content);
          form.setValue("note", findedNote.content);
          form.setValue(
            "visibility",
            findedNote.isPublic ? "public" : "private"
          );
          setContentStatus("Saved");
        } catch (error) {
          setContentStatus("Unauthorized");
          if (error instanceof Error) {
            toast(error.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      });
    };
    getNote();
  }, []);

  useEffect(() => {
    form.handleSubmit(handleSubmit)();
  }, [valueDebounce, isPublic]);

  if (isPendingFindNote) {
    return (
      <>
        <div className="animate-pulse mt-1">
          <div className="h-8 w-60 bg-gray-300 rounded-md" />
        </div>
        <div className="animate-pulse">
          <div className="mb-6">
            <div className="h-40 bg-gray-300 rounded-md" />
          </div>

          <div className="my-6">
            <div className="flex space-x-3">
              <div className="w-24 h-8 bg-gray-300 rounded-md" />
              <div className="w-24 h-8 bg-gray-300 rounded-md" />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="h-10 w-32 bg-gray-300 rounded-md" />
          </div>
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      {contentStatus && <NoteSaveStatus saveStatus={contentStatus} />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Anotação:</FormLabel>
              <FormControl>
                <RichText
                  content={value}
                  onChange={(value) => {
                    setContentStatus("Saving");
                    onChange(value);
                    handleTyping(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visibility"
          render={({ field: { value, onChange } }) => (
            <FormItem className="space-y-3">
              <FormLabel>Visibilidade:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setContentStatus("Saving");
                    onChange(value);
                    setChanged(true);
                    handleTyping(form.getValues("note"));
                  }}
                  defaultValue={value}
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
      </form>
    </Form>
  );
}

export default UpdateNoteForm;
