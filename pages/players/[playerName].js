import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'



const PlayerDetails = () => {
    
    const router = useRouter();
    const {playerName} = router.query;
    
    return (
        <>
            <Navbar/>
                <div className='mt-10 w-full flex justify-center items-center'>
                    <h1 className="text-3xl font-bold underline">Player page For {playerName}</h1> 
                </div>
            <Footer/>
        </>
    );
}

export default PlayerDetails;