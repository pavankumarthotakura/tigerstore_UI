import logo from './logo.svg';
import './App.css';
import MainAdamin from './pages/MainAdamin';
import { StoreProvider } from 'easy-peasy';
import store from './store/store';
import HeaderContent from './pages/HeaderContent';

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <HeaderContent></HeaderContent>
        <MainAdamin></MainAdamin>
      </div>
    </StoreProvider>
  );
}

export default App;
