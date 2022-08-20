import { useEffect } from 'react';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { UnionContent } from '../../components/union-content';
import { useWallet } from '../../context';

const { ethereum, location } = window;

const Union = () => {
  const { connectedAccount } = useWallet();
  useEffect(() => {
    const replacedPath = location.href.replace(location.pathname, '/');
    if (!ethereum) {
      alert('메타마스크를 설치해주세요');
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
      );
    } else if (!connectedAccount) {
      window.open(replacedPath, '_self');
      alert('지갑을 연결해주세요');
    }
  }, [connectedAccount, ethereum]);
  return (
    <div>
      <Navbar />
      <UnionContent />
      <Footer />
    </div>
  );
};

export default Union;