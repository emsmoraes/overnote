import Image from "next/image";
import React from "react";
import EmptyResultsSvg from "@/public/empty.svg";

function EmptyResults() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-10 px-4">
      <h2 className="text-xl font-medium text-center">Não encontramos nada por aqui...</h2>
      <Image src={EmptyResultsSvg} alt="Empty results" />
    </div>
  );
}

export default EmptyResults;
