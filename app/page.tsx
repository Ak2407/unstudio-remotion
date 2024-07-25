import VideoEditor from "@/components/remotion/VideoEditor";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoEditor />
      </Suspense>
    </div>
  );
}
