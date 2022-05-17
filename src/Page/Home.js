import React, { Component } from 'react'
import { messageService } from '../Service/MessageService'
import {progressService} from '../Service/ProgressIndicator'

class Home extends Component {



    sendAMessage() {
        messageService.sendMessage(true, "Hello");
    }

    clearMessage() {
        messageService.clearMessages();
    }


    render() {
        return (
            <div className='row'>
                    <button onClick={this.sendAMessage} className='btn btn-primary mb-2'>send Message</button>
                    <button onClick={this.clearMessage} className='btn btn-secondary'>clear Message</button>
            </div>
        )
    }
}

export {Home}
