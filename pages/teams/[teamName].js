import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const TeamDetails = () => {
    
    const router = useRouter();
    const {teamName} = router.query;

    return (
        <>
            <Navbar/>
            <div className='mt-10 w-full flex justify-center items-center'>
                <h1 className="text-3xl font-bold underline">Team page For {teamName}</h1> 
            </div>
            <Footer/>
        </>
    );
}

export default TeamDetails;