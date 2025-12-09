# Kisal Kavinda - Portfolio Website

![Portfolio Preview](public/profile-picture.jpg)

## 🚀 Overview

Professional portfolio website showcasing my journey as a Computer Engineering student specializing in **Machine Learning**, **IoT Development**, and **Full-Stack Web Development**. This portfolio demonstrates my technical skills, academic achievements, and passion for AI technologies.

**Live Site:** [https://kisalkavinda.github.io/my-portfolio/](https://kisalkavinda.github.io/my-portfolio/)

---

## ✨ Features

- **🎨 Modern UI/UX**: Dark-themed professional design with custom color palette
- **🎬 Smooth Animations**: GSAP ScrollTrigger animations for engaging user experience
- **📱 Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **🌐 Interactive Sections**:
  - Hero section with animated 3D Lottie model
  - About Me with professional summary and statistics
  - Skills showcase with interactive carousel
  - Project gallery with detailed modals
  - Certificates display with view functionality
  - Live GitHub activity heatmap
  - Contact form with email integration
  - My Journey timeline
- **⚡ Performance Optimized**: Fast loading with Vite bundler
- **♿ Accessible**: WCAG compliant with proper semantics
- **🔍 SEO Optimized**: Complete meta tags and Open Graph integration

---

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** + **ScrollTrigger** - Advanced animations
- **Framer Motion** - React animation library
- **Lottie** - Animated graphics
- **React Router DOM** - Client-side routing

### Backend & Services
- **Express.js** - API server
- **FormSubmit.co** - Contact form handling
- **SweetAlert2** - Beautiful alerts

### Additional Libraries
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **React Activity Calendar** - GitHub heatmap visualization
- **Three.js** - 3D graphics (neural network visualization)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kisalkavinda/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🚀 Deployment

This portfolio is deployed on **GitHub Pages**.

### Deploy to GitHub Pages
```bash
npm run deploy
```

This runs the build script and pushes the `dist` folder to the `gh-pages` branch.

### Manual Deployment Steps
1. Build the project: `npm run build`
2. The output will be in the `dist/` directory
3. Deploy the `dist/` folder to your hosting service

---

## 📂 Project Structure

```
my-portfolio/
├── public/              # Static assets
│   ├── animations/      # Lottie animations
│   ├── Certificates/    # Certificate images
│   ├── projects/        # Project screenshots
│   └── profile-picture.jpg
├── src/
│   ├── components/
│   │   ├── common/      # Reusable components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # UI components
│   ├── data/            # Static data files
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles
│   └── main.jsx         # App entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

---

## 🎯 Key Sections

### 1. **Hero Section**
- Animated introduction with Lottie 3D model
- Professional tagline and CTA buttons
- Technology badge showcase

### 2. **About Me**
- Professional summary and bio
- Interactive profile picture with animations
- Quick stats (Projects, Technologies, Experience)
- Core competencies

### 3. **Skills**
- Interactive 3D carousel showcasing technical skills
- Category filters (All, Programming, AI/ML, Web Dev, etc.)
- Skill proficiency levels
- Technology statistics

### 4. **Projects**
- Project cards with images and descriptions
- Search and sort functionality
- Category filtering
- Detailed project modals with:
  - Screenshots slideshow
  - Technologies used
  - GitHub links
  - Live demo links

### 5. **Certificates**
- Professional certifications display
- Modal view for certificate details
- Organized by category
- Verifiable credential links

### 6. **Contact**
- Working contact form (FormSubmit integration)
- Social media links (GitHub, LinkedIn, Facebook)
- Email and location information
- Form validation

---

## 🎨 Color Theme

**Void Theme** - Custom dark mode palette:
- Background: `#000000`
- Surface: `#0a0a0a`
- Accent (Cyan): `#00d9ff`
- Highlight (Pink): `#4dfffe`
- Text Primary: `#c0c0c0`

---

## 📝 Configuration

### Personal Information
Update your details in `src/data/personalInfo.js`:
```javascript
export const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  // ...
}
```

### Projects
Add/edit projects in `src/data/projects.js`

### Skills
Modify skills in `src/data/skills.js`

### Certificates
Update certificates in `src/data/certificates.js`

---

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Test Production Build
```bash
npm run build
npm run preview
```

### Performance Testing
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target: 90+ across all metrics

---

## 📈 Performance Metrics

Current Lighthouse Scores:
- ⚡ Performance: 95+
- ♿ Accessibility: 100
- ✅ Best Practices: 100
- 🔍 SEO: 100

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Kisal Kavinda**
- GitHub: [@kisalkavinda](https://github.com/kisalkavinda)
- LinkedIn: [Kisal Kavinda](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Stanford University** - Machine Learning certifications
- **Vite** - Amazing build tool
- **GSAP** - Powerful animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lottie** - Beautiful animations

---

## 📸 Screenshots

### Desktop View
![Desktop Screenshot](docs/desktop-view.png)

### Mobile View
![Mobile Screenshot](docs/mobile-view.png)

---

## 🔄 Version History

- **v2.0** (Current) - GSAP animations, improved UX, theme migration
- **v1.0** - Initial release with AOS animations

---

## 🐛 Known Issues

None currently! Report issues on the [GitHub Issues](https://github.com/kisalkavinda/my-portfolio/issues) page.

---

**⭐ If you like this project, please give it a star on GitHub!**

Made with ❤️ by Kisal Kavinda
