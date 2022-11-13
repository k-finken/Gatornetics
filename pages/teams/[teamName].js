import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const TeamDetails = () => {
    
    const router = useRouter();
    const {teamName} = router.query;
    let team = "";
    for(let ch in teamName) {
        if (teamName[ch] != '-')
            team += teamName[ch];
        else
            team += ' ';
    }
    team = team.toUpperCase();

    return (
        <>
            <Navbar/>
            <div>
                <div className="w-full center flex items-center bg-gray-200 mb-2 justify-center">
                    <div className="flex h-28 items-center justify-start">
                        <img className="flex mx-4" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/57.png" width="140" height="140"/>
                        <div className="flex flex-col">
                            <div className='flex flex-row items-end text-gray-800 font-bold'> 
                                <h1 className="text-4xl  ">{team}</h1> 
                                <div className='text-1xl ml-1'>3</div>
                            </div>
                            <div className="flex flex-row text-gray-600 text-xs">
                                <div>6-4</div>
                                <div className='mx-2'>&#x2022;</div>
                                <div>SEC</div>
                                <div className='mx-2'>&#x2022;</div>
                                <div>Est. 1906</div>
                                <div className='mx-2'>&#x2022;</div>
                                <div>University of Florida</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default TeamDetails;