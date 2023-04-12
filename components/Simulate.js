import React, { useState } from "react";
import { Combobox, Menu } from "@headlessui/react";
import { ChevronUpDownIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import loadingGif from "../public/loading-gif.gif"
import Confetti from "react-confetti";


const plays = [
  { id: "Pass", name: "Pass" },
  { id: "Rush", name: "Rush" },
  { id: "Field%20Goal", name: "Field Goal" },
];

function Simulate({ team1, team2, setStep, yardsToGo, defenseScore, offenseScore}) {
  const [play, setPlay] = useState(null);
  const [scoreReturned, setScoreReturned] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runPlay(e) {
    e.preventDefault();
    console.log("running");
    const fetchUrl = `https://gatornetics-2.herokuapp.com/getinps/?defenseScore=${defenseScore}&offenseScore=${offenseScore}&ytg=${yardsToGo}&offense_team=${team1.school}&defense_team=${team2.school}&play=${play.id}&key=28c53a5c-f930-4069-92a9-c1999a17c66b`;
    setLoading(true);
    try {
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setScoreReturned(result);
      setLoading(false);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="flex content-center justify-center scale-150 mt-20">
        <div className="flex flex-col w-1/2 shadow-[0_0_2px_0_rgba(#303030,0.1),0_4px_4px_0_rgba(#303030,0.1)] rounded-[10px] bg-gray-100">
          <div className="flex p-4 border-b-2 border-b-[rgba(#303030,0.1)] border-solid items-center justify-center">
            <div className="flex items-center font-bold">
              {`${team1.school} (Offense) VS   ${team2.school} (Defense)`}
            </div>
          </div>
          <div className="flex relative">
            <div className="flex justify-center items-center w-[calc(100%/3)] p-8">
              <div className="flex flex-col items-center team--home">
                <div className="w-[100px] h-[100px] flex items-center justify-center bg-[color:var(--color-bg-primary)] shadow-[0_4px_4px_0_rgba(#303030,0.15),0_0_0_15px_var(--color-bg-secondary)] rounded-[50%]">
                  <img src={team1.imgLinx} />
                </div>
                <h2 className="text-center text-xl font-semibold mt-6">
                  {team1.school}
                </h2>
              </div>
            </div>
            <div className="flex justify-center items-center w-[calc(100%/3)] p-8">
              <div className="">
                <div className="flex justify-center items-center mt-3">
                  <span className="text-5xl font-semibold leading-none">
                    {offenseScore}
                  </span>
                  <span className="text-[28px] font-bold leading-none mx-2.5">
                    :
                  </span>
                  <span className="text-5xl font-semibold leading-none">
                    {defenseScore}
                  </span>
                </div>
                <div className="text-[#DF9443] text-sm font-semibold mt-2 text-center">
                  {yardsToGo} Yards To Go
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-[calc(100%/3)] p-8">
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px] flex items-center justify-center rounded-[50%]">
                  <img src={team2.imgLinx} />
                </div>
                <h2 className="text-center text-xl font-semibold mt-6">
                  {team2.school}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {!scoreReturned && !loading && (
          <>
            <div className="">
              <h1 className="text-center mt-20 mb-4 text-3xl font-bold text-gray-100">
                Pick Your Play
              </h1>
              <Menu
                as="div"
                className="flex h-10 justify-center text-white text-lg"
              >
                <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                  {play == null ? "Select Play" : play.name}
                  <ChevronUpDownIcon
                    className="ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Menu.Items
                  as="ul"
                  className="absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700"
                >
                  {plays.map((play) => (
                    <Menu.Item key={play.id} value={play}>
                      <div
                        onClick={() => setPlay(play)}
                        className="m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer"
                      >
                        {play.name}
                      </div>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <button
              onClick={runPlay}
              disabled={!play}
              className="block mt-10 mx-auto disabled:bg-gray-400 bg-white text-gray-700 hover:bg-gray-100 btn btn-primary"
            >
              Run Your Play!
            </button>
          </>
        )}
        {!scoreReturned && loading &&
        <div className="mt-32 flex justify-center items-center">
          <ArrowPathIcon width={"64px"} className="animate-spin" />
        </div>}
        {scoreReturned && !loading && (
          <div>
            <h1 className="text-center mt-32 mb-4 text-3xl font-bold text-gray-100">
              {scoreReturned >= 0 ? `Yards Gained: ${scoreReturned}` : `Yards Lost: ${scoreReturned}`}
            </h1>
            <h1 className="text-center mt-10 mb-4 text-3xl font-bold text-gray-100">
              {yardsToGo - scoreReturned <= 0
                ? "TOUCHDOWN!"
                : yardsToGo - scoreReturned > 0
                ? "Didn't quite make it."
                : ""}
            </h1>
            {/* {(yardsToGo - scoreReturned <= 0) && 
              <div className="mx-auto">
                <Confetti confettiSource={} recycle={false} numberOfPieces={52}/>
              </div>
            } */}
            <button
              onClick={() => setStep(0)}
              className="block mt-10 mx-auto disabled:bg-gray-400 bg-white text-gray-700 hover:bg-gray-100 btn btn-primary"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Simulate;
