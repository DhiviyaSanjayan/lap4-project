import axios from "axios";

const getPerenualID = async (species) => {
    const key = import.meta.env.VITE_PERENUAL_KEY ?? "sk-g9wC64ddeb847a7301906";

    const firstPartOfSpecies = species.split(" ")[0];

    console.log(`https://perenual.com/api/species-list?page=1&key=${key}&q=${firstPartOfSpecies}`)

    try {
        const response = await axios.get(
            `https://perenual.com/api/species-list?page=1&key=${key}&q=${firstPartOfSpecies}`
        );
        return response.data.data[0].id;
    } catch (error) {
        console.error(error.message);
    }
};

export default getPerenualID;
