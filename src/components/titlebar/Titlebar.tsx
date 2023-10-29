import logo from "@/assets/logo.svg";

import "./Titlebar.scss";

export const Titlebar = () => {
  return (
    <div className="titlebar">
      <img src={logo} alt="music-player" />
      <span>Lecteur de musique</span>
    </div>
  );
};
