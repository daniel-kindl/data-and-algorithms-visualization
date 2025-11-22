import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

interface CodePanelProps {
  code: string | Record<string, string>;
  language?: string;
  title?: string;
}

const CodePanel = ({ code, language = 'typescript', title }: CodePanelProps) => {
  const codeRef = useRef<HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  // Determine if we have multiple languages.
  // The 'code' prop can be a simple string (single language) or an object mapping language names to code strings.
  const isMultiLanguage = typeof code === 'object' && code !== null;

  // Get current code and language based on selection.
  // If multi-language, use the selected language, otherwise default to the single provided code.
  const currentCode = isMultiLanguage
    ? (code as Record<string, string>)[selectedLanguage] || Object.values(code)[0]
    : (code as string);

  const currentLanguage = isMultiLanguage ? selectedLanguage : language;

  // Apply syntax highlighting whenever code or language changes.
  // Prism.highlightElement is used to manually trigger highlighting on the code block.
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [currentCode, currentLanguage]);

  const languages = isMultiLanguage ? Object.keys(code as Record<string, string>) : [];

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      python: 'Python',
      java: 'Java',
      csharp: 'C#',
      cpp: 'C++',
    };
    return names[lang] || lang;
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-4 h-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {title || 'Algorithm Implementation'}
        </h3>
        <div className="flex items-center gap-2">
          {isMultiLanguage ? (
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-all ${
                    selectedLanguage === lang
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {getLanguageName(lang)}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded uppercase">
              {language}
            </span>
          )}
          <button
            onClick={() => navigator.clipboard.writeText(currentCode)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy code"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-[#2d2d2d] relative group">
        <pre className="!m-0 !p-3 !bg-transparent min-h-full text-xs font-mono leading-relaxed">
          <code ref={codeRef} className={`language-${currentLanguage}`}>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
