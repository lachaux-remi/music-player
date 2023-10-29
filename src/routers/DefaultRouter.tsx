import { HashRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { MusicPage } from "@/components/pages/music/MusicPage";
import { PlaylistDetailsPage } from "@/components/pages/playlist-details/PlaylistDetailsPage";
import { PlaylistsPage } from "@/components/pages/playlists/PlaylistsPage";
import { QueuePage } from "@/components/pages/queue/QueuePage";
import { RenderingPage } from "@/components/pages/rendering/RenderingPage";
import { SettingsPage } from "@/components/pages/settings/SettingsPage";

export const DefaultRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<MusicPage />} />
          <Route path="playlists">
            <Route index element={<PlaylistsPage />} />
            <Route path=":playlistUUID" element={<PlaylistDetailsPage />} />
          </Route>
          <Route path="queue" element={<QueuePage />} />
          <Route path="rendering" element={<RenderingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
