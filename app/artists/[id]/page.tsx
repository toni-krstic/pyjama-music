import type { Metadata } from "next";
import { Suspense } from "react";

import { ArtistChart } from "@/components/ArtistChart";
import { Loader } from "@/components/Loader";

export const metadata: Metadata = {
  title: "Pyjama Music - Artist",
  description: "Stream Music By Artist",
};

interface props {
  params: { id: string };
}

export default function page({ params }: props) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <ArtistChart id={params.id} />
      </Suspense>
    </div>
  );
}
