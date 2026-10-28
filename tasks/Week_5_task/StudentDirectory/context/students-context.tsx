import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { STUDENTS } from "../data/students";
import { studentsReducer, type StudentsAction, type StudentsState } from "./students-reducer";

type StudentsContextValue = {
  students: StudentsState;
  dispatch: Dispatch<StudentsAction>;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, dispatch] = useReducer(studentsReducer, STUDENTS);
  return (
    <StudentsContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents(): StudentsContextValue {
  const context = useContext(StudentsContext);
  if (!context) throw new Error("useStudents must be used inside a StudentsProvider");
  return context;
}
