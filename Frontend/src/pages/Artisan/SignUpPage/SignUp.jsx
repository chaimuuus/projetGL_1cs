import React from "react"; 
import { useForm } from "react-hook-form";
import logo from "../../../assets/Logo.png";
import RightSection from "../../../components/SignUp/RightSection"
import Footer from "../../../components/Footer"

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-screen">
        {/* Left Section */}
          <div className="w-1/2 p-16 py-2">
              <div className=" bg-custom_yellow bg-opacity-20 flex flex-col p-1 items-center shadow-lg rounded-lg">
                  {/* Logo */}
                  <div className=" mb-1 ml-6 w-34 self-start">
                      <img src={logo} alt="DZ-Artisan Logo" />
                      <h1 className="text-3xl ml-2 font-bold text-gray-800">DZ-Artisan</h1>
                  </div>

                  {/* Welcome Text */}
                  <p className="text-lg ml-8 text-custom_green mb-1 font-medium self-start">
                  Bienvenue sur la plateforme des artisans de demain
                  </p>

                  {/* Form */}
                  <div className="max-w-md w-full text-sm">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Nom */}
                      <div className="mb-1">
                      <label htmlFor="nom" className="block text-sm font-medium mb-1">
                          Nom
                      </label>
                      <input
                          id="nom"
                          type="text"
                          placeholder="Nom"
                          {...register("nom", { required: "Le champ Nom est requis" })}
                          className={`w-full border bg-transparent h-9 ${
                          errors.nom ? "border-red-500" : "border-gray-300"
                          } p-2 rounded`}
                      />
                      {errors.nom && (
                          <p className="text-red-500 text-xs mt-1">
                          {errors.nom.message}
                          </p>
                      )}
                      </div>
                      <div className="mb-1">
                      <label htmlFor="prenom" className="block text-sm font-medium mb-1">
                          Prénom
                      </label>
                      <input
                          id="prenom"
                          type="text"
                          placeholder="Prénom"
                          {...register("prenom", { required: "Le champ Prénom est requis" })}
                          className={`w-full border bg-transparent h-9 ${
                          errors.prenom ? "border-red-500" : "border-gray-300"
                          } p-2 rounded`}
                      />
                      {errors.prenom && (
                          <p className="text-red-500 text-xs mt-1">
                          {errors.prenom.message}
                          </p>
                      )}
                      </div>

                      {/* Numéro de téléphone */}
                      <div className="mb-1">
                      <label htmlFor="telephone" className="block text-sm font-medium mb-1">
                          Numéro de téléphone
                      </label>
                      <input
                          id="telephone"
                          type="text"
                          placeholder="0666666666"
                          {...register("telephone", {
                          required: "Le champ Numéro de téléphone est requis",
                          pattern: {
                              value: /^(05|06|07)[0-9]{8}$/,
                              message: "Veuillez entrer un numéro de téléphone valide (10 chiffres)",
                          },
                          })}
                          className={`w-full bg-transparent h-9 border ${
                          errors.telephone ? "border-red-500" : "border-gray-300"
                          } p-2 rounded`}
                      />
                      {errors.telephone && (
                          <p className="text-red-500 text-xs mt-1">
                          {errors.telephone.message}
                          </p>
                      )}
                      </div>

                      {/* Adresse Email */}
                      <div className="mb-1">
                      <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                      >
                          Addresse Email
                      </label>
                      <input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          {...register("email", {
                          required: "Le champ Email est requis",
                          pattern: {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Veuillez entrer un email valide",
                          },
                          })}
                          className={`w-full bg-transparent h-9 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                          } p-2 rounded`}
                      />
                      {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                          </p>
                      )}
                      </div>

                      {/* Mot de Passe */}
                      <div className="mb-4">
                      <label
                          htmlFor="password"
                          className="block text-sm font-medium mb-1"
                      >
                          Mot de passe
                      </label>
                      <input
                          id="password"
                          type="password"
                          placeholder="Entrez votre mot de passe"
                          {...register("password", {
                          required: "Le champ Mot de Passe est requis",
                          pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                              message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
                            },
                          })}
                          className={`w-full bg-transparent h-9 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                          } p-2 rounded`}
                      />
                      {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                          </p>
                      )}
                      </div>
                      

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                        type="submit"
                        className="w-44 bg-custom_green text-white text-xs py-2 rounded hover:bg-transparent hover:text-custom_green hover:border-custom_green transition"
                        >
                        CREER MON COMPTE
                        </button>
                        </div>
                  </form>

                  {/* Footer */}
                  <p className="text-sm text-center text-gray-600 mt-3">
                      Vous avez déjà un compte?{" "}
                      <a href="#" className="text-custom_green font-semibold">
                      Connectez-vous ici
                      </a>
                  </p>
                  </div>
              </div>
          </div>

        <RightSection />
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
