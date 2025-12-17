const QUIZ_CONTAINER = document.getElementById('quiz-container');
const QUIZ_FORM = document.getElementById('quiz-form');
const USER_INFO_FORM = document.getElementById('user-info-form');
const RESULTS_DIV = document.getElementById('results');

const EXECUTOR_NAME = 'Халамандик Анастасія'; 
const EXECUTOR_GROUP = 'ТР-43';
const VARIANT_THEME = 'СТРІЛКОВІ ФУНКЦІЇ ТА ДЕСТРУКТУРИЗАЦІЯ';

let USER_NAME = '';
let USER_GROUP = '';
const QUESTION_BANK = [
    // --- ПОЧАТКОВИЙ РІВЕНЬ (INITIAL) - 15 питань ---
    {
        type: 'radio', level: 'initial', question: 'Який синтаксис використовується для створення стрілкової функції?',
        options: ['function() => {}', 'const func = function() => {}', 'const func = () => {}', 'const func = new ArrowFunction()'],
        answer: 'const func = () => {}', points: 1
    },
    {
        type: 'select', level: 'initial', question: 'Як називається синтаксис, що дозволяє витягувати значення з об\'єктів чи масивів в окремі змінні?',
        options: ['Прототипування', 'Наслідування', 'Деструктуризація', 'Конкатенація'],
        answer: 'Деструктуризація', points: 1
    },
    {
        type: 'radio', level: 'initial', question: 'Чи потрібно використовувати ключове слово `return` у стрілковій функції, якщо тіло функції складається лише з одного виразу?',
        options: ['Так, завжди', 'Ні, воно не потрібне (неявний return)', 'Тільки якщо вираз повертає число', 'Тільки якщо використовується `this`'],
        answer: 'Ні, воно не потрібне (неявний return)', points: 1
    },
    {
        type: 'fill_in', level: 'initial', question: 'Щоб витягнути властивості `name` та `age` з об\'єкта `user`, використовують: const { ____, ____ } = user;',
        answers: ['name', 'age'], points: 1
    },
    {
        type: 'checkbox', level: 'initial', question: 'Які символи використовуються для деструктуризації **масиву**?',
        options: ['{ }', '[ ]', '< >', '( )'],
        answer: ['[ ]'], points: 1
    },
    {
        type: 'radio', level: 'initial', question: 'Яка стрілкова функція є еквівалентом function double(x) { return x * 2; }?',
        options: ['const double = x => x * 2;', 'const double = (x) { x * 2; }', 'const double => x * 2;', 'const double = x -> x * 2;'],
        answer: 'const double = x => x * 2;', points: 1
    },
    {
        type: 'select', level: 'initial', question: 'Що отримаємо після виконання: const [a, b] = [10, 20];?',
        options: ['a = [10, 20], b = undefined', 'a = 10, b = 20', 'a = 20, b = 10', 'Помилка синтаксису'],
        answer: 'a = 10, b = 20', points: 1
    },
    {
        type: 'radio', level: 'initial', question: 'Чи можна використовувати стрілкові функції як методи об\'єкта?',
        options: ['Так, завжди', 'Ні, ніколи', 'Так, але вони не матимуть власного this', 'Тільки в класах'],
        answer: 'Так, але вони не матимуть власного this', points: 1
    },
    {
        type: 'checkbox', level: 'initial', question: 'Які твердження про деструктуризацію є правильними?',
        options: ['Працює тільки з масивами', 'Працює з об\'єктами та масивами', 'Дозволяє витягувати вкладені значення', 'Не підтримується в JavaScript'],
        answer: ['Працює з об\'єктами та масивами', 'Дозволяє витягувати вкладені значення'], points: 1
    },
    {
        type: 'fill_in', level: 'initial', question: 'Стрілкова функція записується з використанням символу ____.',
        answers: ['=>'], points: 1
    },
    {
        type: 'select', level: 'initial', question: 'Що виведе код: const arr = [1, 2, 3]; const [x] = arr; console.log(x);?',
        options: ['undefined', '1', '[1, 2, 3]', '3'],
        answer: '1', points: 1
    },
    {
        type: 'radio', level: 'initial', question: 'Скільки параметрів може приймати стрілкова функція?',
        options: ['Тільки один', 'Від 0 до 2', 'Будь-яку кількість', 'Тільки два'],
        answer: 'Будь-яку кількість', points: 1
    },
    {
        type: 'checkbox', level: 'initial', question: 'Які з цих записів є правильним синтаксисом стрілкових функцій?',
        options: ['() => 5', 'x => x + 1', '(a, b) => a + b', 'function => result'],
        answer: ['() => 5', 'x => x + 1', '(a, b) => a + b'], points: 1
    },
    {
        type: 'fill_in', level: 'initial', question: 'Для деструктуризації об\'єкта використовуються ____ дужки.',
        answers: ['фігурні'], points: 1
    },
    {
        type: 'radio', level: 'initial', question: 'Що станеться, якщо при деструктуризації масиву змінних більше, ніж елементів?',
        options: ['Помилка', 'Зайві змінні отримають undefined', 'Зайві змінні отримають null', 'Код не виконається'],
        answer: 'Зайві змінні отримають undefined', points: 1
    },

    // --- СЕРЕДНІЙ РІВЕНЬ (MEDIUM) - 15 питань ---
    {
        type: 'checkbox', level: 'medium', question: 'Які з перелічених особливостей властиві Стрілковим функціям (Arrow Functions)?',
        options: ['Вони можуть бути використані як конструктори', 'Вони не мають власного `this`', 'Вони завжди повертають значення неявно', 'Вони не мають власного `arguments`'],
        answer: ['Вони не мають власного `this`', 'Вони не мають власного `arguments`'], points: 2
    },
    {
        type: 'code_write', level: 'medium', question: 'Перепишіть функцію у вигляді стрілкової, використовуючи неявне повернення (без фігурних дужок).',
        code: 'function multiply(a, b) { return a * b; }',
        expected: 'const multiply = (a, b) => a * b;', points: 3
    },
    {
        type: 'debugging', level: 'medium', question: 'Виправте помилку. Код не працює, оскільки деструктуризація об\'єкта не використовує символи масиву.',
        code: 'const [title, author] = { title: "JS Book", author: "Anon" };',
        expected: 'const { title, author } = { title: "JS Book", author: "Anon" };', points: 3
    },
    {
        type: 'drag_drop', level: 'medium', question: 'Встановіть відповідність: який контекст `this` мають різні типи функцій?',
        items: ['Звичайна функція', 'Стрілкова функція'],
        targets: ['Має власний `this`', 'Бере `this` з зовнішнього оточення'],
        correctMapping: {
            'Звичайна функція': 'Має власний `this`',
            'Стрілкова функція': 'Бере `this` з зовнішнього оточення'
        },
        points: 3
    },
    {
        type: 'fill_in', level: 'medium', question: 'Щоб привласнити значення `first` та `second` елементам масиву `[10, 20, 30]`, використовують: const [ ____, ____ ] = [10, 20, 30];',
        answers: ['first', 'second'], points: 2
    },
    {
        type: 'radio', level: 'medium', question: 'Якщо при деструктуризації об\'єкта потрібне інше ім\'я змінної, як це зробити?',
        options: ['{ old: new }', '[ old: new ]', '{ old = new }', '{ old as new }'],
        answer: '{ old: new }', points: 2
    },
    {
        type: 'radio', level: 'medium', question: 'Що виведе код: const obj = {x: 1, y: 2}; const {x: a, y: b} = obj; console.log(a);?',
        options: ['undefined', 'x', '1', '{x: 1, y: 2}'],
        answer: '1', points: 2
    },
    {
        type: 'checkbox', level: 'medium', question: 'Які з наведених конструкцій є валідними стрілковими функціями?',
        options: ['const f = () => { return 5; }', 'const f = x => { x * 2 }', 'const f = (x, y) => x + y', 'const f = x, y => x + y'],
        answer: ['const f = () => { return 5; }', 'const f = (x, y) => x + y'], points: 2
    },
    {
        type: 'fill_in', level: 'medium', question: 'При деструктуризації масиву можна пропустити елементи, використовуючи ____ між комами.',
        answers: ['пробіли'], points: 2
    },
    {
        type: 'code_write', level: 'medium', question: 'Напишіть стрілкову функцію sum, що приймає два параметри та повертає їх суму з неявним return.',
        expected: 'const sum = (a, b) => a + b;', points: 3
    },
    {
        type: 'debugging', level: 'medium', question: 'Виправте помилку. Стрілкова функція з одним параметром не потребує дужок, але тут використано неправильний синтаксис.',
        code: 'const square = x) => x * x;',
        expected: 'const square = x => x * x;', points: 3
    },
    {
        type: 'radio', level: 'medium', question: 'Що станеться при спробі використати `new` зі стрілковою функцією?',
        options: ['Створить новий об\'єкт', 'Викине помилку', 'Поверне undefined', 'Поверне саму функцію'],
        answer: 'Викине помилку', points: 2
    },
    {
        type: 'select', level: 'medium', question: 'Який результат: const {a = 10} = {}; console.log(a);?',
        options: ['undefined', 'null', '10', 'Помилка'],
        answer: '10', points: 2
    },
    {
        type: 'checkbox', level: 'medium', question: 'У яких випадках стрілкові функції найбільш корисні?',
        options: ['Коли потрібен власний контекст this', 'Для коротких callback-функцій', 'Для методів класів', 'Для функцій вищого порядку (map, filter)'],
        answer: ['Для коротких callback-функцій', 'Для функцій вищого порядку (map, filter)'], points: 2
    },
    {
        type: 'fill_in', level: 'medium', question: 'Щоб деструктуризувати параметр функції, можна написати: function greet({ ____ }) { console.log(name); }',
        answers: ['name'], points: 2
    },

    // --- СКЛАДНИЙ РІВЕНЬ (HARD) - 15 питань ---
    {
        type: 'code_write', level: 'hard', question: 'Напишіть код, що витягує властивість `city` з вкладеного об\'єкта `address` у об\'єкті `user` за допомогою деструктуризації.',
        expected: 'const { address: { city } } = user;',
        points: 4
    },
    {
        type: 'checkbox', level: 'hard', question: 'Як можна встановити значення за замовчуванням (`default value`) під час деструктуризації?',
        options: ['Використовуючи оператор `||`', 'Використовуючи оператор `=`', 'Тільки для об\'єктів', 'Тільки для масивів'],
        answer: ['Використовуючи оператор `=`'], points: 3
    },
    {
        type: 'debugging', level: 'hard', question: 'Виправте помилку. Код втрачає контекст `this` при виклику `setTimeout`, оскільки використовується звичайна функція.',
        code: 'class Timer { constructor() { this.delay = 1000; setTimeout(function() { console.log(this.delay); }, 100); } }',
        expected: 'class Timer { constructor() { this.delay = 1000; setTimeout(() => { console.log(this.delay); }, 100); } }', points: 4
    },
    {
        type: 'fill_in', level: 'hard', question: 'Щоб зібрати всі решту елементів масиву при деструктуризації у змінну `rest`, використовують оператор ____.',
        answers: ['...rest'], points: 3
    },
    {
        type: 'drag_drop', level: 'hard', question: 'Встановіть відповідність: синтаксис деструктуризації з перейменуванням.',
        items: ['Об\'єкт', 'Масив'],
        targets: ['Перейменування через двокрапку: `{old: new}`', 'Перейменування неможливе, лише позиційний вибір'],
        correctMapping: {
            'Об\'єкт': 'Перейменування через двокрапку: `{old: new}`',
            'Масив': 'Перейменування неможливе, лише позиційний вибір'
        },
        points: 3
    },
    {
        type: 'code_write', level: 'hard', question: 'Напишіть деструктуризацію, що витягує перший елемент масиву у змінну `head` та всі інші у масив `tail`.',
        expected: 'const [head, ...tail] = array;',
        points: 4
    },
    {
        type: 'debugging', level: 'hard', question: 'Виправте помилку. Код намагається деструктуризувати масив як об\'єкт з індексами.',
        code: 'const {0: first, 1: second} = [10, 20];',
        expected: 'const [first, second] = [10, 20];', points: 4
    },
    {
        type: 'radio', level: 'hard', question: 'Що виведе: const f = (x = 5) => x * 2; console.log(f());?',
        options: ['undefined', 'NaN', '10', 'Помилка'],
        answer: '10', points: 3
    },
    {
        type: 'checkbox', level: 'hard', question: 'Які з цих тверджень про rest-параметри (...) є правильними?',
        options: ['Можуть бути використані тільки останніми', 'Створюють справжній масив', 'Можна використати декілька rest-параметрів', 'Працюють тільки з масивами'],
        answer: ['Можуть бути використані тільки останніми', 'Створюють справжній масив'], points: 3
    },
    {
        type: 'fill_in', level: 'hard', question: 'У стрілкових функцій немає власного об\'єкта ____, тому для доступу до аргументів використовують rest-параметри.',
        answers: ['arguments'], points: 3
    },
    {
        type: 'code_write', level: 'hard', question: 'Напишіть деструктуризацію з перейменуванням та значенням за замовчуванням: витягти `name` як `userName` зі значенням "Guest" за замовчуванням.',
        expected: 'const { name: userName = "Guest" } = obj;',
        points: 4
    },
    {
        type: 'debugging', level: 'hard', question: 'Виправте помилку. Код намагається повернути об\'єкт, але {} сприймається як тіло функції.',
        code: 'const getUser = () => {name: "Anna", age: 25};',
        expected: 'const getUser = () => ({name: "Anna", age: 25});', points: 4
    },
    {
        type: 'select', level: 'hard', question: 'Що станеться при виконанні: const [...arr] = "Hello"; console.log(arr);?',
        options: ['Помилка', '["Hello"]', '["H", "e", "l", "l", "o"]', 'undefined'],
        answer: '["H", "e", "l", "l", "o"]', points: 3
    },
    {
        type: 'checkbox', level: 'hard', question: 'Які особливості має вкладена деструктуризація?',
        options: ['Дозволяє витягувати глибоко вкладені значення', 'Працює тільки з об\'єктами', 'Може комбінувати об\'єкти та масиви', 'Обмежена двома рівнями вкладеності'],
        answer: ['Дозволяє витягувати глибоко вкладені значення', 'Може комбінувати об\'єкти та масиви'], points: 3
    },
    {
        type: 'fill_in', level: 'hard', question: 'Щоб пропустити елементи при деструктуризації масиву, використовують ____ кому.',
        answers: ['порожню'], points: 3
    },
];

class Question {
    constructor({ type, question, points, ...rest }) {
        this.type = type;
        this.question = question;
        this.points = points;
        this.id = `q-${Math.random().toString(36).substr(2, 9)}`;
    }
    shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }
    render = (container) => {
        container.innerHTML += `<div class="question"><h4>(Помилка рендерингу) Невідомий тип питання: ${this.type}</h4></div>`;
    }
    checkAnswer = () => 0;
}

class RadioQuestion extends Question {
    constructor({ options, answer, ...data }) {
        super(data);
        this.options = options;
        this.correctAnswer = answer;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'radio-question');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бал)</h4>`;
        const shuffledOptions = this.shuffleArray([...this.options]);
        shuffledOptions.forEach((option) => {
            qDiv.innerHTML += `<label><input type="radio" name="${this.id}" value="${option}"> ${option}</label><br>`;
        });
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        const selected = document.querySelector(`input[name="${this.id}"]:checked`);
        if (selected && selected.value === this.correctAnswer) {
            return this.points;
        }
        return 0;
    }
}

class CheckboxQuestion extends Question {
    constructor({ options, answer, ...data }) {
        super(data);
        this.options = options;
        this.correctAnswers = answer;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'checkbox-question');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бали)</h4><p>Виберіть усі правильні варіанти:</p>`;
        const shuffledOptions = this.shuffleArray([...this.options]);
        shuffledOptions.forEach((option) => {
            qDiv.innerHTML += `<label><input type="checkbox" name="${this.id}" value="${option}"> ${option}</label><br>`;
        });
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        const checked = Array.from(document.querySelectorAll(`input[name="${this.id}"]:checked`)).map(el => el.value);
        const correctCount = checked.filter(val => this.correctAnswers.includes(val)).length;
        const totalChecked = checked.length;
        const totalCorrect = this.correctAnswers.length;

        if (correctCount === totalCorrect && totalChecked === totalCorrect) {
            return this.points;
        }
        return 0;
    }
}

class SelectQuestion extends Question {
    constructor({ options, answer, ...data }) {
        super(data);
        this.options = options;
        this.correctAnswer = answer;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'select-question');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бал)</h4>`;
        const shuffledOptions = this.shuffleArray([...this.options]);

        let optionsHtml = `<option value="">-- Виберіть відповідь --</option>` + 
            shuffledOptions.map((option) =>
                `<option value="${option}">${option}</option>`
            ).join('');

        qDiv.innerHTML += `<select name="${this.id}">${optionsHtml}</select>`;
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        const select = document.querySelector(`select[name="${this.id}"]`);
        if (select && select.value === this.correctAnswer) {
            return this.points;
        }
        return 0;
    }
}

class DragDropQuestion extends Question {
    constructor({ items, targets, correctMapping, ...data }) {
        super(data);
        this.items = items;
        this.targets = targets;
        this.correctMapping = correctMapping;
        this.currentMapping = {};
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'drag-drop-question');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бали)</h4>`;

        const ddContainer = document.createElement('div');
        ddContainer.classList.add('drag-drop-container');
        const dragSource = document.createElement('div');
        dragSource.classList.add('drag-source');
        dragSource.id = `${this.id}-source`;

        const dropTargetContainer = document.createElement('div');
        dropTargetContainer.classList.add('drop-target-container');

        this.shuffleArray([...this.items]).forEach((item, index) => {
            const el = document.createElement('div');
            el.classList.add('draggable-item');
            el.setAttribute('draggable', 'true');
            el.id = `${this.id}-item-${index}`;
            el.textContent = item;
            dragSource.appendChild(el);
            this.setupDrag(el);
        });

        this.targets.forEach((target, index) => {
            const targetDiv = document.createElement('div');
            targetDiv.classList.add('drop-target');
            targetDiv.id = `${this.id}-target-${index}`;
            targetDiv.innerHTML = `<strong>${target}</strong>`;
            dropTargetContainer.appendChild(targetDiv);
            this.setupDrop(targetDiv, target);
        });

        ddContainer.appendChild(dragSource);
        ddContainer.appendChild(dropTargetContainer);
        qDiv.appendChild(ddContainer);
        container.appendChild(qDiv);
    }

    setupDrag = (item) => {
        item.addEventListener('dragstart', (e) => {
            const { dataTransfer, target } = e;
            dataTransfer.setData('text/plain', target.id);
        });
    }
    setupDrop = (targetDiv, targetText) => {
        targetDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        targetDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const { dataTransfer, currentTarget } = e;
            const id = dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);

            if (currentTarget.children.length > 1) {
                document.getElementById(`${this.id}-source`).appendChild(currentTarget.children[1]);
            }

            currentTarget.appendChild(draggedElement);
            this.currentMapping[draggedElement.textContent] = targetText;
        });
    }
    checkAnswer = () => {
        let correctMatches = 0;
        const totalItems = this.items.length;

        for (const item in this.correctMapping) {
            if (this.currentMapping[item] === this.correctMapping[item]) {
                correctMatches++;
            }
        }
        return Math.floor((correctMatches / totalItems) * this.points);
    }
}

class FillInQuestion extends Question {
    constructor({ answers, ...data }) {
        super(data);
        this.questionHtml = this.generateHtml(data.question, answers.length);
        this.correctAnswers = answers.map((a) => a.toLowerCase().trim());
    }
    generateHtml = (question, count) => {
        let html = question;
        for (let i = 0; i < count; i++) {
            html = html.replace('____', `<input type="text" id="${this.id}-${i}" data-index="${i}" required>`);
        }
        return html;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'fill-in-the-blank');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бали)</h4><p>${this.questionHtml}</p>`;
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        let score = 0;
        const inputs = document.querySelectorAll(`input[id^="${this.id}-"]`);
        inputs.forEach((input, index) => {
            const userAnswer = input.value.toLowerCase().trim();
            const { points } = this;
            if (userAnswer === this.correctAnswers[index]) {
                score += (points / this.correctAnswers.length);
            }
        });
        return Math.round(score);
    }
}

class DebuggingQuestion extends Question {
    constructor({ code, expected, ...data }) {
        super(data);
        this.code = code;
        this.expected = expected;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'debugging-question');
        qDiv.innerHTML = `<h4>${this.question} ( ${this.points} бали)</h4>
                              <p>Помилковий код:</p>
                              <pre class="code-block">${this.code}</pre>
                              <p>Виправлений код:</p>
                              <textarea id="${this.id}" rows="4" required placeholder="Введіть виправлений рядок коду"></textarea>`;
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        const input = document.getElementById(this.id);
        const userAnswer = input.value.trim();
        if (userAnswer === this.expected.trim()) {
            return this.points;
        }
        return 0;
    }
}

class CodeWritingQuestion extends Question {
    constructor({ expected, code, ...data }) {
        super(data);
        this.expected = expected.trim();
        this.code = code || null;
    }
    render = (container) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question', 'code-writing-question');
        
        let questionHtml = `<h4>${this.question} ( ${this.points} бали)</h4>`;
        
        if (this.code) {
            questionHtml += `<p>Початковий код:</p><pre class="code-block">${this.code}</pre><p>Ваше рішення:</p>`;
        }
        
        questionHtml += `<textarea id="${this.id}" rows="6" required placeholder="Напишіть Ваш JavaScript код тут"></textarea>`;
        
        qDiv.innerHTML = questionHtml;
        container.appendChild(qDiv);
    }
    checkAnswer = () => {
        const input = document.getElementById(this.id);
        const userAnswer = input.value.trim().replace(/\s/g, '');
        const expected = this.expected.replace(/\s/g, '');

        if (userAnswer.includes(expected) || expected.includes(userAnswer)) {
            return this.points;
        }
        return 0;
    }
}


class Quiz {
    constructor(questionsData, level) {
        this.questionsData = questionsData;
        this.level = level;
        this.score = 0;
        this.currentQuestions = [];
    }

    getQuestionsForLevel = () => {
        return this.questionsData.filter((q) => q.level === this.level);
    }

    start = () => {
        const availableQuestions = this.getQuestionsForLevel();

        const selectedData = availableQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        this.currentQuestions = selectedData.map((data) => {
            switch (data.type) {
                case 'radio': return new RadioQuestion(data);
                case 'checkbox': return new CheckboxQuestion(data);
                case 'select': return new SelectQuestion(data);
                case 'drag_drop': return new DragDropQuestion(data);
                case 'fill_in': return new FillInQuestion(data);
                case 'debugging': return new DebuggingQuestion(data);
                case 'code_write': return new CodeWritingQuestion(data);
                default:
                    return new Question(data);
            }
        });

        this.renderQuiz();
        QUIZ_FORM.addEventListener('submit', this.handleSubmit);
        document.getElementById('finish-button').style.display = 'block';
    }

    renderQuiz = () => {
        QUIZ_CONTAINER.innerHTML = '';
        this.currentQuestions.forEach((q) => q.render(QUIZ_CONTAINER));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.score = this.currentQuestions.reduce((total, q) => total + q.checkAnswer(), 0);
        this.displayResults();
    }

    displayResults = () => {
        QUIZ_FORM.style.display = 'none';
        RESULTS_DIV.style.display = 'block';

        const maxScore = this.currentQuestions.reduce((sum, q) => sum + q.points, 0);

        const { score, level } = this;
        document.getElementById('final-score').textContent = `Користувач: ${USER_NAME} (${USER_GROUP}), Ваш результат на рівні "${level}": ${score} / ${maxScore} балів.`;

        this.saveResultsToLocalStorage(USER_NAME, USER_GROUP);
        this.displayStorageHistory();
    }

    saveResultsToLocalStorage = (name, group) => {
        const { score, level } = this;
        const result = {
            name,
            group,
            score,
            level,
            executor: EXECUTOR_NAME,
            executorGroup: EXECUTOR_GROUP,
            timestamp: new Date().toLocaleString()
        };

        // Зберігаємо останній результат
        localStorage.setItem('lastQuizResult', JSON.stringify(result));

        // Зберігаємо в історію всіх результатів
        let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));

        const info = `Ваш результат збережено у localStorage! Останній тест: ${result.timestamp}.`;
        document.getElementById('local-storage-info').textContent = info;
    }

    displayStorageHistory = () => {
        const historyContainer = document.getElementById('storage-history');
        if (!historyContainer) return;

        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        
        if (history.length === 0) {
            historyContainer.innerHTML = '<p>Історія тестів порожня.</p>';
            return;
        }

        let historyHtml = '<h4>📊 Історія всіх результатів:</h4><div class="history-list">';
        
        history.forEach((result, index) => {
            historyHtml += `
                <div class="history-item">
                    <strong>#${index + 1}</strong> | 
                    <span>${result.name}</span> (${result.group}) | 
                    Рівень: <em>${result.level}</em> | 
                    Бали: <strong>${result.score}</strong> | 
                    Дата: ${result.timestamp}
                </div>
            `;
        });
        
        historyHtml += '</div>';
        historyContainer.innerHTML = historyHtml;
    }
}

// ІНІЦІАЛІЗАЦІЯ
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header h2').textContent = `ТЕМА: ${VARIANT_THEME}`;
    updateHeaderInfo(); // Оновлюємо інформацію в хедері при завантаженні
    USER_INFO_FORM.addEventListener('submit', handleUserInfoSubmit);
});

// Функція для оновлення інформації в хедері
const updateHeaderInfo = () => {
    const headerInfo = document.querySelector('.header-content p');
    if (USER_NAME && USER_GROUP) {
        headerInfo.textContent = `Група: ${USER_GROUP} | ПІБ: ${USER_NAME}`;
    } else {
        headerInfo.textContent = `Група: ТР-43 | ПІБ: Халаминдик Анастасія`;
    }
};


const handleUserInfoSubmit = (event) => {
    event.preventDefault(); 

    const nameInput = document.getElementById('name-input');
    const groupInput = document.getElementById('group-input');
    const levelSelect = document.getElementById('level-select');
    const validationMessage = document.getElementById('validation-message');

    const { value: nameValue } = nameInput;
    const { value: groupValue } = groupInput;
    const { value: levelValue } = levelSelect;

    validationMessage.textContent = '';
    let isValid = true;

    if (!nameInput.checkValidity()) {
        validationMessage.textContent += 'Ім\'я: мінімум 2 символи. ';
        isValid = false;
    }

    if (groupValue === '') {
        validationMessage.textContent += 'Будь ласка, оберіть групу зі списку. ';
        isValid = false;
    }

    if (levelValue === '') {
        validationMessage.textContent += 'Будь ласка, оберіть рівень складності.';
        isValid = false;
    }

    if (isValid) {
        USER_NAME = nameValue;
        USER_GROUP = groupValue;

        updateHeaderInfo();

        USER_INFO_FORM.style.display = 'none';
        QUIZ_FORM.style.display = 'block';

        const quiz = new Quiz(QUESTION_BANK, levelValue);
        quiz.start();
    }
}