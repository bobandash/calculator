//numbers to evaluate
let num1 = 0;
let num2 = 0;
let operator = '';
// other variables
let result = 0;
let operatorCount = 0;
let currButtonNum = 0;
let decimalCount = 0;
const operatorDisplay = document.querySelector('#current-operator');
const numberDisplay = document.querySelector('#number-output');
numberDisplay.innerText = num2;
const allButtons = document.querySelectorAll('button');
const operatorArray = ['plus','subtract','multiply','divide','power','plusMinus'];
const numberArray = ['zero','one','two','three','four','five','six','seven','eight','nine'];


// add the click functionality to buttons
for(let i = 0; i < allButtons.length; i++)
{
    allButtons[i].addEventListener('click', function() {updateOperandsAndOperators(allButtons[i].id)});
}

//add the key functionality
document.addEventListener('keydown', function (event) {
    let eventKey = event.key;
    switch (eventKey)
    {
        case '^':
            updateOperandsAndOperators('divide');
            break;
        case '/':
            updateOperandsAndOperators('multiply');
            break;
        case '-':
            updateOperandsAndOperators('subtract');
            break;
        case '+':
            updateOperandsAndOperators('plus');
            break;
        case '.':
            updateOperandsAndOperators('decimal');
            break
        case '=':
        case 'Enter':
            updateOperandsAndOperators('equal');
            break;
        case '0':
            updateOperandsAndOperators('zero');
            break;
        case '1':
            updateOperandsAndOperators('one');
            break;
        case '2':
            updateOperandsAndOperators('two');
            break;
        case '3':
            updateOperandsAndOperators('three');
            break;
        case '4':
            updateOperandsAndOperators('four');
            break;
        case '5':
            updateOperandsAndOperators('five');
            break;
        case '6':
            updateOperandsAndOperators('six');
            break;
        case '7':
            updateOperandsAndOperators('seven');
            break;
        case '8':
            updateOperandsAndOperators('eight');
            break;
        case '9':       
            updateOperandsAndOperators('nine');
            break;
    }
})

function updateOperandsAndOperators(button){
    //the case of decimal and equal sign
    if(button == 'decimal')
    {
        if (decimalCount == 0)
        {
            decimalCount = 1;
            numberDisplay.innerText = num2 + '.';
        }
    }
    else if(button == 'equal')
    {
        operatorDisplay.innerText = '';
        if(operator == '')
        {
            num1 = num2;
            num2 = 0;
        }
        if(operator != '')
        {
            num1 = operate(operator,num1,num2);
            if(num1 == 'ERROR')
            {
                numberDisplay.innerText = num1;
                operatorDisplay.innerText = '';
                num1 = 0;
                num2 = 0;
                operator = '';
                return;
            }
            operator = '';
            num2 = 0;
        }
        
        numberDisplay.innerText = num1;
    }
    else if(button == 'clear')
    {
        num2 = 0;
        decimalCount = 0;
        numberDisplay.innerText = num2;
    }
    else if(button == 'clearAll')
    {
        num1 = 0;
        num2 = 0;
        decimalCount = 0;
        operator = '';
        numberDisplay.innerText = num2;
        operatorDisplay.innerText = operator;
    }
    else if(numberArray.includes(button))
    {
        //on the second and more decimal points, do nothing
        if(decimalCount > 1)
        {
            return;
        }
        switch (button){
            case 'zero':
                currentButtonNum = 0;
                break;
            case 'one':
                currentButtonNum = 1;
                break;    
            case 'two':
                currentButtonNum = 2;
                break;
            case 'three':
                currentButtonNum = 3;
                break;
            case 'four':
                currentButtonNum = 4;
                break;
            case 'five':
                currentButtonNum = 5;
                break;
            case 'six':
                currentButtonNum = 6;
                break;
            case 'seven':
                currentButtonNum = 7;
                break;
            case 'eight':
                currentButtonNum = 8;
                break;
            case 'nine':
                currentButtonNum = 9;
                break;
        }
        if(decimalCount == 1)
        {
            num2 = num2 + currentButtonNum / 10;
            decimalCount++;
        }
        else
        {
            num2 = num2 * 10 + currentButtonNum;
        }
        numberDisplay.innerText = num2;
    }
    //for operators
    else if(operatorArray.includes(button))
    {
        //on the first number
        if(operator == '')
        {
            if(num1 == 0)
            {
                num1 = num2;
                num2 = 0;
            }
        }
        //on numbers > first number
        else
        {
            num1 = operate(operator,num1,num2);
            if(num1 == 'ERROR')
            {
                numberDisplay.innerText = num1;
                operatorDisplay.innerText = '';
                num1 = 0;
                num2 = 0;
                operator = '';
                return;
            }
            num2 = 0;
        }

        //depending on the operator
        switch(button){
            case 'power':
                operator = '^';
                break;
            case 'divide':
                operator = '/';
                break;
            case 'multiply':
                operator = '*';
                break;
            case 'subtract':
                operator = '-';
                break;
            case 'plus':
                operator = '+';
                break;
            case 'plusMinus':
                num1 = -1 * num1;
                break;
        }
        operatorDisplay.innerText = operator;
        numberDisplay.innerText = num1;
        //update the decimal count    
        decimalCount = 0;
    }
}

//operate function
function operate (operator, num1, num2){
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply (num1, num2);
            break;
        case '/':
            if(num2 == 0)
            {
                return 'ERROR';
            }
            return divide (num1, num2);
            break;
        case '^':
            return power(num1, num2);
            break;
    }
}

//operator functions
function add (num1, num2) {return num1 + num2};
function subtract (num1, num2) {return num1 - num2};
function multiply (num1, num2) {return num1 * num2};
function divide (num1, num2) {return num1 / num2};
function power(num1, num2) {return num1 ^ num2};