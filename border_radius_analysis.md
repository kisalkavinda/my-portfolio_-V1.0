# Border Radius & Shadow Standardization Analysis

## Current State

Found **inconsistent border radius** usage across the portfolio:
- `rounded-2xl` (16px) - 26+ instances
- `rounded-lg` (8px) - 40+ instances  
- `rounded-xl` (12px) - TARGET standard

## Recommended Standard

**Use `rounded-xl` (12px) for ALL cards, containers, and modals** for visual consistency.

---

## Files Requiring Updates

### High Priority (User-Facing Cards & Containers)

#### 1. Skills Section
**File:** `src/components/sections/Skills.jsx`
- Line 112: Skill card container
- Line 288: Category skill cards
- Line 305: Featured skill cards
- **Impact:** Main tech stack display

#### 2. About Section  
**File:** `src/components/sections/About.jsx`
- Lines 170, 239, 277: About cards and info boxes
- **Impact:** Personal introduction cards

#### 3. Contact Section
**File:** `src/components/sections/Contact.jsx`
- Lines 137, 233, 273: Form and contact method cards
- **Impact:** Contact form containers

#### 4. LiveStats Section
**File:** `src/components/sections/LiveStats.jsx`
- Lines 325, 357: Stats containers
- **Impact:** GitHub stats display

#### 5. Timeline Section
**File:** `src/components/sections/Timeline.jsx`
- Line 206: Timeline milestone cards
- **Impact:** Education/experience timeline

#### 6. NeuralNetwork3D Section
**File:** `src/components/sections/NeuralNetwork3D.jsx`
- Lines 493, 578, 613, 645, 684, 702: Control panels and visualization containers
- **Impact:** Interactive 3D visualization controls

### Medium Priority (Modals & Detail Views)

#### 7. ProjectDetails Page
**File:** `src/components/sections/ProjectDetails.jsx`
- Lines 201, 238, 273, 445, 517, 593, 633, 672, 698: All section containers
- **Impact:** Detailed project view

#### 8. Certificate Modal
**File:** `src/components/ui/CertificateModal.jsx`
- Line 21: Modal container
- **Impact:** Full-screen certificate view

#### 9. Project Details Modal
**File:** `src/components/ui/ProjectDetailsModal.jsx`
- Line 65: Modal container
- **Impact:** Quick project preview modal

#### 10. Chatbot Assistant
**File:** `src/components/common/ChatbotAssistant.jsx`
- Line 213: Message bubbles
- **Impact:** Chat interface

### Low Priority (Small UI Elements)

#### 11. Buttons & Inputs
Multiple files with `rounded-lg` on buttons:
- `TechBadge.jsx`, `SearchBar.jsx`, `SortDropdown.jsx`
- `ProjectCard.jsx`, `CodeSnippet.jsx`
- Contact form inputs, Hero buttons

**Recommendation:** Keep `rounded-lg` for small elements like buttons and inputs for better visual hierarchy.

---

## Implementation Strategy

### Phase 1: Large Containers (rounded-2xl → rounded-xl)
Replace all `rounded-2xl` with `rounded-xl` on:
- Section containers
- Cards
- Modals
- Control panels

### Phase 2: Keep Small Elements  
**DO NOT change** `rounded-lg` on:
- Buttons
- Inputs
- Small badges
- Icon containers

This creates visual hierarchy: larger radius for containers, smaller for interactive elements.

---

## Shadow Standardization

### Current Custom Shadows
Already added to `tailwind.config.js`:
```js
'glow-sm': '0 0 20px rgba(0, 217, 255, 0.3)',
'glow-md': '0 0 30px rgba(0, 217, 255, 0.4)',
'glow-lg': '0 0 40px rgba(0, 217, 255, 0.5)',
```

### Replacement Strategy
Replace custom `box-shadow` properties with utility classes:
- Small glows: `shadow-glow-sm`
- Medium glows: `shadow-glow-md`
- Large glows: `shadow-glow-lg`

---

## Estimated Changes
- **~26 files** need `rounded-2xl` → `rounded-xl` updates
- **~40+ instances** to standardize
- **Keep** `rounded-lg` for buttons/inputs (intentional hierarchy)

---

**Next Step:** Proceed with Phase 1 implementation?
