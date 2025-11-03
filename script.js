// Calculator state
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetInput = false;
let calculationHistory = [];

// DOM Elements
const inputDisplay = document.getElementById('input');
const resultDisplay = document.getElementById('result');
const explanationContent = document.getElementById('explanation-content');
const buttons = document.querySelectorAll('.btn');

// Initialize calculator
function init() {
    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.dataset.value));
    });
    
    // Add keyboard support
    document.addEventListener('keydown', handleKeyDown);
}

// Handle button clicks
function handleButtonClick(value) {
    if (value === 'clear') {
        clearCalculator();
    } else if (value === 'backspace') {
        handleBackspace();
    } else if (value === '=') {
        calculateResult();
    } else if (value === 'explain') {
        explainCalculation();
    } else if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln'].includes(value)) {
        handleFunction(value);
    } else if (value === 'pi') {
        updateInput(Math.PI.toString());
    } else if (value === 'e') {
        updateInput(Math.E.toString());
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        handleOperator(value);
    } else {
        // Handle numbers and decimal point
        handleNumber(value);
    }
    
    updateDisplay();
}

// Handle keyboard input
function handleKeyDown(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        handleButtonClick(key);
    } else if (key === '.') {
        handleButtonClick('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleButtonClick(key);
    } else if (key === 'Enter') {
        handleButtonClick('=');
    } else if (key === 'Escape') {
        handleButtonClick('clear');
    } else if (key === 'Backspace') {
        handleButtonClick('backspace');
    }
}

// Clear calculator
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resultDisplay.textContent = '';
}

// Handle backspace
function handleBackspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

// Handle number input
function handleNumber(value) {
    if (shouldResetInput) {
        currentInput = value;
        shouldResetInput = false;
    } else if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        // Prevent multiple decimal points
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }
}

// Handle operator
function handleOperator(value) {
    if (operation !== null) {
        calculateResult();
    }
    
    previousInput = currentInput;
    operation = value;
    shouldResetInput = true;
}

// Handle mathematical functions
function handleFunction(func) {
    const num = parseFloat(currentInput);
    let result;
    
    switch (func) {
        case 'sin':
            result = Math.sin(num * (Math.PI / 180)); // Convert to radians
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `sin(${num}°) = ${result.toFixed(6)}`;
            break;
        case 'cos':
            result = Math.cos(num * (Math.PI / 180)); // Convert to radians
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `cos(${num}°) = ${result.toFixed(6)}`;
            break;
        case 'tan':
            result = Math.tan(num * (Math.PI / 180)); // Convert to radians
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `tan(${num}°) = ${result.toFixed(6)}`;
            break;
        case 'sqrt':
            if (num < 0) {
                resultDisplay.textContent = 'Error: Cannot calculate square root of negative number';
                return;
            }
            result = Math.sqrt(num);
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `√${num} = ${result.toFixed(6)}`;
            break;
        case 'log':
            if (num <= 0) {
                resultDisplay.textContent = 'Error: Cannot calculate log of non-positive number';
                return;
            }
            result = Math.log10(num);
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `log₁₀(${num}) = ${result.toFixed(6)}`;
            break;
        case 'ln':
            if (num <= 0) {
                resultDisplay.textContent = 'Error: Cannot calculate ln of non-positive number';
                return;
            }
            result = Math.log(num);
            calculationHistory.push({ type: 'function', function: func, input: num, result: result });
            resultDisplay.textContent = `ln(${num}) = ${result.toFixed(6)}`;
            break;
    }
    
    currentInput = result.toString();
    shouldResetInput = true;
}

// Calculate result
function calculateResult() {
    if (operation === null || shouldResetInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operation) {
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
            if (current === 0) {
                resultDisplay.textContent = 'Error: Division by zero';
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
    }
    
    // Store calculation for explanation
    calculationHistory.push({
        type: 'operation',
        firstOperand: prev,
        secondOperand: current,
        operator: operation,
        result: result
    });
    
    // Display the calculation result with the operation
    resultDisplay.textContent = `${prev} ${getOperatorSymbol(operation)} ${current} = ${result}`;
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetInput = true;
}

// Update display
function updateDisplay() {
    inputDisplay.textContent = currentInput;
    
    // Only update result display if it's not already showing a function result
    // This preserves the trigonometric function results on the display
    if (operation !== null && !resultDisplay.textContent.includes('=')) {
        resultDisplay.textContent = `${previousInput} ${getOperatorSymbol(operation)}`;
    } else if (resultDisplay.textContent === '' && operation === null) {
        // Keep display empty only if there's no operation and no existing content
        resultDisplay.textContent = '';
    }
    // Otherwise, keep the existing content (function results)
}

// Get operator symbol for display
function getOperatorSymbol(op) {
    switch (op) {
        case '+':
            return '+';
        case '-':
            return '−';
        case '*':
            return '×';
        case '/':
            return '÷';
        case '%':
            return '%';
        default:
            return op;
    }
}

// AI Explanation functionality
function explainCalculation() {
    if (calculationHistory.length === 0) {
        explanationContent.innerHTML = '<p>No calculations to explain yet. Perform a calculation first.</p>';
        return;
    }
    
    const lastCalculation = calculationHistory[calculationHistory.length - 1];
    let explanation = '';
    
    if (lastCalculation.type === 'function') {
        explanation = explainFunction(lastCalculation);
    } else if (lastCalculation.type === 'operation') {
        explanation = explainOperation(lastCalculation);
    }
    
    explanationContent.innerHTML = explanation;
}

// Explain mathematical functions
function explainFunction(calculation) {
    const { function: func, input, result } = calculation;
    let explanation = '';
    
    switch (func) {
        case 'sin':
            explanation = `<h3>Sine Function Explanation</h3>
                <p><strong>Step 1:</strong> Identify the angle in degrees: ${input}°</p>
                <p><strong>Step 2:</strong> Convert the angle to radians using the formula: radians = degrees × (π/180)</p>
                <p>radians = ${input} × (π/180) = ${(input * (Math.PI / 180)).toFixed(6)} radians</p>
                <p><strong>Step 3:</strong> Calculate the sine of the angle in radians</p>
                <p>sin(${(input * (Math.PI / 180)).toFixed(6)}) = ${result.toFixed(6)}</p>
                <p><strong>Result:</strong> sin(${input}°) = ${result.toFixed(6)}</p>
                <p><strong>Explanation:</strong> The sine function gives the ratio of the opposite side to the hypotenuse in a right triangle with the given angle.</p>`;
            break;
        case 'cos':
            explanation = `<h3>Cosine Function Explanation</h3>
                <p><strong>Step 1:</strong> Identify the angle in degrees: ${input}°</p>
                <p><strong>Step 2:</strong> Convert the angle to radians using the formula: radians = degrees × (π/180)</p>
                <p>radians = ${input} × (π/180) = ${(input * (Math.PI / 180)).toFixed(6)} radians</p>
                <p><strong>Step 3:</strong> Calculate the cosine of the angle in radians</p>
                <p>cos(${(input * (Math.PI / 180)).toFixed(6)}) = ${result.toFixed(6)}</p>
                <p><strong>Result:</strong> cos(${input}°) = ${result.toFixed(6)}</p>
                <p><strong>Explanation:</strong> The cosine function gives the ratio of the adjacent side to the hypotenuse in a right triangle with the given angle.</p>`;
            break;
        case 'tan':
            explanation = `<h3>Tangent Function Explanation</h3>
                <p><strong>Step 1:</strong> Identify the angle in degrees: ${input}°</p>
                <p><strong>Step 2:</strong> Convert the angle to radians using the formula: radians = degrees × (π/180)</p>
                <p>radians = ${input} × (π/180) = ${(input * (Math.PI / 180)).toFixed(6)} radians</p>
                <p><strong>Step 3:</strong> Calculate the tangent of the angle in radians</p>
                <p>tan(${(input * (Math.PI / 180)).toFixed(6)}) = ${result.toFixed(6)}</p>
                <p><strong>Result:</strong> tan(${input}°) = ${result.toFixed(6)}</p>
                <p><strong>Explanation:</strong> The tangent function gives the ratio of the opposite side to the adjacent side in a right triangle with the given angle. It can also be calculated as sin(θ)/cos(θ).</p>`;
            break;
        case 'sqrt':
            explanation = `<h3>Square Root Explanation</h3>
                <p><strong>Step 1:</strong> Identify the number: ${input}</p>
                <p><strong>Step 2:</strong> Calculate the square root of the number</p>
                <p>√${input} = ${result.toFixed(6)}</p>
                <p><strong>Verification:</strong> ${result.toFixed(6)} × ${result.toFixed(6)} = ${(result * result).toFixed(6)} ≈ ${input}</p>
                <p><strong>Explanation:</strong> The square root of a number is a value that, when multiplied by itself, gives the original number.</p>`;
            break;
        case 'log':
            explanation = `<h3>Logarithm (Base 10) Explanation</h3>
                <p><strong>Step 1:</strong> Identify the number: ${input}</p>
                <p><strong>Step 2:</strong> Calculate the logarithm (base 10) of the number</p>
                <p>log₁₀(${input}) = ${result.toFixed(6)}</p>
                <p><strong>Verification:</strong> 10^${result.toFixed(6)} = ${Math.pow(10, result).toFixed(6)} ≈ ${input}</p>
                <p><strong>Explanation:</strong> The logarithm (base 10) of a number is the power to which 10 must be raised to obtain the number.</p>`;
            break;
        case 'ln':
            explanation = `<h3>Natural Logarithm Explanation</h3>
                <p><strong>Step 1:</strong> Identify the number: ${input}</p>
                <p><strong>Step 2:</strong> Calculate the natural logarithm (base e) of the number</p>
                <p>ln(${input}) = ${result.toFixed(6)}</p>
                <p><strong>Verification:</strong> e^${result.toFixed(6)} = ${Math.exp(result).toFixed(6)} ≈ ${input}</p>
                <p><strong>Explanation:</strong> The natural logarithm of a number is the power to which the mathematical constant e (≈ 2.71828) must be raised to obtain the number.</p>`;
            break;
    }
    
    return explanation;
}

// Explain basic operations
function explainOperation(calculation) {
    const { firstOperand, secondOperand, operator, result } = calculation;
    let explanation = '';
    
    switch (operator) {
        case '+':
            explanation = `<h3>Addition Explanation</h3>
                <p><strong>Step 1:</strong> Identify the numbers to add: ${firstOperand} and ${secondOperand}</p>
                <p><strong>Step 2:</strong> Add the numbers together</p>
                <p>${firstOperand} + ${secondOperand} = ${result}</p>
                <p><strong>Explanation:</strong> Addition combines two numbers to find their sum or total.</p>`;
            break;
        case '-':
            explanation = `<h3>Subtraction Explanation</h3>
                <p><strong>Step 1:</strong> Identify the numbers: ${firstOperand} (minuend) and ${secondOperand} (subtrahend)</p>
                <p><strong>Step 2:</strong> Subtract the second number from the first</p>
                <p>${firstOperand} - ${secondOperand} = ${result}</p>
                <p><strong>Explanation:</strong> Subtraction finds the difference between two numbers or how much one number exceeds another.</p>`;
            break;
        case '*':
            explanation = `<h3>Multiplication Explanation</h3>
                <p><strong>Step 1:</strong> Identify the numbers to multiply: ${firstOperand} and ${secondOperand}</p>
                <p><strong>Step 2:</strong> Multiply the numbers together</p>
                <p>${firstOperand} × ${secondOperand} = ${result}</p>
                <p><strong>Explanation:</strong> Multiplication is repeated addition. ${firstOperand} × ${secondOperand} means adding ${firstOperand} to itself ${secondOperand} times (or vice versa).</p>`;
            break;
        case '/':
            explanation = `<h3>Division Explanation</h3>
                <p><strong>Step 1:</strong> Identify the dividend (${firstOperand}) and divisor (${secondOperand})</p>
                <p><strong>Step 2:</strong> Divide the dividend by the divisor</p>
                <p>${firstOperand} ÷ ${secondOperand} = ${result}</p>
                <p><strong>Explanation:</strong> Division determines how many times one number (the divisor) is contained within another number (the dividend).</p>`;
            break;
        case '%':
            explanation = `<h3>Modulo Operation Explanation</h3>
                <p><strong>Step 1:</strong> Identify the dividend (${firstOperand}) and divisor (${secondOperand})</p>
                <p><strong>Step 2:</strong> Divide ${firstOperand} by ${secondOperand}: ${firstOperand} ÷ ${secondOperand} = ${Math.floor(firstOperand / secondOperand)} with a remainder of ${result}</p>
                <p><strong>Step 3:</strong> The result of the modulo operation is the remainder: ${result}</p>
                <p><strong>Explanation:</strong> The modulo operation finds the remainder after division of one number by another.</p>`;
            break;
    }
    
    return explanation;
}

// Initialize the calculator when the page loads
window.addEventListener('DOMContentLoaded', init);