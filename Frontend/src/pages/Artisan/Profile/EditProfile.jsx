import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AvatarPlaceholder  from '../../../assets/avatar2.png'
import { MdOutlineEdit } from "react-icons/md";


const EditProfile = () => {

    const [avatar, setAvatar] = useState(AvatarPlaceholder);
      
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  const { register, handleSubmit, resetField, watch } = useForm();
  const [specialites, setSpecialites] = useState([]);

  const specialiteInput = watch("specialiteInput", "");

  const onSubmit = (data) => {
    delete data.specialiteInput;
    console.log({
      ...data,
      specialites,
      avatar: avatar,
    });
  };

  const handleAddSpecialite = () => {
    if (specialiteInput && !specialites.includes(specialiteInput)) {
      setSpecialites((prev) => [...prev, specialiteInput]);
      resetField("specialiteInput");
    }
  };

  const handleRemoveSpecialite = (specialite) => {
    setSpecialites((prev) => prev.filter((item) => item !== specialite));
  };

  return (
    <div>
        <div className="items-center flex gap-2 px-14">
            <div className="relative">
                <img
                    src={avatar}
                    alt="User"
                    className="rounded-full object-cover w-full h-full"
                />
                <div className="absolute bottom-0 right-0 bg-white p-0.5 rounded-full shadow-md">
                    <label htmlFor="upload-avatar" style={{ color: '#2773FF' }} className="cursor-pointer">
                    <MdOutlineEdit className="w-4 h-4" />
                    </label>
                    <input
                    id="upload-avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    />
                </div>
            </div>
            <h2 style={{ color: '#0F2744' }} className="text-lg font-semibold">Rachide Boukhalfa</h2>
        </div>
        <div className="my-4 mx-20">
            <hr className="border-t border-gray-300" />
        </div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl my-7 mx-auto p-6 bg-custom_grey bg-opacity-50 rounded-lg shadow-md"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
                type="text"
                {...register("nom")}
                placeholder="Boukalfa"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Prénom */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
                type="text"
                {...register("prenom")}
                placeholder="Rachid"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Email */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Adresse email
            </label>
            <input
                type="email"
                {...register("email")}
                placeholder="exemple@gmail.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Téléphone */}
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Numéro de téléphone
            </label>
            <input
                type="tel"
                {...register("telephone")}
                placeholder="06 79 88 34 45"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Localisation */}
            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
                Localisation
            </label>
            <input
                type="text"
                {...register("localisation")}
                placeholder="Cité des Frères Abbas, Bloc A, Constantine"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Métier */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Métier</label>
            <input
                type="text"
                {...register("metier")}
                placeholder="Saisissez votre métier..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
            </div>

            {/* Spécialité */}
            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
                Spécialité
            </label>
            <div className="flex gap-2 mt-1">
                <input
                type="text"
                {...register("specialiteInput")}
                placeholder="Saisissez un domaine..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
                />
                <button
                type="button"
                onClick={handleAddSpecialite}
                className="px-4 py-2 bg-custom_green text-white rounded-md hover:bg-green-700"
                >
                Ajouter
                </button>
            </div>
            {/* Specialites */}
            <div className="mt-4 flex flex-wrap gap-4">
                {specialites.map((specialite, index) => (
                <div
                    key={index}
                    className="flex items-center bg-slate-300 px-3 py-1 rounded-md"
                >
                    <span>{specialite}</span>
                    <button
                    type="button"
                    onClick={() => handleRemoveSpecialite(specialite)}
                    className="ml-2 text-red-500 w-5 h-5 flex items-center justify-center rounded-full"
                    >
                    ×
                    </button>
                </div>
                ))}
            </div>
            </div>
        </div>

        <button
            type="submit"
            className="mt-6 w-28 py-2 px-4 bg-custom_green text-white font-medium rounded-md hover:bg-green-700"
        >
            Enregistrer
        </button>
        </form>
    </div>
  );
};

export default EditProfile;
