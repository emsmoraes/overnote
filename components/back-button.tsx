import React from "react";
import { Button } from "./ui/button";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

function BackButton({ to }: { to: string }) {
  return (
    <div className="w-full flex items-center justify-start my-2">
      <Button size={"icon"} asChild className="group rounded-full">
        <Link href={to}>
          <IoArrowBack className="transition-transform duration-150 ease-in-out group-hover:scale-125" />
        </Link>
      </Button>
    </div>
  );
}

export default BackButton;
