import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden my-4">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
