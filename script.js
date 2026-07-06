document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // INTRO ANIMATION LOGIC
    // =========================================
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        // Check if intro has already been played in this session
        if (sessionStorage.getItem('introPlayed') === 'true') {
            introOverlay.style.display = 'none';
        } else {
            // Function to hide intro and save to session
            const hideIntro = () => {
                introOverlay.classList.add('intro-hidden');
                sessionStorage.setItem('introPlayed', 'true');
                // Remove from DOM after transition
                setTimeout(() => {
                    introOverlay.style.display = 'none';
                }, 1500); // matches CSS transition duration
            };

            // Set timeout for automatic removal after 6.5s
            const introTimeout = setTimeout(hideIntro, 6500);

            // Allow skipping via click or keypress
            const skipIntro = (e) => {
                // If it's a keypress, check for common skip keys (Space, Enter, Escape)
                if (e.type === 'keydown' && !['Space', 'Enter', 'Escape'].includes(e.code)) {
                    return;
                }
                clearTimeout(introTimeout);
                hideIntro();
                document.removeEventListener('click', skipIntro);
                document.removeEventListener('keydown', skipIntro);
            };

            document.addEventListener('click', skipIntro);
            document.addEventListener('keydown', skipIntro);
        }
    }


    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: Stop observing once revealed
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Typing Animation for About Section
    const phrases = [
        "Cloud & DevOps Enthusiast",
        "Passionate about learning new technologies"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const aboutTypingElement = document.getElementById('about-typing-text');

    function typeAbout() {
        if (!aboutTypingElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            aboutTypingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            aboutTypingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeAbout, typeSpeed);
    }

    // Start the typing animation
    typeAbout();

    // Typing Animation for Hero Section
    const heroPhrases = [
        "Cloud & DevOps Enthusiast",
        "Passionate Learner",
        "Tech Explorer"
    ];
    let heroPhraseIndex = 0;
    let heroCharIndex = 0;
    let heroIsDeleting = false;
    const heroTypingElement = document.getElementById('hero-typing');

    function typeHero() {
        if (!heroTypingElement) return;

        const currentPhrase = heroPhrases[heroPhraseIndex];

        if (heroIsDeleting) {
            heroTypingElement.textContent = currentPhrase.substring(0, heroCharIndex - 1);
            heroCharIndex--;
        } else {
            heroTypingElement.textContent = currentPhrase.substring(0, heroCharIndex + 1);
            heroCharIndex++;
        }

        let typeSpeed = heroIsDeleting ? 30 : 60;

        if (!heroIsDeleting && heroCharIndex === currentPhrase.length) {
            heroIsDeleting = true;
            typeSpeed = 1500; // Pause at end of phrase
        } else if (heroIsDeleting && heroCharIndex === 0) {
            heroIsDeleting = false;
            heroPhraseIndex = (heroPhraseIndex + 1) % heroPhrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeHero, typeSpeed);
    }

    // Start the hero typing animation
    typeHero();

    // =========================================
    // YOUTUBE & VS CODE TWO-PANEL LOGIC
    // =========================================
    const youtubePanel = document.getElementById('youtube-panel');
    const vscodePanel = document.getElementById('vscode-panel');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const backToYoutubeBtn = document.getElementById('back-to-youtube');

    const fileItems = document.querySelectorAll('.file-item');
    const editorTabName = document.getElementById('editor-tab-name');
    const codeContent = document.getElementById('code-content');
    const lineNumbers = document.getElementById('line-numbers');
    const statusLang = document.getElementById('status-lang');
    const statusLines = document.getElementById('status-lines');

    // Code snippets containing ONLY existing skills
    const fileData = {
        'ai_ml': {
            filename: 'ai_ml.py',
            language: 'Python',
            badges: [
                'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
                'https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white',
                'https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white',
                'https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white',
                'https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white',
                'https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white',
                'https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white',
                'https://img.shields.io/badge/CrewAI%20|%20Ollama-4B0082?style=for-the-badge',
                'https://img.shields.io/badge/ChromaDB-311B92?style=for-the-badge'
            ],
            content: `ai_ml_stack = {
    "core": ["Python", "Numpy", "Pandas"],
    "ml_frameworks": ["Scikit-Learn", "TensorFlow", "PyTorch"],
    "gen_ai_agents": ["LangChain", "CrewAI", "Ollama"],
    "vector_db": ["ChromaDB"]
}`
        },
        'languages': {
            filename: 'languages.json',
            language: 'JSON',
            badges: [
                'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
                'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',
                'https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white',
                'https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white',
                'https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white',
                'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'
            ],
            content: `{
  "languages": [
    "Python", "Java", "Kotlin",
    "C", "C++", "JavaScript"
  ]
}`
        },
        'web_dev': {
            filename: 'web_dev.jsx',
            language: 'JavaScript React',
            badges: [
                'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
                'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
                'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
                'https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white'
            ],
            content: `const webStack = {
  frontend: ["HTML", "CSS", "React"],
  backendAPI: ["FastAPI"]
};`
        },
        'mobile_dev': {
            filename: 'mobile.kt',
            language: 'Kotlin',
            badges: [
                'https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white',
                'https://img.shields.io/badge/XML-FF6600?style=for-the-badge'
            ],
            content: `val mobileStack = mapOf(
    "platform" to "Android",
    "markup" to "XML"
)`
        },
        'backend': {
            filename: 'backend.js',
            language: 'JavaScript',
            badges: [
                'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white',
                'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge'
            ],
            content: `const backendStack = {
  runtime: "Node.js",
  framework: "Express.js"
};`
        },
        'databases_tools': {
            filename: 'tools.sh',
            language: 'Bash',
            badges: [
                'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white',
                'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
                'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white'
            ],
            content: `# Databases & Version Control
DB="MongoDB"
VCS="Git"
HOSTING="GitHub"`
        },
        'cloud_devops': {
            filename: 'devops.yml',
            language: 'YAML',
            badges: [
                'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white',
                'https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white',
                'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white',
                'https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white',
                'https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white',
                'https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white'
            ],
            content: `cloud_devops:
  cloud_providers: [AWS, Vercel]
  containers: [Docker, Kubernetes]
  ci_cd_pipelines: [Jenkins, GitHub Actions]`
        }
    };

    function syntaxHighlight(code, lang) {
        // Very basic syntax highlighting logic
        let highlighted = code
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');

        if (lang === 'JavaScript React' || lang === 'JavaScript') {
            highlighted = highlighted.replace(/\b(const|let|var|function|return)\b/g, '<span class="code-keyword">$1</span>');
            highlighted = highlighted.replace(/("[^"]*")/g, '<span class="code-string">$1</span>');
            highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)\s*:/g, '<span class="code-property">$1</span>:');
        } else if (lang === 'Python' || lang === 'Kotlin' || lang === 'Bash') {
            highlighted = highlighted.replace(/\b(val|var|mapOf|to)\b/g, '<span class="code-keyword">$1</span>');
            highlighted = highlighted.replace(/("[^"]*")/g, '<span class="code-string">$1</span>');
        } else if (lang === 'YAML') {
            highlighted = highlighted.replace(/([^:]+):/g, '<span class="code-property">$1</span>:');
        } else if (lang === 'JSON') {
            highlighted = highlighted.replace(/("[^"]*")\s*:/g, '<span class="code-property">$1</span>:');
            highlighted = highlighted.replace(/:\s*("[^"]*")/g, ': <span class="code-string">$1</span>');
        }

        return highlighted;
    }

    function openFileInVSCode(category) {
        const data = fileData[category];
        if (!data) return;

        // Update VS Code Editor UI
        editorTabName.textContent = data.filename;
        statusLang.textContent = data.language;

        const rawCode = data.content;
        const highlightedCode = syntaxHighlight(rawCode, data.language);
        codeContent.innerHTML = highlightedCode;

        // Update badges preview container
        const badgesListEl = document.getElementById('vscode-badges-list');
        if (badgesListEl && data.badges) {
            badgesListEl.innerHTML = data.badges.map(url => `<img src="${url}" alt="Badge">`).join('');
        }

        // Generate line numbers
        const lines = rawCode.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
        statusLines.textContent = `Ln ${lines}, Col 1`;

        // Update File Tree UI
        fileItems.forEach(item => {
            if (item.getAttribute('data-file') === category) {
                item.classList.add('open', 'active');
            } else {
                item.classList.remove('open', 'active');
            }
        });

        // Switch Panels
        youtubePanel.classList.remove('active-panel');
        vscodePanel.classList.add('active-panel');

        // Remove "Now Playing" from all, add to current
        playlistItems.forEach(item => {
            const indexEl = item.querySelector('.item-index');
            if (indexEl.innerHTML.includes('svg')) {
                // Restore original index number (1-6)
                indexEl.innerHTML = Array.from(playlistItems).indexOf(item) + 1;
            }
        });

        const activePlaylistItem = document.querySelector(`.playlist-item[data-category="${category}"]`);
        if (activePlaylistItem) {
            activePlaylistItem.querySelector('.item-index').innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        }
    }

    // Event Listeners for Playlist Items
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            openFileInVSCode(category);
        });
    });

    // Event Listeners for VS Code File Tree
    fileItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = item.getAttribute('data-file');
            openFileInVSCode(category);
        });
    });

    // Back button
    if (backToYoutubeBtn) {
        backToYoutubeBtn.addEventListener('click', () => {
            vscodePanel.classList.remove('active-panel');
            youtubePanel.classList.add('active-panel');
        });
    }

    // =========================================
    // SPOTIFY-STYLE PLAYLIST CAROUSEL
    // =========================================
    const cards = document.querySelectorAll('.project-album-card');
    const prevBtn = document.getElementById('playlist-prev');
    const nextBtn = document.getElementById('playlist-next');
    const scrubberProgress = document.getElementById('scrubber-progress');
    const scrubberCurrent = document.getElementById('scrubber-current');

    let currentIndex = 0;
    let autoPlayInterval;
    let progressInterval;
    let progress = 0;
    const duration = 5000; // 5 seconds

    const updateCards = () => {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            card.style.opacity = '';
            card.style.transform = '';
            card.style.pointerEvents = '';

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else {
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            }
        });
    };

    const nextCard = () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
        resetProgress();
    };

    const prevCard = () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
        resetProgress();
    };

    const startAutoPlay = () => {
        progress = 0;
        clearInterval(autoPlayInterval);
        clearInterval(progressInterval);

        progressInterval = setInterval(() => {
            progress += (100 / (duration / 100)); // Update every 100ms
            if (progress > 100) progress = 100;
            if (scrubberProgress) scrubberProgress.style.width = `${progress}%`;

            // Calculate fake time (0:00 to 0:05)
            const seconds = Math.floor((progress / 100) * 5);
            if (scrubberCurrent) scrubberCurrent.textContent = `0:0${seconds}`;

        }, 100);

        autoPlayInterval = setInterval(nextCard, duration);
    };

    const resetProgress = () => {
        progress = 0;
        if (scrubberProgress) scrubberProgress.style.width = '0%';
        if (scrubberCurrent) scrubberCurrent.textContent = '0:00';
        startAutoPlay();
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
        clearInterval(progressInterval);
    };

    if (cards.length > 0) {
        // Init
        updateCards();
        startAutoPlay();

        // Listeners
        nextBtn?.addEventListener('click', nextCard);
        prevBtn?.addEventListener('click', prevCard);

        cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.album-actions')) return;
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const modalIds = ['roverlog-modal', 'nebulaops-modal', 'trendcipher-modal', 'atlas-modal', 'reviewllama-modal'];
                    const targetModal = document.getElementById(modalIds[index]);
                    targetModal?.classList.remove('hidden');
                    stopAutoPlay();
                    return;
                }
                if (card.classList.contains('prev') || card.classList.contains('next')) {
                    currentIndex = index;
                    updateCards();
                    resetProgress();
                } else if (card.classList.contains('active')) {
                    e.preventDefault();
                    const modalIds = ['roverlog-modal', 'nebulaops-modal', 'trendcipher-modal', 'atlas-modal', 'reviewllama-modal'];
                    const targetModal = document.getElementById(modalIds[index]);
                    targetModal?.classList.remove('hidden');
                    stopAutoPlay();
                }
            });

            // Pause on hover
            card.addEventListener('mouseenter', stopAutoPlay);
            card.addEventListener('mouseleave', startAutoPlay);
        });

        // Overlay & Boot Sequence Logic
        const overlay = document.getElementById('project-overlay');
        const closeBtn = document.getElementById('overlay-close');

        const bootSequence = document.getElementById('terminal-boot-sequence');
        const mainContent = document.getElementById('terminal-main-content');
        const line1 = document.querySelector('.type-line1');
        const line2 = document.querySelector('.type-line2');
        const line3 = document.querySelector('.type-line3');
        const line4 = document.querySelector('.type-line4');

        const originalText = "$ ssh kanupriya@nebulaops --showcase";

        const startBootSequence = () => {
            // Reset state
            if (line1) line1.textContent = '';
            if (line2) line2.classList.add('hidden');
            if (line3) line3.classList.add('hidden');
            if (line4) line4.classList.add('hidden');
            if (mainContent) mainContent.classList.add('hidden');
            if (bootSequence) bootSequence.classList.remove('hidden');

            // Typing effect
            let i = 0;
            const typeWriter = setInterval(() => {
                if (line1 && i < originalText.length) {
                    line1.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);

                    // Show subsequent lines with slight delays
                    setTimeout(() => { if (line2) line2.classList.remove('hidden'); }, 400);
                    setTimeout(() => { if (line3) line3.classList.remove('hidden'); }, 800);
                    setTimeout(() => { if (line4) line4.classList.remove('hidden'); }, 1100);

                    // Show main content
                    setTimeout(() => {
                        if (bootSequence) bootSequence.classList.add('hidden');
                        if (mainContent) mainContent.classList.remove('hidden');
                    }, 1500);
                }
            }, 30); // typing speed
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('visible');
                startAutoPlay();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('visible');
                    startAutoPlay();
                }
            });
        }

        // Project Detail Modals Close Logic
        const detailModals = document.querySelectorAll('.project-detail-modal');
        detailModals.forEach(modal => {
            const modalCloseBtn = modal.querySelector('.modal-close');
            if (modalCloseBtn) {
                modalCloseBtn.addEventListener('click', () => {
                    modal.classList.add('hidden');
                    startAutoPlay();
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    startAutoPlay();
                }
            });
        });

        // Lightbox Logic
        const stripImages = document.querySelectorAll('.strip-img');
        const lightbox = document.getElementById('screenshot-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        stripImages.forEach(img => {
            img.addEventListener('click', () => {
                if (lightboxImg && lightbox) {
                    lightboxImg.src = img.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                if (lightbox) lightbox.classList.add('hidden');
            });
        }

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.add('hidden');
                }
            });

            // Escape key to close lightbox or modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (lightbox && !lightbox.classList.contains('hidden')) {
                        lightbox.classList.add('hidden');
                    } else if (overlay && overlay.classList.contains('visible')) {
                        overlay.classList.remove('visible');
                        startAutoPlay();
                    } else {
                        const allModals = document.querySelectorAll('.project-detail-modal');
                        allModals.forEach(m => {
                            if (!m.classList.contains('hidden')) {
                                m.classList.add('hidden');
                                startAutoPlay();
                            }
                        });
                    }
                }
            });
        }
    }

    // =========================================
    // CONTACT FORM & EMAILJS INTEGRATION
    // =========================================
    const EMAILJS_SERVICE_ID = "service_ruyx08p";
    const EMAILJS_TEMPLATE_ID = "template_4t2e23m";
    const EMAILJS_PUBLIC_KEY = "BxXSg3XGQybzZgdrg";

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm = document.querySelector('.terminal-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation: required fields
            if (!name || !email || !message) {
                showFeedback('Error: All fields (name, email, message) are required to establish contact.', 'error');
                return;
            }
            
            // Validation: email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Error: Invalid email address syntax.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.cmd-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'sending_message...<span class="blinking-cursor"></span>';
            submitBtn.disabled = true;

            // Check if user replaced placeholders
            if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID_HERE" || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE") {
                setTimeout(() => {
                    showFeedback('Success: Form validated! (Note: Please add your EmailJS API keys in script.js to receive emails directly to your inbox).', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
                return;
            }

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    showFeedback('Success: Message transmitted to Kanupriya successfully!', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    showFeedback('Error: Transmission failed. Please try again later or email directly.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    function showFeedback(text, type) {
        if (!formFeedback) return;
        formFeedback.style.display = 'block';
        formFeedback.className = `cmd-line ${type === 'error' ? 'text-error' : 'text-green'}`;
        formFeedback.innerHTML = `<span class="prompt">&gt;</span> <span>${text}</span>`;
    }

});

