# KRX — Google AI Studio Build Brief
## Folder-Contained Website Prototype

**Client:** Kirithik  
**Project:** KRX  
**Purpose:** Create the visual design and frontend prototype for a premium, cinematic, scroll-driven personal digital platform.

---

# 1. NON-NEGOTIABLE FILE AND FOLDER RULES

The entire deliverable must live inside one clearly named project folder:

```text
KRX_STUDIO/
```

Treat `KRX_STUDIO/` as the single project boundary.

### Strict filesystem instructions

1. Create and edit project files **only inside `KRX_STUDIO/`**.
2. Do not create files or folders alongside `KRX_STUDIO/` or elsewhere in the workspace.
3. Do not create a second project, duplicate app, alternate implementation, backup copy, or parallel folder.
4. Do not create optional documentation, reports, notes, changelogs, screenshots, generated reference images, sample assets, or placeholder files.
5. Do not create any image, video, logo, font, or other asset. Use only the reference assets supplied by the client, existing dependencies, or CSS/canvas/SVG code where appropriate.
6. Do not rename, move, modify, overwrite, or delete the supplied reference images.
7. Do not create files merely to explain what you did.
8. Before creating a file, check whether an existing file can serve the purpose. Create only files genuinely required for the working application.
9. Do not create a README, license, .gitignore, test suite, design document, proposal, or extra configuration file unless the application cannot run without it.
10. If the environment automatically creates platform-managed files outside the project folder, do not attempt to manipulate those. Keep all files you control inside `KRX_STUDIO/`.

**Important interpretation:** A working web app necessarily needs source files and its required project configuration. Create only the minimum files needed for the app to run, and keep every one of those files inside `KRX_STUDIO/`. “No extra files” means no unnecessary deliverables or files outside this folder.

### Required folder layout

Use this as the intended structure. Keep it lean; do not create empty folders or files just to match the diagram.

```text
KRX_STUDIO/
├── src_img/
│   ├── 01_porsche_reference.png
│   ├── 02_bugatti_reference.png
│   ├── 03_rolls_royce_reference.png
│   ├── 04_mercedes_benz_reference.png
│   └── 05_user_video_reference.mp4
└── [minimum files required for the working web application]
```

The client will upload/provide the reference assets. If they are already present in the workspace, use them in place. If the platform stores attachments separately, use those supplied attachments directly and do not fabricate local copies or placeholder files.

Do not generate additional assets. Do not create an `assets/`, `public/`, `docs/`, `backup/`, `old/`, `export/`, or other folder unless it is strictly required by the framework and cannot be avoided. If a framework requires one, explain why before creating it.

---

# 2. PROJECT IDENTITY

**Name:** KRX  
**Owner:** Kirithik  
**Type:** Personal digital platform and interactive portfolio.

KRX is not a conventional developer portfolio or generic SaaS landing page.

It should feel like an independent digital experience created by a world-class creative technology studio: cinematic, editorial, atmospheric, technically sophisticated, and memorable.

The homepage introduces Kirithik, his interests, engineering philosophy, work, areas of exploration, and the future direction of the platform.

---

# 3. CLIENT-SUPPLIED VISUAL REFERENCES

Study the supplied reference images and video carefully before designing.

- **Porsche:** cinematic photography, immersive hero compositions, premium storytelling, strong image-led sections.
- **Bugatti:** dramatic typography, confident visual identity, cinematic presentation.
- **Rolls-Royce:** atmosphere, craftsmanship, restraint, elegant spacing, and material richness.
- **Mercedes-Benz:** editorial storytelling, asymmetric layouts, varied content compositions, and contrasting environments.
- **Openstate Music:** experimental digital environments, atmospheric canvases, expressive motion, kinetic typography, and sound-inspired visual behavior.

Additional reference website:
https://openstatemusic.com/

The supplied materials are references for design analysis only. Do not reproduce their websites, copy their text, use their branding, or present their screenshots as KRX content. Extract principles and create an original KRX identity.

Use the supplied video as a motion and atmosphere reference. Do not assume it is licensed production footage for the finished KRX site.

---

# 4. CREATIVE DIRECTION — ARCHITECTURAL CINEMA

The visual language should combine:

- Luxury automotive art direction.
- Editorial typography and composition.
- Experimental digital environments.
- Cinematic lighting and atmospheric depth.
- Purposeful motion and scroll choreography.
- Architectural precision and generous negative space.

The experience should feel premium and original, not like a template.

## Color palette

Dark environments:
- Abyss: `#050505`
- Obsidian: `#0A0A0A`
- Charcoal: `#141414`

Light environments:
- Soft Alabaster: `#F3F1ED`
- Warm Ivory: `#E9E4DC`

Accents:
- Signature Orange: `#FF5A1F`
- Warm Amber: `#D98A43`
- Pale Gold: `#D8B879`

Use orange and gold as controlled light sources, small highlights, reflections, and focal accents. Avoid large, flat orange blocks or excessive gradients.

## Typography

Use three complementary typographic voices:

1. Cormorant Garamond — expressive editorial headlines.
2. Plus Jakarta Sans — interface text and readable body copy.
3. JetBrains Mono — restrained technical annotations and coordinates.

Typography must be responsive and art-directed. No clipped text, accidental word wrapping, overlapping lines, or narrow unintended text columns.

---

# 5. HOMEPAGE — SEVEN DISTINCT SCENES

Create one continuous, scroll-driven homepage. Each scene must have its own visual composition while belonging to the same design system. Do not make every scene a repeated card grid.

## Scene 01 — The Opening

Create an unforgettable cinematic hero.

Requirements:
- A strong, distinctive visual centerpiece.
- Dramatic editorial headline with intentional line breaks.
- Short introduction.
- Selected Work and About actions.
- Minimal navigation and scroll invitation.
- Subtle pointer-responsive behavior.
- A composition that works at desktop, tablet, and mobile sizes.

The centerpiece may use carefully art-directed supplied media, procedural canvas, CSS, or SVG. Do not generate or download new image assets. The hero must have depth, atmosphere, and a clear focal point—not merely decorative circles or a generic glowing orb.

## Scene 02 — Identity

Introduce Kirithik through expressive editorial storytelling.

Use an original layout with strong typography, considered imagery or visual elements, and meaningful negative space. Avoid a conventional biography card.

## Scene 03 — Philosophy

Explore engineering discipline, curiosity, creative thinking, and first-principles problem solving.

Use visual storytelling, typography, and scroll choreography rather than a list of generic feature cards.

## Scene 04 — Selected Work

Create an immersive project showcase.

- Project entries must be editable data.
- Use replaceable image/video slots.
- Do not invent completed projects, clients, achievements, metrics, or statistics.
- If project content is not supplied, label entries as clearly editable placeholders or use a restrained empty-state design.

## Scene 05 — Capabilities

Present these as **Areas of Exploration**, not verified professional achievements:

- Software Development
- Artificial Intelligence
- Intelligent Systems
- Web Technologies
- System Architecture
- Creative Engineering

Use an original visual composition. Avoid a generic six-card grid unless the design has a strong and specific reason for it.

## Scene 06 — The Horizon

Introduce the future direction of KRX.

Reserve a visually intentional space for future:
- Tools
- Intelligence
- AI agent capabilities

These are future possibilities, not functional products in this build. Do not implement fake interactions or pretend these systems already exist.

## Scene 07 — The Closing

Create a memorable cinematic conclusion.

Include contact and social placeholders, but do not invent URLs, email addresses, or handles. Unconfigured links must not appear clickable.

---

# 6. MOTION AND SCROLL EXPERIENCE

Scrolling should feel like navigating an interactive visual story.

Explore:
- Scroll-triggered scene transitions.
- Image and video reveals.
- Layered parallax.
- Kinetic typography.
- Atmospheric particles.
- Subtle horizontal movement where it improves storytelling.
- Transitions between dark and light environments.
- Interactive navigation and active-scene indication.

Use motion purposefully. Not every element should move.

Preserve native scrolling. Support keyboard interaction and `prefers-reduced-motion`. Avoid scroll hijacking, excessive animation, and unnecessary WebGL complexity.

If GSAP and ScrollTrigger are used, manage their lifecycle and cleanup correctly.

---

# 7. NAVIGATION

Create a sophisticated, persistent navigation system containing:

- KRX identity.
- Minimal section navigation.
- An accessible full-screen menu.
- Active scene indication.
- Smooth navigation to homepage scenes.
- A contact action.

The navigation must remain usable at all supported viewport sizes.

---

# 8. TECHNICAL AND ARCHITECTURAL REQUIREMENTS

Use a maintainable frontend architecture. React, TypeScript, and Vite are preferred if supported by the environment.

Separate:
- Scene components.
- Content data.
- Design tokens.
- Animation logic.
- Shared layout and navigation.

Each scene must be independently maintainable, replaceable, reorderable, and removable without rewriting unrelated scenes.

Use reusable components where they genuinely reduce duplication. Avoid overengineering and unnecessary abstractions.

Future routes and modules should be possible without restructuring the homepage.

Do not implement backend services, databases, authentication, user accounts, AI chat, AI agents, or a Tools backend in this phase.

---

# 9. RESPONSIVE DESIGN AND QUALITY CONTROL

Design and inspect at these viewport sizes:

- 1920 × 1080
- 1440 × 900
- 1366 × 768
- 768 × 1024
- 390 × 844

At each size, verify:
- No horizontal overflow.
- No overlapping elements.
- No clipped text or controls.
- No accidental headline wrapping.
- No hidden calls to action.
- Correct image cropping and focal positioning.
- Navigation remains accessible.
- Scroll transitions work.
- Reduced-motion behavior is respected.

A successful build is not proof of successful design. Inspect the actual browser preview and refine the visual result.

---

# 10. WORKING METHOD

Do not rush into generating all seven scenes at once.

First:
1. Inspect all client-supplied reference assets.
2. Establish the visual direction and page-wide design system.
3. Create the complete homepage composition.
4. Give Scene 01 special attention.
5. Render and inspect the actual live preview.
6. Refine visual hierarchy, typography, spacing, imagery, and motion.
7. Check responsive layouts.
8. Only then consider the visual prototype ready for client review.

Do not claim visual validation without inspecting the browser preview.

Do not create extra files to document the process. Keep the project lean and contained in `KRX_STUDIO/`.

---

# 11. FINAL CREATIVE STANDARD

Think of KRX as a fusion of a luxury automotive digital experience, an experimental creative studio, and a personal engineering universe.

We are not building another portfolio.

We are building an experience that makes someone stop scrolling.

**Client approval is required before the project is considered complete.**
