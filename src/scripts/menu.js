import notify from "devextreme/ui/notify";
import api from "@/scripts/api"
import auth from '@/auth';

export default {
    async loadMenuForUser(userId) {
        let token = auth.getAuthorizationToken();

        let result;
        await api.get(`/menu/${userId}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                result = response.data.data;
            })
            .catch((error) => {
                notify(error.response.data.error.message, "error", 2000);
            });

        return result;
    }
};
