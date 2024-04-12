$(document).ready(function() {
    // Hide error tooltips initially
    $('.error-tooltip').hide();

    // Form submit handler
    $('#taxForm').submit(function(event) {
        event.preventDefault();

        // Reset error states
        $('.error-tooltip').hide();

        // Fetch input values
        const age = $('#age').val();
        const income = parseFloat($('#income').val()) || 0;
        const extraIncome = parseFloat($('#extraIncome').val()) || 0;
        const deductions = parseFloat($('#deductions').val()) || 0;

        // Validate inputs
        let isValid = true;
        if (!age) {
            $('#ageError').text('Age is required');
            isValid = false;
        }
        if (isNaN(income)) {
            $('#incomeError').text('Valid income amount is required');
            isValid = false;
        }
        if (isNaN(extraIncome)) {
            $('#extraIncomeError').text('Valid extra income amount is required');
            isValid = false;
        }
        if (isNaN(deductions)) {
            $('#deductionsError').text('Valid deductions amount is required');
            isValid = false;
        }

        if (isValid) {
            // Calculate taxable income
            const totalIncome = income + extraIncome - deductions;
            let tax = 0;

            if (totalIncome > 8) {
                switch (age) {
                    case '<40':
                        tax = 0.3 * (totalIncome - 8);
                        break;
                    case '>=40&<60':
                        tax = 0.4 * (totalIncome - 8);
                        break;
                    case '>=60':
                        tax = 0.1 * (totalIncome - 8);
                        break;
                }
            }

            // Display result in a modal
            $('#resultModal').modal('show');
            $('#resultAmount').text(`Tax Amount: ${tax.toFixed(2)} Lakhs`);
        }
    });
});



