import { useDispatch, useSelector } from "react-redux";

// Custom hooks for typed Redux usage
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Chat-specific hooks
export const useChat = () => {
  return useAppSelector((state) => state.chat);
};

// You can add more specific hooks here as needed
export const useChatList = () => {
  return useAppSelector((state) => state.chat.chatList);
};

export const useSelectedChat = () => {
  return useAppSelector((state) => state.chat.selectedChat);
};

export const useChatMessages = (chatId) => {
  return useAppSelector((state) =>
    chatId ? state.chat.messages[chatId] || [] : []
  );
};
