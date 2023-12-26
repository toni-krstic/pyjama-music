import type { Metadata } from "next";
import { Suspense } from "react";

import { AroundYouChart } from "@/components/AroundYouChart";
import { Loader } from "@/components/Loader";

export const metadata: Metadata = {
  title: "Pyjama Music - Top Charts Around You",
  description: "Discover Top Charts Around You",
};

export default function page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <AroundYouChart />
      </Suspense>
    </div>
  );
}
