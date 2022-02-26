import axios from "axios";
import notify from "devextreme/ui/notify";

export default {
    async loadMenuForUser(userId) {
        //importamos dinamicamente porque el metodo se monta antes que el apiWithAuth para este caso
        const obj = await import("@/scripts/apiWithAuth.js");
        const api = obj.default;

        let result;
        await api.get(`http://localhost:62870/api/menu/${userId}`)
            .then((response) => {
                result = response.data.data;
            })
            .catch((error) => {
                notify(error.response.data.error.message, "error", 2000);
            });

        return result;
    }
};
