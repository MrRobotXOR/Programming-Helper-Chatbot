import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || loading) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="ph-input-wrap">
      <div className="ph-input-box">
        <textarea
          rows="1"
          placeholder="Ask anything about programming..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;