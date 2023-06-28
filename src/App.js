import { BrowserRouter } from 'react-router-dom';
import CrudProvider from './components/CrudProvider/CrudProvider';
import MainPage from './components/MainPage/MainPage';

export default function App() {
  return (
    <CrudProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </CrudProvider>
  );
}