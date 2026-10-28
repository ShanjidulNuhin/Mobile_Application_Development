import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { useStudents } from "../../context/students-context";
import type { Student } from "../../data/students";

export default function Index() {
  const { students, dispatch } = useStudents();
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true); // Retained from Week 2 Exercise 2
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  // Derive selected student from CURRENT context, avoiding stale details after deletion.
  const selectedStudent = students.find((s) => s.id === selectedId);

  const handleSelect = (student: Student) => {
    setSelectedId((prev) => prev === student.id ? null : student.id);
  };

  const handleReset = () => {
    Alert.alert("Reset Directory", "Restore the original student list?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          dispatch({ type: "RESET" }); // MUST be inside the confirmation callback.
          setSelectedId(null);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        {/* Week 5 Feature 2: derived count, never a separate state variable. */}
        <Text style={styles.title}>Student Directory ({students.length})</Text>
        <View style={styles.actions}>
          <Pressable style={styles.sortButton} onPress={() => setSortAsc((prev) => !prev)}>
            <Text style={styles.buttonText}>{sortAsc ? "A-Z" : "Z-A"}</Text>
          </Pressable>
          <Pressable style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={() => router.push("/(tabs)/add-student")}>
            <Text style={styles.buttonText}>+ Add</Text>
          </Pressable>
        </View>
      </View>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedId === item.id} />}
        // Week 2 Exercise 1, now sourced from dynamic context instead of STUDENTS.
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.summary}>Showing {filtered.length} of {students.length} students</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No students match "{query}"</Text>}
      />
      {selectedStudent && <StudentDetail student={selectedStudent} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: { paddingHorizontal: 12, paddingVertical: 12, backgroundColor: "#0D1F4E", gap: 10 },
  title: { color: "#FFFFFF", fontWeight: "700", fontSize: 20 },
  actions: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 },
  sortButton: { backgroundColor: "#334155", borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8 },
  resetButton: { backgroundColor: "#B45309", borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8 },
  addButton: { backgroundColor: "#0D9488", borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8 },
  buttonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  listHeader: { padding: 14, backgroundColor: "#F0F4F8" },
  summary: { color: "#475569", fontSize: 13 },
  empty: { padding: 24, textAlign: "center", color: "#64748B" },
});
