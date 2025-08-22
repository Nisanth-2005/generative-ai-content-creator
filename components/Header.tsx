
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
    </header>
  );
};

export default Header;
