//Getting all variables.
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

//Adding an event listener for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hiding the results.
    document.getElementById('results').style.display = 'none';
    //Showing loader.
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

//Function to calculate the results.
function calculateResults() {
    //Caculating the values.
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    //Computating monthly payment.
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //Showing all variables.
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Showing the results.
        document.getElementById('results').style.display = 'block';
        //Hiding loader.
        document.getElementById('loading').style.display = 'none';
    } else {
        //Calling a function to the error.
        showError('Please check your numbers!');
    }
}

//Function to show errors.
function showError(error) { 
    //Hiding the results.
    document.getElementById('results').style.display = 'none';
    //Hiding loader.
    document.getElementById('loading').style.display = 'none';
    //Creating a new div.
    const errorDiv = document.createElement('div');
    //Getting elements.
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Adding a class to erroDiv.
    errorDiv.className = 'alert alert-danger';
    //Creating a text node and append to errorDiv.
    errorDiv.appendChild(document.createTextNode(error));
    //Inserting error above heading.
    card.insertBefore(errorDiv, heading);
    //Calling a function to remove the error.
    setTimeout(clearError, 3000);
}

//Function to remove the error after 3 seconds.
function clearError() {
    //Removing error alert.
    document.querySelector('.alert').remove();
}