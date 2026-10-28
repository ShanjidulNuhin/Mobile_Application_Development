import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { STUDENTS, type Student } from "../../data/students";

export default function Index() {
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true); // Exercise 2: A-Z by default
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase())
  );

  // Exercise 2: clone the array before sort(); never sort STUDENTS in place.
  const sorted = [...filtered].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  const selectedStudent = STUDENTS.find((student) => student.id === selectedId);

  const handleSelect = (student: Student) => {
    setSelectedId((previous) => previous === student.id ? null : student.id);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Student Directory</Text>
        <Pressable style={styles.button} onPress={() => setSortAsc((previous) => !previous)}>
          <Text style={styles.buttonText}>Sort: {sortAsc ? "A-Z" : "Z-A"}</Text>
        </Pressable>
      </View>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedId === item.id} />}
        // Exercise 1: total dataset versus currently displayed results.
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.summary}>Showing {filtered.length} of {STUDENTS.length} students</Text>
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
  titleBar: { paddingHorizontal: 16, paddingVertical: 14, backgroundColor: "#0D1F4E", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#FFFFFF", fontWeight: "700", fontSize: 18 },
  button: { backgroundColor: "#0D9488", borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8 },
  buttonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  listHeader: { padding: 14, backgroundColor: "#F0F4F8" },
  summary: { color: "#475569", fontSize: 13 },
  empty: { padding: 24, textAlign: "center", color: "#64748B" },
});
