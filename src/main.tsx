import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <App />
        </ThemeProvider>
    </ErrorBoundary>
);
