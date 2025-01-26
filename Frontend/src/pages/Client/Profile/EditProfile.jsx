import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AvatarPlaceholder from '../../../assets/avatar.png';
import { MdOutlineEdit } from "react-icons/md";
import { userEditProfile , updateProfilePic} from "../../../api/UserEditProfile"; // Import the userEditProfile function
import { getTokenFromCookie, getProfileArtisan } from '../../../api/getProfile';

const EditProfile = () => {

  const [avatar, setAvatar] = useState(AvatarPlaceholder);

  // Handle image upload and display
  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    try {
        const token = getTokenFromCookie(); // Get the token from cookies
        if (token) {
          const credentials = {
            authorization: `Bearer ${token}`,
          };
          const formData = new FormData();
          formData.append("profilePic", file); // Assuming the API expects a field named `profile_pic`
          const response = await updateProfilePic(formData, credentials); // Send the file directly
          console.log("Profile pic updated successfully:", response);
          // Optionally, update the UI or show a success message
        }
      } catch (error) {
        console.error("Error updating profile pic:", error);
      }
  };

  // Form handling
  const { register, handleSubmit, setValue } = useForm();

  const [user, setUser] = useState(null);

  // Function to fetch user profile
  const getUserProfile = async () => {
    try {
      const token = getTokenFromCookie();  // Get the token from cookies
      if (token) {
        try {
          const response = await getProfileArtisan({
            headers: {
              authorization: `Bearer ${token}`
            }
          });
          setUser(response.user);  // Set the user data
        } catch (userLoginError) {
          // Handle user login failure or error
          console.error("Error fetching user data:", userLoginError);
        }
      } else {
        console.error("No token found");  // Log error if no token is found
      }
    } catch (error) {
      console.error("Error fetching profile:", error);  // Handle the error (e.g., show a notification)
      throw error;  // Handle further error as needed
    }
  };

  useEffect(() => {
    getUserProfile();  // Call the function when the component mounts
  }, []); 

  // onSubmit function that calls the userEditProfile API function
  const onSubmit = async (data) => {
    try {
      const token = getTokenFromCookie(); // Get the token from cookies
      if (token) {
        const credentials = {
          authorization: `Bearer ${token}`,
        };
        const response = await userEditProfile(data, credentials); // Call userEditProfile to update user data
        console.log("Profile updated successfully:", response);
        // Optionally, update the UI or show a success message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Assuming you fetch user data here and populate the form fields
  useEffect(() => {
    if (user) {
      setValue("user_name", user.user_name); // Set values in the form fields
      setValue("email", user.email);
      setValue("phone_number", user.phone_number);
      setValue("address", user.address);
    }
  }, [user, setValue]);

  return (
    <div>
      <div className="items-center flex gap-3 py-2 px-14">
        <div className="relative">
          <img
            src={`${user?.image_file}`}
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
        <h2 style={{ color: '#0F2744' }} className="text-lg font-semibold">{user ? user.user_name : 'Chaima Aouchiche'}</h2>
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
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              {...register("user_name")}
              placeholder="Aouchiche"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="exemple@gmail.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <input
              type="tel"
              {...register("phone_number")}
              placeholder="06 79 88 34 45"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
          </div>

          {/* Localisation */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Localisation</label>
            <input
              type="text"
              {...register("address")}
              placeholder="Cité des Frères Abbas, Bloc A, Constantine"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
            />
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
