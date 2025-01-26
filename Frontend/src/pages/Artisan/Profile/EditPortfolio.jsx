import { useForm } from "react-hook-form";
import { editPortfolio } from "../../../api/ArtisanEditProfile"; // Import editPortfolio from the correct file
import { getTokenFromCookie } from "../../../api/getProfile";

const EditPortfolio = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

      // Prepare form data
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      if (data.image_file && data.image_file[0]) {
        formData.append("image_file", data.image_file[0]); // Append the file if it exists
      }

      // Call the editPortfolio API
      const response = await editPortfolio(formData, credentials);

      // Handle success
      console.log("Project updated successfully:", response);
      alert("Projet ajoute avec succès !");

      reset({
        title: "",
        description: "",
        price: "",
        image_file: null,
      });

      // Optionally, reset the form or redirect the user
    } catch (error) {
      // Handle errors
      console.error("Error updating project:", error);
      alert("Une erreur s'est produite lors de la mise à jour du projet.");
    }
  };

  return (
    <div>
      <h1 className="mx-16 text-2xl my-4 text-custom_green">
        Mettez en avant vos compétences en ajoutant vos projets et réalisations. <br />Chaque projet renforce la confiance de vos clients potentiels
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl my-10 mx-auto p-6 bg-custom_grey bg-opacity-50 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Titre */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-custom_blue">Titre</label>
            <input
              type="text"
              {...register("title", {
                required: "Le titre est requis",
              })}
              placeholder="Titre"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description of Services */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-custom_blue">Description</label>
            <textarea
              {...register("description", {
                required: "La description des services est requise",
              })}
              placeholder="Décrivez vos services ...."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Prix */}
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-semibold text-custom_blue">Prix</label>
            <input
              type="number"
              {...register("price", {
                required: "Le prix est requis",
              })}
              placeholder="500000"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-transparent"
            />
            <p className="absolute top-8 right-2">DA</p>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Illustration */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-custom_blue">Illustration</label>
            <input
              type="file"
              {...register("image_file", {
                required: "L'illustration est requise",
              })}
              accept=".jpg,.png,.pdf"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            <p className="text-sm text-gray-500 mt-2">Veuillez insérer un fichier au format JPG, PNG ou PDF, avec une taille maximale de 5 Mo.</p>
            {errors.image_file && (
              <p className="text-red-500 text-sm mt-1">{errors.image_file.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-28 py-2 px-4 bg-custom_green text-white font-semibold rounded-md hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditPortfolio;