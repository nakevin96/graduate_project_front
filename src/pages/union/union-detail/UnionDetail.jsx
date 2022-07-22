import { useContext } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';

const UnionDetail = () => {
  const { unionID } = useContext(TransactionContext);
  return (
    <div className="min-h-screen">
      <Navbar />
      {unionID}
      <Footer />
    </div>
  );
};

export default UnionDetail;