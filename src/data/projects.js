export const projects = [
  {
    id: 3,
    title: "Portfolio Website",
    category: "Web",
    description: "A modern, responsive, and interactive portfolio website built with React, Framer Motion, and Tailwind CSS. Features include smooth animations, a sleek UI, and a dark mode toggle to showcase projects and skills effectively.",
    github: "https://github.com/KisalKavinda/my-portfolio",
    image: "💻",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    featured: false
  },
  {
    id: 1,
    title: "ShopMate App",
    category: ["Mobile", "ML"],
    description: "A native Android mobile application developed using Kotlin. It integrates an image recognition model to identify items, enabling automated billing and a seamless shopping experience. Features include real-time item identification, cart management, and user authentication.",
    github: "https://github.com/kisalkavinda/ShopMate_APP",
    image: "📱",
    gallery: [
      `${import.meta.env.BASE_URL}projects/ShopMate App/1.jpg`,
      `${import.meta.env.BASE_URL}projects/ShopMate App/2.jpg`,
      `${import.meta.env.BASE_URL}projects/ShopMate App/3.jpg`,
      `${import.meta.env.BASE_URL}projects/ShopMate App/4.jpg`,
    ],
    technologies: ["Kotlin", "Gradle", "Android", "TensorFlow Lite", "Computer Vision"],
    featured: false
  },
  {
    id: 2,
    title: "MealMate Online Food Ordering System",
    category: "Web",
    description: "A dynamic web-based food ordering system that allows customers to browse menus, place orders online, and manage them efficiently through an admin panel. It includes features like secure login, order management, checkout, and responsive design.",
    github: "https://github.com/kisalkavinda/MealMate-online-food-ordering-system",
    image: "🍔",
    gallery: [
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/1.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/2.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/3.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/4.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/5.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/6.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/7.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/8.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/9.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/10.png`,
      `${import.meta.env.BASE_URL}projects/MealMate Online Food Ordering System/11.png`,
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    featured: false
  }
];

export const projectCategories = ['All', 'ML', 'Web', 'Mobile'];