document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or prefered scheme
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }
  
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Add animation to toggle button
    toggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      toggle.style.transform = 'rotate(0)';
    }, 500);
  });
  
  // Typing animation for subtitle
  const subtitle = document.querySelector('.typing-text');
  const text = "Веб-дизайнер & Разработчик";
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      subtitle.textContent = text.substring(0, index + 1);
      index++;
      setTimeout(typeWriter, 100 + Math.random() * 50);
    } else {
      subtitle.innerHTML = text + '<span class="cursor">|</span>';
    }
  }
  
  setTimeout(typeWriter, 1000);
  
  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00f0ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#7f00ff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
  
  // Knight animation
  const knight = document.getElementById('knight');
  const skillBlocks = document.querySelectorAll('.skill-block');
  let currentBlockIndex = 0;
  
  // Set initial position
  function setInitialPosition() {
    const firstBlock = skillBlocks[0];
    const rect = firstBlock.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    knight.style.left = `${rect.left + rect.width / 2 - 40}px`;
    knight.style.top = `${scrollTop + rect.top - 60}px`;
    knight.style.opacity = '1';
  }
  
  // Animate knight movement
  function animateKnight() {
    const nextBlockIndex = (currentBlockIndex + 1) % skillBlocks.length;
    const currentBlock = skillBlocks[currentBlockIndex];
    const nextBlock = skillBlocks[nextBlockIndex];
    
    const currentRect = currentBlock.getBoundingClientRect();
    const nextRect = nextBlock.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const startX = currentRect.left + currentRect.width / 2 - 40;
    const startY = scrollTop + currentRect.top - 60;
    const endX = nextRect.left + nextRect.width / 2 - 40;
    const endY = scrollTop + nextRect.top - 60;
    
    // Calculate distance for timing
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const duration = Math.min(2000, distance * 2); // Max 2 seconds
    
    // Jump animation
    const jumpHeight = 100;
    const startTime = performance.now();
    
    function jump(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Parabolic trajectory
      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress - 
                jumpHeight * Math.sin(progress * Math.PI);
      
      knight.style.left = `${x}px`;
      knight.style.top = `${y}px`;
      
      // Scale for jumping effect
      const scale = 1 + 0.3 * Math.sin(progress * Math.PI);
      knight.style.transform = `scaleX(${scale})`;
      
      // Rotate based on direction
      const angle = (endX > startX) ? 10 : -10;
      knight.style.transform += ` rotate(${angle * Math.sin(progress * Math.PI * 2)}deg)`;
      
      if (progress < 1) {
        requestAnimationFrame(jump);
      } else {
        // Land with a little bounce
        knight.style.transform = 'scaleX(1) rotate(0deg)';
        setTimeout(() => {
          knight.style.transform = 'translateY(-5px)';
          setTimeout(() => {
            knight.style.transform = 'translateY(0)';
            currentBlockIndex = nextBlockIndex;
            setTimeout(animateKnight, 2000); // Pause before next jump
          }, 100);
        }, 50);
      }
    }
    
    requestAnimationFrame(jump);
  }
  
  // Start animation after everything is loaded
  window.addEventListener('load', () => {
    setInitialPosition();
    setTimeout(animateKnight, 2000);
  });
  
  // Scroll animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Skill chart animation
  const chartItems = document.querySelectorAll('.chart-item');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.5 });
  
  chartItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.5s ease';
    chartObserver.observe(item);
  });
});
// Обновите обработчик темы в script.js
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  
  // Анимация иконки
  toggle.classList.add('animate__animated', 'animate__rubberBand');
  setTimeout(() => {
    toggle.classList.remove('animate__animated', 'animate__rubberBand');
  }, 1000);
  
  // Меняем иконку
  if (document.body.classList.contains('dark')) {
    toggle.textContent = '☀️';
  } else {
    toggle.textContent = '🌙';
  }
});

// Проверка темы при загрузке
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  toggle.textContent = '☀️';
} else {
  toggle.textContent = '🌙';
}

// Адаптация анимации рыцаря для мобильных
function updateKnightAnimation() {
  if (window.innerWidth < 768) {
    knight.style.width = '50px';
    knight.style.height = '50px';
  } else {
    knight.style.width = '80px';
    knight.style.height = '80px';
  }
}

window.addEventListener('resize', updateKnightAnimation);
updateKnightAnimation();