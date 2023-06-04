import { useForm } from "react-hook-form";
import "./UpdateCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsServise";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Store/AuthState";

// A component for updating a coupon. Only company would have access to it.
function UpdateCoupon(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Coupon>();
    const navigate = useNavigate();
    const id: number = +useParams().couponId;

    useEffect(() => {
        if (!authStore.getState().token) {
            notificationsService.error("unauthorize, please log in");
            navigate("/home");
            return;
        }

        // getting the specific coupon to display it's current details when updating, using setValue from useForm.
        companyService.getCompanyCoupons()
            .then(couponsList => {
                const coupon = couponsList.find(c => c.id == id);
                setValue("title", coupon.title);
                setValue("category", coupon.category);
                setValue("description", coupon.description);
                setValue("startDate", coupon.startDate);
                setValue("endDate", coupon.endDate);
                setValue("price", coupon.price);
                setValue("amount", coupon.amount);
                setValue("image", coupon.image);
            })
            .catch(err => notificationsService.error(err));
    }, [])


    /**
     * the function that using the service in order to send the coupon to update.
     * converting the image to base64 before sending it because the images are being saved as a string in the database.
     * @param coupon the coupon object to update that the useForm help us build from the input of the end user.
     */
    function sendCoupon(coupon: Coupon) {
        companyService.getCompanyDetails()
            .then(c => coupon.company = c)
            .catch(err => notificationsService.error(err));
        coupon.id = id; // so the values witch are not in the form will not be defaulted (id and company)

        coupon.image = (coupon.image as FileList)[0];
        let reader = new FileReader();
        reader.readAsDataURL(coupon.image);
        reader.onload = function () {
            coupon.image = reader.result as string;

            companyService.updateCoupon(coupon)
                .then(msg => {
                    notificationsService.success(msg);
                    navigate("/company/coupons/" + id)
                })
                .catch(err => notificationsService.error(err));
        }
        reader.onerror = function (error) {
            notificationsService.error(error);
        };
    }

    return (
        <div className="UpdateCoupon">
            <NavLink to={"/company/coupons/" + id}><button>back</button></NavLink>
            <h3>Update coupon:</h3>

            {/* only relevant details that are allowed to update would be in the form */}
            <form className="box" onSubmit={handleSubmit(sendCoupon)}>

                <input type="text" placeholder="title" {...register("title", {
                    required: { value: true, message: "title is a must!" }
                })} /><br />
                <span>{formState.errors?.title?.message}</span><br />

                <select {...register("category")}>
                    <option>SPORT</option>
                    <option>FOOD</option>
                    <option>SPA</option>
                    <option>BEVERAGES</option>
                    <option>TRAVEL</option>
                </select><br />

                <input type="text" placeholder="description"{...register("description", {
                    required: { value: true, message: "description is a must!" },
                    minLength: { value: 10, message: "must enter at least 10 characters" }
                })} /><br />
                <span>{formState.errors?.description?.message}</span><br />

                <input type="date" placeholder="start date"{...register("startDate", {
                    required: { value: true, message: "start date is a must" }
                })} /><br />
                <span>{formState.errors?.startDate?.message}</span><br />

                <input type="date" placeholder="end date"{...register("endDate", {
                    required: { value: true, message: "end date is a must" }
                })} /><br />
                <span>{formState.errors?.endDate?.message}</span><br />

                <input type="number" placeholder="price" min={0}{...register("price", {
                    required: { value: true, message: "must enter price" },
                    min: { value: 1, message: "price must be at least 1" }
                })} /><br />
                <span>{formState.errors?.price?.message}</span><br />

                <input type="number" placeholder="amount" min={0}{...register("amount", {
                    min: { value: 0, message: "amount cant be les than 0" }
                })} /><br />
                <span>{formState.errors?.amount?.message}</span><br />

                <input type="file" placeholder="image" {...register("image", {
                    required: { value: true, message: "must enter a picture" }
                })} /><br />
                <span>{formState.errors?.image?.message}</span><br />

                <input type="submit" value="edit" />
            </form>

        </div>
    );
}

export default UpdateCoupon;
