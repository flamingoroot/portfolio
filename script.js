// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeModal = document.querySelector('.close-modal');
const playButtons = document.querySelectorAll('.btn-play');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fixed header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Portfolio Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Video Modal
playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = btn.getAttribute('data-video');
        videoFrame.src = videoUrl;
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside content
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

// Initialize the slider
showSlide(currentSlide);

// Next/Previous button functionality
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
});

// Dot navigation
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});

// Auto slide (optional)
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission (placeholder for server-side processing)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Here you would typically send the data to a server
        // For this demo, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll
window.addEventListener('load', () => {
    // Add 'loaded' class to body to trigger initial animations
    document.body.classList.add('loaded');
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .service-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation on initial load
    animateOnScroll();
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Portfolio data - for a real project, this might come from a CMS or API
const portfolioData = [
    {
        id: 1,
        title: 'Brand Commercial',
        description: 'TV ad for a leading brand',
        category: 'commercial',
        image: 'images/placeholder1.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 2,
        title: 'Music Video',
        description: 'Official music video for Artist X',
        category: 'music',
        image: 'images/placeholder2.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 3,
        title: 'Instagram Campaign',
        description: 'Series of promotional videos',
        category: 'social',
        image: 'images/placeholder3.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 4,
        title: 'Short Documentary',
        description: 'Environmental awareness film',
        category: 'documentary',
        image: 'images/placeholder4.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 5,
        title: 'Product Launch',
        description: 'Featured promotion for new tech product',
        category: 'commercial',
        image: 'images/placeholder5.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 6,
        title: 'TikTok Series',
        description: 'Viral content for fashion brand',
        category: 'social',
        image: 'images/placeholder6.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
];

// In a real implementation, you might use this data to dynamically generate portfolio items 

// Cursor circle effect
const cursorCircle = document.querySelector('.cursor-circle');

if (cursorCircle) {
    document.addEventListener('mousemove', function(e) {
        cursorCircle.style.display = 'block';
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseout', function() {
        cursorCircle.style.display = 'none';
    });
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.section-header, .skill-item, .service-card, .testimonial-content').forEach(element => {
    observer.observe(element);
});

// Custom Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all custom video players
    const customVideoPlayers = document.querySelectorAll('.custom-video-player');
    
    customVideoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playPauseBtn = player.querySelector('.play-pause');
        const playIcon = playPauseBtn.querySelector('i');
        const volumeBtn = player.querySelector('.volume');
        const volumeIcon = volumeBtn.querySelector('i');
        const volumeSlider = player.querySelector('.volume-slider');
        const volumeProgress = player.querySelector('.volume-progress');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeElement = player.querySelector('.current');
        const durationElement = player.querySelector('.duration');
        const fullscreenBtn = player.querySelector('.fullscreen');
        
        // Initialize video player
        video.volume = 0.5;
        volumeProgress.style.width = `${video.volume * 100}%`;
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        
        function togglePlay() {
            if (video.paused) {
                video.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                video.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }
        
        // Update progress bar
        video.addEventListener('timeupdate', updateProgress);
        
        function updateProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progress.style.width = `${percent}%`;
            
            // Update current time
            const currentMinutes = Math.floor(video.currentTime / 60);
            const currentSeconds = Math.floor(video.currentTime % 60);
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        }
        
        // Update video duration once metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            const durationMinutes = Math.floor(video.duration / 60);
            const durationSeconds = Math.floor(video.duration % 60);
            durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        });
        
        // Click on progress bar to seek
        progressBar.addEventListener('click', seek);
        
        function seek(e) {
            const progressBarWidth = progressBar.clientWidth;
            const clickPosition = e.offsetX;
            const seekTime = (clickPosition / progressBarWidth) * video.duration;
            video.currentTime = seekTime;
        }
        
        // Volume controls
        volumeBtn.addEventListener('click', toggleMute);
        
        function toggleMute() {
            video.muted = !video.muted;
            
            if (video.muted) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
                volumeProgress.style.width = '0';
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
                volumeProgress.style.width = `${video.volume * 100}%`;
            }
        }
        
        // Volume slider
        volumeSlider.addEventListener('click', changeVolume);
        
        function changeVolume(e) {
            const volumeSliderWidth = volumeSlider.clientWidth;
            const clickPosition = e.offsetX;
            const newVolume = clickPosition / volumeSliderWidth;
            
            video.volume = newVolume;
            volumeProgress.style.width = `${newVolume * 100}%`;
            
            // Update volume icon based on level
            if (newVolume === 0) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }
            
            video.muted = false;
        }
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                player.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
        
        // Reset play button when video ends
        video.addEventListener('ended', () => {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        });
    });
}); 