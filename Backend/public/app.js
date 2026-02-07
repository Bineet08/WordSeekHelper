/**
 * Word Puzzle Solver - Frontend Application
 * Handles user interactions and API communication
 */

// Configuration
const API_BASE_URL = window.location.origin;
const API_ENDPOINT = `${API_BASE_URL}/api/solve`;

// DOM Elements
const letterBoxes = document.querySelectorAll('.letter-box');
const includedInput = document.getElementById('includedLetters');
const excludedInput = document.getElementById('excludedLetters');
const solveBtn = document.getElementById('solveBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsCount = document.getElementById('resultsCount');
const resultsGrid = document.getElementById('resultsGrid');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');

// State
let currentResults = [];

/**
 * Initialize the application
 */
function init() {
    setupLetterBoxes();
    setupEventListeners();
    loadFromLocalStorage();
}

/**
 * Setup letter box navigation and input handling
 */
function setupLetterBoxes() {
    letterBoxes.forEach((box, index) => {
        // Auto-focus next box on input
        box.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            
            // Only allow letters
            if (value && !/[a-z]/.test(value)) {
                e.target.value = '';
                return;
            }
            
            e.target.value = value;
            
            // Move to next box if available
            if (value && index < letterBoxes.length - 1) {
                letterBoxes[index + 1].focus();
            }
            
            saveToLocalStorage();
        });
        
        // Handle backspace to go to previous box
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                letterBoxes[index - 1].focus();
            }
            
            // Handle Enter key to solve
            if (e.key === 'Enter') {
                solvePuzzle();
            }
        });
        
        // Prevent non-letter input
        box.addEventListener('keypress', (e) => {
            if (!/[a-zA-Z]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Setup event listeners for buttons and inputs
 */
function setupEventListeners() {
    solveBtn.addEventListener('click', solvePuzzle);
    clearBtn.addEventListener('click', clearAll);
    
    // Save inputs to localStorage on change
    includedInput.addEventListener('input', saveToLocalStorage);
    excludedInput.addEventListener('input', saveToLocalStorage);
    
    // Handle Enter key in text inputs
    includedInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') solvePuzzle();
    });
    
    excludedInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') solvePuzzle();
    });
    
    // Filter input to only letters
    includedInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    });
    
    excludedInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    });
}

/**
 * Get pattern from letter boxes
 * @returns {string} Pattern string with underscores for empty boxes
 */
function getPattern() {
    let pattern = '';
    letterBoxes.forEach(box => {
        pattern += box.value || '_';
    });
    return pattern.toLowerCase();
}

/**
 * Validate inputs before solving
 * @returns {Object} Validation result with success flag and message
 */
function validateInputs() {
    const pattern = getPattern();
    
    // Check if pattern is all blanks
    if (pattern === '_____') {
        return {
            success: false,
            message: 'Please enter at least one letter in the pattern'
        };
    }
    
    // Check if included and excluded have common letters
    const included = includedInput.value.toLowerCase();
    const excluded = excludedInput.value.toLowerCase();
    
    if (included && excluded) {
        const commonLetters = [...included].filter(letter => excluded.includes(letter));
        if (commonLetters.length > 0) {
            return {
                success: false,
                message: `Letter "${commonLetters[0]}" cannot be both included and excluded`
            };
        }
    }
    
    return { success: true };
}

/**
 * Show loading state
 */
function showLoading() {
    resultsSection.style.display = 'none';
    errorState.style.display = 'none';
    loadingState.style.display = 'block';
    solveBtn.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingState.style.display = 'none';
    solveBtn.disabled = false;
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    hideLoading();
    errorMessage.textContent = message;
    errorState.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorState.style.display = 'none';
    }, 5000);
}

/**
 * Display results
 * @param {Array} matches - Array of matching words
 * @param {Object} query - Original query parameters
 */
function displayResults(matches, query) {
    hideLoading();
    errorState.style.display = 'none';
    
    currentResults = matches;
    
    // Update count with animation
    resultsCount.textContent = matches.length;
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    if (matches.length === 0) {
        resultsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">😔 No matches found</p>
                <p style="font-size: 0.9rem;">Try adjusting your constraints</p>
            </div>
        `;
    } else {
        // Create word items with staggered animation
        matches.forEach((word, index) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.style.setProperty('--index', index);
            
            // Copy to clipboard on click
            wordItem.addEventListener('click', () => {
                copyToClipboard(word);
                showCopyFeedback(wordItem);
            });
            
            resultsGrid.appendChild(wordItem);
        });
    }
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

/**
 * Show visual feedback when word is copied
 * @param {HTMLElement} element - Element to show feedback on
 */
function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = '✓ Copied!';
    element.style.background = 'linear-gradient(135deg, var(--success-color), var(--secondary-color))';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.background = '';
    }, 1000);
}

/**
 * Main solve function - sends request to API
 */
async function solvePuzzle() {
    // Validate inputs
    const validation = validateInputs();
    if (!validation.success) {
        showError(validation.message);
        return;
    }
    
    // Prepare request data
    const requestData = {
        pattern: getPattern(),
        included: includedInput.value.toLowerCase(),
        excluded: excludedInput.value.toLowerCase()
    };
    
    // Show loading state
    showLoading();
    
    try {
        // Make API request
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        // Parse response
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to solve puzzle');
        }
        
        // Display results
        displayResults(data.matches, data.query);
        
    } catch (error) {
        console.error('Error solving puzzle:', error);
        showError(error.message || 'Failed to connect to server. Please try again.');
    }
}

/**
 * Clear all inputs and results
 */
function clearAll() {
    // Clear letter boxes
    letterBoxes.forEach(box => {
        box.value = '';
    });
    
    // Clear text inputs
    includedInput.value = '';
    excludedInput.value = '';
    
    // Hide results and errors
    resultsSection.style.display = 'none';
    errorState.style.display = 'none';
    
    // Clear localStorage
    localStorage.removeItem('wordPuzzleSolver');
    
    // Focus first letter box
    letterBoxes[0].focus();
}

/**
 * Save current state to localStorage
 */
function saveToLocalStorage() {
    try {
        const state = {
            pattern: getPattern(),
            included: includedInput.value,
            excluded: excludedInput.value,
            timestamp: Date.now()
        };
        localStorage.setItem('wordPuzzleSolver', JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

/**
 * Load saved state from localStorage
 */
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('wordPuzzleSolver');
        if (!saved) return;
        
        const state = JSON.parse(saved);
        
        // Only restore if less than 24 hours old
        const hoursSinceLastSave = (Date.now() - state.timestamp) / (1000 * 60 * 60);
        if (hoursSinceLastSave > 24) {
            localStorage.removeItem('wordPuzzleSolver');
            return;
        }
        
        // Restore pattern
        if (state.pattern) {
            letterBoxes.forEach((box, index) => {
                if (state.pattern[index] !== '_') {
                    box.value = state.pattern[index];
                }
            });
        }
        
        // Restore other inputs
        if (state.included) includedInput.value = state.included;
        if (state.excluded) excludedInput.value = state.excluded;
        
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}