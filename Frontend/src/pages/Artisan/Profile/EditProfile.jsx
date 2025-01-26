import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AvatarPlaceholder from "../../../assets/avatar2.png";
import { MdOutlineEdit } from "react-icons/md";
import { getProfileArtisan, getTokenFromCookie } from "../../../api/getProfile";
import { updateProfilePic, artisanEditProfile } from "../../../api/ArtisanEditProfile";
import { getMetiers, getMetierSpecialites } from "../../../api/Metier";
import {addSpecialite} from "../../../api/Specialite"

const EditProfile = () => {
  const [avatar, setAvatar] = useState(AvatarPlaceholder);
  const [specialites, setSpecialites] = useState([]);
  const [artisan, setArtisan] = useState(null);
  const { register, handleSubmit, resetField, watch, setValue } = useForm();
  const [predefinedSpecialites, setPredefinedSpecialites] = useState([
    {
      name: "Pipe Installation",
      specialite_id: 9,
    },
    {
      name: "Drain Cleaning",
      specialite_id: 10,
    },
    {
      name: "Leak Repair",
      specialite_id: 11,
    },
  ])
  
  const specialiteInput = watch("specialiteInput", "");
  const [metiers, setMetiers] = useState([]);

 

  // Handle avatar upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);

      try {
        const token = getTokenFromCookie();
        if (token) {
          const credentials = {
            authorization: `Bearer ${token}`,
          };
          const formData = new FormData();
          formData.append("profilePic", file);
          const response = await updateProfilePic(formData, credentials);
          console.log("Profile pic updated successfully:", response);
        }
      } catch (error) {
        console.error("Error updating profile pic:", error);
      }
    }
  };

  // Fetch artisan profile
  const getArtisanProfile = async () => {
    try {
      const token = getTokenFromCookie();
      if (token) {
        const response = await getProfileArtisan({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtisan(response.user);
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch Metier list
  const getMetier = async () => {
    try {
      const response = await getMetiers();
      setMetiers(response);
    } catch (error) {
      console.error("Error fetching metiers:", error);
    }
  };
 



   // Fetch specialities for a specific metier
   const fetchMetierSpecialites = async (metierId) => {
    try {
      const token = getTokenFromCookie();
      if (!token) throw new Error("No token found");
      
      const credentials = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const specialities = await getMetierSpecialites(metierId, credentials);
      setPredefinedSpecialites(specialities);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  // Watch for changes in the metier selection
  useEffect(() => {
    if (artisan?.metier) {
      fetchMetierSpecialites(artisan.metier); // Fetch specialities for the selected metier
    }
  }, [artisan?.metier]);

  

  useEffect(() => {
    getArtisanProfile();
    getMetier();
  }, []);

  useEffect(() => {
    if (artisan) {
      setValue("full_name", artisan.user_name || "");
      setValue("email", artisan.email || "");
      setValue("phone_number", artisan.phone_number || "");
      setValue("localisation", artisan.localisation || "");
      setValue("metier", artisan.metier || "");
    }
  }, [artisan, setValue]);

  // Form submission
  const onSubmit = async (data) => {
    try {
      const token = getTokenFromCookie();
      if (token) {
        const credentials = {
          authorization: `Bearer ${token}`,
        };
        const profileData = { ...data,  metier: String(data.metier) };
        const response = await artisanEditProfile(profileData, credentials);
        console.log("Profile updated successfully:", response);
      }
    // If form submission is successful, submit specialites separately
      if (specialites.length > 0) {
        const token = getTokenFromCookie(); // Get the token from the cookie
        
        if (token) {
          // Prepare credentials with authorization token
          const credentials = {
            authorization: `Bearer ${token}`,
          };
          
          // Create an array of specialite ids
          const specialityIds = specialites.map(specialite => specialite.specialite_id);
          console.log("Speciality IDs to be added:", credentials);
          
          // Call addSpecialite function to add the specialities
          const specialiteResponse = await addSpecialite(specialityIds, credentials);
          console.log("Specialites added successfully:", specialiteResponse);
        } else {
          console.error("No token found in cookies.");
        }
      } else {
        console.error("No specialities selected.");
      }
    } catch (error) {
      console.error("Error during profile update or adding specialities:", error);
    }
    
  };

 
  
  

  // Handle adding specialities
  const handleAddSpecialite = () => {
    const selectedSpecialite = predefinedSpecialites.find(
      (specialite) => specialite.specialite_id === parseInt(specialiteInput)
    );
  
    if (selectedSpecialite && !specialites.some((s) => s.specialite_id === selectedSpecialite.specialite_id)) {
      setSpecialites((prev) => [...prev, selectedSpecialite]);
      resetField("specialiteInput");
    }
  };
  

  // Handle removing specialities
  const handleRemoveSpecialite = (specialiteId) => {
    setSpecialites((prev) => prev.filter((specialite) => specialite.specialite_id !== specialiteId));
  };

  const selectedMetier = metiers.find((metier) => metier.id === artisan?.metier);
  
  return (
    <div>
      {/* Avatar Section */}
      <div className="items-center flex gap-3 py-2 px-14">
        <div className="relative">
          <img
            src={artisan?.image_file || avatar}
            alt="User"
            className="rounded-full w-11 h-11"
          />
          <div className="absolute bottom-0 left-6 bg-white p-0.5 rounded-full shadow-md">
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
        <h2 style={{ color: '#0F2744' }} className="text-lg font-semibold">{artisan ? artisan.user_name : 'artisan'}</h2>
      </div>
      <div className="my-4 mx-20">
        <hr className="border-t border-gray-300" />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl my-7 mx-auto p-6 bg-custom_grey bg-opacity-50 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Name */}
          <div>
            <label className="block text-sm font-semibold text-custom_blue">Nom d'utilisateur</label>
            <input
              type="text"
              {...register("full_name")}
              placeholder="Boukalfa"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-green-300"
            />
          </div>
          {/* Metier */}
          <div>
            <label className="block text-sm font-semibold text-custom_blue">Métier</label>
            <select
              {...register("metier")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-green-300"
            >
              {selectedMetier && (
                <option value={selectedMetier.id} selected>
                  {selectedMetier.name}
                </option>
              )}
              {metiers.map((metier) => (
                <option key={metier.id} value={metier.id}>
                  {metier.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-custom_blue">Adresse email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="exemple@gmail.com"
              className="mt-1 block w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-custom_blue">Numéro de téléphone</label>
            <input
              type="tel"
              {...register("phone_number")}
              placeholder="06 79 88 34 45"
              className="mt-1 block w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-custom_blue">Adresse</label>
            <input
              type="text"
              {...register("localisation")}
              placeholder="Cité des Frères Abbas, Bloc A, Constantine"
              className="mt-1 block w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Speciality */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-custom_blue">Spécialité</label>
            <div className="flex gap-2 mt-1">
              <select
                {...register("specialiteInput")}
                className="mt-1 block w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
              >
                <option value="">Sélectionnez un domaine...</option>
                {predefinedSpecialites.map((specialite) => (
                  <option key={specialite.specialite_id} value={specialite.specialite_id}>
                    {specialite.name}
                  </option>
                ))}

              </select>
              <button
                type="button"
                onClick={handleAddSpecialite}
                className="px-4 py-2 bg-custom_green text-white rounded-md hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
            {specialites.map((specialite, index) => (
              <div
                key={index}
                className="flex items-center bg-slate-300 px-3 py-1 rounded-md"
              >
                <span>{specialite.name}</span> {/* Render the name property */}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialite(specialite.specialite_id)} 
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