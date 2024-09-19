let selectedLetters = new Set();
    let draggedLetter = null;

    function displayText() {
      const text = document.getElementById('textInput').value;
      const output = document.getElementById('output');
      output.innerHTML = '';
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.textContent = char;
        span.dataset.index = index;

        span.addEventListener('click', (event) => selectLetter(event, span));
        
        span.draggable = true;
        span.addEventListener('dragstart', (event) => startDrag(event, span));
        span.addEventListener('dragover', (event) => event.preventDefault());
        span.addEventListener('drop', (event) => dropLetter(event, span));

        output.appendChild(span);
      });
    }

    function selectLetter(event, letterElement) {
      if (event.ctrlKey) {
        if (selectedLetters.has(letterElement)) {
          selectedLetters.delete(letterElement);
          letterElement.classList.remove('selected');
        } else {
          selectedLetters.add(letterElement);
          letterElement.classList.add('selected');
        }
      }
    }

    function startDrag(event, letterElement) {
      draggedLetter = letterElement;
    }

    function dropLetter(event, dropTarget) {
      if (draggedLetter && draggedLetter !== dropTarget) {
        const draggedIndex = draggedLetter.dataset.index;
        const targetIndex = dropTarget.dataset.index;

        const output = document.getElementById('output');
        const draggedLetterClone = draggedLetter.cloneNode(true);
        const dropTargetClone = dropTarget.cloneNode(true);

        addDragAndSelectListeners(draggedLetterClone);
        addDragAndSelectListeners(dropTargetClone);

        output.replaceChild(draggedLetterClone, dropTarget);
        output.replaceChild(dropTargetClone, draggedLetter);
      }
    }

    function addDragAndSelectListeners(element) {
      element.addEventListener('click', (event) => selectLetter(event, element));
      element.addEventListener('dragstart', (event) => startDrag(event, element));
      element.addEventListener('dragover', (event) => event.preventDefault());
      element.addEventListener('drop', (event) => dropLetter(event, element));
    }