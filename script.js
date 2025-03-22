document.getElementById('displayTextBtn').addEventListener('click', function () {

    const button = document.getElementById('displayTextBtn');
    button.style.backgroundColor = '#4CAF50';
    button.style.color = '#fff';

    setTimeout(function () {
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 3000);



    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    outputText.innerHTML = '';


    inputText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.id = 'char-' + index;
        span.classList.add('draggable');
        span.setAttribute('draggable', true);
        outputText.appendChild(span);
    });
});

document.getElementById('outputText').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName === "SPAN") {
        e.target.classList.toggle('selected');
    }
});



// Реалізація перетягування
let draggedElement = null;

document.getElementById('outputText').addEventListener('dragstart', function (e) {
    if (e.target && e.target.nodeName === "SPAN") {
        draggedElement = e.target;
        e.target.style.opacity = '0.5';
    }
});

document.getElementById('outputText').addEventListener('dragend', function (e) {
    if (draggedElement) {
        draggedElement.style.opacity = '1';
        draggedElement = null;
    }
});


document.getElementById('outputText').addEventListener('dragover', function (e) {
    e.preventDefault();
});

document.getElementById('outputText').addEventListener('drop', function (e) {
    e.preventDefault();

    if (draggedElement && e.target && e.target.nodeName === "SPAN" && draggedElement !== e.target) {
        const draggedIndex = draggedElement.id.split('-')[1];
        const targetIndex = e.target.id.split('-')[1];

        // Міняємо місцями два елементи
        const draggedText = draggedElement.textContent;
        const targetText = e.target.textContent;

        draggedElement.textContent = targetText;
        e.target.textContent = draggedText;

        // Змінюємо id, щоб не було дублювання
        draggedElement.id = 'char-' + targetIndex;
        e.target.id = 'char-' + draggedIndex;
    }
});
