# Output Tracing (Quiz Practice)

The starting Home Stack contains only the article list screen: `[(home)/index]`.

**Q1. What is the history after `router.push({ pathname: '/(home)/[id]', params: { id: '3' } })`?**

`[(home)/index, (home)/3]` — the article detail screen for article `3` is pushed on top of the existing list screen.

**Q2. What happens after calling `router.back()` on the detail screen?**

The detail screen is popped and the app returns to the article list. The Home Stack becomes `[(home)/index]`.

**Q3. How would `router.replace()` change the history?**

It replaces the current list screen instead of pushing a new screen. The Home Stack becomes `[(home)/3]`, so there is no underlying Home list screen on this stack to return to using Back.

**Q4. What does `useLocalSearchParams()` return on `[id].tsx` with `params: { id: '3' }`?**

It returns an object containing the dynamic route parameter: `{ id: '3' }`. The value is a string, not the number `3`.
