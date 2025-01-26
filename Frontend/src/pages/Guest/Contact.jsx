import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from '../../components/Guest/Navbar'
import Footer from '../../components/Guest/Footer'
export default function Contact() {
  return (
        <>
    
    
      <Navbar />
    
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Contactez-nous</h1>
        <p className="text-gray-600 mt-4">
          Vous avez une question ? Remplissez le formulaire ci-dessous ou utilisez les informations de contact.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {/* Formulaire de contact */}
        <form className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              placeholder="Votre nom"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Votre message"
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-secondary transition"
          >
            Envoyer
          </button>
        </form>

        {/* Informations de contact */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-6">Nos coordonnées</h2>
          <div className="flex items-center gap-4 mb-4">
            <FaPhoneAlt className="text-primary text-2xl" />
            <p className="text-gray-600">+213 123 456 789</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FaEnvelope className="text-primary text-2xl" />
            <p className="text-gray-600">contact@dzartisan.com</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FaMapMarkerAlt className="text-primary text-2xl" />
            <p className="text-gray-600">123 Rue des Artisans, Alger, Algérie</p>
          </div>
        </div>
      </div>
    </div>
     <Footer/>
    
        
    </>
  );
}