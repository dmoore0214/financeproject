document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    const updateExpenseList = () => {
        fetch('/getExpenses')
        .then((response) => response.json())
        .then((data) => {
            expenseList.innerHTML = ";
            data.forEach((expense) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${expense.description}: $${expense.amount}`;
                expenseList.appendChild(listItem);
            });
        });
    };

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        fetch('/addExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `description=${description}&amount=${amount}`,
        })
        .then(() => {
            updateExpenseList();
            expenseForm.reset();
        });

    });
    updateExpenseList();
})