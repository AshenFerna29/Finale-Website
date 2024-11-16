document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    const userAnswers = new Array(9).fill('-');
    const questions = [
        { question: "First Name", type: "first_name", placeholder: "Enter your first name" },
        { question: "Last Name", type: "last_name", placeholder: "Enter your last name" },
        { question: "Age", type: "age", placeholder: "Enter your age" },
        { question: "Gender", type: "gender", placeholder: "Enter your gender" },
        { question: "Email", type: "email", placeholder: "Enter your email" },
        { question: "Address", type: "address", placeholder: "Enter your address" },
        { question: "Contact", type: "contact", placeholder: "Enter your contact number" },
        { question: "Payment Method", type: "payment_method", placeholder: "Enter your payment method (Eg: credit card, debit ard or paypal)" },
        { question: "Password", type: "password", placeholder: "Enter your password (8 characters)" }
    ];

    const questionBox = document.getElementById("questionBox");
    const inputField = document.getElementById("input");
    const progressBar = document.getElementById("bar");
    const nextBtnContainer = document.getElementById("nextBtnContainer");
    const submitBtnContainer = document.getElementById("submitBtnContainer");
    const skipBtnContainer = document.getElementById("skipBtnContainer");
    const validationMessage = document.getElementById("validationMessage");

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionBox.innerHTML = `${currentQuestion.question} (${currentQuestionIndex + 1}/${questions.length})`;
        inputField.setAttribute("placeholder", currentQuestion.placeholder);
        inputField.value = userAnswers[currentQuestionIndex] !== '-' ? userAnswers[currentQuestionIndex] : '';
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtnContainer.style.display = "none";
            submitBtnContainer.style.display = "inline-block";
        } else {
            nextBtnContainer.style.display = "inline-block";
            submitBtnContainer.style.display = "none";
        }
        
        skipBtnContainer.style.display = "inline-block";

        validationMessage.textContent = '';
    }

    function validateInput(type, value) {
        switch (type) {
            case 'first_name':
            case 'last_name':
                return /^[A-Za-z]+$/.test(value) ? '' : 'Please enter a valid name';
            case 'age':
                return value === '-' || (/^\d+$/.test(value) && parseInt(value) > 0 && parseInt(value) < 120) ? '' : 'Please enter the age in numbers';
            case 'gender':
                return value === '-' || ['male', 'female', 'other'].includes(value.toLowerCase()) ? '' : 'Please enter Male, Female, or Other';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
            case 'address':
                return value.length > 1 ? '' : 'Please enter a valid address';
            case 'contact':
                return /^\d{10}$/.test(value) ? '' : 'Please enter a valid contact number';
            case 'payment_method':
                return ['credit card', 'debit card', 'paypal'].includes(value.toLowerCase()) ? '' : 'Please enter Credit Card, Debit Card, or PayPal';
            case 'password':
                return value.length >= 8 ? '' : 'Password must be at least 8 characters long';
            default:
                return '';
        }
    }

    function nextQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const inputValue = inputField.value.trim();
        const validationError = validateInput(currentQuestion.type, inputValue);

        if (validationError) {
            validationMessage.textContent = validationError;
            return;
        }

        userAnswers[currentQuestionIndex] = inputValue;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        }
    }

    function skipQuestion() {
        if (currentQuestionIndex === 2 || currentQuestionIndex === 3) {
            userAnswers[currentQuestionIndex] = '-';
            currentQuestionIndex++;
            displayQuestion();
        } else {
            validationMessage.textContent = "This question cannot be skipped.";
        }
    }

    function submitDetails() {
        const currentQuestion = questions[currentQuestionIndex];
        const inputValue = inputField.value.trim();
        const validationError = validateInput(currentQuestion.type, inputValue);
    
        if (validationError) {
            validationMessage.textContent = validationError;
            return;
        }
    
        userAnswers[currentQuestionIndex] = inputValue;
    
        const previewContent = document.getElementById("previewContent");
        previewContent.innerHTML = questions.map((q, index) => {
            let value = userAnswers[index];
            if (value === '-') {
                value = '-';
            } else if (q.type === "password") {
                value = '*'.repeat(value.length);
            }
            return `<p><b>${q.question}:</b> ${value}</p>`;
        }).join("");
    
        document.getElementById("previewBox").style.display = "block";
        document.getElementById("quizSection").style.display = "none";
    }

    // Initialize the first question
    displayQuestion();

    // Add event listeners for the buttons
    document.querySelector(".next button").addEventListener("click", nextQuestion);
    document.querySelector(".skip button").addEventListener("click", skipQuestion);
    document.querySelector(".submit button").addEventListener("click", submitDetails);

    // New snippet for highlighting active nav link
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links ul li a');
    const menuLength = menuItems.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].className = 'active';
        }
    }
});