import {
  FaPlus,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({
  chats,
  open,
  onClose,
  onNewChat,
  onSelect,
  onDelete,
}) => {
  return (
    <>
      {open && (
        <div
          className="ph-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`ph-sidebar ${open ? "open" : ""}`}>
        <div className="ph-sidebar-top">
          <button
            className="ph-new-chat"
            onClick={onNewChat}
          >
            <FaPlus />
            New Chat
          </button>

          <button
            className="ph-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <p className="ph-history-title">
          Recent Chats
        </p>

        <div className="ph-history">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="ph-chat-row"
            >
              <button
                className="ph-chat-item"
                onClick={() => onSelect(chat)}
              >
                {chat.title}
              </button>

              <button
                className="ph-delete-btn"
                onClick={() => onDelete(chat._id)}
                title="Delete chat"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;