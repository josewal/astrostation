import { useDarkToggleStore, useBrainfmMusic } from "@Store";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { WithTooltip } from "../../Tooltip";
import { failureToast } from "@Root/src/utils/toast";

export const BrainFm = () => {
  const { setIsBrainfmToggled } = useBrainfmMusic();
  const { isDark } = useDarkToggleStore();

  const [text, setText] = useState("");
  const [playlist, setPlaylist] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn");

  return (
    <div className="mb-2 w-72 max-w-sm justify-between rounded-lg bg-white/[.96] py-4 px-4 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <WithTooltip text="Make sure to refresh after logging in">
        <div className="handle flex cursor-move items-center justify-between p-1">
          <p className="py-2 font-bold">Spotify</p>
          <IoCloseSharp
            className="cursor-pointer rounded bg-gray-800 text-gray-100 hover:bg-gray-900 dark:bg-gray-300 dark:text-gray-800"
            onClick={() => setIsBrainfmToggled(false)}
          />
        </div>
      </WithTooltip>

      <div className="cancelDrag justify-center">
        <iframe
          src={`https://my.brain.fm/`}
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div className="mt-2 flex items-center space-x-1 p-1">
        <input
          className="cancelDrag w-full rounded-lg border border-gray-300 p-1 placeholder-gray-600 dark:border-gray-500 dark:bg-gray-700/[.96] dark:placeholder-gray-300"
          type="text"
          value={text}
          placeholder="Paste Spotify URL here"
          onChange={e => {
            setText(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
