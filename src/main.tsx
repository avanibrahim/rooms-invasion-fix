import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/bebas-neue';
import { fixProductsForPublic } from '@/scripts/fixProductForPublic.tsx'
fixProductsForPublic().catch(console.error)



createRoot(document.getElementById("root")!).render(<App />);
