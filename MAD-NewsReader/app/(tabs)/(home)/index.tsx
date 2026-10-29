import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "../../../components/article-card";
import { ARTICLES, type Article } from "../../../data/articles";

// Exercise 1: derive the categories from the dataset (no hard-coded category list).
const CATEGORIES = ["All", ...new Set(ARTICLES.map((article) => article.category))];

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filtered = selectedCategory
    ? ARTICLES.filter((article) => article.category === selectedCategory)
    : ARTICLES;

  const handlePress = (article: Article) => {
    router.push({ pathname: "/(home)/[id]", params: { id: article.id } });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["bottom"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillRow}
              accessibilityLabel="Filter stories by category"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === (category === "All" ? null : category);
                return (
                  <Pressable
                    key={category}
                    style={[styles.pill, active && styles.activePill]}
                    onPress={() => setSelectedCategory(category === "All" ? null : category)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                  >
                    <Text style={[styles.pillText, active && styles.activePillText]}>
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Text style={styles.listHeaderText}>
              {filtered.length} {filtered.length === 1 ? "STORY" : "STORIES"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}><Text style={styles.emptyText}>No stories found.</Text></View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  list: { paddingTop: 12, paddingBottom: 32 },
  listHeader: { paddingBottom: 12 },
  pillRow: { gap: 8, paddingHorizontal: 14, paddingBottom: 14 },
  pill: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 22, backgroundColor: "#E2E8F0" },
  activePill: { backgroundColor: "#0D9488" },
  pillText: { fontSize: 12, color: "#475569", fontWeight: "600" },
  activePillText: { color: "#FFFFFF" },
  listHeaderText: { paddingHorizontal: 16, fontSize: 12, color: "#64748B", letterSpacing: 1 },
  empty: { padding: 32, alignItems: "center" },
  emptyText: { color: "#64748B", fontSize: 14 },
});
