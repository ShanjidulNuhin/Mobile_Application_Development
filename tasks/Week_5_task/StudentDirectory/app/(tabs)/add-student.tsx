import { SafeAreaView } from "react-native-safe-area-context";
import AddStudentForm from "../../components/add-student-form";
export default function AddStudentScreen() {
  return <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8" }}><AddStudentForm /></SafeAreaView>;
}
