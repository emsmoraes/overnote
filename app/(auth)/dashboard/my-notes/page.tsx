import FeedItem from "@/components/feed-item";
import NotesSkeleton from "@/components/notes-skeleton";
import { auth } from "@/lib/auth";
import { listNotes } from "@/services/notes";
import React, { Suspense } from "react";

async function page() {
  const session = await auth();

  const user = {
    id: session?.user?.id ?? "",
  };

  const notes = await listNotes(user.id);

  return (
    <Suspense fallback={<NotesSkeleton count={10} />}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {notes.map((note) => (
          <FeedItem
            note={note}
            key={note.id}
            isAuthor={true}
            userId={user.id}
          />
        ))}
      </div>
    </Suspense>
  );
}

export default page;
