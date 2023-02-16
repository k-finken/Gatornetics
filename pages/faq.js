import Layout from '../components/Layout'
import Link from 'next/link';
import { Disclosure } from '@headlessui/react'

export default function Faq() {
  return (
    <Layout>
      <div className='text-center text-xl sm:text-2xl font-bold text-white my-4'>Got a question? We have answers</div>
      <div className='p-1 mx-10 sm:mx-25 md:mx-40 lg:mx-60 my-2 rounded-xl bg-gray-300'>
        
        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              Who made Gatornetics?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Cole Johnson, Kyle Finken, Mason Green, Christian Martinez, and Emmanuel Garit.
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              Why should I create an account?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Account creation will come with several benefits in the future. For example, a Gatornetics user might want
            to upload their own data to run in our machine learning models. Without an account, this data would be 
            lost after leaving Gatornetics and the user would have to reupload it every time. 
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              Where do you get your statistics from?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            All data is pulled from CollegeFootballData.com (CFBD gets their data from sources like ESPN, 247sports, and NCAA). 
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How are talent scores for teams calculated?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Team talent scores are based upon current recruit rankings that are then processed into a gaussian distribution. This distribution takes higher-ranked recruit scores and fully sums them with lower-ranked recruit scores (that are adjusted). Lower-ranked recruit scores are multiplied with a percentage value based upon their rating as a result of the sample difference between them and higher-ranked players. To learn more information on talent scores, you can read the 247sports link here: { }
            <span className="text-blue-600 hover:underline cursor-pointer"><Link href="https://247sports.com/college/byu/Article/How-Are-247-Recruiting-Rankings-Calculated-139730851/">How Are 247 Recruiting Rankings Calculated?</Link></span>
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How do you test the accuracy of your predictions?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Our predictions and their calculations will vary depending on which outcome you are trying to predict. However, a general strategy that we use as a metric includes loss-estimations that are captured during training. Additionally, we use coefficient scores as a means of determining useful features that are input into our model. Once we’ve utilized these measures and determined our output, we compare results with existing entities that have calculated similar results with their frameworks.
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How often is the data updated?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            In season, new data is pulled and analyzed on a weekly basis to provide the most up to date, and consistent analysis for users. During the off season, updates are applied in various stages depending on what needs to be updated and what information is available from collegefootballdata. 
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              Why do some players have no information?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Since we are pulling data from free sources, we are limited in terms of the depth of information/statistics that we are provided. Offensive/defensive linemen and younger players will often have no/little information as a result of the complexity of gathering data on their position or their lack of playing time.
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How are team offensive/defensive scores calculated?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Team offensive/defensive scores are calculated from a cumulation of several different statistics (each unique to offense/defense) and are then summed/averaged. For example, offensive scores take into account conversion rates/explosiveness while defensive scores cover sacks/interceptions. 
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How are team expected wins calculated?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Expected wins are based on postgame win probabilities in which a team’s previous game probabilities are summed together (and then formatted in terms of an overall score for how many wins a team will have in a given season).
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              How are team recruit rankings determined?
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Similarly to the talent scores, recruit class rankings are determined by the total number of points a team has for a given roster/class. Again, this is summed on a gaussian distribution for the skill-range of athletes that are committed to a given team.
          </Disclosure.Panel>
        </Disclosure>

        <Disclosure as='div' className="flex flex-col p-1">
          <Disclosure.Button as='div' className="flex justify-center py-2 rounded-lg bg-gray-400">
            <div className='ml-5 mr-auto pr-4 text-left text-gray-900 overflow-hidden'>
              About Gatornetics
            </div>
            <div className='min-w-[25px] my-auto mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></div>
          </Disclosure.Button>
          <Disclosure.Panel className="mx-5 py-2 bg-inherit text-gray-600">
            Gatornetics is a free college football analytics website that offers insight on thousands of D1, FBS student athletes and all 131 schools over the 2022 season. Additionally, we offer machine learning demos to not only provide potential predictions as to game outcomes and player performance output, but to showcase the powerful connection between computing and athletics. Although we encourage users to sign up, it’s completely optional and you can access any player on our website. If you have any recommendations or suggestions, email support at cole.johnson@ufl.edu
          </Disclosure.Panel>
        </Disclosure>

      </div>

    </Layout>

  )
}
