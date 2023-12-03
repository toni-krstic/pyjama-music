import { Suspense } from "react";
import Link from "next/link";
import { Loader } from "./Loader";
import { TopPlayChart } from "./TopPlayChart";

export const TopPlay = () => {
  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link href="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Suspense fallback={<Loader />}>
          <TopPlayChart />
        </Suspense>
      </div>
    </div>
  );
};
