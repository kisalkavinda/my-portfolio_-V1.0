export const smoothScrollTo = (targetId, offset = 0) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } else {
    console.warn(`Element with ID "${targetId}" not found for smooth scroll.`);
  }
};

export const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  let lastResult;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(context, args);
    }
    return lastResult;
  };
};