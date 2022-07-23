import { useContext } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';
import { UnionDetailContent } from '../../../components/union-detail-content';

const UnionDetail = () => {
  const { unionID } = useContext(TransactionContext);
  return (
    <div className="min-h-screen">
      <Navbar />
      <UnionDetailContent unionId={unionID} />
      <Footer />
    </div>
  );
};

export default UnionDetail;