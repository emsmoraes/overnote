import NoteForm from "@/components/note-form";
import { auth } from "@/lib/auth";
import React from "react";

async function page() {
  const session = await auth();

  const user = {
    id: session?.user?.id ?? "",
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <NoteForm user={user}/>
    </div>
  );
}

export default page;
