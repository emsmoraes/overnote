import UpdateNoteForm from "@/components/update-note-form";
import { auth } from "@/lib/auth";
import React from "react";

interface MyNoteProps {
  params: {
    id: string;
  };
}

async function page({ params }: MyNoteProps) {
  const session = await auth();

  const user = {
    id: session?.user?.id ?? "",
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UpdateNoteForm user={user} noteId={params.id}/>
    </div>
  );
}

export default page;
