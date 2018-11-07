class FlashCard extends HTMLElement {
  private static OPERATOR_ATTR = 'operator';
  private static OPERANDS_ATTR = 'operands';

  // State
  private _operator: string = null;
  private _operands: number[] = null;
  private _solution: number = null;
  private _showSolution = false;

  // Rendering
  private _shadow: ShadowRoot = null;
  private _equationEl: Element = null;
  private _solutionEl: Element = null;
  
  static get observedAttributes() {
    return [FlashCard.OPERATOR_ATTR, FlashCard.OPERANDS_ATTR];
  }

  constructor() {
    super();

    // Build initial DOM structures
    this._shadow = this.attachShadow({mode: 'open'});
    this.appendChild(this._shadow);
    this._equationEl = document.createElement('div');
    this._equationEl.appendChild(document.createTextNode(''));
    this._solutionEl = document.createElement('div');
    this._solutionEl.appendChild(document.createTextNode(''));

    // Set initial state
    this.operator = this.getAttribute(FlashCard.OPERATOR_ATTR);
    this.operands = this.getAttribute(FlashCard.OPERANDS_ATTR);
    this._recompute();

    this._shadow.addEventListener('click', () => {
      this._showSolution = !this._showSolution;
      this._layout();
    });
  }

  public set operator(operator:string) {
    if (!operator || typeof operator !== 'string' || operator.trim().length === 0) {
      this._operator = null;
      return;
    }

    // TODO Validation
    this._operator = operator.trim();
  }

  public set operands(operands:string) {
    if (!operands || typeof operands !== 'string' || operands.trim().length === 0) {
      this._operands = null;
      return;
    }
    
    let parsedOperands = operands.split(',').map(curr => {
      return parseInt(curr, 10);
    });

    if (parsedOperands.length !== 2 || parsedOperands.findIndex(value => isNaN(value)) >= 0) {
      this._operands = null;
      return;
    }

    this._operands = parsedOperands;
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    let recompute = false;

    if (name === FlashCard.OPERATOR_ATTR && oldValue !== newValue) {
      this.operator = newValue;
      recompute = true;
    } if (name === FlashCard.OPERANDS_ATTR && oldValue !== newValue) {
      this.operands = newValue;
      recompute = true;
    }

    if (recompute) {
      this._showSolution = false;
      this._recompute();
    }
  }

  private _recompute() {
    let eqText = ''
    let solText = '';

    if (this._operator && this._operands) {
      eqText = `${this._operands[0]}${this._operator}${this._operands[1]}`;
      this._solution = eval(`${this._operands[0]}${this._operator}${this._operands[1]}`);
      solText = this._solution.toString(10);
    }

    (this._equationEl.firstChild as Text).data = eqText;
    (this._solutionEl.firstChild as Text).data = solText;

    this._layout();
  }

  private _layout() {
    clearNode(this._shadow);

    if (this._showSolution) {
      this._shadow.appendChild(this._solutionEl);
    } else {
      this._shadow.appendChild(this._equationEl);
    }
  }
}

function clearNode(el:Node) {
  if (!el) {
    return;
  }

  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export default FlashCard;