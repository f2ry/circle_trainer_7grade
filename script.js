// Глобальные переменные и состояния
let currentTask = 'task1';
let task1Score = { correct: 0, incorrect: 0 };
let task3Score = { correct: 0, incorrect: 0 };
let task3CurrentIndex = 0;
let task3Answers = new Array(16).fill(null);

// Утверждения для задания 3 (8 верных, 8 неверных)
const statements = [
    { 
        text: "Диаметр - это хорда, проходящая через центр окружности.", 
        isTrue: true,
        explanation: "Верно! По определению, диаметр — это частный случай хорды, проходящей через центр окружности."
    },
    { 
        text: "Любая хорда является диаметром.", 
        isTrue: false,
        explanation: "Неверно! Диаметр — это хорда, проходящая через центр. Но не каждая хорда проходит через центр, поэтому не каждая хорда является диаметром."
    },
    { 
        text: "Радиус - это хорда, равная половине диаметра.", 
        isTrue: false,
        explanation: "Неверно! Радиус — это отрезок, соединяющий центр окружности с любой точкой на окружности. У хорды оба конца лежат на окружности, а у радиуса только один, поэтому радиус не является хордой."
    },
    { 
        text: "Диаметр - самая длинная хорда в окружности.", 
        isTrue: true,
        explanation: "Верно! Диаметр действительно является самой длинной хордой в окружности. Все остальные хорды короче диаметра."
    },
    { 
        text: "Хорда может быть длиннее диаметра.", 
        isTrue: false,
        explanation: "Неверно! Диаметр — это самая длинная хорда, поэтому ни одна хорда не может быть длиннее диаметра."
    },
    { 
        text: "Через одну точку окружности можно провести бесконечное количество хорд.", 
        isTrue: true,
        explanation: "Верно! Через любую точку окружности можно провести бесконечное множество хорд, соединив ее с любой другой точкой окружности."
    },
    { 
        text: "Диаметр всегда равен двум радиусам.", 
        isTrue: true,
        explanation: "Верно! По определению, диаметр — это отрезок, проходящий через центр и соединяющий две точки окружности. Его длина равна сумме двух радиусов."
    },
    { 
        text: "Хорда делит окружность на две равные части.", 
        isTrue: false,
        explanation: "Неверно! Хорда делит окружность на две дуги, которые не обязательно равны. Только диаметр делит окружность на две равные полуокружности."
    },
    { 
        text: "Если хорда проходит через центр, то она является диаметром.", 
        isTrue: true,
        explanation: "Верно! Это следует из определения диаметра."
    },
    { 
        text: "Все радиусы одной окружности равны между собой.", 
        isTrue: true,
        explanation: "Верно! Все радиусы одной окружности имеют одинаковую длину, равную расстоянию от центра до любой точки окружности."
    },
    { 
        text: "Диаметр - это радиус, умноженный на два.", 
        isTrue: true,
        explanation: "Верно! Длина диаметра действительно равна двум длинам радиуса той же окружности."
    },
    { 
        text: "Хорда - это отрезок, соединяющий две любые точки окружности.", 
        isTrue: true,
        explanation: "Верно! Это точное определение хорды."
    },
    { 
        text: "Отрезок, соединяющий центр окружности с хордой, всегда перпендикулярен этой хорде.", 
        isTrue: false,
        explanation: "Неверно! Отрезок, соединяющий центр с серединой хорды, перпендикулярен хорде, но не любой отрезок от центра к хорде будет перпендикулярен."
    },
    { 
        text: "Если две хорды равны, то они равноудалены от центра.", 
        isTrue: true,
        explanation: "Верно! Равные хорды одной окружности действительно находятся на одинаковом расстоянии от центра."
    },
    { 
        text: "Любой диаметр делит окружность на две равные части.", 
        isTrue: true,
        explanation: "Верно! Диаметр делит окружность на две равные полуокружности."
    },
    { 
        text: "Хорда и диаметр - это одно и то же.", 
        isTrue: false,
        explanation: "Неверно! Диаметр — это частный случай хорды, но не все хорды являются диаметрами. Хорда может не проходить через центр."
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initTask1();
    initTask2();
    initTask3();
});

// Инициализация вкладок
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tasks = document.querySelectorAll('.task');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Обновляем активную вкладку
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующее задание
            tasks.forEach(task => {
                task.classList.remove('active');
                if (task.id === tabId) {
                    task.classList.add('active');
                }
            });
            
            currentTask = tabId;
        });
    });
}

// ==================== ЗАДАНИЕ 1 ====================
function initTask1() {
    // Объявляем переменные ВНУТРИ функции, но перед их использованием
    let currentCorrectAnswer = '';
    
    // Генерация случайного элемента
    function generateRandomElement() {
        const svg = document.getElementById('random-element');
        svg.innerHTML = '';
        
        const types = ['radius', 'diameter', 'chord'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        currentCorrectAnswer = randomType;
        
        // Координаты центра
        const cx = 200, cy = 200, r = 150;
        
        switch(randomType) {
            case 'radius':
                // Случайный угол для радиуса
                const angle = Math.random() * 2 * Math.PI;
                const endX = cx + r * Math.cos(angle);
                const endY = cy + r * Math.sin(angle);
                
                // Радиус (без стрелки)
                svg.innerHTML = `
                    <line x1="${cx}" y1="${cy}" x2="${endX}" y2="${endY}" 
                          stroke="#e9240e" stroke-width="4" />
                    <circle cx="${endX}" cy="${endY}" r="4" fill="#e9240e" />
                `;
                break;
                
            case 'diameter':
                // Случайный угол для диаметра
                const angle1 = Math.random() * 2 * Math.PI;
                const angle2 = angle1 + Math.PI;
                const x1 = cx + r * Math.cos(angle1);
                const y1 = cy + r * Math.sin(angle1);
                const x2 = cx + r * Math.cos(angle2);
                const y2 = cy + r * Math.sin(angle2);
                
                // Диаметр
                svg.innerHTML = `
                    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                          stroke="#e9240e" stroke-width="4" />
                    <circle cx="${x1}" cy="${y1}" r="4" fill="#e9240e" />
                    <circle cx="${x2}" cy="${y2}" r="4" fill="#e9240e" />
                `;
                break;
                
            case 'chord':
                // Две случайные точки на окружности
                const angleA = Math.random() * 2 * Math.PI;
                const angleB = angleA + (Math.random() * Math.PI * 0.8 + 0.2);
                const ax = cx + r * Math.cos(angleA);
                const ay = cy + r * Math.sin(angleA);
                const bx = cx + r * Math.cos(angleB);
                const by = cy + r * Math.sin(angleB);
                
                // Хорда
                svg.innerHTML = `
                    <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" 
                          stroke="#e9240e" stroke-width="4" />
                    <circle cx="${ax}" cy="${ay}" r="4" fill="#e9240e" />
                    <circle cx="${bx}" cy="${by}" r="4" fill="#e9240e" />
                `;
                break;
        }
        
        // Сбрасываем стили кнопок
        optionBtns.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
        });
        
        feedback.innerHTML = '<p>Выберите вариант ответа</p>';
    }
    
    // Получаем элементы DOM
    const optionBtns = document.querySelectorAll('.option-btn');
    const nextBtn = document.getElementById('next-task1');
    const feedback = document.getElementById('task1-feedback');
    
    // Генерируем первый элемент
    generateRandomElement();
    
    // Обработка выбора ответа
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('correct') || this.classList.contains('incorrect')) {
                return; // Уже отвечали
            }
            
            const selected = this.dataset.value;
            const isCorrect = selected === currentCorrectAnswer;
            
            // Обновляем статистику
            if (isCorrect) {
                task1Score.correct++;
                this.classList.add('correct');
                feedback.innerHTML = `
                    <p style="color: #155724; background-color: #d4edda; padding: 15px; border-radius: 8px;">
                    <i class="fas fa-check-circle"></i> <strong>Верно!</strong> Это действительно ${getElementName(currentCorrectAnswer)}.
                    </p>
                `;
            } else {
                task1Score.incorrect++;
                this.classList.add('incorrect');
                
                // Показываем правильный ответ
                optionBtns.forEach(b => {
                    if (b.dataset.value === currentCorrectAnswer) {
                        b.classList.add('correct');
                    }
                });
                
                feedback.innerHTML = `
                    <p style="color: #721c24; background-color: #f8d7da; padding: 15px; border-radius: 8px;">
                    <i class="fas fa-times-circle"></i> <strong>Неверно!</strong> Это ${getElementName(selected)}, а на рисунке изображен ${getElementName(currentCorrectAnswer)}.
                    </p>
                `;
            }
            
            // Обновляем счетчики
            document.getElementById('task1-correct').textContent = task1Score.correct;
            document.getElementById('task1-incorrect').textContent = task1Score.incorrect;
        });
    });
    
    // Кнопка "Следующий вопрос"
    nextBtn.addEventListener('click', generateRandomElement);
    
    // Вспомогательная функция для получения названия элемента
    function getElementName(type) {
        const names = {
            radius: 'радиус',
            diameter: 'диаметр',
            chord: 'хорда'
        };
        return names[type] || type;
    }
}

// ==================== ЗАДАНИЕ 2 ====================
function initTask2() {
    // Элементы для классификации
    const elements = [
        { id: 'AB', type: 'chord', label: 'AB', description: 'Отрезок AB' },
        { id: 'CD', type: 'chord', label: 'CD', description: 'Отрезок CD' },
        { id: 'EF', type: 'chord', label: 'EF', description: 'Отрезок EF' },
        { id: 'GH', type: 'diameter', label: 'GH', description: 'Отрезок GH' },
        { id: 'IJ', type: 'diameter', label: 'IJ', description: 'Отрезок IJ' },
        { id: 'OK', type: 'radius', label: 'OK', description: 'Отрезок OK' },
        { id: 'OL', type: 'radius', label: 'OL', description: 'Отрезок OL' },
        { id: 'MN', type: 'other', label: 'MN', description: 'Отрезок MN' }
    ];
    
    const draggableContainer = document.getElementById('draggable-elements');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkBtn = document.getElementById('check-task2');
    const resetBtn = document.getElementById('reset-task2');
    const feedback = document.getElementById('task2-feedback');
    
    // Перемешанные элементы
    const shuffledElements = [...elements].sort(() => Math.random() - 0.5);
    
    // Создаем перетаскиваемые элементы
    shuffledElements.forEach(el => {
        const div = document.createElement('div');
        div.className = 'draggable-element';
        div.textContent = el.label;
        div.setAttribute('draggable', 'true');
        div.dataset.id = el.id;
        div.dataset.type = el.type;
        div.title = el.description;
        
        div.addEventListener('dragstart', handleDragStart);
        draggableContainer.appendChild(div);
    });
    
    // Создаем чертеж для задания 2
    createTask2Diagram(elements);
    
    // Настройка зон для перетаскивания
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
    
    let draggedElement = null;
    
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.dataset.id);
    }
    
    function handleDragOver(e) {
        e.preventDefault();
    }
    
    function handleDragEnter(e) {
        this.classList.add('over');
    }
    
    function handleDragLeave(e) {
        this.classList.remove('over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('over');
        
        if (draggedElement) {
            // Проверяем, можно ли поместить элемент в эту зону
            const elementType = draggedElement.dataset.type;
            const zoneType = this.dataset.type;
            
            // Если зона "other", принимаем только элементы типа "other"
            // Если зона "chord", принимаем элементы "chord" и "diameter" (диаметр - это тоже хорда)
            // Если зона "diameter", принимаем только элементы "diameter"
            // Если зона "radius", принимаем только элементы "radius"
            
            let isValid = false;
            
            if (zoneType === 'other') {
                isValid = elementType === 'other';
            } else if (zoneType === 'chord') {
                isValid = elementType === 'chord' || elementType === 'diameter';
            } else if (zoneType === 'diameter') {
                isValid = elementType === 'diameter';
            } else if (zoneType === 'radius') {
                isValid = elementType === 'radius';
            }
            
            if (isValid) {
                // Добавляем элемент в зону
                const zoneContent = this.querySelector('.zone-content');
                
                // Проверяем, нет ли уже такого элемента в зоне
                const existing = Array.from(zoneContent.children).find(
                    child => child.dataset.id === draggedElement.dataset.id
                );
                
                if (!existing) {
                    const clone = draggedElement.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.draggable = false;
                    clone.style.cursor = 'default';
                    zoneContent.appendChild(clone);
                    
                    // Удаляем оригинал из контейнера
                    draggedElement.remove();
                }
            } else {
                feedback.innerHTML = `
                    <p style="color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 8px;">
                    <i class="fas fa-exclamation-triangle"></i> Элемент "${draggedElement.textContent}" нельзя поместить в эту категорию.
                    </p>
                `;
                
                // Через 2 секунды убираем сообщение
                setTimeout(() => {
                    feedback.innerHTML = '';
                }, 2000);
            }
            
            draggedElement.classList.remove('dragging');
            draggedElement = null;
        }
    }
    
    // Проверка задания
    checkBtn.addEventListener('click', function() {
        let correct = 0;
        let total = elements.length;
        
        // Проверяем каждую зону
        dropZones.forEach(zone => {
            const zoneType = zone.dataset.type;
            const zoneContent = zone.querySelector('.zone-content');
            const elementsInZone = Array.from(zoneContent.children);
            
            elementsInZone.forEach(el => {
                const elementType = el.dataset.type;
                
                // Проверяем правильность классификации
                if (zoneType === 'other' && elementType === 'other') {
                    correct++;
                    el.style.backgroundColor = '#d4edda';
                } else if (zoneType === 'chord' && (elementType === 'chord' || elementType === 'diameter')) {
                    correct++;
                    el.style.backgroundColor = '#d4edda';
                } else if (zoneType === 'diameter' && elementType === 'diameter') {
                    correct++;
                    el.style.backgroundColor = '#d4edda';
                } else if (zoneType === 'radius' && elementType === 'radius') {
                    correct++;
                    el.style.backgroundColor = '#d4edda';
                } else {
                    el.style.backgroundColor = '#f8d7da';
                }
            });
        });
        
        const percentage = Math.round((correct / total) * 100);
        
        if (percentage === 100) {
            feedback.innerHTML = `
                <p style="color: #155724; background-color: #d4edda; padding: 15px; border-radius: 8px;">
                <i class="fas fa-check-circle"></i> <strong>Отлично!</strong> Все элементы распределены правильно! Вы отлично разбираетесь в классификации элементов окружности.
                </p>
            `;
        } else {
            feedback.innerHTML = `
                <p style="color: #856404; background-color: #fff3cd; padding: 15px; border-radius: 8px;">
                <i class="fas fa-exclamation-triangle"></i> <strong>Почти получилось!</strong> Вы правильно распределили ${correct} из ${total} элементов (${percentage}%). 
                Обратите внимание на элементы, выделенные красным цветом.
                </p>
            `;
        }
    });
    
    // Сброс задания
    resetBtn.addEventListener('click', function() {
        // Очищаем зоны
        dropZones.forEach(zone => {
            const zoneContent = zone.querySelector('.zone-content');
            zoneContent.innerHTML = '';
        });
        
        // Восстанавливаем исходный контейнер
        draggableContainer.innerHTML = '';
        shuffledElements.forEach(el => {
            const div = document.createElement('div');
            div.className = 'draggable-element';
            div.textContent = el.label;
            div.setAttribute('draggable', 'true');
            div.dataset.id = el.id;
            div.dataset.type = el.type;
            div.title = el.description;
            
            div.addEventListener('dragstart', handleDragStart);
            draggableContainer.appendChild(div);
        });
        
        feedback.innerHTML = '';
    });
}

// Создание чертежа для задания 2 с подписями точек
function createTask2Diagram(elements) {
    const svg = document.getElementById('task2-elements');
    svg.innerHTML = '';
    
    // Центр и радиус (соответствует viewBox)
    const cx = 200, cy = 200, r = 140;
    
    // Обновленные позиции для элементов
    // В функции createTask2Diagram() замените объект positions на этот:

const positions = {
    'AB': { 
        type: 'chord', 
        color: '#f39c12',
        points: [
            { angle: 0.8, label: 'A', offsetX: 15, offsetY: 0 },  // Увеличил с -5,-10
            { angle: 2.0, label: 'B', offsetX: -8, offsetY: 18 }    // Увеличил с 5,-10
        ]
    },
    'CD': { 
        type: 'chord', 
        color: '#f39c12',
        points: [
            { angle: 1.2, label: 'C', offsetX: 5, offsetY: 15 },   // Увеличил с -5,10
            { angle: 2.8, label: 'D', offsetX: -15, offsetY: 15 }     // Увеличил с 5,10
        ]
    },
    'EF': { 
        type: 'chord', 
        color: '#f39c12',
        points: [
            { angle: 0.3, label: 'E', offsetX: 10, offsetY: 10 },  // Увеличил с -5,-10
            { angle: 1.5, label: 'F', offsetX: 6, offsetY: 18 }    // Увеличил с 5,-10
        ]
    },
    'GH': { 
        type: 'diameter', 
        color: '#2ecc71',
        points: [
            { angle: 0.1, label: 'G', offsetX: 10, offsetY: 0 },  // Увеличил с -5,-10
            { angle: Math.PI + 0.1, label: 'H', offsetX: -18, offsetY: 0 } // Увеличил с 5,10
        ]
    },
    'IJ': { 
        type: 'diameter', 
        color: '#2ecc71',
        points: [
            { angle: 1.0, label: 'I', offsetX: 5, offsetY: 15 },   // Увеличил с -5,10
            { angle: Math.PI + 1.0, label: 'J', offsetX: -5, offsetY: -8 } // Увеличил с 5,-10
        ]
    },
    'OK': { 
        type: 'radius', 
        color: '#e74c3c',
        points: [
            { angle: 2.5, label: 'K', offsetX: -15, offsetY: 10 }    // Увеличил с 5,-10
        ]
    },
    'OL': { 
        type: 'radius', 
        color: '#e74c3c',
        points: [
            { angle: 3.8, label: 'L', offsetX: -12, offsetY: -5 }    // Увеличил с -5,10
        ]
    },
    'MN': { 
        type: 'other', 
        color: '#95a5a6',
        points: [
            { x: 50, y: 50, label: 'M', offsetX: -20, offsetY: -15 }, // Увеличил с -15,-10
            { x: 350, y: 350, label: 'N', offsetX: 12, offsetY: 0 } // Увеличил с 5,-10
        ]
    }
};
    
    // Отрисовываем все элементы
    elements.forEach(el => {
        const pos = positions[el.id];
        
        if (pos.type === 'radius') {
            // Радиус
            const point = pos.points[0];
            let x, y;
            
            if (point.angle !== undefined) {
                x = cx + r * Math.cos(point.angle);
                y = cy + r * Math.sin(point.angle);
            } else {
                x = point.x;
                y = point.y;
            }
            
            // Линия радиуса
            svg.innerHTML += `
                <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" 
                      stroke="${pos.color}" stroke-width="3" />
                <circle cx="${x}" cy="${y}" r="4" fill="${pos.color}" />
                <text x="${x + point.offsetX}" y="${y + point.offsetY}" 
                      font-size="14" fill="#2c3e50">${point.label}</text>
            `;
            
        } else if (pos.type === 'diameter' || pos.type === 'chord') {
            // Хорда или диаметр
            const point1 = pos.points[0];
            const point2 = pos.points[1];
            
            let x1, y1, x2, y2;
            
            if (point1.angle !== undefined) {
                x1 = cx + r * Math.cos(point1.angle);
                y1 = cy + r * Math.sin(point1.angle);
                x2 = cx + r * Math.cos(point2.angle);
                y2 = cy + r * Math.sin(point2.angle);
            } else {
                x1 = point1.x;
                y1 = point1.y;
                x2 = point2.x;
                y2 = point2.y;
            }
            
            // Линия хорды/диаметра
            svg.innerHTML += `
                <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                      stroke="${pos.color}" stroke-width="3" />
                <circle cx="${x1}" cy="${y1}" r="4" fill="${pos.color}" />
                <circle cx="${x2}" cy="${y2}" r="4" fill="${pos.color}" />
                <text x="${x1 + point1.offsetX}" y="${y1 + point1.offsetY}" 
                      font-size="14" fill="#2c3e50">${point1.label}</text>
                <text x="${x2 + point2.offsetX}" y="${y2 + point2.offsetY}" 
                      font-size="14" fill="#2c3e50">${point2.label}</text>
            `;
            
        } else if (pos.type === 'other') {
            // Отрезок, не являющийся хордой
            const point1 = pos.points[0];
            const point2 = pos.points[1];
            
            // Линия
            svg.innerHTML += `
                <line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}" 
                      stroke="${pos.color}" stroke-width="3" stroke-dasharray="5,5" />
                <circle cx="${point1.x}" cy="${point1.y}" r="4" fill="${pos.color}" />
                <circle cx="${point2.x}" cy="${point2.y}" r="4" fill="${pos.color}" />
                <text x="${point1.x + point1.offsetX}" y="${point1.y + point1.offsetY}" 
                      font-size="14" fill="#2c3e50">${point1.label}</text>
                <text x="${point2.x + point2.offsetX}" y="${point2.y + point2.offsetY}" 
                      font-size="14" fill="#2c3e50">${point2.label}</text>
            `;
        }
    });
}

// ==================== ЗАДАНИЕ 3 ====================
// ==================== ЗАДАНИЕ 3 ====================
function initTask3() {
    // Перемешиваем утверждения
    const shuffledStatements = [...statements].sort(() => Math.random() - 0.5);
    
    const statementText = document.getElementById('statement-text');
    const explanationText = document.getElementById('explanation-text');
    const explanationContainer = document.getElementById('explanation-container');
    const prevBtn = document.getElementById('prev-statement');
    const nextBtn = document.getElementById('next-statement');
    const progressBar = document.getElementById('progress-bar');
    const currentStatementSpan = document.getElementById('current-statement');
    const totalStatementsSpan = document.getElementById('total-statements');
    const task3CorrectSpan = document.getElementById('task3-correct');
    const task3IncorrectSpan = document.getElementById('task3-incorrect');
    
    const trueBtn = document.querySelector('.true-btn');
    const falseBtn = document.querySelector('.false-btn');
    
    totalStatementsSpan.textContent = shuffledStatements.length;
    
    // Добавим переменную для отслеживания завершения
    let isTask3Completed = false;
    
    // Функция для подсчета результатов
    function calculateResults() {
        let correctCount = 0, incorrectCount = 0;
        for (let i = 0; i < task3Answers.length; i++) {
            if (task3Answers[i] !== null) {
                if (task3Answers[i] === shuffledStatements[i].isTrue) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            }
        }
        return { correctCount, incorrectCount };
    }
    
    // Функция для обновления отображения
    function updateDisplay() {
        const currentStatement = shuffledStatements[task3CurrentIndex];
        
        statementText.textContent = currentStatement.text;
        explanationText.textContent = currentStatement.explanation;
        
        // Сбрасываем стили кнопок и скрываем объяснение
        trueBtn.classList.remove('selected');
        falseBtn.classList.remove('selected');
        explanationContainer.style.display = 'none';
        
        // Если уже отвечали на этот вопрос, показываем ответ
        if (task3Answers[task3CurrentIndex] !== null) {
            const answer = task3Answers[task3CurrentIndex];
            const isCorrect = answer === currentStatement.isTrue;
            
            if (answer === true) {
                trueBtn.classList.add('selected');
            } else {
                falseBtn.classList.add('selected');
            }
            
            // Показываем объяснение
            explanationContainer.style.display = 'block';
            
            // Подсвечиваем кнопку в зависимости от правильности
            if (isCorrect) {
                trueBtn.style.backgroundColor = answer === true ? '#c3e6cb' : '#f8d7da';
                falseBtn.style.backgroundColor = answer === false ? '#c3e6cb' : '#f8d7da';
            } else {
                trueBtn.style.backgroundColor = answer === true ? '#f5c6cb' : '#f8d7da';
                falseBtn.style.backgroundColor = answer === false ? '#f5c6cb' : '#f8d7da';
            }
        } else {
            // Сбрасываем цвета кнопок
            trueBtn.style.backgroundColor = '';
            falseBtn.style.backgroundColor = '';
        }
        
        // Обновляем прогресс
        const progress = ((task3CurrentIndex + 1) / shuffledStatements.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        currentStatementSpan.textContent = task3CurrentIndex + 1;
        
        // Обновляем счетчики
        const { correctCount, incorrectCount } = calculateResults();
        task3CorrectSpan.textContent = correctCount;
        task3IncorrectSpan.textContent = incorrectCount;
        
        // Управляем кнопками навигации
        prevBtn.disabled = task3CurrentIndex === 0;
        
        // Кнопка "Далее" активна только если ответили на текущий вопрос
        // или если задание завершено (для показа результатов)
        const hasAnsweredCurrent = task3Answers[task3CurrentIndex] !== null;
        nextBtn.disabled = !hasAnsweredCurrent && !isTask3Completed;
        
        // Изменяем текст кнопки на последнем вопросе
        if (task3CurrentIndex === shuffledStatements.length - 1) {
            if (isTask3Completed) {
                nextBtn.innerHTML = '<i class="fas fa-chart-bar"></i> Результаты';
                nextBtn.disabled = false;
            } else if (hasAnsweredCurrent) {
                nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Завершить';
                nextBtn.disabled = false;
            } else {
                nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
            }
        } else {
            nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
        }
        
        // Если задание завершено, показываем финальный результат
        if (isTask3Completed) {
            showFinalResults();
        }
    }
    
    // Функция для показа финальных результатов
    function showFinalResults() {
        const { correctCount, incorrectCount } = calculateResults();
        const unansweredCount = shuffledStatements.length - (correctCount + incorrectCount);
        const percentage = Math.round((correctCount / shuffledStatements.length) * 100);
        
        explanationContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3><i class="fas fa-trophy"></i> Задание завершено!</h3>
                <p style="font-size: 1.2rem; margin: 15px 0;">
                    <strong>Итоговый результат:</strong>
                </p>
                <div style="display: flex; justify-content: center; gap: 30px; margin: 20px 0;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: #2ecc71; font-weight: bold;">${correctCount}</div>
                        <div>Правильно</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: #e74c3c; font-weight: bold;">${incorrectCount}</div>
                        <div>Неправильно</div>
                    </div>
                    ${unansweredCount > 0 ? `
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: #95a5a6; font-weight: bold;">${unansweredCount}</div>
                        <div>Без ответа</div>
                    </div>
                    ` : ''}
                </div>
                <div style="font-size: 2rem; color: ${percentage >= 80 ? '#2ecc71' : percentage >= 60 ? '#f39c12' : '#e74c3c'}; 
                     font-weight: bold; margin: 20px 0;">
                    ${percentage}%
                </div>
                <p style="font-size: 1.1rem; margin: 15px 0;">
                    ${percentage >= 80 ? 'Отличный результат!' : percentage >= 60 ? 'Хороший результат!' : 'Есть над чем поработать!'}
                </p>
                ${unansweredCount > 0 ? `
                <p style="color: #e74c3c; margin-top: 15px;">
                    <i class="fas fa-exclamation-triangle"></i> Вы не ответили на ${unansweredCount} вопросов.
                </p>
                ` : ''}
            </div>
        `;
        explanationContainer.style.display = 'block';
        
        // Блокируем кнопки ответов после завершения
        trueBtn.disabled = true;
        falseBtn.disabled = true;
        trueBtn.style.opacity = '0.6';
        falseBtn.style.opacity = '0.6';
        trueBtn.style.cursor = 'not-allowed';
        falseBtn.style.cursor = 'not-allowed';
        
        // Меняем текст кнопки "Назад" на "Посмотреть ответы"
        prevBtn.innerHTML = '<i class="fas fa-eye"></i> Ответы';
        prevBtn.disabled = false;
        
        // Обработчик для кнопки "Посмотреть ответы"
        prevBtn.onclick = function() {
            // Включаем режим просмотра ответов
            let viewIndex = 0;
            
            function showAnswer(index) {
                task3CurrentIndex = index;
                isTask3Completed = true; // Остаемся в режиме завершения
                updateDisplay();
            }
            
            // Показываем первый ответ
            showAnswer(0);
            
            // Обновляем обработчики для навигации по ответам
            prevBtn.onclick = function() {
                if (viewIndex > 0) {
                    viewIndex--;
                    showAnswer(viewIndex);
                }
            };
            
            nextBtn.onclick = function() {
                if (viewIndex < shuffledStatements.length - 1) {
                    viewIndex++;
                    showAnswer(viewIndex);
                }
            };
            
            // Обновляем текст кнопок
            prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Предыдущий';
            nextBtn.innerHTML = 'Следующий <i class="fas fa-arrow-right"></i>';
        };
    }
    
    // Обработка ответов
    trueBtn.addEventListener('click', function() {
        if (task3Answers[task3CurrentIndex] !== null || isTask3Completed) return;
        
        task3Answers[task3CurrentIndex] = true;
        updateDisplay();
    });
    
    falseBtn.addEventListener('click', function() {
        if (task3Answers[task3CurrentIndex] !== null || isTask3Completed) return;
        
        task3Answers[task3CurrentIndex] = false;
        updateDisplay();
    });
    
    // Навигация
    prevBtn.addEventListener('click', function() {
        if (task3CurrentIndex > 0 && !isTask3Completed) {
            task3CurrentIndex--;
            updateDisplay();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (isTask3Completed) {
            // Уже завершено - показываем результаты
            showFinalResults();
            return;
        }
        
        if (task3Answers[task3CurrentIndex] === null) {
            // Показываем предупреждение, если не ответили
            explanationContainer.innerHTML = `
                <div style="color: #856404; background-color: #fff3cd; padding: 15px; border-radius: 8px; text-align: center;">
                    <i class="fas fa-exclamation-triangle"></i> 
                    <strong>Сначала ответьте на вопрос!</strong>
                    <p style="margin-top: 10px;">Выберите "Верно" или "Неверно" для текущего утверждения.</p>
                </div>
            `;
            explanationContainer.style.display = 'block';
            return;
        }
        
        if (task3CurrentIndex < shuffledStatements.length - 1) {
            task3CurrentIndex++;
            updateDisplay();
        } else {
            // Последний вопрос - завершаем задание
            isTask3Completed = true;
            updateDisplay();
        }
    });
    
    // Инициализация первого утверждения
    updateDisplay();
}