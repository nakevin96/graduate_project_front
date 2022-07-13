import { Navbar } from '../../components/navbar';
import { Welcome } from '../../components/welcome';
import { Footer } from '../../components/footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
