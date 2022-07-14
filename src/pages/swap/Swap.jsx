import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { SwapContent } from '../../components/swap-content';

const Swap = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SwapContent />
      <Footer />
    </div>
  );
};

export default Swap;