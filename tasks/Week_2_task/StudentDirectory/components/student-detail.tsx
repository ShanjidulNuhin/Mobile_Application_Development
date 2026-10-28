import { StyleSheet, Text, View } from "react-native";
import type { Student } from "../data/students";

export default function StudentDetail({ student }: { student: Student }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.department}>{student.department}</Text>
      <Text style={styles.studentId}>ID: {student.studentId}</Text>
      <Text style={styles.label}>ABOUT</Text>
      <Text style={styles.bio}>{student.bio}</Text>
      <Text style={styles.label}>SKILLS</Text>
      <View style={styles.skills}>
        {student.skills.map((skill) => <Text key={skill} style={styles.skill}>{skill}</Text>)}
      </View>
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
});
