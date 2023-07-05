import { createRoot } from 'react-dom/client';
import App from './components/app/app';

import './styles/reset.css'
import './styles/main.css'
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


