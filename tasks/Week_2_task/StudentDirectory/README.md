# StudentDirectory lab work: Week 2 and Week 5

These projects were merged with the user's uploaded Expo SDK 54 starter project.
The starter Explore tab, modal, theme, asset images, and package.json are preserved.
The original `data/student.ts` has been renamed to `data/students.ts`.

## Which folder to use

- `Week02_Project/StudentDirectory` is the Week 2 working checkpoint.
  It includes searchable FlatList, list header, sorting toggle and student detail panel.
- `Week05_Project/StudentDirectory` continues the same app with global state,
  add/remove/reset, live count and duplicate-ID validation.
  **This is the final version to use for the combined assignments.**

Do not copy either project's `node_modules`, `.expo` or `.git` folders. They are
intentionally absent. Use the files from the ZIP with your own local project.

## The easiest way to use this with your existing project

1. Save a backup of your current `StudentDirectory` folder.
2. In VS Code, close Expo and open your existing `StudentDirectory` folder.
3. For a Week 2 checkpoint, copy the files from `Week02_Project/StudentDirectory`
   into the existing project, replacing matching files. Rename/remove
   `data/student.ts` after `data/students.ts` is in place.
4. Run `npx tsc --noEmit`, then `npx expo start -c`. Test search, list header,
   sort button and student detail. Make a Git commit for your work.
5. To continue to Week 5, copy the files from `Week05_Project/StudentDirectory`
   into your existing project. This includes two context files, a new add-student
   route and form, updates to the root and tab layouts, and the updated index.
6. Run `npx tsc --noEmit`, `npx expo lint` and `npx expo start -c`.
7. In Expo Go on Android, test adding/removing/resetting and the duplicate ID error.
8. Commit work in meaningful stages, push to GitHub, and submit your actual
   repository URL using the Microsoft Form from Week 5 manual, page 21.

If dependencies are missing on a *clean* extracted copy, run `npm install` once
in that StudentDirectory folder before running Expo. Avoid copying node_modules.

## Required behavior

### Week 2
- FlatList header reads 'Showing X of 10 students' initially showing 10 of 10
- Sort button switches A-Z and Z-A; search by name or department works
- Selecting a student shows their full details
- Output tracing: query 'c' -> Alice, Charlie; query 'se' -> Bob;
  query '' -> Alice, Bob, Charlie

### Week 5 graded tasks (10 marks)
- Reset button shows an Alert; Cancel keeps state; confirm dispatches RESET
- The title uses students.length and updates after add/remove/reset
- Duplicate `studentId` displays 'Student ID already exists' under the input;
  it must not dispatch or navigate until the user enters a unique ID

## Tests to perform in Expo Go

1. 10 original students show on Home.
2. Search `Software` -> 4 of 10.
3. Toggle sort twice -> reverses and restores the alphabetical order.
4. Press + Add. Add a new student with unique ID `99-99999-9` -> count 11.
5. Try adding `22-12345-1` -> error, stay on Add Student form.
6. Open any student detail, Remove -> count drops 1 after confirmation.
7. Press Reset, Cancel -> unchanged. Press Reset, confirm -> 10 original records.
8. Visit Explore and return to Directory -> state persists during the session.

Note: React Native's Alert.alert works on Android/iOS, not the normal browser
web experience. Test destructive confirmations using Expo Go.
Context state resets when you restart the app; persistence is not in Week 5.

The Week 4 lab manual was not supplied, so the Week 5 form here is a standalone
five-field form following the Week 5 requirements, not a copy of an unseen Week 4 form.
