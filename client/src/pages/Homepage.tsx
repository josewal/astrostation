import { useState, useEffect } from "react";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useToggleSettings,
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
} from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { Spotify } from "../components/Player/Spotify/Player";
import { BackgroundNav } from "../components/Nav/BackgroundNav";
import { TimerSettings } from "../components/Timer/Settings";
import { GoGear } from "react-icons/go";
import { DWrapper } from "../components/Dragggable/Draggable";

import { SettingsModal } from "../components/Timer/Modal";
import { CryptoModal } from "../components/Crypto/Modal";
import { FaEthereum } from "react-icons/fa";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();
  const { isSettingsToggled } = useToggleSettings();
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsModal, setSettingsModal] = useState(false);
  const [isCryptoModal, setCryptoModal] = useState(false);

  // Position hooks
  const { taskPosX, taskPosY, setTaskPos } = usePosTask();
  const { musicPosX, musicPosY, setMusicPos } = usePosMusic();
  const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify();
  const { timerPosX, timerPosY, setTimerPos } = usePosTimer();

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });

  const setDimension = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    getDimension({
      dynamicWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="h-screen w-70 space-y-1 overflow-hidden">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setSettingsModal(true)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>
        <BackgroundNav backgrounds={backgrounds} />
      </div>
      <div className="flex justify-end space-x-6">
        <SettingsModal
          isVisible={isSettingsModal}
          onClose={() => setSettingsModal(false)}
        />
      </div>
      <div className="flex justify-end space-x-6">
        <CryptoModal
          isVisible={isCryptoModal}
          onClose={() => setCryptoModal(false)}
        />
      </div>
      <div className="fixed bottom-0">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-violet-700 text-white font-medium focus:outline-none dark:bg-violet-700 dark:text-violet-200"
          onClick={() => setCryptoModal(true)}
        >
          Donate
          <FaEthereum />
        </button>
      </div>
      {isMobile ? (
        <div className="flex flex-col items-center ml-8">
          <div className={`${isMusicToggled ? "block" : "hidden"}`}>
            <Player />
          </div>
          <div className={`${isSpotifyToggled ? "block" : "hidden"}`}>
            <Spotify />
          </div>
          <div className={`${isSettingsToggled ? "block" : "hidden"}`}>
            <TimerSettings />
          </div>
          <div className={`${isTimerToggled ? "block" : "hidden"}`}>
            <Timer />
          </div>
          <div className={`${isTasksToggled ? "block" : "hidden"}`}>
            <TaskTracker />
          </div>
        </div>
      ) : (
        <>
          <DWrapper
            toggleHook={isTimerToggled}
            defaultX={timerPosX}
            defaultY={timerPosY}
            setPosition={setTimerPos}
          >
            <Timer />
          </DWrapper>
          <DWrapper
            toggleHook={isTasksToggled}
            defaultX={taskPosX}
            defaultY={taskPosY}
            setPosition={setTaskPos}
          >
            <TaskTracker />
          </DWrapper>
          <DWrapper
            toggleHook={isMusicToggled}
            defaultX={musicPosX}
            defaultY={musicPosY}
            setPosition={setMusicPos}
          >
            <Player />
          </DWrapper>
          <DWrapper
            toggleHook={isSpotifyToggled}
            defaultX={spotifyPosX}
            defaultY={spotifyPosY}
            setPosition={setSpotifyPos}
          >
            <Spotify />
          </DWrapper>
        </>
      )}
    </div>
  );
};
