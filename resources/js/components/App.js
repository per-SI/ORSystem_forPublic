import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import Transition from './Transition';

const App = () => {
    return (
      <div>
        <Transition />
      </div>
    );
  };


if(document.getElementById('react')){
    ReactDOM.render(<App />, document.getElementById('react'));
}
