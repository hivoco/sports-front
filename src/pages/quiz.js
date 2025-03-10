// import { X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// const Quiz = () => {
//   const options = ["real madird", "bacrelona"];
//   const [isListening ,setIsListening]= useState(false)
//   const [selectedOption,setSelectedOption]=useState("")
//   const correctAns= "Real Madird"
// return (
//   <div className="font-Inter pt-7 pb-10 h-full flex flex-col justify-between ">
//     {/* navbar */}
//     <div className="px-6 flex justify-between items-start">
//       <nav className="flex gap-0.5 items-center text-white">
//         <Image
//           src="/images/s-icon.png"
//           width={27}
//           height={38}
//           alt="s icon"
//           priority
//         />

//         <X size={24} color="white" />

//         <Image
//           src="/images/hv-circle-white.png"
//           width={38}
//           height={38}
//           alt="s icon"
//           priority
//         />
//       </nav>

//       <div className="flex flex-col gap-2.5 ">
//         <Image
//           src="/svg/Exit.svg"
//           width={34}
//           height={34}
//           alt="exit button"
//           priority
//         />
//         <Image
//           src="/svg/Mute.svg"
//           width={34}
//           height={34}
//           alt="mute button"
//           priority
//         />
//       </div>
//     </div>

//     {/* container quiz card */}
//     <div className="relative mx-7">
//       {/* quiz card */}

//       <div
//         className="bg-white rotate3 h-full text-[#001734] py-6 px-7
//           flex flex-col justify-between items-center rounded-3xl
//           rotate-3 relative z-20"
//       >
//         <div className="flex flex-col gap-3 ">
//           <span className=" font-semibold text-[14px] leading-[17px] ">
//             01/10
//           </span>

//           <h2 className="font-semibold text-[16px] leading-[20px] ">
//             Who has won more El Clásico matches in official competitions?
//           </h2>
//         </div>

//         <div className="flex flex-col gap-3 w-full">
// <Image
//   onClick={() => {
//     setIsListening(true);
//   }}
//   className="self-center"
//   src={
//     isListening
//       ? "/images/listening.png"
//       : "/images/mic-hexagon.png"
//   }
//   width={123}
//   height={134}
//   alt="mic hexagon image"
//   priority
// />

//           {/* options  */}
//           <div className="flex flex-col gap-0.5 self-stretch">
//             {options.map((option, index) => {
//               return (
//                 <button
//                   onClick={() => {
//                     setSelectedOption(option);
//                   }}
//                   className={`font-medium text-[16px] leading-5 text-center
//                   flex items-center justify-between  border border-[#001734]
//                   px-6 py-3 rounded-full capitalize
//                   `}
//                   key={index}
//                   // className="w-full border"
//                 >
//                   {option}

//                   <Image
//                     src={"/svg/tick-circle.svg"}
//                     width={24}
//                     height={24}
//                     alt="tick image"
//                     priority
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div
//         className="bg-white/30 -rotate-3 h-full
//           rounded-3xl
//            absolute z-0 inset-0"
//       ></div>

//       <div
//         className="bg-white/15 rotate-8 h-full
//           rounded-3xl
//            absolute z-10 inset-0"
//       ></div>
//     </div>

//     {/* bottom two buttons SKIP SUBMIT */}

//     <div className="flex gap-5 items-center px-6">
//       <button
//         className={`capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full
//       rounded-full placeholder:text-white/50 outline-none text-center`}
//       >
//         skip
//       </button>

//       <Link
//       className="w-full"
//       href={"/login"}>
//       <button
//         className={`capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full
//       rounded-full placeholder:text-white/50 outline-none text-center`}
//       >
//         submit
//       </button>

//       </Link>
//     </div>
//   </div>
// );
// };

// export default Quiz;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import Loading from "./loading";
import { useSearchParams } from "next/navigation";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

export default function Quiz() {
  const {
    recording,
    speechText,
    startSpeechRecognition,
    stopSpeechRecognition,
  } = useSpeechRecognition();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allowAudio, setAllowAudio] = useState(false); // Controls whether audio should play
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionForIcon, setSelectedOptionForIcon] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [audio, setAudio] = useState(null);
  const searchParams = useSearchParams();
  const [userResponceArray, setUserResponceArray] = useState([]);

  const language = searchParams.get("language") || "english";

  useEffect(() => {
    fetchQuestions();
  }, [language]);

  useEffect(() => {
    if (speechText) {
      verifyAnswer(speechText);
    }
  }, [speechText]);

  useEffect(() => {
    if (allowAudio) {
      playQuestionAudio();
    }
  }, [currentQuestionIndex]);

  const toggleQuestionAudio = () => {
    if (isPlaying) {
      stopQuestionAudio();
    } else {
      playQuestionAudio();
    }
  };

  const playQuestionAudio = () => {
    // if (!allowAudio) return;

    if (audio) {
      audio.pause();
    }
    setAllowAudio(true);
    const questionAudio = new Audio(
      `data:audio/wav;base64,${questions[currentQuestionIndex]?.audio}`
    );

    questionAudio
      .play()
      .then(() => {
        setIsPlaying(true);
        setAudio(questionAudio);
      })
      .catch((error) => console.error("Audio play error:", error));

    questionAudio.onended = () => {
      setIsPlaying(false);
      if (selectedOption) return;
      handleStartRecording();
    };
  };

  const stopQuestionAudio = () => {
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setAllowAudio(false); // Prevent auto-play on question change
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://node.hivoco.com/api/get_questions",
        {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Tells the server you're sending JSON data
          },
          body: JSON.stringify({ lang: language }), // Convert data to JSON string
        }
      );
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      resetState();
      // setAllowAudio(true);
      setIsPlaying(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    resetState();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      localStorage.setItem("data", JSON.stringify(userResponceArray));
      window.location.href = `/login`;
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setCorrectOption(null);
  };

  const verifyAnswer = async (userAnswer, bool) => {
    const body = {
      user_answer: userAnswer,
      question_id: questions[currentQuestionIndex].question_id,
      lang: language,
      onClick: bool,
      platform: "",
      option_one: questions[currentQuestionIndex].options[0],
    };
    if (selectedOption) return;
    try {
      const response = await fetch(
        "https://node.hivoco.com/api/verify_answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setIsAnswerCorrect(data.is_correct);
      setCorrectOption(data.correct_option);
      if (data.is_correct && !bool) {
        setSelectedOption(data.correct_answer);
        setSelectedOptionForIcon(data.correct_answer);
        setUserResponceArray((prevArray) => [
          ...prevArray,
          {
            question: questions?.[currentQuestionIndex]?.question,
            givenAns: data.correct_answer,
            correctAns: data.correct_answer,
            isCorrect: data.is_correct,
            time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
          },
        ]);
        return;
      } else if (!data.is_correct && !bool) {
        setSelectedOption(data.wrong_option);
        setSelectedOptionForIcon(data.wrong_option);
        setUserResponceArray((prevArray) => [
          ...prevArray,
          {
            question: questions?.[currentQuestionIndex]?.question,
            givenAns: data.wrong_option,
            correctAns: data.correct_answer,
            isCorrect: data.is_correct,
            time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
          },
        ]);
        return;
      } else if (!data.is_correct && bool) {
        setSelectedOption(data.wrong_option);
        setUserResponceArray((prevArray) => [
          ...prevArray,
          {
            question: questions?.[currentQuestionIndex]?.question,
            givenAns: userAnswer,
            correctAns: data.correct_answer,
            isCorrect: data.is_correct,
            time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
          },
        ]);
        return;
      } else if (data.is_correct && bool) {
        setSelectedOption(data.correct_answer);
        setUserResponceArray((prevArray) => [
          ...prevArray,
          {
            question: questions?.[currentQuestionIndex]?.question,
            givenAns: userAnswer,
            correctAns: data.correct_answer,
            isCorrect: data.is_correct,
            time: Math.floor(Math.random() * (30 - 3 + 1)) + 3,
          },
        ]);
        return;
      }
    } catch (error) {
      console.error("Error validating answer:", error);
    }
  };

  const handleOptionClick = (option) => {
    if (recording || selectedOption) return;
    if (audio) {
      audio.pause();
    }
    setSelectedOptionForIcon(option);
    verifyAnswer(option, true);
  };

  const handleStartRecording = async () => {
    if (audio) {
      audio.pause();
    }
    startSpeechRecognition();
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //   const recorder = new MediaRecorder(stream);
    //   setMediaRecorder(recorder);
    //   const chunks = [];

    //   recorder.ondataavailable = (event) => chunks.push(event.data);

    //   recorder.onstop = async () => {
    //     // No need to process audio anymore
    //   };

    //   recorder.start();
    //   setRecording(true);

    //   // Speech Recognition to detect speech
    //   const SpeechRecognition =
    //     window.SpeechRecognition ||
    //     window.webkitSpeechRecognition ||
    //     window.mozSpeechRecognition ||
    //     window.msSpeechRecognition;
    //   if (!SpeechRecognition) {
    //     console.error("SpeechRecognition not supported");
    //     recorder.stop();
    //     setRecording(false);
    //     return;
    //   }

    //   const recognition = new SpeechRecognition();

    //   recognition.onerror = (event) => {
    //     console.error("Speech recognition error:", event.error);
    //   };

    //   recognition.onaudiostart = () => console.log("Audio started");
    //   recognition.onaudioend = () => console.log("Audio ended");
    //   recognition.onspeechstart = () => console.log("Speech detected");
    //   recognition.onspeechend = () => console.log("Speech ended");

    //   recognition.continuous = false; // Stops when speech ends
    //   recognition.interimResults = false;
    //   recognition.lang = "en-US"; // Set language if needed

    //   let speechDetected = false;
    //   // let transcriptText = ""; // Store recognized speech
    //   console.log("yha tak");
    //   recognition.onresult = async (event) => {
    //     speechDetected = true; // Speech was detected
    //     transcriptText = event.results[0][0].transcript; // Extract speech text
    //     console.log("User said:", transcriptText);

    //     // Call API with text instead of audio
    //     await verifyAnswer(transcriptText, false);
    //   };

    //   recognition.onend = () => {
    //     if (speechDetected) {
    //       console.log("Speech detected, API called with text.");
    //     } else {
    //       console.log("No speech detected.");
    //     }

    //     // Stop recording in both cases
    //     if (recorder.state === "recording") {
    //       recorder.stop();
    //       setRecording(false);
    //     }
    //   };

    //   recognition.start();
    // } catch (error) {
    //   console.error("Error starting recording:", error);
    // }
  };

  const handleStopRecording = () => {
    return;
    // if (mediaRecorder) {
    //   mediaRecorder.stop();
    //   setRecording(false);
    // }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <Loading />;
  }

  return (
    <div className="font-Inter pt-7 pb-10 h-full flex flex-col justify-between">
      <div className="px-6 flex justify-between items-start">
        <nav className="flex gap-0.5 items-center text-white">
          <Image
            src="/images/s-icon.png"
            width={27}
            height={38}
            alt="s icon"
            priority
          />
          <X size={24} color="white" />
          <Image
            src="/images/hv-circle-white.png"
            width={38}
            height={38}
            alt="s icon"
            priority
          />
        </nav>

        <div className="flex flex-col gap-2.5">
          <Image
            src="/svg/Exit.svg"
            width={34}
            height={34}
            alt="exit button"
            priority
          />
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

      <div className="relative mx-7">
        <div className="bg-white rotate3 h-full text-[#001734] py-6 px-7 flex flex-col justify-between items-center rounded-3xl rotate-3 relative z-20">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[14px] leading-[17px]">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
            <h2 className="font-semibold text-[16px] leading-[20px]">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Image
              onClick={recording ? handleStopRecording : handleStartRecording}
              className="self-center"
              src={
                recording ? "/images/listening.png" : "/images/mic-hexagon.png"
              }
              width={123}
              height={134}
              alt="mic hexagon image"
              priority
            />

            {/* <audio
             src={currentQuestion.audio}
             controls
             onEnded={() => setAudioEnded(true)}
             className="w-full"
           />
           <button
             onClick={recording ? handleStopRecording : handleStartRecording}
             className="mt-4 p-4 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center"
           >
             {recording ? "Stop" : "🎤"}
           </button> */}

            {/* <audio
              src={`data:audio/wav;base64,${currentQuestion.audio}`}
              controls
              onEnded={() =>
                recording ? handleStopRecording : handleStartRecording
              }
              className="w-full "
            /> */}

            <div className="flex flex-col gap-2 self-stretch">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`font-medium text-[16px] leading-5 text-center flex items-center justify-between border border-[#001734] px-6 py-3 rounded-full capitalize ${
                    selectedOption?.trim().toLowerCase() ===
                    option?.trim().toLowerCase()
                      ? isAnswerCorrect
                        ? "border-green-500 bg-green-300"
                        : "border-red-500 "
                      : ""
                  }`}
                >
                  {option}

                  {selectedOptionForIcon?.trim().toLowerCase() ===
                    option?.trim().toLowerCase() && (
                    <Image
                      src="/svg/tick-circle.svg"
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
        <div className="bg-white/30 -rotate-3 h-full rounded-3xl absolute z-0 inset-0"></div>
        <div className="bg-white/15 rotate-8 h-full rounded-3xl absolute z-10 inset-0"></div>
      </div>

      <div className="flex gap-5 items-center px-6">
        <button
          onClick={handleSkip}
          className="capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full rounded-full"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          className="capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
