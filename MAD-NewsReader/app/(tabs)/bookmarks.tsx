import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Week 3 calls for a placeholder; bookmarks are local only to ArticleDetail.
export default function Bookmarks() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Ionicons name="bookmark-outline" size={50} color="#0D9488" />
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.subtitle}>
          Articles you save will appear here.{"\n"}Coming in a future week.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  title: { fontSize: 20, fontWeight: "700", color: "#0D1F4E", marginTop: 16, marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#94A3B8", textAlign: "center", lineHeight: 22 },
});
