import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="container mx-auto px-6 pt-12">
      <div className="relative rounded-2xl lg:pb-32 lg:h-[100vh]">
        <div className="overflow-hidden relative h-full w-full">
          <img
            className="lg:absolute top-0 w-full lg:h-[70vh] h-[30rem] object-cover rounded-2xl"
            src="../../hero.png"
            alt="Arrière-plan Artisan DZ"
          />
          {/* Overlay noir */}
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl"></div>
        </div>

        <div className="absolute top-0 bottom-0 left-0 right-0 h-fit">
          <h1 className="text-white text-4xl lg:text-6xl flex justify-center mt-20 lg:mt-40 font-bold lg:w-4/5 mx-auto text-center">
            Trouvez l'artisan qu'il vous faut, rapidement et facilement !
          </h1>
          <p className="flex justify-center lg:text-2xl text-white mt-8 px-6 text-center">
          DZ Artisans, votre plateforme en ligne qui connecte artisans qualifiés et clients pour tous vos projets. Facilitez vos collaborations dès aujourd'hui 
          </p>
        </div>

        <div className="lg:w-4/5 mx-auto lg:h-[70vh] h-full">
          <div className="bg-white px-8 py-8 rounded-[10px] lg:absolute bottom-16 lg:w-4/5 shadow-lg flex items-center justify-center">
            <Link to="/services">
              <button className="rounded-lg bg-primary text-white p-7 outline-none flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-bg shadow">
                Parcourir les services
              </button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}