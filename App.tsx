
import React, { useState } from 'react';
import { Tool } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TextGenerator from './features/TextGenerator';
import ImageGenerator from './features/ImageGenerator';
import CodeGenerator from './features/CodeGenerator';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Text);

  const renderActiveTool = () => {
    switch (activeTool) {
      case Tool.Image:
        return <ImageGenerator />;
      case Tool.Code:
        return <CodeGenerator />;
      case Tool.Text:
      default:
        return <TextGenerator />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <div className="flex flex-col flex-1">
        <Header title={activeTool} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderActiveTool()}
        </main>
      </div>
    </div>
  );
};

export default App;
