import { Suspense } from "react";

import { Loader, TopChart } from "@/components";

const TopCharts = () => {
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
};

export default TopCharts;
