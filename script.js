let billInput = 0;

const billInputEl = document.querySelector('.js-calculator__bill-input');

function enterBill() {
  billInputEl.addEventListener('click', () => {
    billInputEl.classList.add('active');

    document.body.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-calculator__bill-input')) {
        billInputEl.classList.remove('active');
      }
    });
  });

  billInputEl.addEventListener('input', () => {
    billInput = Number(billInputEl.value);

    renderTipPerPerson();
    renderTotalPerPerson();
    updateResetBtn();
  });
}

enterBill();

let tipPercentage = 0;

const tips = document.querySelectorAll('.js-calculator__tip');

function selectTip() {
  tips.forEach((tip) => {
    tip.addEventListener('click', () => {
      const tipRadio = tip.querySelector('.js-calculator__tip-radio');

      tipPercentage = Number(tipRadio.value) / 100;

      renderTipPerPerson();
      renderTotalPerPerson();

      tips.forEach((tip) => {
        if (tip.classList.contains('selected')) {
          tip.classList.remove('selected');
        }
      });

      tip.classList.add('selected');

      updateResetBtn();
    });
  });
}

selectTip();

const tipRadios = document.querySelectorAll('.js-calculator__tip-radio');

tipRadios.forEach((radio) => {
  radio.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

const customTipEl = document.querySelector('.js-calculator__tip-custom');

function enterCustomTip() {
  customTipEl.addEventListener('click', () => {
    if (customTipEl.innerText === 'Custom') {
      customTipEl.innerHTML = `
      <input class="calculator__tip-custom-input js-calculator__tip-custom-input" type="number" name="tip" id="tip-custom" min="0">
    `;

      const tipCustomInputEl = document.querySelector('.js-calculator__tip-custom-input');

      tipCustomInputEl.addEventListener('click', () => {
        customTipEl.classList.add('active');
      });

      tipCustomInputEl.addEventListener('input', () => {
        tipPercentage = Number(tipCustomInputEl.value) / 100;

        renderTipPerPerson();
        renderTotalPerPerson();
        updateResetBtn();
      });

      document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('js-calculator__tip-custom-input')) {
          customTipEl.classList.remove('active');
        }
      });
    }

    tips.forEach((tip) => {
      if (tip.classList.contains('selected')) {
        tip.classList.remove('selected');
      }
    });
  });
}

enterCustomTip();

let peopleInput = 0;

const peopleInputEl = document.querySelector('.js-calculator__people-input');

function enterPeople() {
  peopleInputEl.addEventListener('click', () => {
    peopleInputEl.classList.add('active');

    document.body.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-calculator__people-input')) {
        peopleInputEl.classList.remove('active');
      }
    });
  });

  peopleInputEl.addEventListener('input', () => {
    peopleInput = Number(peopleInputEl.value);

    renderTipPerPerson();
    renderTotalPerPerson();
    updateResetBtn();
  });
}

enterPeople();

let tipPerPerson = 0;

function calcTipPerPerson() {
  tipPerPerson = ((billInput * tipPercentage) / peopleInput).toFixed(2);
}

const tipResultEl = document.querySelector('.js-calculator__result-tip');

function renderTipPerPerson() {
  if (billInput >= 0 && tipPercentage >= 0 && peopleInput > 0) {
    calcTipPerPerson();

    tipResultEl.innerHTML = `$${tipPerPerson}`;
  }
}

let totalPerPerson = 0;

function calcTotalPerPerson() {
  totalPerPerson = ((billInput + (billInput * tipPercentage)) / peopleInput).toFixed(2);
}

const totalResultEl = document.querySelector('.js-calculator__result-total');

function renderTotalPerPerson() {
  if (billInput >= 0 && tipPercentage >= 0 && peopleInput > 0) {
    calcTotalPerPerson();

    totalResultEl.innerHTML = `$${totalPerPerson}`;
  }
}

const resetBtn = document.querySelector('.js-calculator__reset');

function updateResetBtn() {
  if (tipPerPerson > 0 || totalPerPerson > 0) {
    resetBtn.classList.add('active');
  } else {
    if (resetBtn.classList.contains('active')) {
      resetBtn.classList.remove('active');
    }
  }
}

function resetEverything() {
  resetBtn.addEventListener('click', () => {
    if (tipPerPerson > 0 || totalPerPerson > 0) {
      billInput = 0;
      tipPercentage = 0;
      peopleInput = 0;
      tipPerPerson = 0;
      totalPerPerson = 0;

      billInputEl.value = '';

      tips.forEach((tip) => {
        if (tip.classList.contains('selected')) {
          tip.classList.remove('selected');
        }
      });

      if (customTipEl.innerText !== 'Custom') {
        customTipEl.innerHTML = 'Custom';
      }

      peopleInputEl.value = '';

      tipResultEl.innerHTML = `$${tipPerPerson.toFixed(2)}`;

      totalResultEl.innerHTML = `$${totalPerPerson.toFixed(2)}`;
    }
  });
}

resetEverything();
