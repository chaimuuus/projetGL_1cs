import {Sidebar } from "../../../components/Sidebar"
import {Header} from '../../../components/Header';
import { useState } from "react";

function Facture() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const SIDEBAR_EXPANDED_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 80;
  const [isDownload, setIsDownload] = useState(false);

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
            Demandez de devis personnalisé
          </h1>
          <p className="text-textBlack m-10">
          Notez bien : Le montant total sera automatiquement calculé comme suit :
          </p>
          <p>Montant Total = (Frais de main-d'œuvre + Frais des matériaux + Frais de déplacement + Autres frais) × (1 + Taxe/100) − Remise</p>
          <div className=" mt-10 ml-10 bg-lightYellow shadow-md p-6 shadow-slate-500 align-middle">
            <h2 className="text-red-500 text-md">* indique un champ obligatoire</h2>
            <form className="flex flex-col p-6 text-lg">
              <label htmlFor="Type">
                Frais de main-d'œuvre
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="text"
                id="Ptype"
                name="projet"
                placeholder="Indiquer le coût du travail effectué (en heures ou en forfait)."
                required
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="Service">Frais des matériaux / équipements utilisés :
              
              </label>
              <input
                type="text"
                id="service"
                name="service"
                placeholder="Lister ou totaliser les matériaux utilisés"
                required
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="description">Frais de déplacement :</label>
              <input
                type="text"
                id="desc"
                name="desc"
                required
                placeholder="Adaptable selon le métier (par kilomètre pour un plombier, ou frais fixes pour un couturier)"
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="delai">Frais supplémentaires (personnalisés) :
              </label>
              <input
                type="text"
                id="delai"
                name="delai"
                required
                placeholder="Ajouter d’autres frais spécifiques selon les besoins (par ex. 'frais de nettoyage','stockage')."
                className="border-2 my-3  border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="budget">Taxe (TVA) :
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                required
                placeholder="Pourcentage à appliquer au total (par ex. 19% en Algérie)"
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
             
              <label htmlFor="budget">Remise (réduction) :
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                required
                placeholder="Réduction sur le total pour des promotions ou arrangements avec le client"
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              <label htmlFor="statue">Statut du paiement 
              <span className="text-red-500 font-bold"> * </span>:
              </label>
               <select className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
             >
                <option >Non payé</option>
                <option >Partiellement payé</option>
                <option>Payé intégralement</option>
              </select>
              <label htmlFor="paiement" type="date">Date du paiement :
              </label>
              <input
                type="date"
                id="budget"
                name="budget"
                required
                placeholder="La date du paiement."
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
              />
                <label htmlFor="statue">Mode du paiement 
              <span className="text-red-500 font-bold"> * </span>:
              </label>
               <select className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
             >
                <option >Chéque</option>
                <option >Virement bancaire</option>
                <option>Paiement en ligne</option>
                <option>Carte bancaire</option>
              </select>
             <label htmlFor="notes">Notes ou ajustements</label>
                <input type="text " name="notes" 
                className="border-2 my-3 border-gray-300 rounded-md bg-lightYellow p-2"
                placeholder=" Ajouter des informations complémentaires sur la facture, comme des remises, des retards de paiement, ou des frais supplémentaires."
                />
            </form>
            
            <div className="flex items-center space-x-4 mt-4">
                <span className="text-lightGreen text-lg font-semibold">
                Télécharger une copie de la facture
                </span>
                <button
                  type="button"
                  onClick={() => setIsDownload(!isDownload)}
                  className={`w-12 h-6 rounded-xl flex items-center transition-all duration-300 ${
                    isDownload ? "bg-lightGreen" : "bg-slate-400"
                  }`}
                >
                  <div
                    className="rounded-full bg-white w-5 h-5 transition-all duration-300"
                    style={{
                      transform: isDownload ? "translateX(28px)" : "translateX(0)",
                    }}
                  ></div>
                </button>
            </div>
            <button
              type="submit"
              className=" mt-5 p-3 flex flex-col rounded-md bg-lightGreen text-white font-semibold transition-all duration-300 hover:bg-lightGreen-500"
            >Générer et envoyer la facture</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facture;
