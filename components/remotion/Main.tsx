import { AbsoluteFill, Series, Video } from "remotion";

export const Main = ({
  intro,
  outro,
  mainVid,
  introDurationInFrames,
  outroDurationInFrames,
  mainVidDurationInFrames,
}: {
  intro: string | null;
  outro: string | null;
  mainVid: string | null;
  introDurationInFrames: number;
  outroDurationInFrames: number;
  mainVidDurationInFrames: number;
}) => {
  return (
    <Series>
      {intro && (
        <Series.Sequence durationInFrames={introDurationInFrames}>
          <AbsoluteFill className="bg-white">
            <Video src={intro} />
          </AbsoluteFill>
        </Series.Sequence>
      )}

      {mainVid && (
        <Series.Sequence durationInFrames={mainVidDurationInFrames}>
          <AbsoluteFill className="bg-white">
            <Video src={mainVid} />
          </AbsoluteFill>
        </Series.Sequence>
      )}

      {outro && (
        <Series.Sequence durationInFrames={outroDurationInFrames}>
          <AbsoluteFill className="bg-white">
            <Video src={outro} />
          </AbsoluteFill>
        </Series.Sequence>
      )}
    </Series>
  );
};
