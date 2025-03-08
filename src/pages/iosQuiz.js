import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import Loading from "./loading";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { blobToBase64 } from "@/components/helper";
import VerifyLoading from "@/components/VerifyLoading";
import ErrorFallback from "@/components/ErrorFallback";
import { useRouter } from "next/router";

export default function IosQuiz() {
  const router = useRouter();
  const { recordingAudio, recording, startRecording, stopRecording } =
    useRecordVoice();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allowAudio, setAllowAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionForIcon, setSelectedOptionForIcon] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [audio, setAudio] = useState(null);
  const [userResponceArray, setUserResponceArray] = useState([]);
  const [animationNumber, setAnimationNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [micPermission, setMicPermission] = useState("unknown");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // New state to track quiz completion

  // Get language from URL query parameter
  const language = router.query.language || "english";

  useEffect(() => {
    // Check microphone permission
    if (typeof navigator !== "undefined" && navigator.permissions) {
      navigator.permissions
        .query({ name: "microphone" })
        .then((permissionStatus) => {
          setMicPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setMicPermission(permissionStatus.state);
          };
        })
        .catch(() => {
          // Handle permission query failure silently
          setMicPermission("unknown");
        });
    }
  }, []);

  const requestMicAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      // Make sure initialMediaRecorder is defined or this will throw an error
      if (typeof initialMediaRecorder === "function") {
        initialMediaRecorder(stream);
      }
      setMicPermission("granted");
    } catch (err) {
      setMicPermission("denied");
      // User-friendly message without exposing technical details
      setErrorMessage(
        "Microphone access is required for this quiz. Please enable it in your browser settings and refresh the page."
      );
      return;
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationNumber(1);
    }, 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleRecordingComplete = async (recordingAudio) => {
    if (!recordingAudio) return;

    try {
      const base64Audio = await blobToBase64(recordingAudio);
      verifyAnswer(base64Audio, false);
    } catch (err) {
      // Handle error silently without exposing details
      console.error("Processing error");
    }
  };

  useEffect(() => {
    if (recordingAudio) {
      handleRecordingComplete(recordingAudio);
    }
  }, [recordingAudio]);

  useEffect(() => {
    if (router.isReady && !isQuizCompleted) {
      fetchQuestions();
    }
  }, [router.isReady, language, isQuizCompleted]);

  useEffect(() => {
    if (
      allowAudio &&
      questions.length > 0 &&
      currentQuestionIndex < questions.length &&
      !isQuizCompleted
    ) {
      playQuestionAudio();
    }
  }, [currentQuestionIndex, allowAudio, questions, isQuizCompleted]);

  const toggleQuestionAudio = () => {
    if (isPlaying) {
      stopQuestionAudio();
    } else {
      playQuestionAudio();
    }
  };

  const playQuestionAudio = () => {
    if (audio) {
      audio.pause();
    }

    if (!questions[currentQuestionIndex]?.audio || isQuizCompleted) {
      return;
    }

    setAllowAudio(true);
    try {
      const questionAudio = new Audio(
        `data:audio/wav;base64,${questions[currentQuestionIndex]?.audio}`
      );

      questionAudio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudio(questionAudio);
        })
        .catch(() => {
          setIsPlaying(false);
          // Silent fail for audio issues
        });

      questionAudio.onended = () => {
        setIsPlaying(false);
        if (selectedOption || isQuizCompleted) return;
        handleStartRecording("audio");
      };
    } catch (error) {
      // Silent fail for audio issues
      setIsPlaying(false);
    }
  };

  const stopQuestionAudio = () => {
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setAllowAudio(false);
  };

  const fetchQuestions = async () => {
    if (isQuizCompleted) return; // Prevent fetching if quiz is completed

    try {
      const response = await fetch(
        "https://node.hivoco.com/api/get_questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lang: language }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load questions");
      }

      const data = await response.json();
      if (data?.questions?.length > 0) {
        setQuestions(data.questions);
      } else {
        setHasError(true);
        setErrorMessage(
          "Unable to load quiz questions. Please try again later."
        );
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage("Unable to load quiz questions. Please try again later.");
    }
  };

  const handleSkip = () => {
    if (isQuizCompleted) return; // Prevent actions if quiz is completed

    if (currentQuestionIndex < questions.length - 1) {
      resetState();
      setIsPlaying(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (isQuizCompleted) return; // Prevent actions if quiz is completed

    if (selectedOption) {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    if (isQuizCompleted) return; // Prevent actions if quiz is completed

    resetState();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      completeQuiz();
    }
  };

  // New function to handle quiz completion
  const completeQuiz = () => {
    setIsQuizCompleted(true); // Mark quiz as completed

    // Stop any playing audio
    if (audio) {
      audio.pause();
    }

    try {
      // Save data to localStorage
      localStorage.setItem("data", JSON.stringify(userResponceArray));

      // Navigate to login page with delay to ensure state updates first
      setTimeout(() => {
        router.push("/login");
      }, 300);
    } catch (error) {
      console.error("Error during quiz completion:", error);
      // Even on error, try to navigate
      setTimeout(() => {
        router.push("/login");
      }, 300);
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setCorrectOption(null);
  };

  const verifyAnswer = async (userAnswer, bool) => {
    if (!questions[currentQuestionIndex] || isQuizCompleted) return;

    const body = {
      user_answer: userAnswer,
      question_id: questions[currentQuestionIndex].question_id,
      lang: language,
      onClick: bool,
      platform: "iOS",
      option_one: questions[currentQuestionIndex]?.options?.[0] || "",
    };

    if (selectedOption) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://node.hivoco.com/api/verify_answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Answer verification failed");
      }

      const data = await response.json();
      setIsLoading(false);
      setIsAnswerCorrect(data.is_correct);
      setCorrectOption(data.correct_option);

      // Update user response array and selected option based on the response
      updateUserResponses(data, userAnswer, bool);
    } catch (error) {
      setIsLoading(false);
      // Silent fail without exposing error details
      setSelectedOption(questions[currentQuestionIndex]?.options?.[0] || "");
    }
  };

  const updateUserResponses = (data, userAnswer, isClickEvent) => {
    const currentQuestion = questions?.[currentQuestionIndex]?.question || "";
    let givenAnswer, isCorrect;

    if (data.is_correct && !isClickEvent) {
      givenAnswer = data.correct_answer;
      isCorrect = true;
      setSelectedOption(data.correct_answer);
      setSelectedOptionForIcon(data.correct_answer);
    } else if (!data.is_correct && !isClickEvent) {
      givenAnswer = data.wrong_option;
      isCorrect = false;
      setSelectedOption(data.wrong_option);
      setSelectedOptionForIcon(data.wrong_option);
    } else if (!data.is_correct && isClickEvent) {
      givenAnswer = userAnswer;
      isCorrect = false;
      setSelectedOption(data.wrong_option);
    } else if (data.is_correct && isClickEvent) {
      givenAnswer = userAnswer;
      isCorrect = true;
      setSelectedOption(data.correct_answer);
    }

    setUserResponceArray((prevArray) => [
      ...prevArray,
      {
        question: currentQuestion,
        givenAns: givenAnswer,
        correctAns: data.correct_answer,
        isCorrect: isCorrect,
        time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
      },
    ]);
  };

  const handleOptionClick = (option) => {
    if (recording || selectedOption || isQuizCompleted) return;

    if (audio) {
      audio.pause();
    }
    setSelectedOptionForIcon(option);
    verifyAnswer(option, true);
  };

  const handleStartRecording = async (source) => {
    if (audio || isQuizCompleted) {
      audio?.pause();
    }

    if (micPermission === "denied" && source === "audio") return;

    if (micPermission === "denied" && source === "click") {
      setErrorMessage("Please allow microphone access in browser settings.");
      requestMicAccess();
      return;
    }

    try {
      startRecording();
      setTimeout(() => {
        stopRecording();
      }, 4000);
    } catch (error) {
      // Silent fail for recording errors
    }
  };

  if (hasError) {
    return (
      <ErrorFallback
        message={
          errorMessage || "Something went wrong. Please try again later."
        }
        onRetry={() => {
          setHasError(false);
          setIsQuizCompleted(false); // Reset completion state when retrying
          fetchQuestions();
        }}
      />
    );
  }

  if (!questions.length || !questions[currentQuestionIndex]) {
    return <Loading />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="font-Inter pt-7 pb-10 h-full flex flex-col justify-between text-[#28211D] overflow-hidden">
      <div className="px-6 flex justify-between items-start">
        <Link href={"/"}>
          <nav className="flex gap-2 items-center text-white">
            <Image
              className={`transition-all duration-700 ease-in-out
                ${animationNumber >= 1 ? "scale-100" : "scale-125"}
              `}
              src="/images/s-icon.png"
              width={24}
              height={34}
              alt="s icon"
              priority
            />

            <X
              className={`transition-all duration-100 ease-in-out
                ${animationNumber >= 1 ? "opacity-100 " : "opacity-0"}
              `}
              size={24}
              color="white"
            />

            <Image
              className={`
                transition-all duration-700 ease-in-out
                ${
                  animationNumber >= 1
                    ? "translate-x-0 scale-100"
                    : "translate-x-[600%] scale-125"
                }
              `}
              src="/images/hv-circle-white.png"
              width={34}
              height={34}
              alt="s icon"
              priority
            />
          </nav>
        </Link>

        <div
          className={`flex flex-col gap-2.5 
            transition-all duration-500 ease-in-out
            ${animationNumber >= 1 ? "translate-x-0 " : "translate-x-[600%] "}
          `}
        >
          <Link href={"/language-selection"}>
            <Image
              src="/svg/Exit.svg"
              width={34}
              height={34}
              alt="exit back button"
              priority
            />
          </Link>

          <Image
            onClick={toggleQuestionAudio}
            src="/svg/Mute.svg"
            width={34}
            height={34}
            alt="mute button"
            priority
          />
        </div>
      </div>

      <div
        className={`relative mx-7 
          transition-all duration-700 ease-in-out
          ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className={`
            bg-white rotate3 h-full py-6 px-7
            flex flex-col justifybetween gap-10 items-center rounded-3xl 
            relative z-20 rotate-3`}
        >
          <div className="flex flex-col gap-3 -rotate-3 ">
            <span className="font-semibold text-[14px] leading-[17px]">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
            <h2 className="font-semibold text-[16px] leading-[20px]">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full -rotate-3">
            <div className="relative self-center">
              <Image
                onClick={() => handleStartRecording("click")}
                className={`self-center
                  transition-all duration-300 ease-in-out
                  ${animationNumber >= 1 ? "scale-100" : "scale-75"}
                `}
                src={
                  recording
                    ? "/images/listening.png"
                    : "/images/mic-hexagon.png"
                }
                width={123}
                height={134}
                alt="mic hexagon image"
                priority
              />

              {recording && (
                <Image
                  onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                  className="absolute left-1/2 top-7 -translate-x-1/2 opacity-0 duration-500 transition-all ease-in-out"
                  src="/animation/animation.gif"
                  width={60}
                  height={60}
                  alt="wave gif"
                  priority
                />
              )}
            </div>

            <div className="flex flex-col gap-0.5 self-stretch">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`font-medium text-[16px] leading-5 text-center flex items-center justify-between border border-[#001734] px-6 py-3 rounded-full capitalize ${
                    selectedOption?.trim().toLowerCase() ===
                    option?.trim().toLowerCase()
                      ? isAnswerCorrect
                        ? "border-green-500 bg-green-300"
                        : "bg-[#F60000] text-white"
                      : ""
                  }`}
                >
                  {option}

                  {selectedOptionForIcon?.trim().toLowerCase() ===
                    option?.trim().toLowerCase() && (
                    <Image
                      src="/svg/tick-circle-solid.svg"
                      width={24}
                      height={24}
                      alt="tick image"
                      priority
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Background Cards  */}
        <div className="bg-white/30 -rotate-3 h-full rounded-3xl absolute z-0 inset-0"></div>
        <div className="bg-white/15 rotate-8 h-full rounded-3xl absolute z-10 inset-0"></div>
      </div>

      <div
        className={`flex gap-5 items-center px-6
          transition-all duration-700 ease-in-out
          ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
        `}
      >
        <button
          onClick={handleSkip}
          disabled={isQuizCompleted}
          className="capitalize h-12 bg-white/25 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full rounded-full"
        >
          Skip
        </button>

        <button
          onClick={handleSubmit}
          disabled={isQuizCompleted}
          className="capitalize h-12 bg-white/25 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full rounded-full"
        >
          Submit
        </button>
      </div>
      {isLoading && <VerifyLoading />}

      {errorMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="font-semibold text-lg mb-2">Notice</h3>
            <p className="mb-4">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
