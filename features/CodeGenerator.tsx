
import React, { useState } from 'react';
import { generateCode } from '../services/geminiService';
import Button from '../components/Button';
import CodeBlock from '../components/CodeBlock';
import Spinner from '../components/Spinner';

const languages = ['Node.js', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];

const CodeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<string>('Python');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult('');
    try {
      const generatedCode = await generateCode(prompt, language);
      setResult(generatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Your Code Request
        </label>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a function to fetch data from an API and handle errors."
          className="w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-200 p-4"
        />
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-200 p-3"
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <Button onClick={handleGenerate} isLoading={isLoading} disabled={!prompt.trim()}>
          Generate Code
        </Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">{error}</div>}

      {(isLoading || result) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Generated Code</h3>
          {isLoading && !result && (
             <div className="w-full bg-gray-800 rounded-lg flex flex-col items-center justify-center p-8">
                <Spinner />
                <p className="mt-4 text-gray-400">Generating code snippet...</p>
            </div>
          )}
          {result && <CodeBlock code={result} language={language} />}
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
