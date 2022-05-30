import { environment } from "../../Environment/environment"


 const retrieveAllAvailableServices = () => {
        return fetch(environment.apiPrefix + "service/available/");

}

const retrieveAllAvailableSlotsForService = (serviceId, requestedDate) => {
        return fetch(environment.apiPrefix + `service/${serviceId}/availability/?requestedDate=${requestedDate}`);
}

export const salonServices = {
    availableServices: retrieveAllAvailableServices,
    availableSlotsForServices: retrieveAllAvailableSlotsForService
}
