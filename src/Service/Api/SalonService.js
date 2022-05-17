import { environment } from "../../Environment/environment"


 const retrieveAllAvailableServices = () => {
        return fetch(environment.apiPrefix + "service/available/");
}

export const salonServices = {
    availableServices: retrieveAllAvailableServices
}
