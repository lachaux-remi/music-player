import {
  AddRounded,
  AddToQueueRounded,
  ClearRounded,
  CreateNewFolderRounded,
  PlayArrowRounded,
  QueueMusicRounded
} from "@mui/icons-material";
import md5 from "md5";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageAction } from "@/@types/Page";
import { RootState, Track } from "@/@types/State";
import Page from "@/components/pages/Page";
import Action from "@/components/pages/components/page-actions/Action";
import TrackInfo from "@/components/pages/music/components/TrackInfo";
import AddPlaylistDialog from "@/components/pages/playlists/components/AddPlaylistDialog";
import { useMassSelection } from "@/hooks/useMassSelection";
import MediaInfo from "@/libs/media-info/MediaInfo";
import { add as addNewPlaylist, addTracks as addTracksToPlaylist } from "@/stores/slices/playlistsReducer";
import { addTracks as addTracksToQueue, setTrack } from "@/stores/slices/queueReducer";
import { add, remove as removeTracks } from "@/stores/slices/tracksReducer";

import "./MusicPage.scss";

const MusicPage = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlists);
  const tracks = useSelector((state: RootState) => state.tracks);
  const onlyType = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/flac"];
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);
  const { selectedItems, setSelectedItem, renderMassActions } = useMassSelection<Track>(tracks, [
    {
      caption: "Lire",
      icon: <PlayArrowRounded />,
      variant: "contained",
      onClick: () => {
        dispatch(setTrack(selectedItems[0]));
        if (selectedItems.length > 1) {
          dispatch(addTracksToQueue(selectedItems.slice(1)));
        }
        setSelectedItem([]);
      }
    },
    {
      caption: "Lire ensuite",
      icon: <AddToQueueRounded />,
      onClick: () => {
        dispatch(addTracksToQueue(selectedItems));
        setSelectedItem([]);
      }
    },
    {
      caption: "Ajouter à",
      icon: <AddRounded />,
      items: [
        {
          caption: "File d'attente de lecture",
          icon: <QueueMusicRounded />,
          onClick: () => {
            dispatch(addTracksToQueue(selectedItems));
            setSelectedItem([]);
          }
        },
        { caption: "divider" },
        {
          caption: "Nouvelle playlist",
          icon: <AddRounded />,
          onClick: () => {
            setOpenAddPlaylist(true);
          }
        },
        ...playlists.map(playlist => {
          return {
            caption: playlist.name,
            icon: <AddRounded />,
            onClick: () => {
              dispatch(
                addTracksToPlaylist({
                  uuid: playlist.uuid,
                  tracks: selectedItems.map(track => track.uuid)
                })
              );
              setSelectedItem([]);
            }
          };
        })
      ]
    },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      color: "error",
      onClick: () => {
        dispatch(removeTracks(selectedItems));
        setSelectedItem([]);
      }
    }
  ]);

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
        title: tags.title || file.name || "Sans titre",
        artist: tags.artist || "Inconnu",
        album: tags.album || "Inconnu",
        cover,
        duration
      };
      dispatch(add(track));
    }
  };

  const handleAddToNewPlaylist = (name: string) => {
    dispatch(addNewPlaylist({ name, tracks: selectedItems.map(track => track.uuid) }));
    setSelectedItem([]);
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
          <TrackInfo key={track.uuid} track={track} selectedState={[selectedItems, setSelectedItem]} />
        ))}
      </div>

      {renderMassActions}

      <AddPlaylistDialog
        open={openAddPlaylist}
        onClose={() => setOpenAddPlaylist(false)}
        onConfirm={handleAddToNewPlaylist}
      />
    </Page>
  );
};

export default MusicPage;
