import {
  ArrowBackRounded,
  HomeRounded,
  PageviewRounded,
  QueueMusicRounded,
  SettingsRounded,
  SpeakerRounded
} from "@mui/icons-material";
import { Divider, MenuList, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { SidebarItem } from "@/components/sidebar/components/SidebarItem";

import "./Sidebar.scss";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper className="sidebar" square>
      <MenuList className="sidebar__list">
        <SidebarItem onclick={() => navigate(-1)} title={"Retour"} disabled={location.key === "default"}>
          <ArrowBackRounded />
        </SidebarItem>
        <SidebarItem to="/" title={"Accueil"}>
          <HomeRounded />
        </SidebarItem>
        <SidebarItem to="/playlists" title={"Playlists"}>
          <SpeakerRounded />
        </SidebarItem>
        <SidebarItem to="/queue" title={"File d'attente de lecture"}>
          <QueueMusicRounded />
        </SidebarItem>
        <Divider />
        <SidebarItem to="/rendering" title={"Rendu web"}>
          <PageviewRounded />
        </SidebarItem>
      </MenuList>
      <MenuList className="sidebar__list">
        <SidebarItem to="/settings" title={"Paramètres"}>
          <SettingsRounded />
        </SidebarItem>
      </MenuList>
    </Paper>
  );
};
