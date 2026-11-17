import { createRoot } from 'react-dom/client';
import { CeresApp } from './App';

const container = document.getElementById('ceres-root');
if (container) {
  createRoot(container).render(<CeresApp />);
}
