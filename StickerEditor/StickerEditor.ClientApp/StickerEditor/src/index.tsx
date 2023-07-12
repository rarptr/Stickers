import { createRoot } from 'react-dom/client';
import App from './components/app/app';

import './styles/reset.css'
import './styles/main.css'

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);


