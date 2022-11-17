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
                <div className="flex">
                    <img className="flex h-200 mx-20 bg-gray-400" src="https://a.espncdn.com/combiner/i?img=/i/headshots/college-football/players/full/4429084.png" width="350" height="400"/>
                    <div className="flex flex-col mx-20 justify-right">
                        <div className="flex flex-col items-left text-gray-600 text-s">
                            <div className="flex items-end">
                                <h3 className="text-xl">Name: </h3>
                                <h3 className="text-s"><b>{player}</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Height: </h3>
                                <h3 className="text-xl"><b>6'4"</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Weight:</h3>
                                <h3 className="text-xl"><b>232 Ibs</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Position:</h3>
                                <h3 className="text-xl"><b>QB</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Year: </h3>
                                <h3 className="text-xl"><b> Sophomore</b></h3>
                            </div>
                            <div className="flex items-end">
                                <h3 className="text-xl">Team:</h3>
                                <h3 className="text-xl"><b>Florida Gators</b></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <Footer/>
        </>
    );
}

export default PlayerDetails;