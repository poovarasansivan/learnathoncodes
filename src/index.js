import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/contextProvider';
ReactDom.render(<ContextProvider><App />
</ContextProvider>, document.getElementById('root'));