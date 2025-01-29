import React from "react";

function NotesSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-100/75 p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-row items-center gap-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div>
              <div className="h-4 w-40 bg-gray-300 rounded-md mb-1"></div>
              <div className="h-2 w-16 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          <div className="h-40 bg-gray-300 rounded-md my-8"></div>

          <div className="mt-2 flex justify-between">
            <div className="w-32 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesSkeleton;
