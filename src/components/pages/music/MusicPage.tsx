import { CreateNewFolderRounded } from "@mui/icons-material";
import md5 from "md5";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageAction } from "@/@types/Page";
import { RootState, Track } from "@/@types/State";
import Page from "@/components/pages/Page";
import Action from "@/components/pages/components/page-actions/Action";
import MassActions from "@/components/pages/music/components/MassActions";
import TrackInfo from "@/components/pages/music/components/TrackInfo";
import MediaInfo from "@/libs/media-info/MediaInfo";
import { add } from "@/stores/slices/tracksReducer";

import "./MusicPage.scss";

const MusicPage = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.tracks);
  const onlyType = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/flac"];
  const selectedState = useState<Track[]>([]);

  const handleOpenFilesSelector = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("multiple", "true");
    input.setAttribute("accept", onlyType.join(","));
    input.click();

    input.addEventListener("change", handleAddFiles);
  };

  const handleAddFiles = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) {
      return;
    }

    for (const file of files) {
      const tags = await MediaInfo.fromFile(file);
      const uuid = md5(file.path);
      let cover = "";
      if (tags.image) {
        cover = `data:${tags.image.mime};base64,${Buffer.from(tags.image.data!).toString("base64")}`;
      }
      const duration = (await new Promise(resolve => {
        const audio = new Audio(file.path);
        audio.addEventListener("loadedmetadata", () => {
          resolve(Math.trunc(audio.duration));
        });
      })) as number;

      const track = {
        uuid,
        path: file.path,
        title: tags.title || "Sans titre",
        artist: tags.artist || "Inconnu",
        album: tags.album || "Inconnu",
        cover,
        duration
      };
      dispatch(add(track));
    }
  };

  const actions: PageAction[] = [
    <Action onClick={handleOpenFilesSelector} icon={<CreateNewFolderRounded />} key="home-add-folder">
      Ajouter un dossier
    </Action>
  ];

  return (
    <Page title="Musique" className="page-music" actions={actions}>
      <div className="tracks">
        {tracks.map(track => (
          <TrackInfo {...track} key={track.uuid} selectedState={selectedState} />
        ))}
      </div>
      <MassActions tracks={tracks} state={selectedState} />
    </Page>
  );
};

export default MusicPage;
