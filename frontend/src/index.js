/**
 * @module
 * Binds the root react component to a DOM element
 */
import ReactDOM from 'react-dom'
import App from './App'
import 'typeface-roboto'
import 'normalize.css'

const wrapper = document.getElementById('nanocorp_fullstack_app')
ReactDOM.render(new App(), wrapper)
