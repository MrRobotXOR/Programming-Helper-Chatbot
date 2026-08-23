import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="ph-chat-window">
      {messages.length === 0 ? (
        <div className="ph-empty-chat">
          <h2>👋 Programming Helper</h2>
          <p>Start a new chat and ask any programming question.</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`ph-message-row ${msg.role}`}>
            <div className="ph-message-bubble">
              <ReactMarkdown
                components={{
                  code({ inline, className, children }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code>{children}</code>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      )}

      {loading && (
        <div className="ph-message-row bot">
          <div className="ph-message-bubble ph-typing">
            ⏳ Programming Helper is typing...
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;