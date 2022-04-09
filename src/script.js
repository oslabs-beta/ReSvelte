import React from 'react';
import ReactDOM from 'react-dom';

console.log('Inside react component')
const App = () => {
  return (
    <div>
        Im a react component
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));