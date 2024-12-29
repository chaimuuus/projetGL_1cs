import { useForm } from "react-hook-form";

const Portfolio = () =>{

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); 
    };


    return(
        <div>
            <h1 className="mx-16 text-2xl my-4 text-custom_green">
                Mettez en avant vos compétences en ajoutant vos projets et réalisations. <br />Chaque projet renforce la confiance de vos clients potentiels
            </h1>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl my-10 mx-auto p-6 bg-custom_grey bg-opacity-50 rounded-lg shadow-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Services */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Services</label>
                        <select
                            {...register("services", { required: "Services is required" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
                        >
                            <option value="">Sélectionnez un service...</option>
                            <option value="Installation">Installation</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Repair">Repair</option>
                            <option value="Inspection">Inspection</option>
                        </select>
                        {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services.message}</p>}
                    </div>

                    {/* Titre */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Titre</label>
                        <input
                            type="text"
                            {...register("titre")}
                            placeholder="Titre"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
                        />
                    </div>

                    {/* Prix */}
                    <div className="md:col-span-2 relative">
                        <label className="block text-sm font-semibold text-custom_blue">Prix</label>
                        <input
                            type="number"
                            {...register("prix")}
                            placeholder="500000"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-transparent"
                        />
                        <p className="absolute top-8 right-2">DA</p>
                    </div>

                    {/* Illustration */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Illustration</label>
                        <input
                            type="file"
                            {...register("illustration")}
                            accept=".jpg,.png,.pdf"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300"
                        />
                        <p className="text-sm text-gray-500 mt-2">Veuillez insérer un fichier au format JPG, PNG ou PDF, avec une taille maximale de 5 Mo.</p>
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
    )
}
export default Portfolio;