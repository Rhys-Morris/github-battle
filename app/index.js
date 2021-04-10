import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// Component --> State, Lifecycle, UI

class App extends React.Component {
    render() {
        const name = 'Rhys';

        const element = React.createElement(
            'div',
            {id: 'button', className: 'btn__main'},
            'Login'
        )
        return (
            <div>
                {element}
            </div>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);