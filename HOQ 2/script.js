// script.js
document.addEventListener('DOMContentLoaded', function () {
    const importanceInputs = document.querySelectorAll('.importance');
    const relationshipInputs = document.querySelectorAll('.relationship');
    const absoluteImportanceCells = document.querySelectorAll('.absolute-importance');
    const relativeImportanceCells = document.querySelectorAll('.relative-importance');

    function calculateImportance() {
        // Initialize arrays to store sums
        const absoluteImportance = [0, 0, 0]; // For 3 technical characteristics
        let totalAbsoluteImportance = 0;

        // Calculate Absolute Importance
        importanceInputs.forEach((importanceInput, rowIndex) => {
            const importance = parseFloat(importanceInput.value) || 0;
            relationshipInputs.forEach((relationshipInput, colIndex) => {
                if (colIndex >= rowIndex * 3 && colIndex < (rowIndex + 1) * 3) {
                    const relationship = parseFloat(relationshipInput.value) || 0;
                    absoluteImportance[colIndex % 3] += importance * relationship;
                }
            });
        });

        // Update Absolute Importance cells
        absoluteImportanceCells.forEach((cell, index) => {
            cell.textContent = absoluteImportance[index].toFixed(2);
            totalAbsoluteImportance += absoluteImportance[index];
        });

        // Calculate Relative Importance
        relativeImportanceCells.forEach((cell, index) => {
            const relativeImportance = (absoluteImportance[index] / totalAbsoluteImportance) * 100;
            cell.textContent = relativeImportance.toFixed(2) + '%';
        });
    }

    // Add event listeners to inputs
    importanceInputs.forEach(input => input.addEventListener('input', calculateImportance));
    relationshipInputs.forEach(input => input.addEventListener('input', calculateImportance));

    // Initial calculation
    calculateImportance();
});