/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiFilter, HiLocationMarker } from "react-icons/hi";

export default function Explore() {
  const [active, setActive] = useState("Artisans populaires");
  const Card = ({ image, nom, localisation, prix }) => {
    return (
      <div>
        <div className="overflow-hidden relative my-0 mx-auto rounded-t-2xl">
          <img
            src={image}
            alt=""
            className="rounded-2xl w-[300px] h-[300px] box-border hoverImg"
          />
           <p className="bg-white rounded-lg p-1 text-sm absolute top-4 right-4">
            Promotion 20%
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
            {prix} DA/<span className="font-light">pièce</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="lg:p-16">
        <div className="container mx-auto px-3">
          <div className="lg:flex justify-between">
            <span className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold">Découvrez nos artisans</h2>
              <p className="py-4 text-left">Explorez les talents locaux</p>
            </span>
            <p className="text-light lg:w-2/5 lg:text-right lg:text-lg">
              Retrouvez une sélection d'artisans talentueux qui proposent des créations uniques et locales. Soutenez l'artisanat algérien !
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between py-8">
            <span className="flex items-center flex-wrap gap-4">
              <button
                onClick={() => setActive("Artisans populaires")}
                className={`rounded-lg px-4 lg:text-lg py-2 text-sm hover:bg-black hover:text-white ${
                  active === "Artisans populaires"
                    ? "bg-black text-white"
                    : "bg-light1"
                }`}
              >
                Artisans populaires
              </button>
              <button
                onClick={() => setActive("Bijoux")}
                className={`rounded-lg lg:text-lg px-4 py-2 text-sm hover:bg-black hover:text-white ${
                  active === "Bijoux" ? "bg-black text-white" : "bg-light1"
                }`}
              >
                Bijoux
              </button>
              <button
                onClick={() => setActive("Céramique")}
                className={`rounded-lg px-4 lg:text-lg py-2 text-sm hover:bg-black hover:text-white ${
                  active === "Céramique" ? "bg-black text-white" : "bg-light1"
                }`}
              >
                Céramique
              </button>
              <button
                onClick={() => setActive("Textiles")}
                className={`rounded-lg px-4 py-2 lg:text-lg text-sm hover:bg-black hover:text-white ${
                  active === "Textiles"
                    ? "bg-black text-white"
                    : "bg-light1"
                }`}
              >
                Textiles
              </button>
              <button
                onClick={() => setActive("Décoration")}
                className={`rounded-lg px-4 py-2 lg:text-lg text-sm hover:bg-black hover:text-white ${
                  active === "Décoration" ? "bg-black text-white" : "bg-light1"
                }`}
              >
                Décoration
              </button>
              <button
                onClick={() => setActive("Cuisine")}
                className={`rounded-lg px-4 py-2 lg:text-lg text-sm hover:bg-black hover:text-white ${
                  active === "Cuisine" ? "bg-black text-white" : "bg-light1"
                }`}
              >
                Cuisine
              </button>
            </span>
            <button className="bg-light1 rounded-lg lg:text-lg my-4 px-4 py-2 text-sm flex items-center gap-2 hover:bg-black hover:text-white">
              Filtres <HiFilter />
            </button>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 py-16">
            <Card
              image="../../tapis.jpg"
              nom="Tapis traditionnel"
              localisation="Ghardaïa, Algérie"
              prix="4500"
            />
            <Card
              image="../../bijoux.jpg"
              nom="Bijoux Kabyles"
              localisation="Tizi Ouzou, Algérie"
              prix="3000"
            />
            <Card
              image="../../Poterie.jpg"
              nom="Poterie décorative"
              localisation="Constantine, Algérie"
              prix="2500"
            />
            <Card
              image="../../broderrie.jpg"
              nom="Broderie à la main"
              localisation="Biskra, Algérie"
              prix="1500"
            />
            <Card
              image="../../Décoration murale.jpg"
              nom="Décoration murale"
              localisation="Alger, Algérie"
              prix="2000"
            />
            <Card
              image="../../Céramique peinte.jpg"
              nom="Céramique peinte"
              localisation="Oran, Algérie"
              prix="3500"
            />
          </div>
          <div className="flex justify-center">
            <button className="shadow-md transition-bg bg-white hover:bg-primary hover:text-white outline-none px-4 py-2 rounded-[10px]">
              Voir plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
