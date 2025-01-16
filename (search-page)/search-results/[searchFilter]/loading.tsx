import React from "react";
import Image from "next/image";
import loadingImg from "@/public/loading.png";

function loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
      <p className="animate-pulse text-4xl">
        Searching For available properties
      </p>
    </div>
  );
}

export default loading;
