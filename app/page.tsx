import { GenreChart } from "@/components/GenreChart";
import { Loader } from "@/components/Loader";
import { getSongs, serviceUrl } from "@/core/services/services";
import { Songs } from "@/core/types";
import { Suspense } from "react";

export default async function Home() {
  const initialData: Songs = await getSongs(
    serviceUrl.genre("genre-global-chart-4")
  );
  return (
    <div className="flex flex-col ">
      <Suspense fallback={<Loader />}>
        <GenreChart initialData={initialData} />
      </Suspense>
    </div>
  );
}
