import { TopArtistChart, Loader } from "@/components";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Top Artists
      </h2>
      <Suspense fallback={<Loader />}>
        <TopArtistChart />
      </Suspense>
    </div>
  );
};

export default page;
