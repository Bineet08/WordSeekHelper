import Header from './pages/Header';
import MainLayout from './pages/MainLayout';
import Footer from './pages/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-gray-100 bg-zinc-950">
      <Header />
      <main className="flex-1">
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}
