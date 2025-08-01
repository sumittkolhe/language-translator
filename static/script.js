// DOM elements
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');
const translateBtn = document.getElementById('translate-btn');
const autoTranslateBtn = document.getElementById('auto-translate');
const swapBtn = document.getElementById('swap-languages');
const loadingOverlay = document.getElementById('loading-overlay');
const notification = document.getElementById('notification');

// Control buttons
const clearSourceBtn = document.getElementById('clear-source');
const clearTargetBtn = document.getElementById('clear-target');
const copySourceBtn = document.getElementById('copy-source');
const copyTargetBtn = document.getElementById('copy-target');
const speakTargetBtn = document.getElementById('speak-target');

// Character counters
const sourceCount = document.getElementById('source-count');
const targetCount = document.getElementById('target-count');

// Auto-translate timer
let autoTranslateTimer = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCharacterCounts();
    showNotification('Welcome to Language Translator!', 'info');
});

// Setup all event listeners
function setupEventListeners() {
    // Translation buttons
    translateBtn.addEventListener('click', performTranslation);
    autoTranslateBtn.addEventListener('click', toggleAutoTranslate);
    
    // Language controls
    swapBtn.addEventListener('click', swapLanguages);
    sourceLang.addEventListener('change', handleLanguageChange);
    targetLang.addEventListener('change', handleLanguageChange);
    
    // Text area events
    sourceText.addEventListener('input', handleSourceTextChange);
    sourceText.addEventListener('keydown', handleKeyDown);
    
    // Control buttons
    clearSourceBtn.addEventListener('click', () => clearTextArea(sourceText));
    clearTargetBtn.addEventListener('click', () => clearTextArea(targetText));
    copySourceBtn.addEventListener('click', () => copyToClipboard(sourceText.value));
    copyTargetBtn.addEventListener('click', () => copyToClipboard(targetText.value));
    speakTargetBtn.addEventListener('click', speakText);
}

// Handle source text changes
function handleSourceTextChange() {
    updateCharacterCounts();
    
    // Auto-translate functionality
    if (autoTranslateTimer) {
        clearTimeout(autoTranslateTimer);
    }
    
    if (autoTranslateBtn.classList.contains('active')) {
        autoTranslateTimer = setTimeout(() => {
            if (sourceText.value.trim()) {
                performTranslation();
            }
        }, 1000); // 1 second delay
    }
}

// Handle key down events
function handleKeyDown(event) {
    // Ctrl+Enter to translate
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        performTranslation();
    }
    
    // Ctrl+Shift+Enter for auto-translate
    if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        toggleAutoTranslate();
    }
}

// Update character counts
function updateCharacterCounts() {
    sourceCount.textContent = sourceText.value.length;
    targetCount.textContent = targetText.value.length;
}

// Perform translation
async function performTranslation() {
    const text = sourceText.value.trim();
    
    if (!text) {
        showNotification('Please enter text to translate', 'error');
        return;
    }
    
    const sourceLangCode = sourceLang.value;
    const targetLangCode = targetLang.value;
    
    // Check if it's the same language
    if (sourceLangCode === targetLangCode) {
        showNotification('Source and target languages cannot be the same', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                source_lang: sourceLangCode,
                target_lang: targetLangCode
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            targetText.value = data.translated_text;
            updateCharacterCounts();
            showNotification('Translation completed successfully!', 'success');
        } else {
            throw new Error(data.error || 'Translation failed');
        }
        
    } catch (error) {
        console.error('Translation error:', error);
        showNotification(error.message || 'Translation failed. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Toggle auto-translate
function toggleAutoTranslate() {
    const isActive = autoTranslateBtn.classList.contains('active');
    
    if (isActive) {
        autoTranslateBtn.classList.remove('active');
        autoTranslateBtn.innerHTML = '<i class="fas fa-magic"></i> Auto Translate';
        showNotification('Auto-translate disabled', 'info');
    } else {
        autoTranslateBtn.classList.add('active');
        autoTranslateBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto';
        showNotification('Auto-translate enabled', 'success');
        
        // Perform initial translation if there's text
        if (sourceText.value.trim()) {
            performTranslation();
        }
    }
}

// Swap languages
function swapLanguages() {
    const tempLang = sourceLang.value;
    const tempText = sourceText.value;
    
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;
    
    sourceText.value = targetText.value;
    targetText.value = tempText;
    
    updateCharacterCounts();
    showNotification('Languages swapped!', 'info');
}

// Handle language change
function handleLanguageChange() {
    // Clear target text when languages change
    targetText.value = '';
    updateCharacterCounts();
}

// Clear text area
function clearTextArea(textArea) {
    textArea.value = '';
    updateCharacterCounts();
    showNotification('Text cleared', 'info');
}

// Copy text to clipboard
async function copyToClipboard(text) {
    if (!text) {
        showNotification('No text to copy', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Text copied to clipboard!', 'success');
    } catch (error) {
        console.error('Copy failed:', error);
        showNotification('Failed to copy text', 'error');
    }
}

// Speak text using Web Speech API
function speakText() {
    const text = targetText.value;
    
    if (!text) {
        showNotification('No text to speak', 'error');
        return;
    }
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on target language
        const langMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-BR',
            'ru': 'ru-RU',
            'ja': 'ja-JP',
            'zh': 'zh-CN'
        };
        
        utterance.lang = langMap[targetLang.value] || 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
        showNotification('Speaking text...', 'info');
    } else {
        showNotification('Speech synthesis not supported in this browser', 'error');
    }
}

// Show/hide loading overlay
function showLoading(show) {
    if (show) {
        loadingOverlay.style.display = 'flex';
    } else {
        loadingOverlay.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add some example text on first load
window.addEventListener('load', function() {
    // Check if this is the first visit
    if (!localStorage.getItem('translatorVisited')) {
        sourceText.value = 'Hello! Welcome to our AI-powered language translator. Try typing some text and see the magic happen!';
        updateCharacterCounts();
        localStorage.setItem('translatorVisited', 'true');
    }
});

// Add keyboard shortcuts info
document.addEventListener('keydown', function(event) {
    // Show keyboard shortcuts on F1
    if (event.key === 'F1') {
        event.preventDefault();
        showNotification('Keyboard shortcuts: Ctrl+Enter (Translate), Ctrl+Shift+Enter (Auto-translate)', 'info');
    }
});

// Add some helpful tips
const tips = [
    'Tip: Use Ctrl+Enter for quick translation',
    'Tip: Enable auto-translate for real-time translation',
    'Tip: Click the swap button to quickly switch languages',
    'Tip: Use the copy button to copy translated text',
    'Tip: Click the speaker icon to hear the translation'
];

let tipIndex = 0;
setInterval(() => {
    if (tipIndex < tips.length) {
        showNotification(tips[tipIndex], 'info');
        tipIndex++;
    }
}, 30000); // Show a tip every 30 seconds

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some visual feedback for button interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add text area auto-resize
function autoResizeTextArea(textArea) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
}

sourceText.addEventListener('input', () => autoResizeTextArea(sourceText));
targetText.addEventListener('input', () => autoResizeTextArea(targetText)); 