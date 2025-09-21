// MHFA Copilot HK - Main Application Logic
let currentLang = 'en';
let currentStep = 'start';
let resources = [];

// Internationalization
const i18n = {
    en: {
        title: 'MHFA Copilot HK',
        chat_input: 'Describe the situation or paste a message…',
        crisis_banner: 'If there\'s immediate danger, call 999 now.',
        disclaimer: 'This app provides Mental Health First Aid guidance and resources. It is not medical advice.',
        hotlines: 'Hotlines',
        next_steps: 'Next steps',
        screeners: 'Self-check',
        resources: 'Resources',
        about: 'About & Safety',
        language: 'Language',
        start: 'How to start',
        listen: 'Listen',
        check_safety: 'Check safety',
        encourage_help: 'Encourage help',
        summarize: 'Summarize & plan',
        generate_btn: 'Generate Suggestion',
        response_placeholder: 'Your ALGEE-based suggestions will appear here...',
        hotlines_title: 'Emergency Hotlines',
        screener_disclaimer: 'These are screening tools only, not diagnostic tests. If you\'re in immediate danger, call 999.',
        phq2_title: 'PHQ-2 Depression Screening',
        gad2_title: 'GAD-2 Anxiety Screening',
        calculate: 'Calculate Score',
        about_title: 'About & Safety',
        about_disclaimer: 'This app provides Mental Health First Aid guidance and resources. It is not medical advice or therapy. In an emergency, call 999.',
        privacy_title: 'Privacy & Data',
        privacy_text: 'This app runs entirely in your browser. No personal data is collected or transmitted. Only your language preference is stored locally.',
        clear_data: 'Clear Local Data',
        phq2_q1: 'Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
        phq2_q2: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
        gad2_q1: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        gad2_q2: 'Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?',
        score_options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        phq2_result_low: 'Score: {score}/6. This suggests minimal depression symptoms. Continue self-care practices.',
        phq2_result_high: 'Score: {score}/6. Consider speaking with a healthcare provider or counselor for further assessment.',
        gad2_result_low: 'Score: {score}/6. This suggests minimal anxiety symptoms. Continue self-care practices.',
        gad2_result_high: 'Score: {score}/6. Consider speaking with a healthcare provider or counselor for further assessment.'
    },
    zh: {
        title: '心理急救助手（香港）',
        chat_input: '描述情況或貼上對話內容…',
        crisis_banner: '如有迫切危險，請即致電 999。',
        disclaimer: '本程式提供精神健康急救指引及資源，並非醫療意見。',
        hotlines: '熱線',
        next_steps: '下一步',
        screeners: '自我檢視',
        resources: '資源',
        about: '關於與安全',
        language: '語言',
        start: '如何開始',
        listen: '聆聽',
        check_safety: '安全評估',
        encourage_help: '鼓勵求助',
        summarize: '總結與計劃',
        generate_btn: '產生建議',
        response_placeholder: '基於ALGEE的建議將在此顯示...',
        hotlines_title: '緊急熱線',
        screener_disclaimer: '這些只是篩查工具，並非診斷測試。如有迫切危險，請致電999。',
        phq2_title: 'PHQ-2 抑鬱症篩查',
        gad2_title: 'GAD-2 焦慮症篩查',
        calculate: '計算分數',
        about_title: '關於與安全',
        about_disclaimer: '本程式提供精神健康急救指引及資源，並非醫療意見或治療。如有緊急情況，請致電999。',
        privacy_title: '私隱與資料',
        privacy_text: '本程式完全在您的瀏覽器中運行。不會收集或傳輸個人資料。只會在本地儲存您的語言偏好。',
        clear_data: '清除本地資料',
        phq2_q1: '在過去2週內，您有多經常被「對事物缺乏興趣或樂趣」所困擾？',
        phq2_q2: '在過去2週內，您有多經常被「感到沮喪、抑鬱或絕望」所困擾？',
        gad2_q1: '在過去2週內，您有多經常被「感到緊張、焦慮或煩躁」所困擾？',
        gad2_q2: '在過去2週內，您有多經常被「無法停止或控制憂慮」所困擾？',
        score_options: ['完全沒有', '幾天', '超過一半的日子', '幾乎每天'],
        phq2_result_low: '分數：{score}/6。這表示抑鬱症狀輕微。請繼續自我照顧。',
        phq2_result_high: '分數：{score}/6。建議與醫護人員或輔導員進一步評估。',
        gad2_result_low: '分數：{score}/6。這表示焦慮症狀輕微。請繼續自我照顧。',
        gad2_result_high: '分數：{score}/6。建議與醫護人員或輔導員進一步評估。'
    }
};

// ALGEE Response Templates
const algeeTemplates = {
    en: {
        start: [
            "I've noticed you seem to be going through a lot. If you're willing, I'm here to listen.",
            "It sounds like things have been difficult for you. Would you like to talk about what's happening?",
            "I can see this is affecting you. I'm here if you'd like to share what's on your mind."
        ],
        listen: [
            "It sounds like you're under a lot of pressure. How are you feeling right now?",
            "That must be really challenging for you. Can you tell me more about how this is affecting you?",
            "I hear that you're struggling. What's been the hardest part for you?"
        ],
        safety: [
            "I'm concerned about you. Are you having thoughts of hurting yourself?",
            "Have you been thinking about ending your life or hurting yourself?",
            "Are you safe right now? Do you have thoughts of harming yourself or others?"
        ],
        help: [
            "If you're open to it, we can look at support options like hotlines or a GP.",
            "There are people who can help. Would you consider speaking to a counselor or calling a support line?",
            "Professional support can make a real difference. Are you willing to explore some options together?"
        ],
        summarize: [
            "Let's think about next steps. What feels most manageable for you right now?",
            "You've shared a lot. What would be most helpful as a first step?",
            "Based on what you've told me, here are some things we could consider..."
        ]
    },
    zh: {
        start: [
            "見你最近好似好辛苦，如果你願意，我可以靜靜咁聽你講。",
            "聽起上嚟你遇到好多困難，想唔想講下發生咩事？",
            "我見到呢啲嘢影響緊你，如果你想分享，我喺度聽。"
        ],
        listen: [
            "聽起上嚟，你承受緊好大壓力，你而家感覺點？",
            "呢啲對你嚟講一定好有挑戰性，可唔可以講多啲點樣影響你？",
            "我聽到你好辛苦，邊樣嘢對你嚟講最難應付？"
        ],
        safety: [
            "我好擔心你，你有冇諗過傷害自己？",
            "你有冇諗過結束生命或者傷害自己？",
            "你而家安全嗎？有冇諗過傷害自己或者其他人？"
        ],
        help: [
            "如果你同意，我可以一齊搵返合適嘅支援，例如熱線或者家庭醫生。",
            "有人可以幫到你，你會唔會考慮同輔導員傾下或者打支援熱線？",
            "專業支援真係可以幫到手，你願唔願意一齊睇下有咩選擇？"
        ],
        summarize: [
            "諗下下一步點做，你覺得而家咩最容易處理？",
            "你分享咗好多，咩嘢會係最有用嘅第一步？",
            "根據你講嘅嘢，我哋可以考慮呢啲..."
        ]
    }
};

// Crisis keywords for detection
const crisisKeywords = {
    en: ['suicide', 'kill myself', 'end it all', 'not worth living', 'better off dead', 'hurt myself', 'cut myself', 'overdose', 'jump', 'hang myself'],
    zh: ['自殺', '死', '了結', '活不下去', '不如死', '傷害自己', '割腕', '服毒', '跳樓', '上吊', '尋死', '輕生']
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadResources();
    setupScreeners();
});

function initializeApp() {
    // Load saved language preference
    const savedLang = localStorage.getItem('mhfa-lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        // Auto-detect language
        const browserLang = navigator.language || navigator.userLanguage;
        currentLang = browserLang.includes('zh') ? 'zh' : 'en';
    }
    
    updateLanguage();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('mhfa-lang', currentLang);
    updateLanguage();
}

function updateLanguage() {
    const texts = i18n[currentLang];
    
    // Update UI elements
    document.getElementById('app-title').textContent = texts.title;
    document.getElementById('lang-btn').textContent = currentLang === 'en' ? 'English' : '中文';
    document.getElementById('crisis-text').textContent = texts.crisis_banner;
    document.getElementById('chat-input').placeholder = texts.chat_input;
    document.getElementById('generate-btn').textContent = texts.generate_btn;
    document.getElementById('response-placeholder').textContent = texts.response_placeholder;
    
    // Update tabs
    document.getElementById('tab-chat').textContent = 'Chat';
    document.getElementById('tab-resources').textContent = texts.resources;
    document.getElementById('tab-screeners').textContent = texts.screeners;
    document.getElementById('tab-about').textContent = texts.about;
    
    // Update chips
    document.getElementById('chip-start').textContent = texts.start;
    document.getElementById('chip-listen').textContent = texts.listen;
    document.getElementById('chip-safety').textContent = texts.check_safety;
    document.getElementById('chip-help').textContent = texts.encourage_help;
    document.getElementById('chip-summarize').textContent = texts.summarize;
    
    // Update other elements
    document.getElementById('hotlines-title').textContent = texts.hotlines_title;
    document.getElementById('screener-disclaimer').textContent = texts.screener_disclaimer;
    document.getElementById('phq2-title').textContent = texts.phq2_title;
    document.getElementById('gad2-title').textContent = texts.gad2_title;
    document.getElementById('phq2-calculate').textContent = texts.calculate;
    document.getElementById('gad2-calculate').textContent = texts.calculate;
    document.getElementById('about-title').textContent = texts.about_title;
    document.getElementById('about-disclaimer').textContent = texts.about_disclaimer;
    document.getElementById('privacy-title').textContent = texts.privacy_title;
    document.getElementById('privacy-text').textContent = texts.privacy_text;
    document.getElementById('clear-data').textContent = texts.clear_data;
    
    setupScreeners();
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-content').classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
}

function setStep(step) {
    currentStep = step;
    document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
    document.getElementById('chip-' + step).classList.add('active');
}

function detectCrisis(text) {
    const keywords = crisisKeywords[currentLang];
    const lowerText = text.toLowerCase();
    
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

function showCrisisBanner() {
    document.getElementById('crisis-banner').classList.add('show');
    document.getElementById('emergency-hotlines').style.display = 'block';
}

function hideCrisisBanner() {
    document.getElementById('crisis-banner').classList.remove('show');
    document.getElementById('emergency-hotlines').style.display = 'none';
}

function generateResponse() {
    const input = document.getElementById('chat-input').value.trim();
    const responseArea = document.getElementById('response-area');
    
    if (!input) {
        responseArea.innerHTML = '<p>Please describe the situation first.</p>';
        return;
    }
    
    // Check for crisis keywords
    if (detectCrisis(input)) {
        showCrisisBanner();
    } else {
        hideCrisisBanner();
    }
    
    // Generate ALGEE-based response
    const templates = algeeTemplates[currentLang][currentStep];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // Add contextual suggestions based on input
    let contextualAdvice = '';
    if (currentStep === 'safety' && detectCrisis(input)) {
        contextualAdvice = currentLang === 'en' 
            ? '<br><br><strong>Safety Priority:</strong> If there\'s immediate danger, call 999 now. Stay with the person if safe to do so.'
            : '<br><br><strong>安全優先:</strong> 如有即時危險，請立即致電999。如安全的話，請陪伴該人。';
    }
    
    responseArea.innerHTML = `
        <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #2563eb;">
            <strong>${i18n[currentLang][currentStep]}:</strong><br>
            "${randomTemplate}"${contextualAdvice}
        </div>
    `;
}

async function loadResources() {
    // Load local resources data
    try {
        const response = await fetch('./resources.json');
        resources = await response.json();
        displayResources();
    } catch (error) {
        console.error('Failed to load resources:', error);
        // Fallback resources
        resources = [
            {
                id: 1,
                name: "Samaritans Hong Kong",
                when_to_use: "24/7 emotional support",
                phone: "2896-0000",
                website: "https://www.samaritans.org.hk",
                hours: "24/7",
                languages: "Both",
                audience: "any",
                cost: "Free",
                emergency_level: "high"
            },
            {
                id: 2,
                name: "Suicide Prevention Services",
                when_to_use: "Suicide crisis support",
                phone: "2382-0000",
                hours: "24/7",
                languages: "Both",
                audience: "any",
                cost: "Free",
                emergency_level: "high"
            }
        ];
        displayResources();
    }
}

function displayResources() {
    const container = document.getElementById('resources-list');
    const filteredResources = filterResourcesList();
    
    container.innerHTML = filteredResources.map(resource => `
        <div class="resource-item">
            <h3>${resource.name}</h3>
            <p>${resource.when_to_use}</p>
            <p><strong>Hours:</strong> ${resource.hours} | <strong>Languages:</strong> ${resource.languages}</p>
            <div class="resource-actions">
                <a href="tel:${resource.phone}" class="btn btn-primary">Call ${resource.phone}</a>
                ${resource.website ? `<a href="${resource.website}" target="_blank" class="btn btn-outline">Website</a>` : ''}
            </div>
        </div>
    `).join('');
}

function filterResourcesList() {
    const audienceFilter = document.getElementById('audience-filter')?.value || '';
    const languageFilter = document.getElementById('language-filter')?.value || '';
    const costFilter = document.getElementById('cost-filter')?.value || '';
    
    return resources.filter(resource => {
        const matchesAudience = !audienceFilter || resource.audience === audienceFilter || resource.audience === 'any';
        const matchesLanguage = !languageFilter || 
            resource.languages.toLowerCase().includes(languageFilter) || 
            resource.languages.toLowerCase() === 'both';
        const matchesCost = !costFilter || resource.cost.toLowerCase().includes(costFilter.toLowerCase());
        
        return matchesAudience && matchesLanguage && matchesCost;
    });
}

function filterResources() {
    displayResources();
}

function setupScreeners() {
    const texts = i18n[currentLang];
    
    // PHQ-2 Questions
    const phq2Container = document.getElementById('phq2-questions');
    phq2Container.innerHTML = `
        <div class="screener-question">
            <p><strong>1.</strong> ${texts.phq2_q1}</p>
            <div class="screener-options">
                ${texts.score_options.map((option, index) => `
                    <label class="screener-option">
                        <input type="radio" name="phq2-q1" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        <div class="screener-question">
            <p><strong>2.</strong> ${texts.phq2_q2}</p>
            <div class="screener-options">
                ${texts.score_options.map((option, index) => `
                    <label class="screener-option">
                        <input type="radio" name="phq2-q2" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    // GAD-2 Questions
    const gad2Container = document.getElementById('gad2-questions');
    gad2Container.innerHTML = `
        <div class="screener-question">
            <p><strong>1.</strong> ${texts.gad2_q1}</p>
            <div class="screener-options">
                ${texts.score_options.map((option, index) => `
                    <label class="screener-option">
                        <input type="radio" name="gad2-q1" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        <div class="screener-question">
            <p><strong>2.</strong> ${texts.gad2_q2}</p>
            <div class="screener-options">
                ${texts.score_options.map((option, index) => `
                    <label class="screener-option">
                        <input type="radio" name="gad2-q2" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
}

function calculatePHQ2() {
    const q1 = document.querySelector('input[name="phq2-q1"]:checked');
    const q2 = document.querySelector('input[name="phq2-q2"]:checked');
    
    if (!q1 || !q2) {
        alert('Please answer both questions.');
        return;
    }
    
    const score = parseInt(q1.value) + parseInt(q2.value);
    const texts = i18n[currentLang];
    const resultContainer = document.getElementById('phq2-result');
    
    const isHigh = score >= 3;
    const resultText = isHigh ? texts.phq2_result_high : texts.phq2_result_low;
    
    resultContainer.innerHTML = `
        <div class="screener-result">
            <p>${resultText.replace('{score}', score)}</p>
            ${isHigh ? '<p><strong>Consider seeking professional support.</strong></p>' : ''}
        </div>
    `;
}

function calculateGAD2() {
    const q1 = document.querySelector('input[name="gad2-q1"]:checked');
    const q2 = document.querySelector('input[name="gad2-q2"]:checked');
    
    if (!q1 || !q2) {
        alert('Please answer both questions.');
        return;
    }
    
    const score = parseInt(q1.value) + parseInt(q2.value);
    const texts = i18n[currentLang];
    const resultContainer = document.getElementById('gad2-result');
    
    const isHigh = score >= 3;
    const resultText = isHigh ? texts.gad2_result_high : texts.gad2_result_low;
    
    resultContainer.innerHTML = `
        <div class="screener-result">
            <p>${resultText.replace('{score}', score)}</p>
            ${isHigh ? '<p><strong>Consider seeking professional support.</strong></p>' : ''}
        </div>
    `;
}

function clearLocalData() {
    localStorage.clear();
    alert(currentLang === 'en' ? 'Local data cleared.' : '本地資料已清除。');
    location.reload();
}