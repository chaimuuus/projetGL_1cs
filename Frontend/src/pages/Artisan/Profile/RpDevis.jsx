import {Sidebar } from "../../../components/Sidebar"
import {Header} from '../../../components/Header';
import { useState } from "react";

function RpDevis() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const SIDEBAR_EXPANDED_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 80;
  

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="fixed top-0 left-0 z-50 right-0">
        <Header className="w-full h-16 shadow-md" />
      </div>
      <div className="flex flex-1 pt-16">
        <div className="left-0 top-16 fixed h-full z-40 transition-all ease-in-out duration-300">
          <Sidebar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
          />
        </div>
        <div
          className="flex-1 transition-all duration-300 ease-in-out flex flex-col p-6"
          style={{
            marginLeft: isSidebarExpanded
              ? `${SIDEBAR_EXPANDED_WIDTH}px`
              : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          }}
        >
          <h1 className="font-bold text-lightGreen text-2xl mt-10">
          Réponse au devis :
          </h1>
          <p className="text-textBlack m-10">
          Veuillez fournir les informations nécessaires pour répondre à la demande de devis du client. Assurez-vous d'inclure tous les détails relatifs au montant, à la durée estimée et à toute condition particulière liée à la prestation.
          </p>
          <div className="ml-10 bg-lightYellow shadow-md p-6 shadow-slate-500 align-middle">
            <h2 className="text-red-500 text-md">* indique un champ obligatoire</h2>
            <form className="flex flex-col p-6 text-lg">
              <label htmlFor="Type">
              Montant total du devis 
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="number"
                id="Montant"
                name="montant"
                placeholder=" Le montant total que l'artisan propose pour le travail"
                required
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              
              <label htmlFor="description">Détails de la prestation </label>
              <input
                type="text"
                id="desc"
                name="desc"
                required
                placeholder="Une description détaillée du travail à effectuer, incluant les matériaux et services."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="delai">Durée estimée des travaux 
              <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="text"
                id="delai"
                name="delai"
                required
                placeholder="Le nombre de jours ou de semaines nécessaires pour réaliser le projet."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="budget">Conditions ou remarques 
              
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                required
                placeholder="Conditions supplémentaires comme l'acompte ou des spécifications particulières liées à la prestation."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              
            </form>
          
            <button
              type="submit"
              className=" mt-5 p-3 flex flex-col rounded-md bg-lightGreen text-white font-semibold transition-all duration-300 hover:bg-lightGreen-500"
            >Envoyer la réponse au client</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RpDevis;
