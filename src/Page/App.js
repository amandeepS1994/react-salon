import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { Home } from './Home';
import { AppNotificationComponent } from '../Util/AppNotificationComponent';
import { LoadingIndicator } from '../Util/LoadingIndicator';
import { Salon } from './Salon';
import { Col, Row} from 'react-bootstrap' 

function App() {
  return (
    <div className="">
   <Header/>
   <Row>
      <Col xs={4}></Col>
      <Col xs={4}>
        <div className='app-loading mt-2'>
            <LoadingIndicator/>
        </div>
      </Col>
      <Col xs={4}>
        <div className='float-end mr-5 mt-2'>
          <AppNotificationComponent/>
        </div>
      </Col>
    </Row>
    <div className='app-body'>

    <Row>
  
          <Salon/>
         
      
    </Row>
    </div> 
    </div>
  );

}

export default App;
