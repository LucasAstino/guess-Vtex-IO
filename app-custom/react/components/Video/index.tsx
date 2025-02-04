import React from "react";
import ReactPlayer from "react-player";
import { useCssHandles } from "vtex.css-handles";

interface VideoPlayerProps {
  videoUrl: string;
  videoUrlMobile: string;
}

const CSS_VIDEO = [
  "video__player",
  "video__player-wrapper",
  "video__player-thamb",
  "video__player-video",
  "video__player-iconPlay",
  "react-player__preview"
] as const;

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { videoUrl, videoUrlMobile } = props;
  const { handles } = useCssHandles(CSS_VIDEO);

  return (
    <div className={handles.video__player}>
      {window.innerWidth > 1024 ? (
        <ReactPlayer
          url={videoUrl}
          playing={true}
          controls={false}
          muted={true}
          loop={true}
          width="100%"
          height="auto"
        />
      ) : (
        <ReactPlayer
          url={videoUrlMobile}
          playing={true}
          controls={false}
          muted={true}
          loop={true}
          width="100%"
          height="auto"
          className={handles["video__player-video"]}
        />
      )}

    </div>
  );
};



VideoPlayer.schema = {
  title: "Video Player",
  description: "A customizable video player component",
  type: "object",
  properties: {
    videoUrl: {
      title: "Video URL Desktop",
      description: "The URL of the video to display",
      type: "string",
      default: "https://link-do-seu-video.mp4"
    },
    videoUrlMobile: {
      title: "Video URL Mobile",
      description: "The URL of the video to display",
      type: "string",
      default: "https://link-do-seu-video.mp4"
    },
  },
};
