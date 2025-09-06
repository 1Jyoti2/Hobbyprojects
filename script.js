// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Sample responses for demo purposes
    const sampleResponses = [
        "I'd be happy to tell you more about Jyotika's projects!",
        "Jyotika has experience with HTML, CSS, JavaScript, and more.",
        "You can check out Jyotika's latest work in the Projects section.",
        "Feel free to reach out through the contact form for collaboration!"
    ];

    // Function to add a new message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">Just now</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get AI response
    async function getAIResponse(message) {
        // TODO: Integrate with actual AI API (e.g., OpenAI)
        // Example API integration:
        /*
        try {
            const response = await fetch('YOUR_AI_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error:', error);
            return 'Sorry, I encountered an error. Please try again later.';
        }
        */

        // For demo, return random response
        return sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    }

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // Add user message
            addMessage(message, true);
            messageInput.value = '';

            // Simulate AI thinking with delay
            setTimeout(async () => {
                const response = await getAIResponse(message);
                addMessage(response);
            }, 1000);
        }
    });

    // Handle minimize button
    const minimizeBtn = document.querySelector('.minimize-btn');
    minimizeBtn.addEventListener('click', () => {
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.classList.toggle('minimized');
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            // TODO: Integrate with email service (e.g., Resend API)
            /* Example integration:
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    from: 'your-website@example.com',
                    to: 'your-email@example.com',
                    subject: data.subject,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Message:</strong> ${data.message}</p>
                    `
                })
            });

            if (!response.ok) throw new Error('Failed to send message');
            */

            // For demo purposes, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            contactForm.reset();
            successMessage.style.display = 'flex';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        }
    });
});

// Add mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create and append nav toggle button if it doesn't exist
    if (!document.querySelector('.nav-toggle')) {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
            </svg>
        `;
        document.body.appendChild(navToggle);
    }

    const nav = document.querySelector('.vertical-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mainContent = document.querySelector('.main-content');

    // Toggle navigation
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close navigation when clicking outside
    mainContent.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Handle window resize
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }, 250);
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile nav after clicking
            const nav = document.querySelector('.vertical-nav');
            const navToggle = document.querySelector('.nav-toggle');
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Browser Compatibility Check
document.addEventListener('DOMContentLoaded', () => {
    const checkBrowserCompatibility = () => {
        const features = {
            grid: typeof document.createElement('div').style.grid === 'string',
            flexbox: typeof document.createElement('div').style.flexbox === 'string',
            customProperties: CSS.supports('(--foo: red)'),
            intersectionObserver: 'IntersectionObserver' in window,
        };

        const incompatibleFeatures = Object.entries(features)
            .filter(([, supported]) => !supported)
            .map(([feature]) => feature);

        if (incompatibleFeatures.length > 0) {
            console.warn('Browser compatibility issues detected:', incompatibleFeatures);
        }
    };

    checkBrowserCompatibility();
});

// Error tracking and monitoring
window.addEventListener('error', (event) => {
    console.error('Global error:', {
        message: event.message,
        source: event.filename,
        lineNo: event.lineno,
        colNo: event.colno,
        error: event.error
    });
    
    // You can send this to your error tracking service
    // sendToErrorTracking(event);
});

// Performance monitoring
const performanceMonitor = {
    init() {
        if ('performance' in window) {
            // Navigation timing
            window.addEventListener('load', () => {
                const timing = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Metrics:', {
                    'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
                    'Server Connection': timing.connectEnd - timing.connectStart,
                    'Server Response': timing.responseEnd - timing.responseStart,
                    'Page Load': timing.loadEventEnd - timing.navigationStart
                });
            });

            // Resource timing
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.initiatorType === 'img' || entry.initiatorType === 'video') {
                        console.log(`Resource Load Time (${entry.name}):`, entry.duration);
                    }
                });
            });

            observer.observe({ entryTypes: ['resource'] });
        }
    }
};

performanceMonitor.init();

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}

// Download Portfolio Functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', async () => {
        try {
            // Show loading state
            downloadBtn.innerHTML = '<span class="btn-icon">⏳</span> Preparing...';
            downloadBtn.disabled = true;

            // Create PDF content with styling
            const element = document.createElement('div');
            element.innerHTML = `
                <style>
                    .pdf-container {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        color: #333;
                    }
                    .pdf-header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #4a90e2;
                    }
                    .pdf-header h1 {
                        color: #4a90e2;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .section {
                        margin: 20px 0;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 5px;
                    }
                    .section h2 {
                        color: #2ecc71;
                        font-size: 20px;
                        margin-bottom: 15px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 5px;
                    }
                    .contact-info {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .contact-item {
                        background: #fff;
                        padding: 8px 15px;
                        border-radius: 3px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    .skill-bar {
                        background: #eee;
                        height: 20px;
                        border-radius: 10px;
                        margin: 5px 0;
                    }
                    .skill-progress {
                        background: #4a90e2;
                        height: 100%;
                        border-radius: 10px;
                    }
                    .project-card {
                        background: #fff;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .tech-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 5px;
                        margin-top: 10px;
                    }
                    .tech-tag {
                        background: #e9ecef;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 12px;
                    }
                </style>
                <div class="pdf-container">
                    <div class="pdf-header">
                        <h1>Jyotika M Kadur</h1>
                        <p>Software Engineer</p>
                    </div>

                    <div class="section">
                        <h2>Contact Information</h2>
                        <div class="contact-info">
                            <div class="contact-item">📧 jyotika@example.com</div>
                            <div class="contact-item">📱 +1 (234) 567-8900</div>
                            <div class="contact-item">📍 Bangalore, India</div>
                        </div>
                    </div>

                    <div class="section">
                        <h2>Education</h2>
                        <div class="project-card">
                            <h3>Bachelor's in Computer Science</h3>
                            <p>2023 - Present</p>
                            <p>Pursuing degree with focus on software development and web technologies</p>
                        </div>
                    </div>

                    <div class="section">
                        <h2>Skills</h2>
                        <div class="skills-container">
                            <div class="skill-item">
                                <p>JavaScript</p>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 80%"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <p>Python</p>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 75%"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <p>Java</p>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 70%"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <p>HTML5/CSS3</p>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 85%"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <p>React</p>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <h2>Projects</h2>
                        <div class="project-card">
                            <h3>Database Management System</h3>
                            <p>A comprehensive DBMS project implementing core database concepts and SQL operations.</p>
                            <div class="tech-tags">
                                <span class="tech-tag">MySQL</span>
                                <span class="tech-tag">PHP</span>
                                <span class="tech-tag">HTML/CSS</span>
                            </div>
                        </div>
                        <div class="project-card">
                            <h3>Web Development Project</h3>
                            <p>A web application showcasing fundamental programming and design concepts.</p>
                            <div class="tech-tags">
                                <span class="tech-tag">JavaScript</span>
                                <span class="tech-tag">HTML5</span>
                                <span class="tech-tag">CSS3</span>
                            </div>
                        </div>
                        <div class="project-card">
                            <h3>Portfolio Website</h3>
                            <p>A personal portfolio website built with modern web technologies.</p>
                            <div class="tech-tags">
                                <span class="tech-tag">HTML5</span>
                                <span class="tech-tag">CSS3</span>
                                <span class="tech-tag">JavaScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // PDF generation options
            const opt = {
                margin: [0.5, 0.5],
                filename: 'jyotika-portfolio.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait'
                },
                pagebreak: { mode: 'avoid-all' }
            };

            // Generate PDF
            await html2pdf().set(opt).from(element).save();

            // Reset button state
            downloadBtn.innerHTML = '<span class="btn-icon">📥</span> Download CV';
            downloadBtn.disabled = false;

        } catch (error) {
            console.error('Download failed:', error);
            downloadBtn.innerHTML = '<span class="btn-icon">❌</span> Failed';
            setTimeout(() => {
                downloadBtn.innerHTML = '<span class="btn-icon">📥</span> Download CV';
                downloadBtn.disabled = false;
            }, 2000);
        }
    });
});

// Function to load html2pdf library
function loadHTML2PDF() {
    return new Promise((resolve, reject) => {
        if (window.html2pdf) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Profile Image Upload Functionality
document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Please upload an image smaller than 5MB');
                return;
            }

            const reader = new FileReader();
            
            reader.onload = (event) => {
                // Update the profile image
                profileImage.src = event.target.result;
                
                // Optional: Save to localStorage for persistence
                localStorage.setItem('profileImage', event.target.result);
                
                // Show success message
                const successToast = document.createElement('div');
                successToast.className = 'upload-toast';
                successToast.innerHTML = `
                    <span class="toast-icon">✅</span>
                    Profile picture updated successfully!
                `;
                document.body.appendChild(successToast);
                
                // Remove toast after 3 seconds
                setTimeout(() => {
                    successToast.remove();
                }, 3000);
            };

            reader.onerror = () => {
                alert('Error reading file');
            };

            reader.readAsDataURL(file);
        }
    });

    // Load saved image from localStorage if exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
});

// Add these styles for the success toast
const style = document.createElement('style');
style.textContent = `
    .upload-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--secondary-color);
        color: var(--bg-color);
        padding: 1rem;
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: var(--shadow-md);
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        z-index: 1000;
    }

    .toast-icon {
        font-size: 1.2rem;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
                        ? 'light' 
                        : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        document.documentElement.style.transition = 'all 0.3s ease';
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        
        if (theme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'inline';
        } else {
            lightIcon.style.display = 'inline';
            darkIcon.style.display = 'none';
        }
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}); 