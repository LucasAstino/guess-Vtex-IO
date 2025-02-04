import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCssHandles } from "vtex.css-handles";

interface VideoPlayerProps {
  videoUrl: string;
  videoUrlMobile: string;
  playIcon?: string;
  thumbnail?: string;
  thumbnailMobile?: string;
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
  const { videoUrl, videoUrlMobile, playIcon, thumbnail, thumbnailMobile } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const { handles } = useCssHandles(CSS_VIDEO);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={handles.video__player}>
      {window.innerWidth > 1024 ? (
        <ReactPlayer
          url={videoUrl}
          playing={true}
          controls={false}
          muted={true}
          loop={true}
          light={!isPlaying && thumbnail}
          playIcon={
            <img
              src={playIcon || "/default-play-icon.png"}
              alt="Play"
              className={handles["video__player-iconPlay"]}
              onClick={handlePlay}
            />
          }
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
          light={!isPlaying && thumbnailMobile}
          playIcon={
            <img
              src={playIcon || "/default-play-icon.png"}
              alt="Play"
              className={handles["video__player-iconPlay"]}
              onClick={handlePlay}
            />
          }
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
    thumbnail: {
      title: "Thumbnail",
      description: "The image displayed before playing the video",
      type: "string",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    thumbnailMobile: {
      title: "Thumbnail Mobile",
      description: "The image displayed before playing the video",
      type: "string",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
  },
};
