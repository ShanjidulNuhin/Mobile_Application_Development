import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useStudents } from "../context/students-context";
import type { Student } from "../data/students";

export default function StudentDetail({ student }: { student: Student }) {
  const { dispatch } = useStudents();

  const handleRemove = () => {
    Alert.alert("Remove Student", `Remove ${student.name} from the directory?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => dispatch({ type: "REMOVE_STUDENT", payload: student.id }) },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.department}>{student.department}</Text>
      <Text style={styles.studentId}>ID: {student.studentId}</Text>
      <Text style={styles.label}>ABOUT</Text>
      <Text style={styles.bio}>{student.bio}</Text>
      <Text style={styles.label}>SKILLS</Text>
      <View style={styles.skills}>{student.skills.map((skill) => <Text key={skill} style={styles.skill}>{skill}</Text>)}</View>
      <Pressable style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.removeText}>Remove from Directory</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", margin: 12, padding: 16, borderRadius: 14, borderColor: "#E2E8F0", borderWidth: 1 },
  name: { fontSize: 18, color: "#0D1F4E", fontWeight: "700" },
  department: { color: "#0D9488", fontSize: 13, marginTop: 2 },
  studentId: { color: "#64748B", fontSize: 12, marginTop: 4, marginBottom: 10 },
  label: { fontSize: 11, fontWeight: "700", color: "#64748B", marginTop: 10 },
  bio: { fontSize: 13, color: "#334155", marginTop: 5, lineHeight: 19 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  skill: { backgroundColor: "#EFF6FF", borderRadius: 12, paddingVertical: 5, paddingHorizontal: 10, color: "#1D4ED8", fontSize: 12 },
  removeButton: { borderColor: "#EF4444", borderWidth: 1, borderRadius: 8, padding: 10, alignItems: "center", marginTop: 16 },
  removeText: { color: "#DC2626", fontWeight: "600", fontSize: 13 },
});
