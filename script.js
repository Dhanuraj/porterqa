// Configuration and Constants
const customerNumbers = new Set([2,3,4,5,6,7,8,10,13,14,16,17,18,21,23,24,26,28,30,32,33,34,37,42,43,44,45,49,50,51,52,53,54,55,57,58,59,64,65,66,67,71,72,73,74,75,81,83,84,85]);
const vendorNumbers = new Set([11,12,76]);
const DEBOUNCE_DELAY = 300;

// DOM Elements
const dom = {
  searchInput: document.querySelector('.search-box'),
  callerFilter: document.getElementById('callerFilter'),
  numberFilter: document.getElementById('numberFilter'),
  resultsContainer: document.getElementById('results'),
  answerContainer: document.querySelector('.answer-container'),
  closeBtn: document.querySelector('.close-btn'),
  answerContent: document.getElementById('answerContent'),
  noteInput: document.getElementById('noteInput'),
  savedNotes: document.getElementById('savedNotes')
};

// State Management
let state = {
  currentQuestionNumber: null,
  searchTimeout: null
};

// Event Listeners
function initializeEventListeners() {
  dom.searchInput.addEventListener('input', handleSearch);
  dom.callerFilter.addEventListener('change', handleSearch);
  dom.numberFilter.addEventListener('input', handleSearch);
  dom.closeBtn.addEventListener('click', closeAnswerPanel);
}

// Core Functions
function handleSearch() {
  clearTimeout(state.searchTimeout);
  showLoadingState();
  
  state.searchTimeout = setTimeout(() => {
    const filters = getCurrentFilters();
    const filteredQuestions = applyFilters(filters);
    displayResults(filteredQuestions, filters.keywords);
  }, DEBOUNCE_DELAY);
}

function getCurrentFilters() {
  return {
    searchTerm: dom.searchInput.value.trim().toLowerCase(),
    selectedCaller: dom.callerFilter.value,
    numberInput: dom.numberFilter.value.trim(),
    keywords: dom.searchInput.value.trim().toLowerCase().split(/[\s,.]+/).filter(Boolean)
  };
}

function applyFilters({ searchTerm, selectedCaller, numberInput, keywords }) {
  const filterNumber = parseNumberFilter(numberInput);
  
  return questions.filter(q => {
    if (!passesNumberFilter(q.number, filterNumber)) return false;
    if (!passesCallerFilter(q.number, selectedCaller)) return false;
    if (!passesKeywordFilter(q, keywords)) return false;
    return true;
  });
}

function passesNumberFilter(questionNumber, filterNumber) {
  return filterNumber === null || questionNumber === filterNumber;
}

function passesCallerFilter(questionNumber, selectedCaller) {
  if (selectedCaller === 'all') return true;
  if (selectedCaller === 'customer') return customerNumbers.has(questionNumber);
  if (selectedCaller === 'vendor') return vendorNumbers.has(questionNumber);
  return !customerNumbers.has(questionNumber) && !vendorNumbers.has(questionNumber);
}

function passesKeywordFilter(question, keywords) {
  if (keywords.length === 0) return true;
  const content = `${question.text.toLowerCase()} ${question.metadata?.toLowerCase() || ''}`;
  return keywords.every(kw => content.includes(kw));
}

// Display Functions
function displayResults(questions, keywords) {
  dom.resultsContainer.innerHTML = questions.length ? 
    questions.map(q => createQuestionElement(q, keywords)).join('') :
    createEmptyState();
}

function createQuestionElement(question, keywords) {
  const metadata = question.metadata ? `
    <div class="metadata">
      ${highlightMatches(question.metadata, keywords)}
    </div>` : '';

  return `
    <div class="result-item" data-number="${question.number}" onclick="showAnswer(${question.number})">
      <div class="question-content">
        <span class="question-number">Q${question.number}:</span>
        ${highlightMatches(question.text, keywords)}
      </div>
      ${metadata}
    </div>`;
}

function showLoadingState() {
  dom.resultsContainer.innerHTML = `
    <div class="loading">
      <div class="loader"></div>
      <p>Searching questions...</p>
    </div>`;
}

function createEmptyState() {
  return `
    <div class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3>No Matching Questions Found</h3>
      <p>Try adjusting your search filters or keywords</p>
    </div>`;
}

// Answer Panel Functions
function showAnswer(questionNumber) {
  state.currentQuestionNumber = questionNumber;
  const question = questions.find(q => q.number === questionNumber);
  const answer = answers[questionNumber] || "Answer not available for this question";

  dom.answerContent.innerHTML = `
    <div class="question-text">${question.text}</div>
    <div class="answer-text">${answer}</div>
    ${question.metadata ? `<div class="metadata">${question.metadata}</div>` : ''}`;

  dom.answerContainer.style.display = 'block';
  loadNotes();
}

function closeAnswerPanel() {
  sessionStorage.removeItem(`notes-${state.currentQuestionNumber}`);
  dom.answerContainer.style.display = 'none';
  state.currentQuestionNumber = null;
}

// Note Handling Functions
function saveNote() {
  const note = dom.noteInput.value.trim();
  if (!note || !state.currentQuestionNumber) return;

  const notes = JSON.parse(sessionStorage.getItem(`notes-${state.currentQuestionNumber}`) || '[]');
  notes.push(note);
  sessionStorage.setItem(`notes-${state.currentQuestionNumber}`, JSON.stringify(notes));
  
  dom.noteInput.value = '';
  loadNotes();
}

function loadNotes() {
  dom.savedNotes.innerHTML = '';
  if (!state.currentQuestionNumber) return;

  const notes = JSON.parse(sessionStorage.getItem(`notes-${state.currentQuestionNumber}`) || '[]');
  dom.savedNotes.innerHTML = notes.map((note, index) => `
    <div class="note-item">
      <span>${note}</span>
      <button onclick="deleteNote(${index})">Delete</button>
    </div>`
  ).join('');
}

function deleteNote(index) {
  if (!state.currentQuestionNumber) return;

  const notes = JSON.parse(sessionStorage.getItem(`notes-${state.currentQuestionNumber}`) || '[]');
  notes.splice(index, 1);
  sessionStorage.setItem(`notes-${state.currentQuestionNumber}`, JSON.stringify(notes));
  loadNotes();
}

// Utility Functions
function highlightMatches(content, keywords) {
  if (!keywords?.length) return content;
  
  return keywords.reduce((str, keyword) => {
    const escapedKeyword = escapeRegExp(keyword);
    return str.replace(
      new RegExp(`(${escapedKeyword})`, 'gi'),
      '<span class="highlight">$1</span>'
    );
  }, content);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseNumberFilter(input) {
  const number = parseInt(input, 10);
  return isNaN(number) ? null : number;
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  handleSearch();
});