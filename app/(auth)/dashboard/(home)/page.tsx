import UsersNoteChart from "@/components/user-notes-chart";
import { auth } from "@/lib/auth";
import {
  countGlobalNotes,
  countUserNotes,
  countUserNotesByDayOfMonth,
  countUsers,
} from "@/services/dashbord";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();

  const user = {
    id: session?.user?.id ?? "",
  };

  const [userNotesCount, usersCount, globalNotesCount, userNotesByDay] =
    await Promise.all([
      countUserNotes(user.id),
      countUsers(),
      countGlobalNotes(),
      countUserNotesByDayOfMonth(user.id),
    ]);

  const Skeleton = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-auto sm:h-vh">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-muted/50 flex flex-col items-center justify-center py-4 truncate">
            <span className="block text-lg truncate w-full text-center">
              Suas anotações
            </span>
            <span className="block text-[100px] truncate w-full text-center">
              {userNotesCount}
            </span>
          </div>
          <div className="rounded-xl bg-muted/50 flex flex-col items-center justify-center py-4 truncate">
            <span className="block text-lg truncate w-full text-center">
              Usuários ativos
            </span>
            <span className="block text-[100px] truncate w-full text-center">
              {usersCount}
            </span>
          </div>
          <div className="rounded-xl bg-muted/50 flex flex-col items-center justify-center py-4 truncate">
            <span className="block text-lg truncate w-full text-center">
              Todas as anotações
            </span>
            <span className="block text-[100px] truncate w-full text-center">
              {globalNotesCount}
            </span>
          </div>
        </div>
        <UsersNoteChart userNotesByDay={userNotesByDay} />
      </div>
    </Suspense>
  );
}
