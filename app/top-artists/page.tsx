import { Loader } from "@/components/Loader";
import { TopArtistChart } from "@/components/TopArtistChart";
import { getSongs, serviceUrl } from "@/core/services/services";
import { Songs } from "@/core/types";
import { Suspense } from "react";

export default async function page() {
  const initialData: Songs = await getSongs(serviceUrl.topCharts());
  return (
    <div className="flex flex-col">
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Top Artists
      </h2>
      <Suspense fallback={<Loader />}>
        <TopArtistChart initialData={initialData} />
      </Suspense>
    </div>
  );
}
