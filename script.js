/* ============================================ */
/*            Smooth Scrolling & Navigation   */
/* ============================================ */


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});



/* ============================================ */
/* Navigation & Hamburger                       */
/* ============================================ */

// --- ADD THIS PART FOR THE HAMBURGER ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// --- UPDATED SMOOTH SCROLLING (Closes menu when link is clicked) ---
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Close menu on mobile when a link is clicked
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});



/* ============================================ */
/*            Dark Mode Auto Detection         */
/* ============================================ */

function setThemeBasedOnPreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// Set initial theme
setThemeBasedOnPreference();

// Listen for changes in color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

/* ============================================ */
/*            Typing Effect                    */
/* ============================================ */

const subtitleElement = document.getElementById('subtitle');
const subtitleText = 'Artificial Intelligence | Data Scientist | Data Analysis';
let index = 0;

function typeWriter() {
    if (index < subtitleText.length) {
        subtitleElement.innerHTML = subtitleText.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

subtitleElement.innerHTML = '';
typeWriter();

/* ============================================ */
/*            Portfolio Data                   */
/* ============================================ */

const portfolioData = {
    name: "Areen Mohammed Meraj Zaki",
    title: "Artificial Intelligence | Data Scientist | Data Analysis",
    phone: "+965 55857335",
    email: "areenmeraj2003@gmail.com",
    linkedin: "linkedin.com/in/areen-mohammed-meraj-17b696293",
    location: "Kuwait & Kuala Lumpur",
    education: [
        "PhD in Computing - Asia Pacific University (12/2025)",
        "MSc in Artificial Intelligence - Asia Pacific University (GPA: 3.77)",
        "Bachelor's in Computer Programming - Arab Open University (GPA: 3.35)"
    ],
    skills: {
        programming: ["Python", "SQL", "Visual Studio Code"],
        ml: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
        tools: ["Power BI", "Google Colab", "Gradio"],
        soft: ["Communication", "Problem Solving", "Teamwork", "Critical Thinking"]
    },
    projects: [
        {
            name: "Explainable AI for Skin Cancer Detection",
            description: "Deep learning framework with 86.73% accuracy, Grad-CAM explainability, Gradio GUI",
            tech: ["Deep Learning", "CNN", "MobileNetV2", "Grad-CAM"]
        },
        {
            name: "Customer Churn Prediction",
            description: "LSTM model achieving 88.88% accuracy on 10,000 banking records with class imbalance handling",
            tech: ["LSTM", "Deep Learning", "SMOTETomek"]
        },
        {
            name: "Business Intelligence - Samsung Mobile",
            description: "Interactive Power BI dashboards for sales analytics and KPI tracking",
            tech: ["Power BI", "Business Analytics"]
        },
        {
            name: "Cyberbullying & Spelling Detection",
            description: "NLP system with spelling correction and cyberbullying detection using TF-IDF",
            tech: ["NLP", "Text Classification", "Gradio"]
        },
        {
            name: "Brain Tumor Detection",
            description: "Medical imaging solution using image segmentation and ML models",
            tech: ["Computer Vision", "Image Processing"]
        },
        {
            name: "Automated Attire Classification",
            description: "CNN-based clothing classification for retail automation",
            tech: ["CNN", "Image Classification"]
        }
    ],
    certifications: ["Rocheston Certified Cybersecurity Engineer"],
    languages: ["English (Fluent)", "Arabic (Fluent)"]
};

/* ============================================ */
/*            Initialize Chatbot              */
/* ============================================ */

let qaData = [];

// Load QA data from JSON file
async function loadQAData() {
    try {
        // Try loading from the same directory as HTML
        let response = await fetch('portfolio-qa.json');
        
        // If that fails, try with ./ prefix
        if (!response.ok && response.status === 404) {
            response = await fetch('./portfolio-qa.json');
        }
        
        if (response.ok) {
            const data = await response.json();
            qaData = data.qa_pairs || [];
            console.log('QA data loaded successfully:', qaData.length, 'pairs');
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.warn('Could not load JSON, using fallback responses:', error.message);
        // Use fallback responses
        qaData = getFallbackQAData();
    }
    
    // Initialize chatbot after data is loaded or fallback is ready
    initializeChatbot();
}

// Fallback Q&A data if JSON file fails to load
function getFallbackQAData() {
    return [
        {
        keywords: ["hello", "hi", "hey", "greetings", "help", "start"],
        response: "Hey there! Welcome! I'm Areen's Portfolio Assistant. I'm here to chat about Areen's work in AI & Data Science, incredible projects, education journey, and more. What would you like to know?"
        },
        {
        keywords: ["who are you", "about", "introduce", "areen"],
        response: "I'm Areen Mohammed Meraj Zaki, an AI & Data Scientist and PhD candidate at Asia Pacific University. I'm passionate about building explainable AI solutions that make a real-world impact, especially in healthcare. I love taking complex data and turning it into intelligent, trustworthy systems!"
        },
        {
        keywords: ["skills", "expertise", "technical", "languages", "tools"],
        response: "Here's what I can do: Python, SQL, R programming; Deep Learning with TensorFlow & PyTorch; Data Analytics with Power BI & Tableau; Web Development with HTML, CSS, JavaScript; Cloud platforms like AWS & Google Colab; NLP & Computer Vision; And I'm fluent in both English and Arabic! I'm great at Problem Solving, Communication, and turning ideas into reality."
        },
        {
        keywords: ["projects", "portfolio", "work", "built"],
        response: "Highlights: Skin Cancer Detection (86.73% acc + Grad-CAM), Customer Churn Prediction (88.88% acc), Samsung Mobile Analytics (Power BI), NLP Cyberbullying Detection, and Brain Tumor Detection. Want to know more about a specific one?"
        },
        {
        keywords: ["thesis", "research", "phd", "xai", "explainable"],
        response: "Areen's PhD Thesis: 'Explainable AI for Binary Skin Cancer Detection'. It combines high accuracy (86.73%) with Grad-CAM visualization so doctors can see exactly why the AI made a diagnosis. He's currently preparing manuscripts for top journals like IEEE TMI and NeurIPS."
        },
        {
        keywords: ["education", "degree", "university", "gpa", "certifications"],
        response: "PhD in Computing (In Progress, APU); MSc in AI (GPA: 3.77, APU); Bachelor's in Computer Programming (GPA: 3.35, AOU). She's also a Certified Cybersecurity Engineer!"
        },
        {
        keywords: ["experience", "career", "history", "jobs"],
        response: "Areen is a Fresh Master's Graduate currently pursuing a PhD. She has extensive hands-on experience building/deploying ML/DL models, developing Healthcare AI, and creating Business Intelligence solutions. She is focused on moving AI from research to real-world impact."
        },
        {
        keywords: ["nlp", "text", "language", "cyberbullying"],
        response: "NLP expertise: Built systems for Cyberbullying Detection (TF-IDF), Smart Spelling Correction (Bigram models), and Sentiment Analysis. She combines traditional linguistic logic with modern Deep Learning."
        },
        {
        keywords: ["business", "analytics", "power bi", "dashboard"],
        response: "Business Intelligence: Created interactive Power BI Dashboards for Samsung Mobile Analytics, featuring KPI tracking and sales trend visualizations to drive data-driven decisions."
        },
        {
        keywords: ["deployment", "gradio", "ui", "streamlit"],
        response: "Areen specializes in Gradio and Streamlit to turn complex AI models into user-friendly web interfaces, making powerful tech accessible to non-technical users."
        },
        {
        keywords: ["location", "kuwait", "kuala lumpur", "where"],
        response: "Areen is based in Kuwait and Kuala Lumpur. She is comfortable working across time zones and loves global collaborations! 🇰🇼🇲🇾"
        },
        {
        keywords: ["contact", "email", "phone", "linkedin", "reach"],
        response: "Let's connect! Email: areenmeraj2003@gmail.com, Phone: +965 55857335, or find her on LinkedIn. She's always open to collaboration and innovative AI projects!"
        },
        {
        keywords: ["arabic", "english", "speak", "bilingual"],
        response: "Areen is fluent in both English and Arabic, allowing her to communicate complex technical concepts to global stakeholders seamlessly."
        },
        {
        keywords: ["certifications", "certificates", "credentials"],
        response: "Certified Cybersecurity Engineer (Rocheston)."
        }
    ]
    };

// Initialize chatbot event listeners and display
function initializeChatbot() {
    // Wait for DOM elements to be available
    if (!document.getElementById('chatbot-widget')) {
        console.warn('Chatbot widget not found in DOM. Retrying...');
        setTimeout(initializeChatbot, 500);
        return;
    }

    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const inputField = document.getElementById('chatbot-input');
    const chatWindow = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (!toggleBtn || !closeBtn || !sendBtn || !inputField || !chatWindow || !messagesContainer) {
        console.error('Chatbot elements not found:', {
            toggleBtn: !!toggleBtn,
            closeBtn: !!closeBtn,
            sendBtn: !!sendBtn,
            inputField: !!inputField,
            chatWindow: !!chatWindow,
            messagesContainer: !!messagesContainer
        });
        return;
    }

    console.log('Chatbot initialized successfully');

    // Handle mobile keyboard appearance
    let initialViewportHeight = window.innerHeight;
    
    const handleKeyboardToggle = () => {
        const currentHeight = window.innerHeight;
        const heightDifference = initialViewportHeight - currentHeight;
        
        // If keyboard appeared (viewport height decreased significantly)
        if (heightDifference > 100) {
            // Keyboard is open
            if (window.innerWidth <= 768 && chatWindow.classList.contains('open')) {
                // Ensure chatbot stays visible and doesn't get pushed up
                chatWindow.style.position = 'fixed';
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        } else {
            // Keyboard is closed
            initialViewportHeight = currentHeight;
        }
    };

    // Listen for viewport changes
    window.addEventListener('resize', handleKeyboardToggle);

    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        
        if (chatWindow.classList.contains('open')) {
            initialViewportHeight = window.innerHeight;
            setTimeout(() => {
                inputField.focus();
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Send button
    sendBtn.addEventListener('click', sendChatMessage);

    // Enter key to send
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Auto-scroll to bottom when new messages arrive
    inputField.addEventListener('focus', () => {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    });

    // Display initial welcome message
    displayBotMessage("Hi! I'm Areen's Portfolio Assistant. Ask me about skills, projects, education, or how to get in touch!");
}

function sendChatMessage() {
    const inputField = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    // Display user message
    displayUserMessage(userMessage);
    inputField.value = '';

    // Generate and display bot response with slight delay
    setTimeout(() => {
        const botResponse = generateBotResponse(userMessage);
        displayBotMessage(botResponse);
    }, 500);
}

function displayUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    messageEl.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayBotMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message bot-message';
    messageEl.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const userInput = userMessage.toLowerCase().trim();

    // Find matching Q&A pair
    for (const qa of qaData) {
        for (const keyword of qa.keywords) {
            if (userInput.includes(keyword)) {
                return qa.response;
            }
        }
    }

    // Default responses if no match found
    const defaultResponses = [
        "That's a great question! Feel free to ask me about my projects, skills, education, or how to contact me.",
        "I'm not sure about that specifically, but I'd love to tell you about my AI/ML expertise or portfolio!",
        "Interesting! Try asking about my skills, projects, thesis, or background. What interests you most?",
        "I'd love to help! Ask me about my technical expertise, projects, or professional background!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Load QA data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, loading chatbot...');
    loadQAData();
});

/* ============================================ */
/*            Utility Functions                */
/* ============================================ */

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ============================================ */

/*            Page Animations                  */
/* ============================================ */

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

/* ============================================ */
/*            Active Navigation Link           */
/* ============================================ */

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ============================================ */
/*            Ready Message                    */
/* ============================================ */

console.log('Welcome to Areen Mohammed Meraj Zaki\'s Portfolio!');
console.log('Artificial Intelligence | Data Scientist | Data Analysis');
console.log('Ask the chatbot in the bottom right for more information!');