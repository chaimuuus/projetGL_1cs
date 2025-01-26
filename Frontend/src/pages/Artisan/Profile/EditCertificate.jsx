import { useForm } from "react-hook-form";

const EditCertificats = () =>{

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log(data); 
    };
        
    return (
        <div>
            <h1 className="mx-16 text-2xl my-4 text-custom_green">
                Ajoutez vos certificats pour prouver votre expertise et vos qualifications professionnelles. <br />Ces éléments renforcent votre crédibilité.
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-2xl my-10 mx-auto p-6 bg-custom_grey bg-opacity-50 rounded-lg shadow-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Institution */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Institution</label>
                        <input
                            type="text"
                            {...register("institution", { required: "Institution is required" })}
                            placeholder="Exemple : estin"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
                        />
                        {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>}
                    </div>

                    {/* Titre du certificat */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Titre du certificat</label>
                        <input
                            type="text"
                            {...register("certificateTitle", { required: "Titre du certificat is required" })}
                            placeholder="Saisissez le titre de votre certificat"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
                        />
                        {errors.certificateTitle && <p className="text-red-500 text-sm mt-1">{errors.certificateTitle.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Décrivez ce que ce certificat prouve ou autorise, par exemple les compétences validées ou les travaux possibles"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Certificat */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-custom_blue">Certificat</label>
                        <div className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-300 bg-transparent">
                            <input
                                type="file"
                                {...register("certificateFile", { required: "Certificat is required" })}
                                accept=".jpg,.png,.pdf"
                                className="w-full"
                                multiple 
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Veuillez insérer un fichier au format JPG, PNG ou PDF, avec une taille maximale de 5 Mo.</p>
                        {errors.certificateFile && <p className="text-red-500 text-sm mt-1">{errors.certificateFile.message}</p>}
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
    );
}
export default EditCertificats;