# Prompt — refine something you already have

Already have a component or page running in App Studio and want to change it?
Paste the current code back to the AI with one of these and copy the result in.

---

**Add a feature**

````
Here is my current code. Add **{{the new feature}}** without breaking anything
else. Keep it a single {{default-exported React component / self-contained
HTML file}} with inline styles and no new libraries. Return the full updated
code.

```
{{paste your current code here}}
```
````

---

**Change the look**

````
Here is my current code. Restyle it to be **{{e.g. "dark, minimal, with rounded
corners"}}**. Don't change the behavior. Keep everything in one file with
inline styles. Return the full updated code.

```
{{paste your current code here}}
```
````

---

**Fix something**

````
Here is my code. When I **{{do X}}**, **{{Y goes wrong}}**. Fix it and explain
the cause in one line. Return the full corrected code in one block.

```
{{paste your current code here}}
```
````

---

## Tip

Always ask for the **full updated code in one block** so you can paste the whole
thing back into App Studio (**New → paste → Run App**) without stitching
fragments together.
