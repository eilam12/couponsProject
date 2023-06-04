import { useForm } from "react-hook-form";
import "./Login.css";
import { Credentials } from "../../../Models/Credentials";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationsService from "../../../Services/NotificationsServise";
import { authStore } from "../../../Store/AuthState";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Credentials>();
    const navigate = useNavigate();


    function send(creds: Credentials) {
        authService.Login(creds)
            .then(() => {
                notificationsService.success("Welcome back " + authStore.getState().name);
                {
                    authStore.getState().token &&
                        navigate("/" + authStore.getState().clientType.toString().toLowerCase())
                };
            })

            .catch(err => notificationsService.error(err));
    }

    return (
        <div className="Login">

            <form className="box" onSubmit={handleSubmit(send)}>

                <select {...register("clietType")}>
                    <option>ADMINISTRATOR</option>
                    <option>COMPANY</option>
                    <option>CUSTOMER</option>
                </select><br />

                <input type="text" placeholder="email" {...register("email", {
                    required: { value: true, message: "must enter email" },
                })} /><br />
                <span>{formState.errors?.email?.message}</span><br />

                <input type="password" placeholder="password" {...register("password", {
                    required: { value: true, message: "must enter password" },
                })} /><br />
                <span>{formState.errors?.password?.message}</span><br />

                <input type="submit" value="login" />
            </form>

        </div>
    );
}

export default Login;
