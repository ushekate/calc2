// Get Display Element
let display = document.getElementById("display");

// Add Number or Operator
function appendValue(value) {
    display.value += value;
}

// Clear Display
function clearDisplay() {
    display.value = "";
}

// Delete Last Character
function deleteNumber() {
    display.value = display.value.slice(0, -1);
}

// Calculate Result
function calculate() {

    try {

        let expression = display.value;

        if (expression === "") {
            return;
        }

        // Allow only mathematical characters
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        // Convert percentage into division by 100
        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        // Check Invalid Results
        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Display Final Result
        display.value = Number(result.toPrecision(12));

    } catch (error) {

        display.value = "Error";

    }

}

// Keyboard Support
document.addEventListener("keydown", function(event) {

    if (
        (event.key >= "0" && event.key <= "9") ||
        ["+", "-", "*", "/", ".", "%", "(", ")"].includes(event.key)
    ) {
        appendValue(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (event.key === "Backspace") {
        deleteNumber();
    }

    else if (event.key === "Escape") {
        clearDisplay();
    }

});