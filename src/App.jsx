import React from 'react';
import {Routes, Route} from 'react-router';
import {TransactionProvider, WalletProvider, SwapProvider, UnionProvider} from './context';
import {NotFound} from './pages/not-found';
import {Home} from './pages/home';

const App = () => {
    const Swap = React.lazy(() => import('./pages/swap').then(module => ({default: module.Swap})));
    const Union = React.lazy(() => import('./pages/union').then(module => ({default: module.Union})));
    const UnionDetail = React.lazy(() => import('./pages/union/union-detail').then(module => ({default: module.UnionDetail})));

    return (
        <TransactionProvider>
            <WalletProvider>
                <SwapProvider>
                    <UnionProvider>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="/swap"
                                   element={<React.Suspense fallback={<div>Loading...</div>}><Swap/></React.Suspense>}/>
                            <Route path="/union" element={<React.Suspense
                                fallback={<div>Loading...</div>}><Union/></React.Suspense>}/>
                            <Route path="/unionDetail" element={<React.Suspense
                                fallback={<div>Loading...</div>}><UnionDetail/></React.Suspense>}/>
                        </Routes>
                    </UnionProvider>
                </SwapProvider>
            </WalletProvider>
        </TransactionProvider>
    );
};

export default App;
