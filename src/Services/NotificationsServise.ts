import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class NotificationsService {

    public success(msg: string) {
        toast.success(msg);
    }

    public error(err: any) {
        if (typeof err == "string")
            toast.error(err);
        else if (typeof err.response?.data == "string")
            toast.error(err.response.data);
        else
            toast.error(err.message);
    }
}

const notificationsService = new NotificationsService();
export default notificationsService;