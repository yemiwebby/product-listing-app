import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Products from './components/Products';


class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Container >
                    <Products/>
                </Container>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
