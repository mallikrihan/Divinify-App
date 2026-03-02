import { useReligion } from "@/contexts/ReligionContext";
import { useRouter } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const {
  ChevronLeft,
  Star,
  ThumbsUp,
  MoreVertical,
  Calendar,
  Clock,
  MapPin,
  Wallet,
  MessageSquare,
  User,
  Reply,
  CheckCircle,
  Flag,
  Share2,
  CalendarDays,
} = LucideIcons;

// --- HELPER COMPONENTS ---

const DetailRow = ({ icon, label, val }: any) => (
  <View style={styles.detailRow}>
    <View style={styles.iconBg}>{icon}</View>
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{val}</Text>
    </View>
  </View>
);

const HistoryRow = ({ icon, label, sub }: any) => (
  <View style={styles.historyRow}>
    <View style={styles.historyIconBg}>{icon}</View>
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.historyLabel}>{label}</Text>
      <Text style={styles.historySub}>{sub}</Text>
    </View>
  </View>
);

const ActionItem = ({ icon, label, color }: any) => (
  <TouchableOpacity style={styles.actionBtn}>
    <View style={styles.row}>
      <View style={[styles.actionIconBg, { backgroundColor: `${color}10` }]}>
        {icon}
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
    <ChevronLeft
      size={18}
      color="#ccc"
      style={{ transform: [{ rotate: "180deg" }] }}
    />
  </TouchableOpacity>
);

const ReviewCard = ({ item, themeColor, onSelect }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <ScrollView>
      <View style={styles.reviewCard}>
        <TouchableOpacity onPress={() => onSelect(item)}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.avatarCircle} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.row}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={10} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
          </View>
          <View
            style={[
              styles.tag,
              { backgroundColor: `${themeColor}10`, alignSelf: "flex-start" },
            ]}
          >
            <Text
              style={{ color: themeColor, fontSize: 11, fontWeight: "600" }}
            >
              {item.tag}
            </Text>
          </View>
          <Text style={styles.commentText} numberOfLines={2}>
            {item.comment}
          </Text>
        </TouchableOpacity>

        <View style={styles.reviewFooter}>
          <TouchableOpacity style={styles.row} onPress={handleLike}>
            <ThumbsUp
              size={14}
              color={isLiked ? themeColor : "#666"}
              fill={isLiked ? themeColor : "transparent"}
            />
            <Text
              style={[
                styles.footerAction,
                isLiked && { color: themeColor, fontWeight: "bold" },
              ]}
            >
              {" "}
              Helpful ({likeCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowReplyInput(!showReplyInput)}>
            <Text style={{ color: themeColor, fontWeight: "bold" }}>
              {showReplyInput ? "Cancel" : "Reply"}
            </Text>
          </TouchableOpacity>
        </View>

        {showReplyInput && (
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write your response..."
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: themeColor }]}
              onPress={() => {
                setShowReplyInput(false);
                setReplyText("");
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
                Send Reply
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// --- MAIN COMPONENT ---

export default function ReviewsManager() {
  const router = useRouter();
  const { religion } = useReligion();
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const reviews = [
    {
      id: "1",
      name: "Ahmed Hassan",
      rating: 5,
      date: "2 days ago",
      tag: "Nikah Ceremony",
      comment:
        "Very knowledgeable and conducted the ceremony with utmost respect and dignity. Arrived on time and made everyone feel comfortable.",
      location: "Al-Noor Banquet Hall",
      duration: "2 hours",
      payment: "₹150",
    },
    {
      id: "2",
      name: "Muhammad Ali",
      rating: 5,
      date: "5 days ago",
      tag: "Quran Khani",
      comment:
        "Beautiful recitation with proper tajweed. The scholar was very professional.",
      location: "Private Residence",
      duration: "1.5 hours",
      payment: "₹100",
    },
  ];

  const renderListView = () => (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews & Feedback</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.ratingOverview}>
          <View>
            <Text style={styles.bigRating}>4.8</Text>
            <View style={styles.row}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
            <Text style={styles.subText}>Based on 156 reviews</Text>
          </View>
          <View
            style={[
              styles.badgeContainer,
              { backgroundColor: `${themeColor}15` },
            ]}
          >
            <View style={[styles.sunIcon, { backgroundColor: themeColor }]}>
              <Star size={18} color="#fff" fill="#fff" />
            </View>
            <Text style={[styles.badgeText, { color: themeColor }]}>
              Excellent
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rating Breakdown</Text>
          {[
            { s: 5, p: 0.8, c: 98 },
            { s: 4, p: 0.4, c: 42 },
            { s: 3, p: 0.15, c: 11 },
          ].map((item) => (
            <View key={item.s} style={styles.breakdownRow}>
              <Text style={styles.starLabel}>{item.s} Star</Text>
              <View style={styles.progressBg}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${item.p * 100}%`, backgroundColor: themeColor },
                  ]}
                />
              </View>
              <Text style={styles.countText}>{item.c}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What People Appreciate</Text>
          <View style={styles.grid}>
            {[
              { l: "Punctual", c: 83, clr: "#10B981" },
              { l: "Expert", c: 76, clr: "#3B82F6" },
              { l: "Respectful", c: 112, clr: "#EF4444" },
              { l: "Friendly", c: 64, clr: "#F59E0B" },
            ].map((f) => (
              <View
                key={f.l}
                style={[styles.gridItem, { backgroundColor: `${f.clr}10` }]}
              >
                <Text style={[styles.gridLabel, { color: f.clr }]}>{f.l}</Text>
                <Text style={styles.gridSub}>{f.c} mentions</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
        </View>
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            item={item}
            themeColor={themeColor}
            onSelect={setSelectedReview}
          />
        ))}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Response Rate</Text>
          <View style={styles.rowBetween}>
            <View style={styles.rateBox}>
              <Text style={[styles.rateValue, { color: "#10B981" }]}>94%</Text>
              <Text style={styles.rateLabel}>Response Rate</Text>
            </View>
            <View style={styles.rateBox}>
              <Text style={[styles.rateValue, { color: "#3B82F6" }]}>2h</Text>
              <Text style={styles.rateLabel}>Avg. Time</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderDetailView = () => (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <TouchableOpacity onPress={() => setSelectedReview(null)}>
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Details</Text>
        <TouchableOpacity>
          <MoreVertical color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.detailCard}>
          <View style={styles.row}>
            <View style={styles.largeAvatar} />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.detailName}>{selectedReview?.name}</Text>
              <Text style={styles.subText}>
                Customer • {selectedReview?.date}
              </Text>
              <View style={styles.row}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} color="#F59E0B" fill="#F59E0B" />
                ))}
              </View>
            </View>
          </View>
          <View
            style={[
              styles.tag,
              {
                backgroundColor: `${themeColor}15`,
                marginTop: 15,
                alignSelf: "flex-start",
              },
            ]}
          >
            <Text style={{ color: themeColor, fontWeight: "600" }}>
              {selectedReview?.tag}
            </Text>
          </View>
          <Text style={styles.fullComment}>{selectedReview?.comment}</Text>
          <View style={[styles.row, { flexWrap: "wrap", marginTop: 15 }]}>
            {["Punctual", "Knowledgeable", "Respectful"].map((tag, i) => (
              <View key={i} style={styles.miniTag}>
                <Text style={styles.miniTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.row}>
              <ThumbsUp size={16} color="#666" />
              <Text style={styles.socialText}> Helpful (12)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, { marginLeft: 20 }]}>
              <Flag size={16} color="#666" />
              <Text style={styles.socialText}> Report</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity>
              <Share2 size={18} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Booking Information</Text>
        <View style={styles.infoBox}>
          <DetailRow
            icon={<Calendar size={18} color={themeColor} />}
            label="Date"
            val="Jan 15, 2026"
          />
          <DetailRow
            icon={<Clock size={18} color={themeColor} />}
            label="Duration"
            val={selectedReview?.duration || "2 hours"}
          />
          <DetailRow
            icon={<MapPin size={18} color={themeColor} />}
            label="Location"
            val={selectedReview?.location}
          />
          <DetailRow
            icon={<Wallet size={18} color={themeColor} />}
            label="Payment"
            val={selectedReview?.payment}
          />
        </View>

        <View style={styles.rowBetweenSection}>
          <Text style={styles.sectionTitle}>Your Response</Text>
          <TouchableOpacity>
            <Text style={{ color: themeColor, fontWeight: "600" }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.responseCard}>
          <View style={styles.row}>
            <View
              style={[styles.replyIconCircle, { backgroundColor: themeColor }]}
            >
              <Reply size={14} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.responseText}>
                Thank you for your kind words, Ahmed. It was an honor to serve
                your family during this blessed occasion...
              </Text>
              <Text style={styles.replyTime}>Replied 1 day ago</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Customer History</Text>
        <View style={styles.infoBox}>
          <HistoryRow
            icon={<CheckCircle size={18} color="#10B981" />}
            label="Total Bookings"
            sub="3 services completed"
          />
          <HistoryRow
            icon={<Star size={18} color="#F59E0B" />}
            label="Average Rating"
            sub="5.0 stars given"
          />
          <HistoryRow
            icon={<Calendar size={18} color="#3B82F6" />}
            label="Member Since"
            sub="January 2026"
          />
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ActionItem
          icon={<MessageSquare color="#10B981" />}
          label="Message Customer"
          color="#10B981"
        />
        <ActionItem
          icon={<CalendarDays color="#3B82F6" />}
          label="View All Bookings"
          color="#3B82F6"
        />
        <ActionItem
          icon={<User color="#A855F7" />}
          label="View Customer Profile"
          color="#A855F7"
        />
      </ScrollView>
    </View>
  );

  return selectedReview ? renderDetailView() : renderListView();
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 24,
    elevation: 2,
  },
  ratingOverview: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  bigRating: { fontSize: 36, fontWeight: "bold", color: "#111827" },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: { color: "#888", fontSize: 12, marginTop: 4 },
  badgeContainer: { padding: 12, borderRadius: 15, alignItems: "center" },
  sunIcon: { padding: 6, borderRadius: 8, marginBottom: 5 },
  badgeText: { fontWeight: "bold", fontSize: 12 },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 20,
    marginBottom: 12,
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 16,
    elevation: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  userName: { fontWeight: "bold", fontSize: 14, color: "#111827" },
  dateText: { color: "#9CA3AF", fontSize: 11 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginVertical: 8,
  },
  commentText: { color: "#4B5563", fontSize: 13, lineHeight: 18 },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  footerAction: { fontSize: 12, color: "#6B7280" },
  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  largeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E7EB",
  },
  detailName: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  fullComment: {
    marginTop: 15,
    color: "#374151",
    lineHeight: 22,
    fontSize: 14,
  },
  miniTag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  miniTagText: { fontSize: 11, color: "#6B7280", fontWeight: "500" },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  socialText: { fontSize: 12, color: "#6B7280" },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: { color: "#6B7280", fontSize: 11 },
  infoValue: { fontWeight: "bold", fontSize: 14, color: "#111827" },
  rowBetweenSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  responseCard: {
    backgroundColor: "#F0FDF4",
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  replyIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  responseText: { fontSize: 13, color: "#374151", lineHeight: 20 },
  replyTime: { fontSize: 11, color: "#6B7280", marginTop: 5 },
  historyRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  historyIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  historyLabel: { fontSize: 13, fontWeight: "700", color: "#111827" },
  historySub: { fontSize: 11, color: "#6B7280" },
  actionBtn: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  actionLabel: { fontWeight: "600", fontSize: 14, color: "#111827" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: { width: "48%", padding: 15, borderRadius: 12, marginBottom: 10 },
  gridLabel: { fontWeight: "bold", fontSize: 14 },
  gridSub: { fontSize: 11, color: "#6B7280", marginTop: 4 },
  breakdownRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  starLabel: { width: 45, fontSize: 12, color: "#6B7280" },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressFill: { height: 8, borderRadius: 4 },
  countText: { width: 25, fontSize: 12, textAlign: "right", color: "#374151" },
  rateBox: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  rateValue: { fontSize: 24, fontWeight: "bold" },
  rateLabel: { fontSize: 12, color: "#6B7280", marginTop: 5 },
  replyInputContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  replyInput: {
    fontSize: 13,
    color: "#374151",
    minHeight: 40,
    textAlignVertical: "top",
  },
  sendBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
});
