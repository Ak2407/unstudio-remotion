"use client";

import { Main } from "@/components/remotion/Main";
import { getVideoDuration } from "@/lib/utils";
import { Player } from "@remotion/player";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export default function VideoEditor() {
  const [intro, setIntro] = useState<string | null>(null);
  const [outro, setOutro] = useState<string | null>(null);
  const [durationInFrames, setDurationInFrames] = useState<number>(300);
  const [introDurationInFrames, setIntroDurationInFrames] =
    useState<number>(150);
  const [outroDurationInFrames, setOutroDurationInFrames] =
    useState<number>(150);
  const [mainVidDurationInFrames, setMainVidDurationInFrames] =
    useState<number>(300);
  const introRef = useRef<HTMLInputElement | null>(null);
  const outroRef = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("videoUrl");

  useEffect(() => {
    const calculateDurations = async () => {
      try {
        let introDuration = 0;
        let outroDuration = 0;
        let mainVidDuration = 50;

        if (intro) {
          introDuration = await getVideoDuration(intro);

          setIntroDurationInFrames(Math.floor(introDuration * VIDEO_FPS));
        }

        if (outro) {
          outroDuration = await getVideoDuration(outro);
          setOutroDurationInFrames(Math.floor(outroDuration * VIDEO_FPS));
        }

        // if (videoUrl) {
        //   mainVidDuration = await getVideoMetadata(videoUrl);
        //   setMainVidDurationInFrames(Math.floor(mainVidDuration * VIDEO_FPS));
        // }

        const totalDurationInFrames =
          (introDuration + mainVidDuration + outroDuration) * VIDEO_FPS;
        console.log("hiiiiiiii ", totalDurationInFrames);
        setDurationInFrames(Math.floor(totalDurationInFrames));
      } catch (error) {
        console.error("Error calculating video durations:", error);
        setDurationInFrames(300);
      }
    };

    calculateDurations();
  }, [intro, outro, videoUrl]);

  const handleIntroButtonClick = () => {
    if (introRef.current) {
      introRef.current.click();
    }
  };

  const handleIntroClick = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setIntro(url);
    }
  };

  const handleOutroButtonClick = () => {
    if (outroRef.current) {
      outroRef.current.click();
    }
  };

  const handleOutroClick = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setOutro(url);
    }
  };

  const inputProps = {
    intro,
    outro,
    mainVid: videoUrl,
    introDurationInFrames,
    outroDurationInFrames,
    mainVidDurationInFrames,
  };

  return (
    <div className="">
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-white text-3xl font-extrabold">
          Watch and Edit Your Screen Recording
        </h1>
      </div>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden mb-10 mt-16">
          <Player
            component={Main}
            durationInFrames={durationInFrames}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{ width: "100%" }}
            inputProps={inputProps}
            controls
            loop
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-4 items-center justify-center">
          <div>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleIntroClick}
              className="hidden"
              ref={introRef}
            />
            {!intro ? (
              <button
                onClick={handleIntroButtonClick}
                type="button"
                className="text-white bg-green-600 hover:opacity-80 p-2 rounded-sm"
              >
                Upload Intro
              </button>
            ) : (
              <button
                onClick={() => setIntro(null)}
                type="button"
                className="text-white bg-red-600 hover:opacity-80 p-2 rounded-sm"
              >
                Remove Intro
              </button>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleOutroClick}
              className="hidden"
              ref={outroRef}
            />
            {!outro ? (
              <button
                onClick={handleOutroButtonClick}
                type="button"
                className="text-white bg-green-600 hover:opacity-80 p-2 rounded-sm"
              >
                Upload Outro
              </button>
            ) : (
              <button
                onClick={() => setOutro(null)}
                type="button"
                className="text-white bg-red-600 hover:opacity-80 p-2 rounded-sm"
              >
                Remove Outro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
