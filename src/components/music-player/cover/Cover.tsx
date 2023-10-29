import { useSelector } from "react-redux";

import { RootState } from "@/@types/State";

import "./Cover.scss";

export const Cover = () => {
  const { currentTrack } = useSelector((state: RootState) => state.queue);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="cover">
      {currentTrack.cover && <img className="cover__image" src={currentTrack.cover} alt={currentTrack.title} />}
      <div className="cover__infos">
        <div className="cover__infos__title">{currentTrack.title}</div>
        <div className="cover__infos__artist">{currentTrack.artist}</div>
      </div>
    </div>
  );
};
