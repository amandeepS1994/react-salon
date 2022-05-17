import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { progressService } from '../Service/ProgressIndicator';


class LoadingIndicator extends Component {


    constructor(props) {
        super(props);

        this.state = {
            initiate: false,
            progress: 0
        };
    }

    componentDidMount() {
        this.subscription = progressService.getProgress().subscribe(({initiate, progress}) => {
            if (initiate) {
                // add message to local state if not empty
                this.setState({ initiate: initiate, progress: progress});
            } else {
                // clear messages when empty message received
                this.setState({ initiate: false, progress: 0});
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


  render() {
    const progress = this.state;
    if (progress['initiate']) {
        return (
            <div>
                <ProgressBar animated now={progress['progress']} />
            </div>
        )
    }
  }
}

export {LoadingIndicator}
