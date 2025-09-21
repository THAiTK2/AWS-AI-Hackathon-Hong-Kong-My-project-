// MHFA Copilot HK - Main Application Logic
let currentLang = 'en';
let currentStep = 'start';
let resources = [];
let conversationHistory = [];
let userEmotionalState = 'neutral';

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

// Enhanced ALGEE Response Templates with Wisdom
const algeeTemplates = {
    en: {
        start: [
            "I can sense you're carrying something heavy right now. Sometimes just having someone witness our pain can bring relief. I'm here to listen without judgment.",
            "What you're experiencing matters, and so do you. Would you feel comfortable sharing what's been weighing on your heart lately?",
            "I notice you might be going through a difficult time. Remember, reaching out takes courage - you've already taken a brave step by being here."
        ],
        listen: [
            "Your feelings are completely valid. When we're overwhelmed, it can feel like we're drowning. Can you help me understand what this experience is like for you?",
            "I hear the pain in what you're sharing. Sometimes our struggles feel invisible to others. What would you most want people to understand about what you're going through?",
            "Thank you for trusting me with this. It sounds like you've been holding this alone for a while. What has been the most challenging part of your day-to-day experience?"
        ],
        safety: [
            "I care about your wellbeing and want to make sure you're safe. Sometimes when pain feels unbearable, we might think about ending it. Have you had thoughts about not wanting to be here anymore?",
            "You matter, and your life has value even when it doesn't feel that way. I need to ask - have you been having thoughts about hurting yourself or ending your life?",
            "Right now, I want to focus on keeping you safe. Are you having any thoughts about harming yourself? These feelings can be temporary, even when they feel permanent."
        ],
        help: [
            "Healing often happens in community, not isolation. There are people trained specifically to walk alongside you through this. Would you be open to connecting with professional support?",
            "You don't have to carry this burden alone. There are caring professionals who understand exactly what you're going through. What feels like the right kind of support for you?",
            "Sometimes the bravest thing we can do is ask for help. Professional counselors can offer tools and perspectives that friends and family, despite their love, might not have. How do you feel about exploring that option?"
        ],
        summarize: [
            "You've shown incredible strength by sharing this with me. Let's think about small, manageable steps forward. What feels like something you could try today or tomorrow?",
            "I'm honored you trusted me with your story. Healing isn't linear, and small steps count. What would feel most supportive for you right now?",
            "You've been through so much, and you're still here - that speaks to your resilience. Let's create a gentle plan that honors where you are right now. What feels most important to focus on first?"
        ]
    },
    zh: {
        start: [
            "我感受到你而家承受緊好大嘅重擔。有時候，有人願意見證我哋嘅痛苦，已經可以帶嚟安慰。我喺度，會無條件咁聽你講。",
            "你嘅經歷好重要，你呢個人都好重要。你願唔願意分享下最近有咩嘢壓喺你心頭？",
            "我留意到你可能經歷緊困難時期。記住，主動求助需要勇氣 - 你嚟到呢度已經踏出咗勇敢嘅一步。"
        ],
        listen: [
            "你嘅感受完全係合理嘅。當我哋感到不知所措時，就好似溺水咁。你可唔可以幫我理解下，呢種經歷對你嚟講係點樣嘅？",
            "我聽到你分享入面嘅痛苦。有時我哋嘅掙扎對其他人嚟講係睇唔見嘅。你最想人哋明白你經歷緊咩？",
            "多謝你信任我，同我分享呢啲。聽起嚟你已經獨自承受咗一段時間。你日常生活入面最有挑戰性嘅係邊部分？"
        ],
        safety: [
            "我關心你嘅安危，想確保你安全。有時當痛苦變得難以忍受，我哋可能會諗唔想再存在。你有冇諗過唔想再喺呢度？",
            "你好重要，你嘅生命有價值，即使而家感覺唔係咁。我需要問下 - 你有冇諗過傷害自己或者結束生命？",
            "而家，我想專注確保你安全。你有冇諗過傷害自己？呢啲感覺可能係暫時嘅，即使感覺好似永恆咁。"
        ],
        help: [
            "康復通常係喺群體入面發生，唔係孤立中。有啲人受過專門訓練，可以陪你行過呢段路。你願唔願意接觸專業支援？",
            "你唔需要獨自承擔呢個重擔。有啲有愛心嘅專業人士完全明白你經歷緊咩。你覺得咩類型嘅支援啱你？",
            "有時我哋能夠做嘅最勇敢嘅事就係求助。專業輔導員可以提供工具同角度，朋友同家人雖然有愛，但可能冇呢啲專業知識。你點睇探索呢個選擇？"
        ],
        summarize: [
            "你同我分享呢啲，展現咗難以置信嘅力量。我哋諗下細小、可管理嘅前進步驟。你覺得今日或者聽日可以試咩？",
            "我好榮幸你信任我，同我分享你嘅故事。康復唔係直線嘅，細小嘅步驟都好重要。而家咩對你嚟講最有支持性？",
            "你經歷咗咁多，但你仍然喺度 - 呢個證明咗你嘅韌性。我哋制定一個溫和嘅計劃，尊重你而家嘅狀況。你覺得最重要係先專注邊樣？"
        ]
    }
};

// Enhanced Crisis keywords for detection
const crisisKeywords = {
    en: [
        'suicide', 'kill myself', 'end it all', 'not worth living', 'better off dead', 'hurt myself', 'cut myself', 'overdose', 'jump', 'hang myself',
        'i want to die', 'want to die', 'wish i was dead', 'kill me', 'end my life', 'take my life', 'no point living', 'life is meaningless',
        'cant go on', "can't go on", 'give up', 'hopeless', 'worthless', 'useless', 'burden', 'everyone would be better without me',
        'razor', 'blade', 'pills', 'poison', 'bridge', 'roof', 'train', 'car crash', 'drowning', 'suffocate'
    ],
    zh: [
        '自殺', '死', '了結', '活不下去', '不如死', '傷害自己', '割腕', '服毒', '跳樓', '上吊', '尋死', '輕生',
        '我想死', '想死', '希望我死', '殺死我', '結束生命', '奪取生命', '生存無意義', '人生無意義',
        '撐不下去', '放棄', '絕望', '無用', '累贅', '大家沒有我會更好', '沒有我更好',
        '刀片', '藥丸', '毒藥', '橋', '天台', '火車', '車禍', '溺水', '窒息', '自殘', '自傷'
    ]
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
    
    // Check both current language and English keywords for broader detection
    const allKeywords = [...keywords, ...crisisKeywords.en];
    
    return allKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
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
        responseArea.innerHTML = '<p>Please describe the situation first so I can offer more thoughtful guidance.</p>';
        return;
    }
    
    // Add to conversation history
    conversationHistory.push({ type: 'user', content: input, timestamp: Date.now() });
    
    // Check for crisis keywords with immediate response
    const isCrisis = detectCrisis(input);
    if (isCrisis) {
        showCrisisBanner();
        showImmediateCrisisResponse(responseArea);
        return;
    } else {
        hideCrisisBanner();
    }
    
    // AI-powered response generation
    const aiResponse = generateAIResponse(input);
    conversationHistory.push({ type: 'assistant', content: aiResponse, timestamp: Date.now() });
    
    responseArea.innerHTML = aiResponse;
    
    // Clear input after response
    document.getElementById('chat-input').value = '';
}

function showImmediateCrisisResponse(responseArea) {
    const isEnglish = currentLang === 'en';
    
    const crisisResponse = isEnglish ? {
        title: '🚨 IMMEDIATE SUPPORT NEEDED',
        message: 'I\'m very concerned about what you\'ve shared. Your life has value and you matter. You don\'t have to go through this alone.',
        action: 'Please reach out for immediate help:',
        comfort: 'These feelings can be overwhelming, but they can change. Professional support can help you through this difficult time.'
    } : {
        title: '🚨 需要即時支援',
        message: '我好擔心你分享嘅內容。你嘅生命有價值，你好重要。你唔需要獨自承受。',
        action: '請即時尋求幫助:',
        comfort: '呢啲感覺可能好overwhelming，但係會改變嘅。專業支援可以幫你度過呢個困難時期。'
    };
    
    responseArea.innerHTML = `
        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 2rem; border-radius: 1rem; border: 2px solid #dc2626; box-shadow: 0 4px 20px rgba(220, 38, 38, 0.2);">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="color: #dc2626; margin-bottom: 1rem;">${crisisResponse.title}</h3>
                <p style="font-size: 1.1rem; color: #991b1b; margin-bottom: 1rem;">${crisisResponse.message}</p>
                <p style="color: #7f1d1d;">${crisisResponse.comfort}</p>
            </div>
            
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 4px solid #dc2626;">
                <h4 style="color: #dc2626; margin-bottom: 1rem;">${crisisResponse.action}</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <a href="tel:999" style="background: #dc2626; color: white; padding: 1rem; border-radius: 0.5rem; text-decoration: none; text-align: center; font-weight: bold; font-size: 1.1rem;">📞 Call 999 Emergency</a>
                    <a href="tel:28960000" style="background: #ea580c; color: white; padding: 1rem; border-radius: 0.5rem; text-decoration: none; text-align: center; font-weight: bold;">📞 Samaritans 24/7: 2896-0000</a>
                    <a href="tel:23820000" style="background: #f59e0b; color: white; padding: 1rem; border-radius: 0.5rem; text-decoration: none; text-align: center; font-weight: bold;">📞 Suicide Prevention: 2382-0000</a>
                </div>
            </div>
            
            <div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #16a34a;">
                <p style="color: #15803d; font-weight: 500;">
                    ${isEnglish 
                        ? '💚 Remember: You are not alone. These feelings are temporary. Help is available 24/7. Your life matters.' 
                        : '💚 記住：你唔係孤單。呢啲感覺係暫時嘅。24小時都有幫助。你嘅生命好重要。'
                    }
                </p>
            </div>
        </div>
    `;
}

function getContextualWisdom(input, step) {
    const inputLower = input.toLowerCase();
    const isEnglish = currentLang === 'en';
    
    // Crisis safety priority
    if (step === 'safety' && detectCrisis(input)) {
        return isEnglish 
            ? '<br><br><div style="background: #fef2f2; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; border-left: 3px solid #dc2626;"><strong>🚨 Safety First:</strong> If there\'s immediate danger, call 999 now. Your life matters.</div>'
            : '<br><br><div style="background: #fef2f2; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; border-left: 3px solid #dc2626;"><strong>🚨 安全優先:</strong> 如有即時危險，請立即致電999。你嘅生命好重要。</div>';
    }
    
    // Contextual wisdom based on keywords
    if (inputLower.includes('work') || inputLower.includes('job') || inputLower.includes('工作')) {
        return isEnglish 
            ? '<br><br><div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>💡 Gentle Reminder:</strong> Your worth isn\'t defined by your productivity. It\'s okay to not be okay at work.</div>'
            : '<br><br><div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>💡 溫馨提醒:</strong> 你嘅價值唔係由你嘅生產力定義。喺工作上唔okay係無問題嘅。</div>';
    }
    
    if (inputLower.includes('family') || inputLower.includes('parent') || inputLower.includes('家庭') || inputLower.includes('父母')) {
        return isEnglish 
            ? '<br><br><div style="background: #fef7ed; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🤗 Understanding:</strong> Family relationships can be complex. Your feelings about family dynamics are valid, even if they\'re complicated.</div>'
            : '<br><br><div style="background: #fef7ed; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🤗 理解:</strong> 家庭關係可能好複雜。你對家庭動態嘅感受係合理嘅，即使好複雜。</div>';
    }
    
    if (inputLower.includes('sleep') || inputLower.includes('tired') || inputLower.includes('exhausted') || inputLower.includes('睡眠') || inputLower.includes('累')) {
        return isEnglish 
            ? '<br><br><div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>😴 Self-Care:</strong> Sleep struggles often reflect our inner state. Be gentle with yourself - rest is not laziness, it\'s necessary healing.</div>'
            : '<br><br><div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>😴 自我照顧:</strong> 睡眠問題通常反映我哋嘅內在狀態。對自己溫柔啲 - 休息唔係懶惰，係必要嘅療癒。</div>';
    }
    
    // Default wisdom for each step
    const stepWisdom = {
        en: {
            start: '<br><br><div style="background: #fef7ed; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🌱 Remember:</strong> Healing begins with being heard. You\'ve taken a courageous step by sharing.</div>',
            listen: '<br><br><div style="background: #f0f9ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>👂 Listening Deeply:</strong> Your experience is unique and valid. Take your time - there\'s no rush to have all the answers.</div>',
            safety: '<br><br><div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🛡️ Safety Check:</strong> These questions might feel heavy, but they come from a place of care. Your safety matters most.</div>',
            help: '<br><br><div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🤝 Support Network:</strong> Professional help isn\'t a sign of weakness - it\'s a sign of wisdom and self-care.</div>',
            summarize: '<br><br><div style="background: #faf5ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🗺️ Moving Forward:</strong> Small steps are still steps. Progress isn\'t always linear, and that\'s perfectly okay.</div>'
        },
        zh: {
            start: '<br><br><div style="background: #fef7ed; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🌱 記住:</strong> 療癒由被聆聽開始。你願意分享已經係勇敢嘅一步。</div>',
            listen: '<br><br><div style="background: #f0f9ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>👂 深度聆聽:</strong> 你嘅經歷係獨特同合理嘅。慢慢嚟 - 唔需要急住要有晒所有答案。</div>',
            safety: '<br><br><div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🛡️ 安全檢查:</strong> 呢啲問題可能感覺沉重，但係出於關心。你嘅安全最重要。</div>',
            help: '<br><br><div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🤝 支援網絡:</strong> 專業幫助唔係軟弱嘅表現 - 係智慧同自我照顧嘅表現。</div>',
            summarize: '<br><br><div style="background: #faf5ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;"><strong>🗺️ 向前邁進:</strong> 細步都係步。進步唔一定係直線嘅，呢個完全無問題。</div>'
        }
    };
    
    return stepWisdom[currentLang][step] || '';
}

function generateAIResponse(input) {
    // Analyze emotional state and context
    const emotionalAnalysis = analyzeEmotionalState(input);
    const contextAnalysis = analyzeContext(input);
    
    // Generate intelligent response based on analysis
    const response = buildIntelligentResponse(input, emotionalAnalysis, contextAnalysis);
    
    return response;
}

function analyzeEmotionalState(input) {
    const inputLower = input.toLowerCase();
    
    const emotionPatterns = {
        anxious: ['anxious', 'worried', 'nervous', 'panic', 'scared', 'afraid', '焦慮', '擔心', '緊張', '恐慌', '害怕'],
        depressed: ['sad', 'depressed', 'down', 'hopeless', 'empty', 'numb', '悲傷', '抑鬱', '沮喪', '絕望', '空虛'],
        angry: ['angry', 'mad', 'furious', 'frustrated', 'irritated', '憤怒', '生氣', '煩躁', '不滿'],
        lonely: ['alone', 'lonely', 'isolated', 'abandoned', 'disconnected', '孤單', '孤獨', '孤立', '被遺棄'],
        overwhelmed: ['overwhelmed', 'stressed', 'too much', 'cant cope', 'drowning', '不知所措', '壓力', '應付不來', '溺水'],
        confused: ['confused', 'lost', 'dont know', 'uncertain', 'mixed up', '困惑', '迷失', '不知道', '不確定']
    };
    
    for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
        if (patterns.some(pattern => inputLower.includes(pattern))) {
            userEmotionalState = emotion;
            return emotion;
        }
    }
    
    return 'neutral';
}

function analyzeContext(input) {
    const inputLower = input.toLowerCase();
    
    const contexts = {
        relationship: ['relationship', 'partner', 'boyfriend', 'girlfriend', 'marriage', 'divorce', 'breakup', '關係', '伴侶', '男朋友', '女朋友', '婚姻', '分手'],
        work: ['work', 'job', 'career', 'boss', 'colleague', 'office', 'unemployed', '工作', '職業', '老闆', '同事', '辦公室', '失業'],
        family: ['family', 'parents', 'mother', 'father', 'siblings', 'children', '家庭', '父母', '媽媽', '爸爸', '兄弟姐妹', '孩子'],
        health: ['sick', 'illness', 'pain', 'hospital', 'doctor', 'medication', '生病', '疾病', '痛', '醫院', '醫生', '藥物'],
        financial: ['money', 'debt', 'poor', 'broke', 'financial', 'bills', '錢', '債務', '窮', '破產', '經濟', '帳單'],
        academic: ['school', 'study', 'exam', 'grade', 'university', 'student', '學校', '讀書', '考試', '成績', '大學', '學生']
    };
    
    for (const [context, patterns] of Object.entries(contexts)) {
        if (patterns.some(pattern => inputLower.includes(pattern))) {
            return context;
        }
    }
    
    return 'general';
}

function buildIntelligentResponse(input, emotion, context) {
    const isEnglish = currentLang === 'en';
    
    // Get base ALGEE response
    const templates = algeeTemplates[currentLang][currentStep];
    let baseResponse = selectSmartTemplate(input, templates, emotion);
    
    // Add emotional validation
    const emotionalValidation = getEmotionalValidation(emotion, isEnglish);
    
    // Add contextual insight
    const contextualInsight = getContextualInsight(context, emotion, isEnglish);
    
    // Add follow-up question
    const followUp = getIntelligentFollowUp(emotion, context, isEnglish);
    
    // Add wisdom based on conversation history
    const historicalWisdom = getHistoricalWisdom(isEnglish);
    
    return `
        <div style="background: white; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ea580c; box-shadow: 0 2px 10px rgba(234, 88, 12, 0.1);">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <span style="font-size: 1.5rem; margin-right: 0.5rem;">🤖</span>
                <strong style="color: #ea580c;">AI Mental Health Assistant</strong>
            </div>
            
            ${emotionalValidation}
            
            <div style="background: #fef7ed; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 3px solid #ea580c;">
                <em>"${baseResponse}"</em>
            </div>
            
            ${contextualInsight}
            ${followUp}
            ${historicalWisdom}
            ${getContextualWisdom(input, currentStep)}
        </div>
    `;
}

function selectSmartTemplate(input, templates, emotion) {
    const inputLower = input.toLowerCase();
    
    // Emotion-based template selection
    if (emotion === 'lonely' || emotion === 'isolated') {
        return templates[0] || templates[Math.floor(Math.random() * templates.length)];
    } else if (emotion === 'overwhelmed' || emotion === 'anxious') {
        return templates[1] || templates[Math.floor(Math.random() * templates.length)];
    } else if (emotion === 'depressed' || emotion === 'hopeless') {
        return templates[2] || templates[Math.floor(Math.random() * templates.length)];
    }
    
    return templates[Math.floor(Math.random() * templates.length)];
}

function getEmotionalValidation(emotion, isEnglish) {
    const validations = {
        en: {
            anxious: '🌊 I can sense the anxiety in your words. Feeling nervous or worried is your mind\'s way of trying to protect you.',
            depressed: '🌧️ I hear the heaviness in what you\'re sharing. Depression can make everything feel more difficult.',
            angry: '🔥 I can feel the frustration and anger. These are valid emotions that deserve to be acknowledged.',
            lonely: '🤗 The loneliness you\'re experiencing is real and painful. You\'re not alone in feeling this way.',
            overwhelmed: '🌪️ Being overwhelmed is like being caught in a storm. It\'s intense, but storms do pass.',
            confused: '🧭 Feeling lost or confused is completely understandable when facing difficult situations.',
            neutral: '💙 Thank you for sharing with me. I\'m here to listen and support you.'
        },
        zh: {
            anxious: '🌊 我感受到你話語中的焦慮。感到緊張或擔心是你的心靈試圖保護你的方式。',
            depressed: '🌧️ 我聽到你分享中的沉重。抑鬱會令所有事情都變得更困難。',
            angry: '🔥 我感受到你的挫折和憤怒。這些都是值得被認可的真實情感。',
            lonely: '🤗 你經歷的孤獨是真實而痛苦的。有這種感覺的不只你一個。',
            overwhelmed: '🌪️ 感到不知所措就像被困在風暴中。很強烈，但風暴會過去的。',
            confused: '🧭 面對困難情況時感到迷失或困惑是完全可以理解的。',
            neutral: '💙 謝謝你與我分享。我在這裡聆聽和支持你。'
        }
    };
    
    const validation = validations[isEnglish ? 'en' : 'zh'][emotion] || validations[isEnglish ? 'en' : 'zh']['neutral'];
    return `<p style="color: #6b7280; margin-bottom: 1rem; font-style: italic;">${validation}</p>`;
}

function getContextualInsight(context, emotion, isEnglish) {
    const insights = {
        en: {
            relationship: '💕 Relationship challenges can deeply affect our emotional well-being. It\'s natural to feel unsettled when our connections with others are strained.',
            work: '💼 Work-related stress can spill over into all areas of life. Your worth as a person isn\'t defined by your job performance.',
            family: '👨‍👩‍👧‍👦 Family dynamics can be complex because these relationships matter so much to us. Your feelings about family are completely valid.',
            health: '🏥 Health concerns can create significant anxiety and uncertainty. It\'s normal to feel scared or worried about your wellbeing.',
            financial: '💰 Financial stress can feel overwhelming and create anxiety about the future. These worries are very real and understandable.',
            academic: '📚 Academic pressure can feel intense, especially when it seems like your future depends on performance. You are more than your grades.',
            general: '🌟 Every situation is unique, and your experience matters. There\'s no "right" way to feel about what you\'re going through.'
        },
        zh: {
            relationship: '💕 關係挑戰會深深影響我們的情緒健康。當我們與他人的聯繫緊張時，感到不安是自然的。',
            work: '💼 工作壓力可能會蔓延到生活的各個方面。你作為人的價值不是由工作表現定義的。',
            family: '👨‍👩‍👧‍👦 家庭動態可能很複雜，因為這些關係對我們來說太重要了。你對家庭的感受完全合理。',
            health: '🏥 健康問題會造成重大焦慮和不確定性。對自己的健康感到害怕或擔心是正常的。',
            financial: '💰 經濟壓力可能令人不知所措，並對未來產生焦慮。這些擔憂是非常真實和可以理解的。',
            academic: '📚 學業壓力可能感覺很強烈，特別是當似乎你的未來取決於表現時。你比你的成績更重要。',
            general: '🌟 每個情況都是獨特的，你的經歷很重要。對於你正在經歷的事情，沒有「正確」的感受方式。'
        }
    };
    
    const insight = insights[isEnglish ? 'en' : 'zh'][context] || insights[isEnglish ? 'en' : 'zh']['general'];
    return `<div style="background: #f0f9ff; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 3px solid #3b82f6;"><p style="color: #1e40af; margin: 0;">${insight}</p></div>`;
}

function getIntelligentFollowUp(emotion, context, isEnglish) {
    const followUps = {
        en: {
            anxious: 'What tends to help you feel more grounded when anxiety rises?',
            depressed: 'Have you noticed any patterns in when these feelings are stronger or lighter?',
            angry: 'What do you think might help you process these feelings in a healthy way?',
            lonely: 'Are there any connections in your life that feel supportive, even if distant?',
            overwhelmed: 'If you could change just one thing about your situation right now, what would it be?',
            confused: 'What would clarity look like for you in this situation?',
            neutral: 'What would be most helpful for you to explore right now?'
        },
        zh: {
            anxious: '當焦慮上升時，什麼通常能幫助你感到更踏實？',
            depressed: '你有沒有注意到這些感覺什麼時候會更強烈或更輕微的模式？',
            angry: '你認為什麼可能幫助你以健康的方式處理這些感受？',
            lonely: '在你的生活中有沒有任何感覺支持的聯繫，即使很遙遠？',
            overwhelmed: '如果你現在可以改變你情況中的一件事，會是什麼？',
            confused: '在這種情況下，清晰對你來說會是什麼樣子？',
            neutral: '現在什麼對你來說最有幫助去探索？'
        }
    };
    
    const followUp = followUps[isEnglish ? 'en' : 'zh'][emotion] || followUps[isEnglish ? 'en' : 'zh']['neutral'];
    return `<div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 3px solid #16a34a;"><p style="color: #15803d; margin: 0; font-weight: 500;">💭 ${followUp}</p></div>`;
}

function getHistoricalWisdom(isEnglish) {
    if (conversationHistory.length < 3) return '';
    
    const wisdom = isEnglish 
        ? '🌱 I notice we\'ve been talking for a while. It takes courage to keep sharing and exploring these feelings.'
        : '🌱 我注意到我們已經談了一段時間。繼續分享和探索這些感受需要勇氣。';
    
    return `<div style="background: #faf5ff; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; border-left: 3px solid #a855f7;"><p style="color: #7c3aed; margin: 0; font-size: 0.9rem;">${wisdom}</p></div>`;
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
    conversationHistory = [];
    userEmotionalState = 'neutral';
    alert(currentLang === 'en' ? 'Local data cleared.' : '本地資料已清除。');
    location.reload();
}