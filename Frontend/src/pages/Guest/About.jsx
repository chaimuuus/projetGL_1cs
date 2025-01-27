import Navbar from '../../components/Guest/Navbar'
import Footer from '../../components/Guest/Footer'
export default function About() {
  const TeamMemberCard = ({ name, role, image }) => {
    return (
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    );
  };

  return (
        <>
    
    
      <Navbar />
    
    <div className="container mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">À propos de nous</h1>
        <p className="text-gray-600 mt-4">
          Découvrez qui nous sommes et comment nous facilitons vos travaux à
          travers DZ-Artisan.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4">Notre Mission</h2>
          <p className="text-gray-600">
            Notre mission est de connecter les artisans qualifiés avec les
            clients à la recherche de services fiables et efficaces. Nous
            facilitons la gestion des travaux grâce à des outils modernes et
            intuitifs.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4">Notre Vision</h2>
          <p className="text-gray-600">
            Nous aspirons à devenir la plateforme de référence en Algérie pour
            la mise en relation entre artisans et clients, tout en valorisant le
            savoir-faire local.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Fiabilité</h3>
            <p className="text-gray-600">
              Nous garantissons des services de qualité en sélectionnant des
              artisans qualifiés et compétents.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Innovation</h3>
            <p className="text-gray-600">
              Nous utilisons les dernières technologies pour rendre la gestion
              des travaux simple et efficace.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Satisfaction</h3>
            <p className="text-gray-600">
              La satisfaction de nos clients et artisans est au cœur de notre
              démarche.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Notre Équipe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <TeamMemberCard
            name="Aouchich Chaima"
            role="Fondateur & PDG"
            image="/Chaima.jpg"
          />
          <TeamMemberCard
            name="Bengherbi Sarah"
            role="Designer UX/UI"
            image="/sarah.jpg"
          />
          <TeamMemberCard
            name="Benbacha Kamar"
            role="Responsable Com"
            image="/kamar.jpg"
          />
          <TeamMemberCard
            name="Belkerdid Islam"
            role="Développeur Senior"
            image="/samira.jpg"
          />
          <TeamMemberCard
            name="Mehdi Taleb"
            role="Développeur Senior"
            image="/samira.jpg"
          />
         
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center py-12 bg-primary text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Rejoignez-nous !</h2>
        <p className="mb-6">
          Faites partie de la communauté DZ-Artisan et simplifiez vos travaux
          dès aujourd'hui.
        </p>
        <button className="bg-white text-primary px-6 py-3 rounded-lg shadow hover:bg-gray-100">
          Créez votre compte
        </button>
      </div>
    </div>
     <Footer/>
    
        
    </>
  );
}