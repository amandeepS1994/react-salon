import { loadStripe } from "@stripe/stripe-js";
import { environment } from "../Environment/environment";

const stripePromise = loadStripe(environment.stripeKey);
export { stripePromise };