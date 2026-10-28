import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FormField from "./form-field";
import { useStudents } from "../context/students-context";
import type { Student } from "../data/students";

// A standalone reference implementation of the Week 4 form, since that
// manual was not uploaded. It contains five editable fields.
type FormData = { name: string; studentId: string; department: string; bio: string; skills: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
const initialForm: FormData = { name: "", studentId: "", department: "", bio: "", skills: "" };

export default function AddStudentForm() {
  // Week 5: read BOTH the list and dispatch from global context.
  const { students, dispatch } = useStudents();
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.studentId.trim()) nextErrors.studentId = "Student ID is required";
    if (!formData.department.trim()) nextErrors.department = "Department is required";
    if (!formData.bio.trim()) nextErrors.bio = "Bio is required";
    if (!formData.skills.trim() || formData.skills.split(",").every((s) => !s.trim())) {
      nextErrors.skills = "Enter at least one skill";
    }

    // Week 5 Feature 3: check BEFORE dispatch or navigation, under the ID field.
    if (formData.studentId.trim() && students.some((s) => s.studentId === formData.studentId.trim())) {
      nextErrors.studentId = "Student ID already exists";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (submitting || !validateForm()) return;
    setSubmitting(true);
    try {
      // Fake asynchronous submission as in the lab sequence.
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      const newStudent: Student = {
        id: `new-${Date.now()}`,
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        skills: formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        avatarUrl: "https://i.pravatar.cc/150?img=14",
      };
      dispatch({ type: "ADD_STUDENT", payload: newStudent });
      router.back(); // No onSubmitSuccess callback prop.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Join the Directory</Text>
      <Text style={styles.help}>Add five fields. Skills can be comma-separated.</Text>
      <FormField label="Full Name" value={formData.name} onChangeText={(value) => update("name", value)} error={errors.name} placeholder="e.g., Sara Ahmed" />
      <FormField label="Student ID" value={formData.studentId} onChangeText={(value) => update("studentId", value)} error={errors.studentId} placeholder="e.g., 22-12345-1" />
      <FormField label="Department" value={formData.department} onChangeText={(value) => update("department", value)} error={errors.department} placeholder="e.g., Computer Science" />
      <FormField label="Bio" value={formData.bio} onChangeText={(value) => update("bio", value)} error={errors.bio} multiline placeholder="Write a short bio" />
      <FormField label="Skills" value={formData.skills} onChangeText={(value) => update("skills", value)} error={errors.skills} placeholder="React Native, TypeScript" />
      <Pressable style={[styles.submit, submitting && styles.disabled]} onPress={handleSubmit} disabled={submitting}>
        {submitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitText}>Join Directory</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, paddingBottom: 40, backgroundColor: "#F0F4F8" },
  title: { fontSize: 23, color: "#0D1F4E", fontWeight: "700" },
  help: { fontSize: 13, color: "#64748B", marginTop: 6, marginBottom: 20 },
  submit: { marginTop: 8, backgroundColor: "#0D9488", padding: 14, borderRadius: 10, alignItems: "center" },
  disabled: { opacity: 0.55 },
  submitText: { color: "#FFFFFF", fontWeight: "700" },
});
