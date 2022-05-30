import { environment } from "../../Environment/environment"

const initiatePayment = (paymentRequest) =>  {
       return fetch(environment.apiPrefix + "payments/initiate/", {method: 'POST', body: JSON.stringify(paymentRequest), headers: {
        'Content-Type': 'application/json'
      }});
}

const confirmSalonBooking = (paymentId) => {
        return fetch(environment.apiPrefix + `payments/${paymentId}/confirm/`);
}

export const paymentService = {
        initiatePayment: initiatePayment,
        confirmBooking: confirmSalonBooking
};

