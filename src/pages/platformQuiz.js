import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";

const PlatformQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get("language");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      let platform = "android"; // Default platform

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        platform = "iOS"; // Detect iOS
      }

      console.log(platform, "platform");

      // Redirect based on platform
      if (platform == "iOS") {
        console.log(language, platform, "ios");

        router.push(`/iosQuiz?language=${language}`); // Redirect to iOS quiz
      } else {
        console.log(language, platform, "android");

        router.push(`/quiz?language=${language}`); // Redirect to Android quiz
      }
    }
  }, [router]);

  return <></>; // Show while redirecting
};

export default PlatformQuiz;
