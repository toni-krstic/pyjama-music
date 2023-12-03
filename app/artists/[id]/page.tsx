import { ArtistChart } from "@/components/ArtistChart";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

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
