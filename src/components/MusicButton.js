import { useMusic } from "../contexts/MusicContext";

export default function MusicButton() {
  const { isMusicEnabled, isPlaying, enableMusic, toggleMusic } = useMusic();

  if (!isMusicEnabled) {
    return (
      <button onClick={enableMusic} className="music-button">
        Start Music
      </button>
    );
  }

  return (
    <button onClick={toggleMusic} className="music-button">
      {isPlaying ? "Pause Music" : "Play Music"}
    </button>
  );
}
