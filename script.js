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
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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

// Custom Video Player Implementation
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayers = document.querySelectorAll('.custom-video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playPauseBtn = player.querySelector('.play-pause');
        const volumeBtn = player.querySelector('.volume');
        const volumeSlider = player.querySelector('.volume-slider');
        const volumeProgress = player.querySelector('.volume-progress');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTime = player.querySelector('.current');
        const duration = player.querySelector('.duration');
        const fullscreenBtn = player.querySelector('.fullscreen');
        
        // Initial setup
        let isPlaying = false;
        let isMuted = false;
        
        // Set initial volume
        video.volume = 0.7;
        volumeProgress.style.width = `${video.volume * 100}%`;
        
        // Format time (seconds to MM:SS)
        const formatTime = (timeInSeconds) => {
            if (isNaN(timeInSeconds)) return "0:00";
            
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = Math.floor(timeInSeconds % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
        
        // Update progress bar and time display
        const updateProgress = () => {
            if (video.duration) {
                const percent = (video.currentTime / video.duration) * 100;
                progress.style.width = `${percent}%`;
                currentTime.textContent = formatTime(video.currentTime);
                duration.textContent = formatTime(video.duration);
            }
        };
        
        // Set volume
        const setVolume = (e) => {
            const rect = volumeSlider.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.volume = Math.max(0, Math.min(1, pos));
            volumeProgress.style.width = `${video.volume * 100}%`;
            
            // Update volume icon
            if (video.volume === 0) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                isMuted = true;
            } else if (video.volume < 0.5) {
                volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
                isMuted = false;
            } else {
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMuted = false;
            }
        };
        
        // Play/Pause toggle
        const togglePlay = () => {
            if (video.paused) {
                video.play().catch(e => console.error("Error playing video:", e));
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            }
        };
        
        // Toggle fullscreen
        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                if (player.requestFullscreen) {
                    player.requestFullscreen().catch(e => console.error("Fullscreen error:", e));
                } else if (player.webkitRequestFullscreen) {
                    player.webkitRequestFullscreen();
                } else if (player.msRequestFullscreen) {
                    player.msRequestFullscreen();
                }
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch(e => console.error("Exit fullscreen error:", e));
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        };
        
        // Toggle mute
        const toggleMute = () => {
            if (video.muted) {
                video.muted = false;
                volumeBtn.innerHTML = video.volume < 0.5 ? 
                    '<i class="fas fa-volume-down"></i>' : 
                    '<i class="fas fa-volume-up"></i>';
                volumeProgress.style.width = `${video.volume * 100}%`;
                isMuted = false;
            } else {
                video.muted = true;
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                volumeProgress.style.width = '0%';
                isMuted = true;
            }
        };
        
        // Seek in video
        const seek = (e) => {
            if (!video.duration) return;
            
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
            updateProgress();
        };
        
        // Initialize video upon loading metadata
        const initializeVideo = () => {
            duration.textContent = formatTime(video.duration);
            currentTime.textContent = formatTime(0);
            // Set initial volume display
            volumeProgress.style.width = `${video.volume * 100}%`;
        };
        
        // Event Listeners
        // Use loadeddata instead of loadedmetadata for more consistent behavior
        video.addEventListener('loadeddata', initializeVideo);
        
        // Update time display and progress bar while playing
        video.addEventListener('timeupdate', updateProgress);
        
        // Play/Pause button click
        playPauseBtn.addEventListener('click', togglePlay);
        
        // Video click to play/pause
        video.addEventListener('click', togglePlay);
        
        // Volume button click to mute/unmute
        volumeBtn.addEventListener('click', toggleMute);
        
        // Volume slider click to set volume
        volumeSlider.addEventListener('click', setVolume);
        volumeSlider.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) { // If mouse button is pressed
                setVolume(e);
            }
        });
        
        // Progress bar click to seek
        progressBar.addEventListener('click', seek);
        
        // Fullscreen button click
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        // End of video
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        });
        
        // Handle keyboard shortcuts
        player.addEventListener('keydown', (e) => {
            if (e.code === 'Space') { // Space key
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'ArrowLeft') { // Left arrow
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - 5);
            } else if (e.code === 'ArrowRight') { // Right arrow
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 5);
            } else if (e.code === 'KeyM') { // M key
                e.preventDefault();
                toggleMute();
            } else if (e.code === 'KeyF') { // F key
                e.preventDefault();
                toggleFullscreen();
            }
        });
        
        // Force an initial update
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            initializeVideo();
        }
    });
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    testimonialSlides[index].style.display = 'block';
    dots[index].classList.add('active');
}

// Initialize slider
showSlide(currentSlide);

// Next slide
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
});

// Previous slide
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto slide change
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

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
document.addEventListener('DOMContentLoaded', function() {
    const cursorCircle = document.querySelector('.cursor-circle');
    
    if (cursorCircle) {
        document.addEventListener('mousemove', function(e) {
            cursorCircle.style.left = e.clientX + 'px';
            cursorCircle.style.top = e.clientY + 'px';
            
            // Make the cursor visible when it moves
            cursorCircle.style.opacity = '1';
            
            // Hide the cursor after 2 seconds of inactivity
            clearTimeout(window.cursorTimeout);
            window.cursorTimeout = setTimeout(function() {
                cursorCircle.style.opacity = '0';
            }, 2000);
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', function() {
            cursorCircle.style.opacity = '0';
        });
        
        // Show cursor when entering the window
        document.addEventListener('mouseenter', function() {
            cursorCircle.style.opacity = '1';
        });
    }
}); 