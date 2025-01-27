import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { rpDevis } from "../../../api/devis"; // Import the rpDevis function
import { getTokenFromCookie } from "../../../api/getProfile"; // Import the function to get the token
import { useParams } from "react-router-dom";

function RpDevis() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const SIDEBAR_EXPANDED_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 80;
  const { id_rqdevis } = useParams();
  const rqdevisID = id_rqdevis;


  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Get the token from cookies
      const token = getTokenFromCookie();
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare credentials for the API call
      const credentials = {
        authorization: `Bearer ${token}`,
      };

      // Add id_rqdevis to the form data
      const formData = {
        id_rqdevis: rqdevisID, // Replace with the actual id_rqdevis value (e.g., from props or state)
        ...data,
      };

      // Call the rpDevis API
      const response = await rpDevis(formData, credentials);

      // Handle success
      console.log("Response from rpDevis:", response);
      alert("Réponse au devis envoyée avec succès !");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      // Handle errors
      console.error("Error submitting devis response:", error);
      alert("Une erreur s'est produite lors de l'envoi de la réponse au devis.");
    }
  };

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
            Veuillez fournir les informations nécessaires pour répondre à la
            demande de devis du client. Assurez-vous d'inclure tous les détails
            relatifs au montant, à la durée estimée et à toute condition
            particulière liée à la prestation.
          </p>
          <div className="ml-10 bg-lightYellow shadow-md p-6 shadow-slate-500 align-middle">
            <h2 className="text-red-500 text-md">
              * indique un champ obligatoire
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-6 text-lg"
            >
              {/* Montant total du devis */}
              <label htmlFor="montant">
                Montant total du devis
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="number"
                id="montant"
                {...register("prix", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Le montant total que l'artisan propose pour le travail"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.prix && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prix.message}
                </p>
              )}

              {/* Durée estimée des travaux */}
              <label htmlFor="delai">
                Durée estimée des travaux
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="number"
                id="delai"
                {...register("delai_estime", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Le nombre de jours ou de semaines nécessaires pour réaliser le projet."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.delai_estime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.delai_estime.message}
                </p>
              )}

              {/* Détails de la prestation */}
              <label htmlFor="service_details">Détails de la prestation</label>
              <input
                type="text"
                id="description"
                {...register("service_details")} // No longer required
                placeholder="Une description détaillée du travail à effectuer, incluant les matériaux et services."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />

              {/* Conditions ou remarques */}
              <label htmlFor="conditions">Conditions ou remarques</label>
              <input
                type="text"
                id="conditions"
                {...register("remarques")} // No longer required
                placeholder="Conditions supplémentaires comme l'acompte ou des spécifications particulières liées à la prestation."
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-5 p-3 flex flex-col rounded-md bg-lightGreen text-white font-semibold transition-all duration-300 hover:bg-lightGreen-500"
              >
                Envoyer la réponse au client
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RpDevis;