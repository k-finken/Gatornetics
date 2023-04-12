import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Simulate from '../components/Simulate';
import { Combobox, Menu } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { prisma, PrismaClient } from '@prisma/client';

export async function getServerSideProps(context) {

  const prisma = new PrismaClient()

  const teamsList = await prisma.teams.findMany({
      select: {
          id:true,
          school:true,
          conference:true,
          color:true,
          wins:true,
          losses:true,
          expecWins:true,
          recRank:true,
          talentScore:true,
          overOff:true,
          overDeff:true,
          imgLinx:true,
      },
  })
  teamsList.sort((a, b) => (a.school > b.school ? 1 : -1));

  return {
      props: { teamsList }
  }
}

const plays = [
  // { pos: 'Select Position',   abbr: "SP" },
  { id:"pass", name: "Pass" },
]

export default function MachineLearning({ teamsList }) {

  const [step, setStep] = useState(0);
  const [teamSel1, setTeamSel1] = useState(null)
  const [teamSel2, setTeamSel2] = useState(null)
  const [play, setPlay] = useState(null)

  const yardsToGo = Math.floor(Math.random() * 20) + 1;
  const defenseScore = Math.floor(Math.random() * 60) + 8;
  const offenseScore = defenseScore - (Math.floor(Math.random() * 7) + 4);
  

  return (
    <Layout>
      {step == 0 && 
        <div className='justify-center items-center'>
          <h1 className="mt-10 text-center text-6xl font-bold text-gray-100">End Of Game Simulation</h1>
          <div className="">
            <div>
              <h1 className="text-center mt-10 text-3xl font-bold text-gray-100">How it works:</h1>
              <div className="mt-4 flex border-4 p-8 bg-gray-600 rounded-3xl max-w-fit mx-auto">
                <ul className="steps steps-vertical text-gray-100">
                  <li className="step">Pick two teams to play</li>
                  <li className="step">Generate an endgame scenario</li>
                  <li className="step">Pick the play you'd like to make</li>
                  <li className="step">See if you come out on top!</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-center mt-10 mb-4 text-3xl font-bold text-gray-100">Pick Your Teams</h1>
              <div className='flex justify-center items-center gap-4'>
                <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                        {teamSel1 == null ? "Select Offense" : teamSel1.school}
                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    
                    <Menu.Items as='ul' className='absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {teamsList.map((team) => (
                                <Menu.Item  key={team.id} value={team}>
                                    <div onClick={() => setTeamSel1(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Menu>
                <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                        {teamSel2 == null ? "Select Defense" : teamSel2.school}
                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    
                    <Menu.Items as='ul' className='absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {teamsList.map((team) => (
                                <Menu.Item  key={team.id} value={team}>
                                    <div onClick={() => setTeamSel2(team)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{team.school}</div>
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Menu>
              </div>
            </div>
            {/* <div>
              <h1 className="mt-40 text-center mt-10 mb-4 text-3xl font-bold text-gray-100">Pick Your Play</h1>
              <Menu as='div' className='flex h-10 justify-center text-white text-lg'>
                    <Menu.Button className="flex rounded-lg bg-gray-700 px-4 py-2 text-sm text-white font-normal hover:bg-gray-600">
                        {play == null ? "Select Play" : play.name}
                        <ChevronUpDownIcon className="ml-2 h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    
                    <Menu.Items as='ul' className='absolute z-10 mt-12 max-h-48 w-60 overflow-y-scroll scrollbar rounded-md bg-gray-700'>
                            {plays.map((play) => (
                                <Menu.Item  key={play.id} value={play}>
                                    <div onClick={() => setPlay(play)} className='m-1 px-4 py-1 rounded-md ui-active:bg-gray-500 ui-active:cursor-pointer'>{play.name}</div>
                                </Menu.Item>
                            ))}
                    </Menu.Items>
                </Menu>
            </div> */}
          </div>
          <h1 className="text-center mt-20 text-3xl font-bold text-gray-100">Ready To Begin?</h1>
          <button disabled={!(teamSel1 && teamSel2)} onClick={() => setStep(1)} className="block mt-10 mx-auto disabled:bg-gray-400 bg-white text-gray-700 hover:bg-gray-100 btn btn-primary">Generate End Game Scenario</button>
        </div>
      }
      {step == 1 && 
        <Simulate yardsToGo={yardsToGo} offenseScore={offenseScore} defenseScore={defenseScore} setStep={setStep} team1={teamSel1} team2={teamSel2}/>
      }
      <div className="h-36"></div>
    </Layout>
  )
}
