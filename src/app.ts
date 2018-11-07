import FlashCard from './components/FlashCard';

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('flash-card', FlashCard);

  const flashCard = document.querySelector('flash-card');
  const newCardBtn = document.querySelector('button.new-card');

  newCardBtn.addEventListener('click', renderProblem);

  // Set up initial problem
  renderProblem();

  function renderProblem() {
    flashCard.setAttribute('operator', '*');
    flashCard.setAttribute('operands', [1, 1].map(curr => {
        return Math.round(Math.random() * 12)
      }).join(','));
  }
});


