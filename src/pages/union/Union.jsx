import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { UnionContent } from '../../components/union-content';

const Union = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <UnionContent />
      <Footer />
    </div>
  );
};

export default Union;