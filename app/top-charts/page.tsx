import { Loader } from "@/components/Loader";
import { TopChart } from "@/components/TopChart";
import { getSongs, serviceUrl } from "@/core/services/services";
import { Songs } from "@/core/types";
import { Suspense } from "react";

export default async function page() {
  const initialData: Songs = await getSongs(serviceUrl.topCharts());

  return (
    <div className="flex flex-col">
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Discover Top Charts
      </h2>
      <Suspense fallback={<Loader />}>
        <TopChart initialData={initialData} />
      </Suspense>
    </div>
  );
}
