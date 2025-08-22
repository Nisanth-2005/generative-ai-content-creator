
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import Button from '../components/Button';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
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
      const generatedText = await generateText(prompt);
      setResult(generatedText);
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
          Your Prompt
        </label>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Write a short blog post about the benefits of remote work."
          className="w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-200 p-4"
        />
      </div>
      <div className="text-right">
        <Button onClick={handleGenerate} isLoading={isLoading} disabled={!prompt.trim()}>
          Generate Text
        </Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">{error}</div>}

      {(isLoading || result) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Generated Text</h3>
          <div className="bg-gray-800 p-4 rounded-md min-h-[100px] whitespace-pre-wrap text-gray-300">
            {isLoading && !result && <p>Generating... please wait.</p>}
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
