import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';

interface CodePanelProps {
  code: string;
  language?: 'typescript' | 'python' | 'java' | 'javascript';
  title?: string;
}

const CodePanel = ({ code, language = 'typescript', title }: CodePanelProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

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
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded uppercase">
            {language}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
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
      <div className="flex-1 overflow-auto bg-[#f5f2f0] dark:bg-[#2d2d2d] relative group">
        <pre className="!m-0 !p-3 !bg-transparent h-full text-xs font-mono leading-relaxed">
          <code ref={codeRef} className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
