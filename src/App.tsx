import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] w-full">
      <Header />
      <ThemeToggle />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
