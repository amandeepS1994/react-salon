import React, { Component } from "react";
import { salonServices as salonServiceApi} from "../Service/Api/SalonService"
import { messageService} from "../Service/MessageService";
import { SalonItem } from "./SalonItem";
import { Row, Col} from 'react-bootstrap' 
import { progressService } from '../Service/ProgressIndicator';

class Salon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            successApiCall: false,
            availableServices: []
        }
    }

    componentDidMount() {
        progressService.startProgress(true, 50);
        salonServiceApi.availableServices().then((response) => {
            return response.json();
        }).then((data) => {
            data?.status ? this.setStateInformation(data) : this.setFailedStateInformation(null);
            }).catch((error) => {
            this.setFailedStateInformation(error);
        })
    }

    setStateInformation(data) {
        progressService.startProgress(true, 100);
        messageService.sendMessage(true, "Retrieved Salon Services.");
        this.setState({
            successApiCall: true,
            availableServices: data?.data
        });
        progressService.startProgress(false, 0);
    }

    setFailedStateInformation(error) {
        progressService.startProgress(false, 0);
        messageService.sendMessage(false, "Failed to Retrieve Salon Services.");
        if (error) {
            console.log(error);
        }
        this.setState({
            successApiCall: false,
            availableServices: []
        })
    }

    displayService(services) {
        return services.map((service) => (
            <SalonItem key={service.id} id={service.id} name = {service.name} description = {service.description} price = {service.price} timeInMinutes = {service.timeInMinutes}/>  
        ));
}

    render() {
        const {successApiCall, availableServices} = this.state;
        if (successApiCall) {
            return (
                <div className="row">
                    {
                        this.displayService(availableServices)
                    }
                </div>
           
               
            )
        } else {
            return (
                <h2 className="text-center">Services Not Available.</h2>
            )
        }
       
    }

}

export { Salon };