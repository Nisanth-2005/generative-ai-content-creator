
import React from 'react';
import { Tool } from '../types';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const TextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
    </svg>
);


const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5C12 2.5 6.5 5.5 6.5 12C6.5 18.5 12 21.5 12 21.5C12 21.5 17.5 18.5 17.5 12C17.5 5.5 12 2.5 12 2.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 2.5C12 2.5 17.5 5.5 17.5 12C17.5 18.5 12 21.5 12 21.5" fill="currentColor"/>
    <path d="M9 10L11 12L9 14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const tools = [
  { name: Tool.Text, icon: TextIcon },
  { name: Tool.Image, icon: ImageIcon },
  { name: Tool.Code, icon: CodeIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
  return (
    <nav className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col p-4">
      <div className="flex items-center mb-10">
        <LogoIcon className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold ml-2 text-gray-200">Content AI</h1>
      </div>
      <ul className="space-y-2">
        {tools.map((tool) => (
          <li key={tool.name}>
            <button
              onClick={() => setActiveTool(tool.name)}
              className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTool === tool.name
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <tool.icon className="h-5 w-5 mr-3" />
              {tool.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
