import { messageService } from '../Service/MessageService';
import React, { Component } from 'react'
import "./AppNotificationComponent.css"
import { Alert } from 'react-bootstrap/Alert'

class AppNotificationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            messages: []

        };
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = messageService.getMessage().subscribe(({isSuccessful, text}) => {
            if (text) {      
                // add message to local state if not empty
                this.setState({success: isSuccessful, messages: [...this.state.messages, text] });
            } else {
                // clear messages when empty message received
                this.setState({ messages: [] });
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    displayMessage(success, key, message) {
        if (success) {
            return <div key={key} className="alert alert-success alert-dismissible fade show">
            <button type="button" onClick={this.dismiss} className="btn-close" data-bs-dismiss="alert"></button>
            <h4 className="alert-heading">Success</h4>
            <p>{message}</p>
            <hr/>
            <p className="mb-0">Thanks you for using this Salon Service.</p>
            </div>
        } else {    
            return <div key={key} className="alert alert-danger alert-dismissible fade show">
            <button type="button" onClick={this.dismiss} className="btn-close" data-bs-dismiss="alert"></button>
            <h4 className="alert-heading">Failed</h4>
            <p>{message}</p>
            <hr/>
            <p className="mb-0">An Error has occured.</p>
            </div>
        }
      
    }


    dismiss() {
        messageService.clearMessages()
    }

    render() {
        const { messages, success } = this.state;
        return (
              

                                    <div className="">
                                        {messages.map((message, index) =>
                                            this.displayMessage(success, index, message)
                                        )}
                                        {/* <Route exact path="/" component={HomePage} /> */}
                                    </div>
                               
                            
              
            );
       
            
        }
           
    }

export {AppNotificationComponent};