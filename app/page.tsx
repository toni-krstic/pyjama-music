import { GenreChart } from "@/components/GenreChart";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Suspense fallback={<Loader />}>
        <GenreChart />
      </Suspense>
    </div>
  );
}
