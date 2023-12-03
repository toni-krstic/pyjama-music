import { Loader } from "@/components/Loader";
import { TopChart } from "@/components/TopChart";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Discover Top Charts
      </h2>
      <Suspense fallback={<Loader />}>
        <TopChart />
      </Suspense>
    </div>
  );
}
