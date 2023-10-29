import { Outlet } from "react-router-dom";

import { MusicPlayer } from "@/components/music-player/MusicPlayer";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Titlebar } from "@/components/titlebar/Titlebar";

export const DefaultLayout = () => {
  return (
    <>
      <Titlebar />
      <Sidebar />
      <Outlet />
      <MusicPlayer />
    </>
  );
};
