// app/messages.tsx
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  Filter,
  Image as ImageIcon,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  User,
  Video,
} from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useReligion } from "@/contexts/ReligionContext";
import { useTheme } from "@/theme/ThemeProvider";

// Types
interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "user" | "customer";
  status?: "sent" | "delivered" | "read";
  read?: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  isTyping?: boolean;
}

// Mock Data
const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Imam Muhammad Hassan",
    role: "Customer",
    lastMessage: "Assalamu Alaikum. Thank you for booking...",
    lastMessageTime: "9:35 AM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "Ahmed Khan",
    role: "Customer",
    lastMessage: "JazakAllah for your services yesterday",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Fatima Bi",
    role: "Customer",
    lastMessage: "Can we reschedule the Quran Khani?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    online: true,
  },
  {
    id: "4",
    name: "Mohammad Ali",
    role: "Customer",
    lastMessage: "The payment has been processed",
    lastMessageTime: "Jan 14",
    unreadCount: 0,
    online: false,
  },
  {
    id: "5",
    name: "Zainab Rahman",
    role: "Customer",
    lastMessage: "Thank you for the Fatiha ceremony",
    lastMessageTime: "Jan 13",
    unreadCount: 0,
    online: false,
  },
];

// Mock Messages for Chat
const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Assalamu Alaikum. Thank you for booking the Nikah ceremony. I have reviewed your request and would be honored to officiate.",
    timestamp: "9:23 AM",
    sender: "user",
    status: "read",
  },
  {
    id: "2",
    text: "Wa Alaikum Salaam. Thank you for accepting. We are grateful for your service.",
    timestamp: "9:25 AM",
    sender: "customer",
    read: true,
  },
  {
    id: "3",
    text: "Could you please confirm the number of witnesses who will be present? Also, do you have any specific preferences for the ceremony?",
    timestamp: "9:27 AM",
    sender: "user",
    status: "read",
  },
  {
    id: "4",
    text: "We will have 4 witnesses present. We would like a traditional ceremony with recitation of relevant verses.",
    timestamp: "9:29 AM",
    sender: "customer",
    read: true,
  },
  {
    id: "5",
    text: "Perfect. That is well noted. I will prepare accordingly. May Allah bless this union.",
    timestamp: "9:31 AM",
    sender: "user",
    status: "read",
  },
  {
    id: "6",
    text: "Ameen. Is there anything specific we should prepare or arrange before your arrival?",
    timestamp: "9:35 AM",
    sender: "customer",
    read: false,
  },
];

// Message Bubble Component
const MessageBubble = ({
  message,
  isUser,
  themeColor,
}: {
  message: Message;
  isUser: boolean;
  themeColor: string;
}) => {
  const renderStatus = () => {
    if (!isUser) return null;

    switch (message.status) {
      case "read":
        return <CheckCheck size={14} color="#34B7F1" />;
      case "delivered":
        return <CheckCheck size={14} color="#8E8E93" />;
      default:
        return <Check size={14} color="#8E8E93" />;
    }
  };

  return (
    <View
      style={[
        styles.messageRow,
        isUser ? styles.userMessageRow : styles.customerMessageRow,
      ]}
    >
      {!isUser && (
        <View
          style={[styles.avatarSmall, { backgroundColor: themeColor + "20" }]}
        >
          <User size={14} color={themeColor} />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          isUser
            ? [styles.userBubble, { backgroundColor: themeColor }]
            : styles.customerBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.customerMessageText,
          ]}
        >
          {message.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text
            style={[
              styles.messageTime,
              isUser ? styles.userMessageTime : styles.customerMessageTime,
            ]}
          >
            {message.timestamp}
          </Text>
          {isUser && <View style={styles.messageStatus}>{renderStatus()}</View>}
        </View>
      </View>
    </View>
  );
};

// Contact Item Component
const ContactItem = ({
  contact,
  isSelected,
  onPress,
  themeColor,
}: {
  contact: Contact;
  isSelected: boolean;
  onPress: () => void;
  themeColor: string;
}) => (
  <TouchableOpacity
    style={[
      styles.contactItem,
      isSelected && [
        styles.selectedContact,
        { backgroundColor: themeColor + "10" },
      ],
    ]}
    onPress={onPress}
  >
    <View style={styles.contactAvatar}>
      {contact.avatar ? (
        <Image source={{ uri: contact.avatar }} style={styles.avatarImage} />
      ) : (
        <View
          style={[
            styles.avatarFallback,
            { backgroundColor: themeColor + "20" },
          ]}
        >
          <Text style={[styles.avatarText, { color: themeColor }]}>
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
      )}
      {contact.online && (
        <View style={[styles.onlineDot, { backgroundColor: "#34C759" }]} />
      )}
    </View>

    <View style={styles.contactInfo}>
      <View style={styles.contactHeader}>
        <Text style={styles.contactName} numberOfLines={1}>
          {contact.name}
        </Text>
        <Text style={styles.contactTime}>{contact.lastMessageTime}</Text>
      </View>

      <View style={styles.contactFooter}>
        <Text style={styles.contactLastMessage} numberOfLines={1}>
          {contact.lastMessage}
        </Text>
        {contact.unreadCount > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: themeColor }]}>
            <Text style={styles.unreadCount}>{contact.unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Date Separator Component
const DateSeparator = ({ date }: { date: string }) => (
  <View style={styles.dateSeparator}>
    <View style={styles.dateLine} />
    <Text style={styles.dateText}>{date}</Text>
    <View style={styles.dateLine} />
  </View>
);

// Typing Indicator Component
const TypingIndicator = ({ themeColor }: { themeColor: string }) => (
  <View style={styles.typingContainer}>
    <View style={[styles.typingBubble, { backgroundColor: themeColor + "20" }]}>
      <View style={[styles.typingDot, { backgroundColor: themeColor }]} />
      <View style={[styles.typingDot, { backgroundColor: themeColor }]} />
      <View style={[styles.typingDot, { backgroundColor: themeColor }]} />
    </View>
  </View>
);

export default function MessagesPage() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  // State
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [isTyping, setIsTyping] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Get theme color
  const getThemeColor = () => {
    switch (religion?.toLowerCase()) {
      case "islam":
        return "#10B981";
      case "hindu":
        return "#F59E0B";
      case "christianity":
        return "#3B82F6";
      default:
        return primary;
    }
  };

  const themeColor = getThemeColor();

  // Filter contacts based on search
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [contacts, searchQuery]);

  // Handle send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "JazakAllah for your message. I will get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "customer",
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 2000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Render chat header
  const renderChatHeader = () => {
    if (!selectedContact) return null;

    return (
      <View style={styles.chatHeader}>
        <TouchableOpacity
          onPress={() => setSelectedContact(null)}
          style={styles.chatHeaderBack}
        >
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatHeaderContact}
          onPress={() => setShowContactInfo(true)}
        >
          <View style={styles.chatHeaderAvatar}>
            <View
              style={[
                styles.avatarFallback,
                { backgroundColor: themeColor + "20" },
              ]}
            >
              <Text style={[styles.avatarText, { color: themeColor }]}>
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            {selectedContact.online && (
              <View
                style={[styles.onlineDot, { backgroundColor: "#34C759" }]}
              />
            )}
          </View>

          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{selectedContact.name}</Text>
            <Text style={styles.chatHeaderStatus}>
              {selectedContact.online ? "Active now" : "Offline"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.chatHeaderActions}>
          <TouchableOpacity style={styles.chatHeaderAction}>
            <Phone size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatHeaderAction}>
            <Video size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatHeaderAction}>
            <MoreVertical size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render messages list
  const renderMessages = () => {
    if (!selectedContact) return null;

    // Group messages by date
    const groupedMessages: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const date = message.timestamp; // In real app, you'd use actual date
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    return (
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const showDate =
            index === 0 || messages[index - 1].timestamp !== item.timestamp;

          return (
            <>
              {showDate && <DateSeparator date="Today, January 15" />}
              <MessageBubble
                message={item}
                isUser={item.sender === "user"}
                themeColor={themeColor}
              />
            </>
          );
        }}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
    );
  };

  // Render chat input
  const renderChatInput = () => {
    if (!selectedContact) return null;

    return (
      <View style={styles.chatInputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Paperclip size={22} color="#6B7280" />
        </TouchableOpacity>

        <TextInput
          style={styles.chatInput}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />

        <TouchableOpacity style={styles.mediaButton}>
          <ImageIcon size={22} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.micButton}>
          <Mic size={22} color="#6B7280" />
        </TouchableOpacity>

        {messageText.trim() ? (
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: themeColor }]}
            onPress={handleSendMessage}
          >
            <Send size={18} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.mainHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerBack}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerActions}>
          {/* <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Search size={22} color="#6B7280" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.headerAction}>
            <Filter size={22} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages or contacts..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.searchClear}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        {/* Contacts List */}
        <View
          style={[
            styles.contactsContainer,
            selectedContact && styles.contactsContainerHidden,
          ]}
        >
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ContactItem
                contact={item}
                isSelected={selectedContact?.id === item.id}
                onPress={() => setSelectedContact(item)}
                themeColor={themeColor}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contactsList}
          />
        </View>

        {/* Chat View */}
        {selectedContact && (
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            {renderChatHeader()}

            <View style={styles.chatContent}>
              {renderMessages()}
              {isTyping && <TypingIndicator themeColor={themeColor} />}
            </View>

            {renderChatInput()}
          </KeyboardAvoidingView>
        )}
      </View>

      {/* Contact Info Modal (simplified) */}
      {showContactInfo && selectedContact && (
        <TouchableOpacity
          style={styles.contactInfoOverlay}
          activeOpacity={1}
          onPress={() => setShowContactInfo(false)}
        >
          <View style={styles.contactInfoCard}>
            <View
              style={[
                styles.contactInfoHeader,
                { backgroundColor: themeColor },
              ]}
            >
              <View style={styles.contactInfoAvatar}>
                <View
                  style={[styles.avatarFallback, { backgroundColor: "#fff" }]}
                >
                  <Text style={[styles.avatarText, { color: themeColor }]}>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
              </View>
              <Text style={styles.contactInfoName}>{selectedContact.name}</Text>
              <Text style={styles.contactInfoRole}>{selectedContact.role}</Text>
            </View>

            <View style={styles.contactInfoBody}>
              <View style={styles.contactInfoItem}>
                <Phone size={18} color="#6B7280" />
                <Text style={styles.contactInfoText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactInfoItem}>
                <Bell size={18} color="#6B7280" />
                <Text style={styles.contactInfoText}>Mute Notifications</Text>
              </View>
              <TouchableOpacity
                style={[styles.blockButton, { borderColor: themeColor }]}
              >
                <Text style={[styles.blockButtonText, { color: themeColor }]}>
                  Block Contact
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.contactInfoClose}
              onPress={() => setShowContactInfo(false)}
            >
              <Text style={styles.contactInfoCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  headerBack: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerAction: {
    marginLeft: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    marginLeft: 8,
    padding: 0,
  },
  searchClear: {
    fontSize: 16,
    color: "#9CA3AF",
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  contactsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contactsContainerHidden: {
    display: "none",
  },
  contactsList: {
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  selectedContact: {
    backgroundColor: "#F0FDF4",
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    position: "relative",
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  contactInfo: {
    flex: 1,
    justifyContent: "center",
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  contactTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  contactFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactLastMessage: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  chatHeaderBack: {
    padding: 4,
    marginRight: 8,
  },
  chatHeaderContact: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chatHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    position: "relative",
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: "#10B981",
  },
  chatHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  chatHeaderAction: {
    padding: 4,
  },
  chatContent: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dateText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginHorizontal: 8,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  userMessageRow: {
    justifyContent: "flex-end",
  },
  customerMessageRow: {
    justifyContent: "flex-start",
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  customerBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: "#fff",
  },
  customerMessageText: {
    color: "#1F2937",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  messageTime: {
    fontSize: 10,
    marginRight: 4,
  },
  userMessageTime: {
    color: "rgba(255,255,255,0.7)",
  },
  customerMessageTime: {
    color: "#9CA3AF",
  },
  messageStatus: {
    marginLeft: 2,
  },
  typingContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  typingBubble: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  attachButton: {
    padding: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    maxHeight: 100,
    color: "#1F2937",
  },
  mediaButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  contactInfoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfoCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  contactInfoHeader: {
    padding: 24,
    alignItems: "center",
  },
  contactInfoAvatar: {
    marginBottom: 12,
  },
  contactInfoName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  contactInfoRole: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  contactInfoBody: {
    padding: 20,
  },
  contactInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 12,
  },
  contactInfoText: {
    fontSize: 15,
    color: "#1F2937",
  },
  blockButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 16,
  },
  blockButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  contactInfoClose: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    alignItems: "center",
  },
  contactInfoCloseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
});
