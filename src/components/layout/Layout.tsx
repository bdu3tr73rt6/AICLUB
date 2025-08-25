import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchModal from '../search/SearchModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
};

export default Layout;
