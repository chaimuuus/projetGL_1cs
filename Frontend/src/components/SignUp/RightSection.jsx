import backgroundImg from "../../assets/SignUpBackGround.png";
import avatar from "../../assets/Avatar.png";
import avatar1 from "../../assets/Avatar1.png";

const RightSection = () =>{
    return(
        <div
          className="w-1/2 h-screen bg-no-repeat bg-center bg-cover flex items-center gap-8 flex-col font-sans"
          style={{
            backgroundImage: `linear-gradient(to bottom, #000000CC, #00000000), url(${backgroundImg})`
          }}
        >
          {/* Speech Bubbles */}
          <div className="flex gap-4 items-center mt-10">
            <div className="bg-tranparent bg-opacity-80 p-4 rounded-2xl shadow-md w-72 border border-white">
              <p className="text-xs font-normal text-white">
                Trouver un artisan n’a jamais été aussi facile ! Grâce à DZ-Artisan,
                j’ai trouvé un plombier qualifié en un rien de temps.
              </p>
            </div>
            <img
              src={avatar}
              alt="User 1"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex gap-4 items-center mt-10">
            <div className=" bg-opacity-80 p-4 rounded-3xl shadow-md border border-white relative w-72">
              <p className="text-xs font-normal text-white">
                Cette plateforme m’a permis de développer mon activité. Les clients
                sont satisfaits, et j’ai trouvé de nouvelles opportunités
                professionnelles !
              </p>
            </div>
            <img
              src={avatar1}
              alt="User 1"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
    );
}
export default RightSection;