document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o botão de alternância de tema
    const themeToggle = document.getElementById('theme-toggle');
    
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não houver tema salvo, verificar preferência do sistema
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Adicionar evento de clique ao botão de tema
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            // Mudar para tema claro
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            // Mudar para tema escuro
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Código da calculadora
    // Selecionando os elementos
    const visor = document.querySelector('.visor h1');
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operador');
    const equalButton = document.getElementById('equal');
    const clearButton = document.getElementById('clear');
    const pointButton = document.getElementById('point');
    
    // Variáveis para armazenar os valores e operações
    let currentValue = '0';
    let previousValue = '';
    let currentOperator = null;
    let shouldResetScreen = false;
    
    // Função para atualizar o visor
    function updateDisplay() {
        visor.textContent = currentValue;
    }
    
    // Adicionar evento aos botões numéricos
    numbers.forEach(button => {
        button.addEventListener('click', () => {
            inputNumber(button.textContent);
        });
    });
    
    // Função para inserir números
    function inputNumber(number) {
        if (shouldResetScreen) {
            currentValue = number;
            shouldResetScreen = false;
        } else {
            currentValue = currentValue === '0' ? number : currentValue + number;
        }
        updateDisplay();
    }
    
    // Adicionar evento aos botões de operação
    operators.forEach(button => {
        if (button.id !== 'equal' && button.id !== 'point') {
            button.addEventListener('click', () => {
                inputOperator(button.textContent);
            });
        }
    });
    
    // Função para inserir operador
    function inputOperator(operator) {
        if (currentOperator !== null && !shouldResetScreen) {
            calculate();
        }
        previousValue = currentValue;
        currentOperator = operator;
        shouldResetScreen = true;
    }
    
    // Adicionar evento ao botão de ponto decimal
    pointButton.addEventListener('click', () => {
        inputDecimal();
    });
    
    // Função para inserir decimal
    function inputDecimal() {
        if (shouldResetScreen) {
            currentValue = '0.';
            shouldResetScreen = false;
        } else if (!currentValue.includes('.')) {
            currentValue += '.';
        }
        updateDisplay();
    }
    
    // Adicionar evento ao botão de igual
    equalButton.addEventListener('click', () => {
        calculate();
    });
    
    // Função para calcular
    function calculate() {
        if (currentOperator === null || shouldResetScreen) return;
        
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        let result;
        
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentValue = String(result);
        currentOperator = null;
        shouldResetScreen = true;
        updateDisplay();
    }
    
    // Adicionar evento ao botão de limpar
    clearButton.addEventListener('click', () => {
        clear();
    });
    
    // Função para limpar
    function clear() {
        currentValue = '0';
        previousValue = '';
        currentOperator = null;
        shouldResetScreen = false;
        updateDisplay();
    }
    
    // Inicializar o display
    updateDisplay();
});