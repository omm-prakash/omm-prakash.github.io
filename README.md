# Omm Prakash Sahoo - Portfolio

This is a personal portfolio website built with HTML, Vanilla CSS, and JavaScript. It uses a **custom markdown-driven rendering engine** to make updates easy and maintainable.

## 🚀 Quick Start

To run the project locally:

```bash
# Serve the directory (Python 3)
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## 📁 Directory Structure

- `index.html`: Main entry point and page structure.
- `style.css`: All styling, including the 1200px wide layout and mobile responsiveness.
- `script.js`: The "engine" that fetches and renders markdown files into HTML.
- `src/`: **Where your content lives.** Edit these `.md` files to update the site.
- `profile.jpg`: Your profile image (390px default size).

## ✍️ How to Update Content

To change your info, simply edit the corresponding file in the `src/` folder:

| File | Content to Update |
|---|---|
| `about.md` | Your bio, greeting, and social media links. |
| `news.md` | Your latest achievements (reverse chronological). |
| `experience.md` | Your work history and roles. |
| `projects.md` | Your projects. Supports `### I`, `### II` style subsections. |
| `education.md` | Your academic background. |
| `publications.md` | Your research papers. |
| `skills.md` | Your technical stack and tools. |
| `extracurricular.md` | Hobbies and leadership roles. |

## 🛠 Features Added

- **1200px Layout**: Widened for better text flow on large screens.
- **Responsive Overhaul**: Fully optimized for mobile and tablets.
- **Subsection Fix**: Logic added to handle complex project breakdowns.
- **Social Icons**: Integrated FontAwesome icons (LinkedIn, GitHub, Scholar, Email).
- **Cream-White Theme**: Custom `#fffffb` background for a premium feel.

---
*Maintained by Omm Prakash Sahoo*
