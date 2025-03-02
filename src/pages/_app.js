import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      className="h-svh bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/bg/bg1.png)`,
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}
