import { FaWrench, FaFileInvoice, FaCalendarCheck } from "react-icons/fa";
import Navbar from '../../components/Guest/Navbar'
import Footer from '../../components/Guest/Footer'
import { Link } from "react-router-dom";
export default function Services() {
  const ServiceCard = ({ icon, title, description }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
        <div className="text-primary text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const TestimonialCard = ({ name, feedback, profession }) => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <p className="italic text-gray-600 mb-4">&ldquo;{feedback}&rdquo;</p>
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-sm text-gray-500">{profession}</p>
      </div>
    );
  };

  return (
        <>
    
    
      <Navbar />
    
    <div className="container mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Nos Services</h1>
        <p className="text-gray-600 mt-4">
          Découvrez les services proposés par DZ-Artisan pour faciliter vos travaux et projets.
        </p>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <ServiceCard
          icon={<FaWrench />}
          title="Recherche d'Artisans"
          description="Trouvez rapidement un artisan qualifié pour vos travaux en parcourant notre annuaire détaillé."
        />
        <ServiceCard
          icon={<FaFileInvoice />}
          title="Gestion des Devis"
          description="Demandez et comparez les devis en ligne, communiquez avec les artisans via une messagerie intégrée."
        />
        <ServiceCard
          icon={<FaCalendarCheck />}
          title="Suivi des Interventions"
          description="Planifiez vos travaux, suivez leur progression en temps réel, et gérez la facturation."
        />
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Ahmed B."
            feedback="Grâce à DZ-Artisan, j'ai trouvé un plombier en quelques minutes et les travaux ont été réalisés rapidement."
            profession="Client satisfait"
          />
          <TestimonialCard
            name="Nadia M."
            feedback="La gestion des devis m'a permis de comparer plusieurs artisans et de choisir celui qui correspondait à mon budget."
            profession="Cliente heureuse"
          />
          <TestimonialCard
            name="Karim T."
            feedback="Le suivi en temps réel est génial ! J'ai pu voir l'avancement des travaux sans avoir à me déplacer."
            profession="Entrepreneur"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Questions Fréquemment Posées
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg">Comment puis-je trouver un artisan ?</h3>
            <p className="text-gray-600">
              Utilisez notre moteur de recherche pour trouver un artisan par métier ou spécialité, puis consultez leur profil.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg">Est-ce que le service est gratuit ?</h3>
            <p className="text-gray-600">
              L'inscription et la recherche sont gratuites. Des frais peuvent s'appliquer pour des services premium.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg">Comment suivre l'avancement des travaux ?</h3>
            <p className="text-gray-600">
              Une fois votre intervention planifiée, vous pouvez suivre son avancement directement depuis votre tableau de bord.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center py-12 bg-primary text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="mb-6">Rejoignez DZ-Artisan dès aujourd'hui et facilitez vos travaux.</p>
         <Link to="/Connexion" >
        <button className="bg-white text-primary px-6 py-3 rounded-lg shadow hover:bg-gray-100">
          Inscrivez-vous maintenant
        </button>
        </Link>
      </div>
    </div>
     <Footer/>
    
        
    </>
  );
}