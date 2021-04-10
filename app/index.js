import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Popular from './components/Popular.js'
import Battle from './components/Battle.js'


class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Battle />
            </div>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);