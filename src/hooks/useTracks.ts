import { useSelector } from "react-redux";

import { RootState, Track } from "@/@types/State";

export const useTracks = () => {
  const tracks = useSelector((state: RootState) => state.tracks);

  const getTrack = (trackUUID?: string): Track | undefined => {
    if (!trackUUID) {
      return undefined;
    }

    return tracks.find(track => track.uuid === trackUUID);
  };

  return {
    getTrack
  };
};
