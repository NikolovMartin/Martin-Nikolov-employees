import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Main } from './components/Main';

function App() {
  return (
    <div className="App">
      <Layout >
        <Header />
        <Main />
        <Footer />
      </Layout >
    </div>
  );
}

export default App;
