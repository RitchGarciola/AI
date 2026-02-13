// DOM Elements
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatBody = document.getElementById('chatBody');

// Event Listeners
chatForm.addEventListener('submit', handleSubmit);

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;
    
    // Check if API key is configured
    if (API_KEY === "AIzaSyAiQ1jhAKb_YEq0HDRyORkVy_p0faRLFQQ" || !API_KEY) {
        displayErrorMessage("⚠️ Please configure your Gemini API key in config.js");
        return;
    }
    
    // Display user message
    displayUserMessage(userMessage);
    
    // Clear input and disable form
    messageInput.value = '';
    setFormState(false);
    
    // Show loading indicator
    const loadingMessageId = displayLoadingMessage();
    
    try {
        // Call Gemini API
        const botResponse = await sendToGemini(userMessage);
        
        // Remove loading indicator
        removeLoadingMessage(loadingMessageId);
        
        // Display bot response
        displayBotMessage(botResponse);
        
    } catch (error) {
        // Remove loading indicator
        removeLoadingMessage(loadingMessageId);
        
        // Display error message
        displayErrorMessage("Sorry, I encountered an error. Please try again.");
        console.error('Error:', error);
    } finally {
        // Re-enable form
        setFormState(true);
        messageInput.focus();
    }
}

// Send message to Gemini API
async function sendToGemini(message) {
    const requestBody = {
        contents: [{
            parts: [{
                text: message
            }]
        }]
    };
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
    }
    
    const data = await response.json();
    
    // Extract the response text
    if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('No response from API');
    }
}

// Display user message
function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar user-avatar">
                <i class="bi bi-person-fill"></i>
            </div>
            <div class="bubble user-bubble">
                <p class="mb-0">${escapeHtml(message)}</p>
            </div>
        </div>
    `;
    chatBody.appendChild(messageDiv);
    scrollToBottom();
}

// Display bot message
function displayBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar bot-avatar">
                <i class="bi bi-robot"></i>
            </div>
            <div class="bubble bot-bubble">
                <p class="mb-0">${formatBotMessage(message)}</p>
            </div>
        </div>
    `;
    chatBody.appendChild(messageDiv);
    scrollToBottom();
}

// Display loading message
function displayLoadingMessage() {
    const loadingId = 'loading-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message loading-message';
    messageDiv.id = loadingId;
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar bot-avatar">
                <i class="bi bi-robot"></i>
            </div>
            <div class="bubble">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    chatBody.appendChild(messageDiv);
    scrollToBottom();
    return loadingId;
}

// Remove loading message
function removeLoadingMessage(loadingId) {
    const loadingMessage = document.getElementById(loadingId);
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// Display error message
function displayErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message error-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar bot-avatar">
                <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div class="bubble">
                <p class="mb-0">${escapeHtml(message)}</p>
            </div>
        </div>
    `;
    chatBody.appendChild(messageDiv);
    scrollToBottom();
}

// Format bot message (convert markdown-like syntax to HTML)
function formatBotMessage(message) {
    let formatted = escapeHtml(message);
    
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert numbered lists
    formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '<br>• $1');
    
    return formatted;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Enable/disable form
function setFormState(enabled) {
    messageInput.disabled = !enabled;
    sendButton.disabled = !enabled;
}

// Auto-focus input on page load
window.addEventListener('DOMContentLoaded', () => {
    messageInput.focus();
    
    // Check if API key is configured
    if (API_KEY === "YOUR_GEMINI_API_KEY" || !API_KEY) {
        console.warn('⚠️ API key not configured. Please add your Gemini API key to config.js');
    }
});
