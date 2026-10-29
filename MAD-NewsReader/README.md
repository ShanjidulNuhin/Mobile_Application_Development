# NewsReader — Week 3 Midterm Lab Task 1

**Full name (as on ID card):** [REPLACE WITH YOUR FULL NAME]  
**Student ID:** [REPLACE WITH YOUR STUDENT ID]

React Native + Expo Router (SDK 54) sample article reader based on the Week 3 Mobile Application Development lab manual.

## Included features

- Bottom tabs: Home and Bookmarks (placeholder)
- Home Stack: article list and dynamic `[id]` detail route
- Eight sample articles from the lab manual with category, author, date, summary, and body
- Exercise 1: category filter pills with an All reset option
- Exercise 2: local bookmark toggle in the detail screen's header
- Output tracing answers in `ANSWERS.md`

## Run locally (PowerShell)

```powershell
npm.cmd install
npx.cmd tsc --noEmit
npx.cmd expo start -c
```

Scan the QR code using Expo Go on Android. If dependencies are missing, run `npm.cmd install` from this folder, which contains `package.json`.

## Required behavior

1. Home tab shows 8 articles; tapping one opens its detail screen; back returns to the list.
2. Pills show `All`, `Tech`, `Policy`, `Research`, `Industry`, `AI`, and `Business`.
3. The `Tech` pill shows 3 articles; `All` restores all 8.
4. The active pill has a teal background and white text.
5. The detail header bookmark icon switches between outline and filled when tapped.
6. The Bookmarks tab remains a placeholder, as required by Week 3. Local bookmark state is not shared with the Bookmarks tab or saved between visits.

## Notes

- The article titles and stories are **lab-supplied sample data**, not verified current news.
- Before submission, replace the name and ID at the beginning of this file.
- Push your work to the `main` branch of a public GitHub repository; submit the URL using the university form described in the manual.
- If you need separate commits for each exercise, use the three stage folders supplied in the separate progressive ZIP archive and follow `GIT_STEPS.md`.
