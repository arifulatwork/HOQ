document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('house-of-quality');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');

    // Function to update the selected icon in the select box
    function updateSelectedIcon(select) {
        const selectedOption = select.options[select.selectedIndex];
        select.setAttribute('data-selected-icon', selectedOption.getAttribute('data-icon'));
    }

    // Initialize select boxes with icons
    function initializeSelectBoxes() {
        const relationshipSelects = document.querySelectorAll('.relationship-select');
        relationshipSelects.forEach(select => {
            updateSelectedIcon(select);
            select.addEventListener('change', function () {
                updateSelectedIcon(this);
                updateImportanceValues(); // Recalculate importance values
            });
        });
    }

    // Function to calculate Absolute Importance and Relative Importance (%)
    function updateImportanceValues() {
        const requirementRows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.id); // Exclude additional rows
        const absoluteImportanceRow = document.getElementById('absolute-importance-row');
        const relativeImportanceRow = document.getElementById('relative-importance-row');

        if (!absoluteImportanceRow || !relativeImportanceRow) return;

        const absoluteImportanceCells = absoluteImportanceRow.querySelectorAll('.absolute-importance');
        const relativeImportanceCells = relativeImportanceRow.querySelectorAll('.relative-importance');

        // Reset values
        absoluteImportanceCells.forEach(cell => cell.value = 0);
        relativeImportanceCells.forEach(cell => cell.value = 0);

        // Calculate Absolute Importance
        requirementRows.forEach(row => {
            const importance = parseFloat(row.querySelector('.importance').value) || 0;
            const relationshipSelects = row.querySelectorAll('.relationship-select');

            relationshipSelects.forEach((select, index) => {
                const relationshipValue = parseFloat(select.value) || 0;
                absoluteImportanceCells[index].value = (parseFloat(absoluteImportanceCells[index].value) || 0) + (importance * relationshipValue);
            });
        });

        // Calculate Relative Importance (%)
        const totalAbsoluteImportance = Array.from(absoluteImportanceCells).reduce((sum, cell) => sum + (parseFloat(cell.value) || 0), 0);

        absoluteImportanceCells.forEach((cell, index) => {
            const absoluteValue = parseFloat(cell.value) || 0;
            relativeImportanceCells[index].value = totalAbsoluteImportance === 0 ? 0 : ((absoluteValue / totalAbsoluteImportance) * 100).toFixed(2);
        });
    }

    // Add Requirement
    document.getElementById('add-requirement').addEventListener('click', function () {
        const newRow = document.createElement('tr');
        const rowCount = tbody.children.length - 4; // Exclude additional rows

        // Customer Requirement (editable)
        newRow.innerHTML = `
            <td><input type="text" class="requirement-name" value="Requirement ${rowCount + 1}"></td>
            <td><input type="number" class="importance" value="5"></td>
            ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship-select').length }, () =>
                `<td>
                    <select class="relationship-select">
                        <option value="0">-</option>
                        <option value="9" data-icon="●">Strong (9)</option>
                        <option value="4" data-icon="○">Medium (4)</option>
                        <option value="1" data-icon="▲">Weak (1)</option>
                    </select>
                </td>`
            ).join('')}
            ${Array.from({ length: 5 }, () =>
                `<td><input type="number" value="0"></td>`
            ).join('')}
        `;

        // Insert the new row before the additional rows
        tbody.insertBefore(newRow, tbody.children[tbody.children.length - 4]);

        // Initialize the select box in the new row
        initializeSelectBoxes();

        // Recalculate Absolute and Relative Importance
        updateImportanceValues();
    });

    // Delete Requirement
    document.getElementById('delete-requirement').addEventListener('click', function () {
        if (tbody.children.length > 7) { // Ensure at least 3 requirements + additional rows remain
            tbody.removeChild(tbody.children[tbody.children.length - 5]); // Remove the second-to-last requirement row

            // Recalculate Absolute and Relative Importance
            updateImportanceValues();
        } else {
            alert('At least 3 requirements must remain.');
        }
    });

    // Add Characteristic
    document.getElementById('add-characteristic').addEventListener('click', function () {
        const headerRow = thead.querySelector('tr:last-child');
        const characteristicCount = headerRow.querySelectorAll('th').length - 6; // Exclude Customer Requirements, Importance, and Competitor Ratings

        // Create a new header cell with an editable input field
        const newHeader = document.createElement('th');
        newHeader.innerHTML = `<input type="text" class="characteristic-name" value="Characteristic ${characteristicCount + 1}">`;

        // Update colspan for "Technical Characteristics" header
        const technicalCharacteristicsHeader = thead.querySelector('tr:first-child th[colspan]');
        const currentColspan = parseInt(technicalCharacteristicsHeader.getAttribute('colspan'));
        technicalCharacteristicsHeader.setAttribute('colspan', currentColspan + 1);

        // Insert new characteristic header before Competitor Ratings
        headerRow.insertBefore(newHeader, headerRow.children[headerRow.children.length - 5]);

        // Add new characteristic cell to each row
        tbody.querySelectorAll('tr').forEach(row => {
            const newCell = document.createElement('td');
            if (row.id === 'organization-difficulty-row') {
                newCell.innerHTML = `<input type="number" class="difficulty" value="0">`;
            } else if (row.id === 'how-muches-row') {
                newCell.innerHTML = `<input type="number" class="how-much" value="0">`;
            } else if (row.id === 'absolute-importance-row') {
                newCell.innerHTML = `<input type="number" class="absolute-importance" value="0" readonly>`;
            } else if (row.id === 'relative-importance-row') {
                newCell.innerHTML = `<input type="number" class="relative-importance" value="0" readonly>`;
            } else {
                newCell.innerHTML = `
                    <select class="relationship-select">
                        <option value="0">-</option>
                        <option value="9" data-icon="●">Strong (9)</option>
                        <option value="4" data-icon="○">Medium (4)</option>
                        <option value="1" data-icon="▲">Weak (1)</option>
                    </select>
                `;
            }
            row.insertBefore(newCell, row.children[row.children.length - 5]);
        });

        // Initialize the select boxes in the new cells
        initializeSelectBoxes();

        // Recalculate Absolute and Relative Importance
        updateImportanceValues();
    });

    // Delete Characteristic
    document.getElementById('delete-characteristic').addEventListener('click', function () {
        const headerRow = thead.querySelector('tr:last-child');
        if (headerRow.children.length > 8) { // Ensure at least 3 characteristics remain
            // Remove the last characteristic header
            headerRow.removeChild(headerRow.children[headerRow.children.length - 6]);

            // Update colspan for "Technical Characteristics" header
            const technicalCharacteristicsHeader = thead.querySelector('tr:first-child th[colspan]');
            const currentColspan = parseInt(technicalCharacteristicsHeader.getAttribute('colspan'));
            technicalCharacteristicsHeader.setAttribute('colspan', currentColspan - 1);

            // Remove the last characteristic cell from each row
            tbody.querySelectorAll('tr').forEach(row => {
                row.removeChild(row.children[row.children.length - 6]);
            });

            // Recalculate Absolute and Relative Importance
            updateImportanceValues();
        } else {
            alert('At least 3 characteristics must remain.');
        }
    });

    // Save edits for requirement names
    tbody.addEventListener('input', function (event) {
        if (event.target.classList.contains('requirement-name')) {
            console.log('Requirement name updated:', event.target.value);
        }
    });

    // Save edits for characteristic names
    thead.addEventListener('input', function (event) {
        if (event.target.classList.contains('characteristic-name')) {
            console.log('Characteristic name updated:', event.target.value);
        }
    });

    // Initialize select boxes on page load
    initializeSelectBoxes();

    // Calculate initial Absolute and Relative Importance
    updateImportanceValues();
});