import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { rqDevis } from "../../../api/devis"; // Import the rpDevis function
import { getTokenFromCookie } from "../../../api/getProfile"; // Import the function to get the token

function RqDevis() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const SIDEBAR_EXPANDED_WIDTH = 240;
  const SIDEBAR_COLLAPSED_WIDTH = 80;
  const { artisan_id } = useParams();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const artisan_id1 = artisan_id;

  // Toggle urgency and update form data
  const toggleUrgency = () => {
    const newUrgencyState = !isUrgent;
    setIsUrgent(newUrgencyState);
    setValue("urgence", newUrgencyState); // Update the form data with the new urgency state
  };

  // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setImageFile(file); // Store the file in state
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Get the token from cookies
      const token = getTokenFromCookie();
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare FormData for the API call
      const formData = new FormData();
      formData.append("service_demande", data.service_demande);
      formData.append("description", data.description);
      formData.append("location_user", data.location_user);
      formData.append("date_souhaite", data.date_souhaite);
      formData.append("budget_prevu", data.budget_prevu);
      formData.append("urgence", data.urgence);
      formData.append("artisan_id", artisan_id1);

      // Append the image file if it exists
      if (imageFile) {
        formData.append("image_file", imageFile); // Use "mage_file" as the key
      }

      // Prepare credentials for the API call
      const credentials = {
        authorization: `Bearer ${token}`,
      };

      // Call the rpDevis API with FormData
      console.log(formData);
      const response = await rqDevis(formData, credentials);

      // Handle success
      console.log("Response from rpDevis:", response);
      alert("Réponse au devis envoyée avec succès !");

      // Reset the form after successful submission
      reset();
      setImageFile(null); // Clear the image file state
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

              {/* Location */}
              <label htmlFor="location">
                Localisation
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="text"
                id="location"
                {...register("location_user", {
                  required: "Ce champ est obligatoire",
                })}
                placeholder="Entrez votre localisation"
                className="border-2 border-gray-300 rounded-md bg-lightYellow p-2"
              />
              {errors.location_user && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location_user.message}
                </p>
              )}

              {/* date souhaité */}
              <label htmlFor="delai">
                Date souhaité
                <span className="text-red-500 font-bold"> * </span>:
              </label>
              <input
                type="date"
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
                accept="image/*" // Allow only image files
                onChange={handleImageUpload} // Handle file input change
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
              Veuillez soumettre une image au format JPG, PNG ou PDF, avec une
              taille maximale de 5 Mo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RqDevis;