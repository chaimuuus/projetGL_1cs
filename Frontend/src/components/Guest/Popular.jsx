/* eslint-disable react/prop-types */
import { HiLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

export default function Popular() {
  const Card = ({ image, nom, localisation, specialite }) => {
    return (
      <div>
        <div className="overflow-hidden relative my-0 mx-auto rounded-t-2xl">
          <img
            src={image}
            alt=""
            className="rounded-2xl w-[300px] h-[300px] box-border hoverImg"
          />
         <p className="bg-white rounded-lg p-1 text-sm absolute top-4 right-4 flex items-center gap-1">
                      <FaStar className="text-[#ffc103]" /> 4.9
                    </p>
        </div>
        <div className="flex justify-between items-center">
          <span>
            <h5 className="text-xl pt-2 font-semibold">{nom}</h5>
            <div className="flex items-center gap-2 py-3">
              <HiLocationMarker size={20} className="text-primary" />
              <p className="text-gray text-light">{localisation}</p>
            </div>
          </span>
          <p className="font-semibold">
            {specialite} <span className="font-light"></span>
          </p>
        </div>
      </div>
    );
  };
 

  return (
    <div className="container mx-auto px-3">
      <section className="pt-16">
        <div>
          <div className="lg:flex justify-between text-center">
            <span>
              <h2 className="text-4xl lg:text-5xl font-bold">Artisans Populaires</h2>
              <p className="py-4 text-left lg:text-lg">
              Explorez les talents locaux
                Découvrez les trésors de l'artisanat algérien
              </p>
            </span>
            <p className="text-light lg:w-2/5 text-right lg:text-lg">
              Chaque artisan raconte une histoire unique à travers ses œuvres. Venez explorer des créations authentiques et soutenez les talents locaux.
            </p>
          </div>
          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 my-12 relative z-10">
          <Card
              image="../../Sofiane tabet.jpg"
              nom="Sofiane Tabet"
              localisation="Biskra, Algérie"
              specialite="électricité"
            />
          <Card
              image="../../fatima.jpg"
              nom="Fatima Zahra Belkacem"
              localisation="Tlemcen, Algérie"
              specialite="Couture"
            />
          <Card
              image="../../nadia.jpg"
              nom="Nadia Messaoudi"
              localisation="Alger, Algérie"
              specialite="Cuisine"
            />
          <Card
              image="../../Rachide.png"
              nom="Rachide boukhalfa"
              localisation="Constantine, Algérie"
              specialite="Plomberie"
            />
          
          
          
          </div>
        </div>
      </section>
      <section className="py-16">
        <span className="flex flex-col items-center text-center gap-2">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Découvrez la richesse de notre patrimoine
          </h2>
          <p className="lg:text-lg">
            Explorez des créations artisanales uniques et authentiques.
          </p>
        </span>
        <div className="lg:flex items-center justify-between py-16">
          <div className="lg:w-1/2">
            <div>
              <span className="bg-[#7bbbde] text-white px-3 py-1 rounded-xl lg:text-2xl">
                01
              </span>
              <h2 className="font-bold text-lg py-4 lg:text-3xl">
                Soutenez les artisans locaux
              </h2>
              <p className="text-light pb-6 lg:w-1/2 lg:text-lg">
                Chaque achat soutient directement les familles et préserve le savoir-faire ancestral.
              </p>
            </div>
            <div>
              <span className="bg-[#8196e9] text-white px-3 py-1 rounded-xl lg:text-2xl">
                02
              </span>
              <h2 className="font-bold text-lg py-4 lg:text-3xl">
                Explorez des œuvres authentiques
              </h2>
              <p className="text-light pb-6 lg:w-1/2 lg:text-lg">
                Chaque pièce est unique et raconte une histoire, pleine de couleurs et de traditions.
              </p>
            </div>
            <div>
              <span className="bg-primary text-white px-3 py-1 rounded-xl lg:text-2xl">
                03
              </span>
              <h2 className="font-bold text-lg py-4 lg:text-3xl">
                Préservez notre patrimoine
              </h2>
              <p className="text-light pb-6 lg:w-1/2 lg:text-lg">
                En valorisant l'artisanat, nous contribuons à la préservation de notre patrimoine culturel.
              </p>
            </div>
            <button className="bg-primary text-white px-6 py-3 transition-bg hover:bg-white hover:text-primary rounded-xl shadow my-8">
              Découvrez nos créations
            </button>
          </div>
          <div className="lg:w-1/2 h-full overflow-hidden rounded-2xl">
            <img
              src="../../artisan algerienne .jpg"
              alt="Artisan algérien"
              className="rounded-2xl w-full h-full hoverImg"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
}
