import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'



const PlayerDetails = () => {
    
    const router = useRouter();
    const {playerName} = router.query;
    let player = "";
    for(let ch in playerName) {
        if (playerName[ch] != '-')
            player += playerName[ch];
        else
            player += ' ';
    }
    player = player.toUpperCase();
    
    return (
        <>
            <Navbar/>
            <div>
                <div className="w-30 left flex items-left mb-2 justify-left">
                    <div className="flex h-28 items-right justify-start">
                        <img className="flex mx-20 bg-gray-400" src="https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/4429084.png" width="140" height="140"/>
                        <div className="flex flex-col">
                            <div className="flex flex-col items-left text-gray-600 text-s">
                                <div className="flex items-end">Name:
                                    <h3 className="text-s">{player}</h3>
                                </div>
                                <div className="flex items-end">Height:
                                    <h3 className="text-s">6'4"</h3>
                                </div>
                                <div className="flex items-end">Weight:
                                    <h3 className="text-s">232 Ibs</h3>
                                </div>
                                <div className="flex items-end">Position:
                                    <h3 className="text-s">QB</h3>
                                </div>
                                <div className="flex items-end">Year:
                                    <h3 className="text-s">Sophomore</h3>
                                </div>
                                <div className="flex items-end">Team:
                                    <h3 className="text-s">Florida Gators</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default PlayerDetails;