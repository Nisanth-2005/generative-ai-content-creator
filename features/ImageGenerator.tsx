
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import Button from '../components/Button';
import { AspectRatio } from '../types';
import Spinner from '../components/Spinner';

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
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
      const imageUrl = await generateImage(prompt, aspectRatio);
      setResult(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Image Description
            </label>
            <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at sunset, synthwave style."
            className="w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-200 p-3"
            />
        </div>
        <div>
            <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">
            Aspect Ratio
            </label>
            <select
            id="aspectRatio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-200 p-3"
            >
            {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
            </select>
        </div>
      </div>

      <div className="text-right">
        <Button onClick={handleGenerate} isLoading={isLoading} disabled={!prompt.trim()}>
          Generate Image
        </Button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">{error}</div>}

      <div className="mt-6 flex justify-center">
        {isLoading && (
            <div className="w-full max-w-lg aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                <Spinner />
                <p className="mt-4 text-gray-400">Generating your image...</p>
            </div>
        )}
        {result && (
            <div className="w-full max-w-lg">
                <img src={result} alt="Generated content" className="rounded-lg shadow-lg" />
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
