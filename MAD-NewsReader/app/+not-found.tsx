import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: "Page not found" }} />
      <Text style={styles.title}>This page does not exist.</Text>
      <Link href="/" style={styles.link}>Return to Home</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F0F4F8", padding: 24 },
  title: { fontSize: 18, color: "#0D1F4E", marginBottom: 18 },
  link: { fontSize: 15, color: "#0D9488", fontWeight: "600" },
});
