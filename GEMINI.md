# Project Overview

This is a personal portfolio website built with React and Vite for the frontend, styled using Tailwind CSS, and featuring a lightweight Express.js backend. The application is designed to showcase projects, skills, and certificates, providing a comprehensive overview of the developer's work.

Key features and technologies include:
*   **Frontend:** React with Vite for fast development and bundling.
*   **Routing:** `react-router-dom` for seamless navigation between sections (home, project details).
*   **Styling:** Tailwind CSS for utility-first styling, including custom animations and dark mode support.
*   **Animations:** AOS (Animate On Scroll) for engaging scroll-based animations.
*   **Backend:** A small Express.js server providing API endpoints, currently including a health check.
*   **Deployment:** Configured for deployment to GitHub Pages.

The project structure includes a `src` directory for frontend components, hooks, and data, and a `public` directory for static assets like images, animations, and certificates.

# Building and Running

## Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/kisalkavinda/my-portfolio.git
    cd my-portfolio
    ```
2.  Install frontend and backend dependencies:
    ```bash
    npm install
    ```

## Running the Development Server

To start the frontend development server (Vite) and the backend server (Express):

1.  **Start Frontend:**
    ```bash
    npm run dev
    ```
    This will typically run the frontend on `http://localhost:3000`.

2.  **Start Backend:**
    ```bash
    node server.js
    ```
    Or, if you have `nodemon` installed globally or as a project dependency:
    ```bash
    nodemon server.js
    ```
    The backend server will run on `http://localhost:3001`. The frontend is configured to proxy `/api` requests to this backend.

## Building for Production

To build the project for production:

```bash
npm run build
```

This command will create a `dist` directory containing the optimized production build of the frontend application.

## Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for deployment to GitHub Pages.

1.  **Build and prepare for deployment:**
    ```bash
    npm run predeploy
    ```
    This runs the `build` script.

2.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This command uses `gh-pages` to push the contents of the `dist` directory to the `gh-pages` branch of your repository.

# Development Conventions

*   **Code Formatting & Linting:** The project uses ESLint for code linting to ensure consistent code quality. You can run `npm run lint` to check for issues.
*   **Styling:** Tailwind CSS is used for all styling. Custom animations are defined in `tailwind.config.js`.
*   **Dark Mode:** The application supports dark mode, managed via a `DarkModeProvider` context.
*   **Component Structure:** Frontend components are organized into `components/sections`, `components/common`, and `components/ui`.
*   **Data Management:** Static data like certificates, projects, and skills are stored in the `data` directory.
*   **Animations:** AOS library is integrated for scroll-based animations, initialized in `App.jsx`.

# Current Theme Migration Status (Void Theme)

The project is undergoing a complete color theme overhaul to a "Void" custom theme.

## Completed Tasks:
*   Defined the new "Void" color palette in `tailwind.config.js` with semantic names (`background-main`, `surface`, `text-primary`, `accent`, `highlight`). Old theme colors (`void-purple`, `void-pink`, `void-slate-*`) were temporarily added for a smoother transition.
*   Cleaned up and updated CSS variables in `src/styles/globals.css` to define the "Void" theme for dark mode, removed hardcoded old theme colors (e.g., in scrollbar and focus styles), and simplified light mode variables by removing them.
*   Replaced `dark:bg-slate-900` with `bg-background-main` and `dark:text-white` with `text-text-primary` in `src/App.jsx`.
*   Updated hardcoded canvas background color in `src/components/common/DigitalRainBackground.jsx` to match the new theme (`#000000`), and simplified its color logic by removing light mode and `useDarkMode` dependencies.
*   Replaced hardcoded `SweetAlert2` background color from `#1e293b` to `#0a0a0a` and text color from `#fff` to `#c0c0c0` in `src/components/sections/Contact.jsx`. Also replaced `dark:bg-slate-800/50` with `bg-surface/50`, `dark:bg-slate-700/30` with `bg-surface/30`, `via-violet-500` with `via-accent`, and updated `contactMethods` array colors.
*   Removed `useDarkMode` hook, updated hardcoded canvas color variables (`primaryPurple`, `primaryPink`, etc.) to `accentColor`, `highlightColor`, adjusted `hsla` values for neuron gradients, and replaced numerous Tailwind classes (`slate-*`, `purple-*`, `pink-*`) with new semantic classes (`bg-surface`, `text-highlight`, `border-accent`, etc.) in `src/components/sections/NeuralNetwork3D.jsx`. Also removed `darkMode` from `useEffect` dependency array.
*   Performed global replacement of `slate-`, `purple-`, and `pink-` classes across various `.jsx` files, including `ProjectDetailsModal.jsx`, `ImageSlideshowModal.jsx`, `Certificates.jsx`, `About.jsx`, `ChatbotAssistant.jsx`, `Header.jsx`, `SocialLinks.jsx`, `Timeline.jsx`, `Skills.jsx`, `ProjectDetails.jsx`, and `LiveStats.jsx`, with new semantic classes defined in `tailwind.config.js`.
*   Fixed syntax errors in `src/components/sections/ProjectDetails.jsx`, `src/components/sections/About.jsx`, and `src/components/sections/Timeline.jsx` that were introduced during color migration.
*   Refactored `src/hooks/DarkModeProvider.jsx` to enforce dark mode permanently by removing state management and `toggleDarkMode` function.
*   Updated GitHub link for "Portfolio Website" in `src/data/projects.js`.
*   Modified `src/components/sections/Hero.jsx` to apply a single, theme-consistent color to all technology badges.
*   Adjusted the position of the down arrow in `src/components/sections/Hero.jsx` to move it further down.
*   Centered the subheading "Deep Learning Model Visualization" in `src/components/sections/NeuralNetwork3D.jsx`.
*   Made control bars (Learning Rate, Connection Style, Neuron Size, Speed) in `src/components/sections/NeuralNetwork3D.jsx` visible and theme-consistent.

## Pending Tasks:
*   Theme migration is largely complete. Further visual checks for consistency across all components can be performed if needed.