import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from "react-native";

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
};

export default function FormField({ label, value, onChangeText, onBlur, error, multiline, keyboardType, placeholder }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multi, error && styles.invalid]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: "#0D1F4E", marginBottom: 6 },
  input: { backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: "#CBD5E1", paddingHorizontal: 12, paddingVertical: 11, fontSize: 14, color: "#0F172A" },
  multi: { minHeight: 85 },
  invalid: { borderColor: "#EF4444" },
  error: { color: "#DC2626", fontSize: 12, marginTop: 5 },
});
