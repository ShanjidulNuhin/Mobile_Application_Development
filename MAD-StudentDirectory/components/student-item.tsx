import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Student } from "../data/students";

interface StudentItemProps {
  student: Student;
  onPress: (student: Student) => void;
  isSelected: boolean;
}

export default function StudentItem({ student, onPress, isSelected }: StudentItemProps) {
  return (
    <Pressable onPress={() => onPress(student)} style={[styles.row, isSelected && styles.selected]}>
      <Image source={{ uri: student.avatarUrl }} style={styles.avatar} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{student.name}</Text>
        <Text style={styles.department}>{student.department}</Text>
        <Text style={styles.studentId}>ID: {student.studentId}</Text>
      </View>
      <Text style={styles.chevron}>{isSelected ? "▲" : "▶"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomColor: "#E2E8F0", borderBottomWidth: 1 },
  selected: { backgroundColor: "#E1F5EE" },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 14 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: "#0D1F4E" },
  department: { fontSize: 12, color: "#0D9488", marginTop: 2 },
  studentId: { fontSize: 11, color: "#64748B", marginTop: 2 },
  chevron: { fontSize: 12, color: "#94A3B8", marginLeft: 8 },
});
