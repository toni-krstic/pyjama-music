import { Suspense } from "react";

import { Loader, GenreChart, DropDown } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Suspense fallback={<Loader />}>
        <GenreChart />
      </Suspense>
    </div>
  );
}
