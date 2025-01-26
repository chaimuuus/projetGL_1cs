import React from "react"; 
import { useForm } from "react-hook-form";
import logo from "../assets/Logo.png";
import RightSection from "../components/SignUp/RightSection"
import Footer from "../components/Footer"
import { login, loginArtisan } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";


import Cookies from 'js-cookie';


const Login = () => {
  let isArtisan = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response;
      try {
        // First, try user login
        response = await login(data);
      
      } catch (userLoginError) {
        // If user login fails, try artisan login
        response = await loginArtisan(data);
        isArtisan = true
      }
  
      console.log("Login successful:", response);
      alert("Login avec succès !");
  
      const { access_token } = response;
      Cookies.set('token', `${access_token}`, { expires: 7, secure: true, sameSite: 'Strict' });
      console.log(isArtisan)
      navigate(isArtisan ? "/artisan" : "/user");
  
    } catch (error) {
      console.error("Login failed:", error);
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-screen">
        {/* Left Section */}
          <div className="w-1/2 p-16 py-20">
              <div className=" bg-custom_yellow bg-opacity-20 flex flex-col p-4 items-center shadow-lg rounded-lg">
                  {/* Logo */}
                  <div className=" mb-3 ml-6 w-34 self-start">
                      <img src={logo} alt="DZ-Artisan Logo" />
                      <h1 className="text-3xl ml-2 font-bold text-gray-800">DZ-Artisan</h1>
                  </div>

                  {/* Welcome Text */}
                  <p className="text-xl ml-8 text-custom_green mb-4 font-semibold self-start">
                    Bon retour
                    parmi nous
                  </p>

                  {/* Form */}
                  <div className="max-w-md w-full text-sm">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Adresse Email */}
                      <div className="mb-2">
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
                      <div className="flex justify-start">
                        <button
                        type="submit"
                        className="w-44 bg-custom_green text-white text-xs py-2 rounded hover:bg-transparent hover:text-custom_green hover:border-custom_green transition"
                        >
                            Connexion
                        </button>
                        </div>
                  </form>

                  {/* Footer */}
                  <p className="text-sm text-center text-gray-600 mt-3">
                  Vous n’avez encore un compte?{" "}
                      <Link to="/welcome">
                      <a href="#" className="text-custom_green font-semibold">
                        Inscrivez-vous ici
                      </a>
                      </Link>
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

export default Login;
