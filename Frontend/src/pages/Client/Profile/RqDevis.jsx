import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";

function RqDevis() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const SIDEBAR_EXPANDED_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 80;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Toggle urgency and update form data
  const toggleUrgency = () => {
    const newUrgencyState = !isUrgent;
    setIsUrgent(newUrgencyState);
    setValue("urgence", newUrgencyState); // Update the form data with the new urgency state
  };

  // Form submission handler
  const onSubmit = (data) => {
    // Add artisan_id to the form data
    const artisan_id = "12345"; // Replace with the actual artisan_id (e.g., from state, props, or API)
    const formData = {
      ...data,
      artisan_id, // Include artisan_id in the form data
    };

    console.log("Form Data Submitted:", formData); // Log the updated form data
    alert("Demande de devis envoyée avec succès !");
    reset(); // Reset the form after submission
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
            Demandez de devis personnalisé
          </h1>
          <p className="text-textBlack m-10">
            Remplissez ce formulaire pour obtenir un devis précis et adapté à
            vos besoins. Nos artisans vous répondront dans les plus brefs
            délais.
          </p>
          <div className="ml-10 bg-lightYellow shadow-md p-6 shadow-slate-500 align-middle">
            <h2 className="text-red-500 text-md">* indique un champ obligatoire</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-6 text-lg"
            >
              {/* Service demandé */}
              <label htmlFor="service">
                Service demandé
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="text"
                id="service"
                {...register("service_demande", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Installation"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.service_demande && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.service_demande.message}
                </p>
              )}

              {/* Description */}
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                {...register("description")}
                placeholder="Décrivez brièvement votre projet ou besoin"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />

              {/* Délai souhaité */}
              <label htmlFor="delai">
                Délai souhaité
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="text"
                id="delai"
                {...register("date_souhaite", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Indiquez le délai souhaité"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.date_souhaite && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date_souhaite.message}
                </p>
              )}

              {/* Budget prévu */}
              <label htmlFor="budget">
                Budget prévu
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="number"
                id="budget"
                {...register("budget_prevu", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Indiquez l'estimation souhaitée en DA"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.budget_prevu && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.budget_prevu.message}
                </p>
              )}

              {/* Illustration */}
              <label htmlFor="file">
                Illustration
                <span className="text-red-500 font-bold"> (recommandé) </span>:
              </label>
              <input
                type="file"
                id="file"
                {...register("illustrations")}
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />

              {/* Urgence Toggle */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-lightGreen text-lg font-semibold">
                  Urgence
                </span>
                <button
                  type="button"
                  onClick={toggleUrgency} // Use the toggleUrgency function
                  className={`w-12 h-6 rounded-xl flex items-center transition-all duration-300 ${
                    isUrgent ? "bg-lightGreen" : "bg-slate-400"
                  }`}
                >
                  <div
                    className="rounded-full bg-white w-5 h-5 transition-all duration-300"
                    style={{
                      transform: isUrgent ? "translateX(28px)" : "translateX(0)",
                    }}
                  ></div>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-5 p-3 flex flex-col rounded-md bg-lightGreen text-white font-semibold transition-all duration-300 hover:bg-lightGreen-500"
              >
                Valider ma demande
              </button>
            </form>
            <p className="text-textBlack">
              Veuillez soumettre des images au format JPG, PNG ou PDF, avec une
              taille maximale de 5 Mo et un maximum de 3 fichiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RqDevis;