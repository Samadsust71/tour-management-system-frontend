import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from './providers/ThemeProvider'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Toaster } from './components/ui/sonner'
import { store } from './redux/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors position='top-center' />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
