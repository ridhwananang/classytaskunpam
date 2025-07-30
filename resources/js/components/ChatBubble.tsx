import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content?: string;
  isLoading?: boolean;
}

export default function ChatBubble({
  role,
  content = "",
  isLoading = false,
}: ChatBubbleProps) {
  const isImage = (text: string) =>
    text.startsWith("blob:") ||
    (text.startsWith("http") && /\.(png|jpe?g|gif|bmp|webp)$/i.test(text));

  // Komponen kecil untuk block code + tombol copy
  function CodeBlockWithCopy({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
      });
    };

    useEffect(() => {
      if (copied) {
        const timer = setTimeout(() => setCopied(false), 1500);
        return () => clearTimeout(timer);
      }
    }, [copied]);

    return (
      <div className="relative">
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          type="button"
          className="absolute top-1 right-1 z-10 text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0 }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-start gap-2">
        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="flex justify-end gap-2 ml-28 py-2 relative">
        {isImage(content) ? (
          <img
            src={content}
            alt="gambar user"
            className="rounded-lg max-w-[80%] sm:max-w-[60%] md:max-w-[50%] border"
          />
        ) : (
          <div className="inline-block bg-orange-400 text-white text-sm leading-relaxed whitespace-pre-wrap break-words break-normal px-3 py-3 rounded-lg">
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 px-4 py-2 relative">
      <div className="flex flex-col w-full">
        <div className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full mb-1 w-fit">
          Classy AI
        </div>
        {isImage(content) ? (
          <img
            src={content}
            alt="gambar AI"
            className="rounded-lg max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[50vw] border"
          />
        ) : (
          <div className="inline-block max-w-fit bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 text-sm leading-relaxed whitespace-pre-wrap break-words break-normal px-4 py-3 rounded-lg overflow-x-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  if (!inline && match) {
                    return (
                      <CodeBlockWithCopy
                        language={match[1]}
                        value={String(children).replace(/\n$/, "")}
                      />
                    );
                  } else {
                    return (
                      <code
                        className="dark:bg-neutral-900 text-sm font-mono px-1 py-0.5 rounded"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
