import "@/styles/globals.css";
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export default function App({ Component, pageProps }) {
  
  return (
    <div
      className={`h-svh w-full bg-cover bg-center bg-no-repeat
        ${inter.className}`}
      style={{
        backgroundImage: `url(/bg/bg1.png)`,
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}
