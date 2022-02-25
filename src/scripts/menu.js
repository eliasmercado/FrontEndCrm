import axios from "axios";

export default {
    async loadMenuForUser(userId) {
        let result;
        await axios
            .get(`http://localhost:62870/api/menu/${userId}`)
            .then((response) => {
                result = response.data.data;
            })
            .catch((error) => {
                notify(error.response.data.error.message, "error", 2000);
            });

        return result;
    }
};
