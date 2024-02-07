import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Container } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Container maxWidth="md">
    <App />
  </Container>
  // </React.StrictMode>,
);
