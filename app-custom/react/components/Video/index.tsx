import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCssHandles } from "vtex.css-handles";

interface VideoPlayerProps {
  videoUrl: string;
  playIcon?: string;
  thumbnail?: string;
}

const CSS_VIDEO = [
    "video__player",
    "video__player-wrapper",
    "video__player-thamb",
    "video__player-iconPlay",

  ] as const;

export const VideoPlayer = (props: VideoPlayerProps) => {
    const { videoUrl, playIcon,thumbnail } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const { handles } = useCssHandles(CSS_VIDEO);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={handles.video__player}>
      <ReactPlayer
        url={videoUrl}
        playing={isPlaying}
        controls
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
        height="100%"
      />
    </div>
  );
};



VideoPlayer.schema = {
  title: "Video Player",
  description: "A customizable video player component",
  type: "object",
  properties: {
    videoUrl: {
      title: "Video URL",
      description: "The URL of the video to display",
      type: "string",
      default: "https://link-do-seu-video.mp4",
    },
    thumbnail: {
      title: "Thumbnail",
      description: "The image displayed before playing the video",
      type: "string",
      widget: {
        "ui:widget": "image-uploader", 
      },
    },
  },
};
