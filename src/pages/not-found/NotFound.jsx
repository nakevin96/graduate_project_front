import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { NoPage } from '../../components/no-page';

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <NoPage />
      <Footer />
    </div>
  );
};

export default NotFound;