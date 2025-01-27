import Header from "../components/Header";
import Footer from "../components/Footer";
import img1 from "../assets/welcome1.png";
import img2 from "../assets/welcome2.png";

import { Link } from "react-router-dom";

const Welcome = () =>{
    return(
        <div>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="w-full h-16 shadow-md" />
            </div>
            <div className="pt-28 px-52 flex flex-col gap-3">
                <div className="bg-custom_green p-2 rounded-md ml-20 w-24">
                    <h1 className="text-lg text-white">Bonjour !</h1>
                </div>
                <h1 className="text-lg font-bold ml-20">Quel type de compte sauhaitez vous créer ?</h1>
                <div className="flex justify-around mt-3">
                    <div className="flex px-12 py-2 flex-col gap-4 items-center bg-custom_Lyellow border border-custom_Lgrey rounded-md">
                        <img src={img1} alt="illustration" className="mt-3 w-32" />
                        <h1 className="text-xl mt-5 text-center font-bold">Je veux développer <br /> mon entreprise</h1>
                        <p className="text-center text-sm">Répondre à des demandes, obtenir du <br /> travail et gérer mes projets.</p>
                        <div className="bg-custom_green p-2 rounded-md mb-4 w-36">
                        <Link to="/artisan/signup" className="block">
                                <h1 className="text-md text-white">Je suis un artisan</h1>
                        </Link>
                        </div>
                    </div>
                    <div className="flex py-2 px-12 flex-col gap-3 items-center bg-custom_Lyellow border border-custom_Lgrey rounded-md">
                        <img src={img2} alt="illustration" className="w-32" />
                        <h1 className="text-xl text-center font-bold">Je veux engager des <br /> professionnels</h1>
                        <p className="text-center text-sm mb-3">Demander des services, comparer <br /> des devis et planifier mes travaux.</p>
                        <div className="bg-custom_green p-2 rounded-md w-44">
                        <Link to="/user/signup" className="block">
                                <h1 className="text-md text-white">Je cherche un artisan</h1>
                        </Link>
                        </div>
                    </div>
                </div>
                <p className="text-center mt-2 text-xs">
                Vous avez déjà un compte?{" "}
                <a href="/login" className="text-custom_green hover:underline">
                    Connectez-vous ici
                </a>
                </p>
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <Footer/>
            </div>
        </div>
    );
}
export default Welcome;