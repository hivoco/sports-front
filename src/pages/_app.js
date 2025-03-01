import "@/styles/globals.css";
// import bg1 from "/bg/bg1.png";

export default function App({ Component, pageProps }) {
  return (
    <div
    className="h-svh"
      style={{
        backgroundImage: `url(/bg/bg1.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment:"fixed",
        minHeight: "100vh",
      }}
    >
      <Component {...pageProps} />;
    </div>
  );
}
