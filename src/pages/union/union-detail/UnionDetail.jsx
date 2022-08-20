import { useEffect } from 'react';
import { useUnion, useWallet } from '../../../context';
import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';
import { UnionDetailContent } from '../../../components/union-detail-content';

const UnionDetail = () => {
  const { connectedAccount } = useWallet();
  const { unionID, setUnionID, unionAddressG, setUnionAddressG } = useUnion();
  useEffect(() => {
    if (!connectedAccount) {
      const totalPath = window.location.href;
      const replacedPath = totalPath.replace(window.location.pathname, '/');
      setUnionID(null);
      setUnionAddressG('');
      window.open(replacedPath, '_self');
    }
  }, [connectedAccount]);
  return (
    <div className="min-h-screen">
      <Navbar />
      <UnionDetailContent unionId={unionID} unionAddress={unionAddressG}/>
      <Footer />
    </div>
  );
};

export default UnionDetail;