import { Paper } from "@mui/material";

import Controls from "@/components/music-player/controls/Controls";
import Cover from "@/components/music-player/cover/Cover";
import ProgressBar from "@/components/music-player/progress-bar/ProgressBar";
import VolumeBar from "@/components/music-player/volume-bar/VolumeBar";

import "./MusicPlayer.scss";

const MusicPlayer = () => {
  return (
    <Paper elevation={3} className="music-player">
      <ProgressBar />

      <div className="music-player__row">
        <div className="music-player_left">
          <Cover />
        </div>
        <div className="music-player_center">
          <Controls />
        </div>
        <div className="music-player_right">
          <VolumeBar />
        </div>
      </div>
    </Paper>
  );
};

export default MusicPlayer;
