import { CssBaseline, GlobalStyles, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AudioManager } from "@/components/audio/AudioManager";
import { DefaultRouter } from "@/routers/DefaultRouter";
import { persistor, store } from "@/stores/store";

import "./App.scss";

export const App = () => {
  const useDarkColors = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: useDarkColors ? "dark" : "light",
        primary: {
          main: "#aa99ff"
        },
        secondary: {
          main: "#FFAA99"
        }
      }
    });
  }, [useDarkColors]);

  const style = {
    "*::-webkit-scrollbar": {
      backgroundColor: theme.palette.background.default
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: 8,
      backgroundColor: theme.palette.grey[500],
      border: `5px`,
      borderStyle: "solid",
      borderColor: theme.palette.background.default
    },
    "*::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.grey[400]
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={style} />
          <CssBaseline />
          <DefaultRouter />
          <AudioManager />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
