import { environment } from "../../Environment/environment";



const verifyBookingByTicketId  = (ticketId) => {
    return fetch(environment.apiPrefix + `ticket/${ticketId}/`);
}


export const ticketService = {
    verifyTicket: verifyBookingByTicketId
}
