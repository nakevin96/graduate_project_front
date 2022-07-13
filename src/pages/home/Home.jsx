import { Navbar } from '../../components/navbar';
import { Welcome } from '../../components/welcome';
import { Services } from '../../components/services';
import { Transactions } from '../../components/transactions';
import { Footer } from '../../components/footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-nav border-b-2 border-[#383241]">
        <Navbar />
      </div>
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
