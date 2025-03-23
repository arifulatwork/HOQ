document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('house-of-quality');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');

    // Function to add additional rows (Organization Difficulty, How Muches, Absolute Importance, Relative Importance)
    function addAdditionalRows() {
        // Check if the additional rows already exist
        if (!document.getElementById('organization-difficulty-row')) {
            // Add Organization Difficulty row
            const orgDifficultyRow = document.createElement('tr');
            orgDifficultyRow.id = 'organization-difficulty-row';
            orgDifficultyRow.innerHTML = `
                <td colspan="2">Organization Difficulty</td>
                ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship-select').length }, () =>
                    `<td><input type="number" class="difficulty" value="0"></td>`
                ).join('')}
                ${Array.from({ length: 5 }, () =>
                    `<td></td>` // Empty cells for Competitor Ratings
                ).join('')}
            `;
            tbody.appendChild(orgDifficultyRow);
        }

        if (!document.getElementById('how-muches-row')) {
            // Add How Muches row
            const howMuchesRow = document.createElement('tr');
            howMuchesRow.id = 'how-muches-row';
            howMuchesRow.innerHTML = `
                <td colspan="2">How Muches</td>
                ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship-select').length }, () =>
                    `<td><input type="number" class="how-much" value="0"></td>`
                ).join('')}
                ${Array.from({ length: 5 }, () =>
                    `<td></td>` // Empty cells for Competitor Ratings
                ).join('')}
            `;
            tbody.appendChild(howMuchesRow);
        }

        if (!document.getElementById('absolute-importance-row')) {
            // Add Absolute Importance row
            const absoluteImportanceRow = document.createElement('tr');
            absoluteImportanceRow.id = 'absolute-importance-row';
            absoluteImportanceRow.innerHTML = `
                <td colspan="2">Absolute Importance</td>
                ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship-select').length }, () =>
                    `<td><input type="number" class="absolute-importance" value="0"></td>`
                ).join('')}
                ${Array.from({ length: 5 }, () =>
                    `<td></td>` // Empty cells for Competitor Ratings
                ).join('')}
            `;
            tbody.appendChild(absoluteImportanceRow);
        }

        if (!document.getElementById('relative-importance-row')) {
            // Add Relative Importance row
            const relativeImportanceRow = document.createElement('tr');
            relativeImportanceRow.id = 'relative-importance-row';
            relativeImportanceRow.innerHTML = `
                <td colspan="2">Relative Importance</td>
                ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship-select').length }, () =>
                    `<td><input type="number" class="relative-importance" value="0"></td>`
                ).join('')}
                ${Array.from({ length: 5 }, () =>
                    `<td></td>` // Empty cells for Competitor Ratings
                ).join('')}
            `;
            tbody.appendChild(relativeImportanceRow);
        }
    }

    // Function to update additional rows when a new characteristic is added or deleted
    function updateAdditionalRows() {
        const characteristicCount = tbody.children[0].querySelectorAll('.relationship-select').length;

        // Update Organization Difficulty row
        const orgDifficultyRow = document.getElementById('organization-difficulty-row');
        if (orgDifficultyRow) {
            const difficultyCells = orgDifficultyRow.querySelectorAll('.difficulty');
            updateRowCells(orgDifficultyRow, difficultyCells, characteristicCount, 'difficulty');
        }

        // Update How Muches row
        const howMuchesRow = document.getElementById('how-muches-row');
        if (howMuchesRow) {
            const howMuchCells = howMuchesRow.querySelectorAll('.how-much');
            updateRowCells(howMuchesRow, howMuchCells, characteristicCount, 'how-much');
        }

        // Update Absolute Importance row
        const absoluteImportanceRow = document.getElementById('absolute-importance-row');
        if (absoluteImportanceRow) {
            const absoluteImportanceCells = absoluteImportanceRow.querySelectorAll('.absolute-importance');
            updateRowCells(absoluteImportanceRow, absoluteImportanceCells, characteristicCount, 'absolute-importance');
        }

        // Update Relative Importance row
        const relativeImportanceRow = document.getElementById('relative-importance-row');
        if (relativeImportanceRow) {
            const relativeImportanceCells = relativeImportanceRow.querySelectorAll('.relative-importance');
            updateRowCells(relativeImportanceRow, relativeImportanceCells, characteristicCount, 'relative-importance');
        }
    }

    // Helper function to update cells in a row
    function updateRowCells(row, cells, characteristicCount, className) {
        if (cells.length < characteristicCount) {
            // Add new cells
            for (let i = cells.length; i < characteristicCount; i++) {
                const newCell = document.createElement('td');
                newCell.innerHTML = `<input type="number" class="${className}" value="0">`;
                row.insertBefore(newCell, row.children[row.children.length - 5]);
            }
        } else if (cells.length > characteristicCount) {
            // Remove extra cells
            for (let i = cells.length; i > characteristicCount; i--) {
                row.removeChild(row.children[row.children.length - 6]);
            }
        }
    }

    // Function to initialize select boxes with icons
    function initializeSelectBoxes() {
        const relationshipSelects = document.querySelectorAll('.relationship-select');
        relationshipSelects.forEach(select => {
            // Set the initial selected icon
            const selectedOption = select.options[select.selectedIndex];
            select.setAttribute('data-selected-icon', selectedOption.getAttribute('data-icon'));

            // Update the selected icon when the value changes
            select.addEventListener('change', function () {
                const selectedOption = this.options[this.selectedIndex];
                this.setAttribute('data-selected-icon', selectedOption.getAttribute('data-icon'));
            });
        });
    }

    // Add Requirement
    document.getElementById('add-requirement').addEventListener('click', function () {
        const newRow = document.createElement('tr');
        const rowCount = tbody.children.length - 4; // Exclude additional rows

        // Customer Requirement
        newRow.innerHTML = `
            <td>Requirement ${rowCount + 1}</td>
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
    });

    // Delete Requirement
    document.getElementById('delete-requirement').addEventListener('click', function () {
        if (tbody.children.length > 7) { // Ensure at least 3 requirements + additional rows remain
            tbody.removeChild(tbody.children[tbody.children.length - 5]); // Remove the second-to-last requirement row
        } else {
            alert('At least 3 requirements must remain.');
        }
    });

    // Add Characteristic
    document.getElementById('add-characteristic').addEventListener('click', function () {
        const headerRow = thead.querySelector('tr:last-child');
        const characteristicCount = headerRow.querySelectorAll('th').length - 6; // Exclude Customer Requirements, Importance, and Competitor Ratings
        const newHeader = document.createElement('th');
        newHeader.textContent = `Characteristic ${characteristicCount + 1}`;

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
                newCell.innerHTML = `<input type="number" class="absolute-importance" value="0">`;
            } else if (row.id === 'relative-importance-row') {
                newCell.innerHTML = `<input type="number" class="relative-importance" value="0">`;
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
        } else {
            alert('At least 3 characteristics must remain.');
        }
    });

    // Add additional rows on page load
    addAdditionalRows();

    // Initialize select boxes on page load
    initializeSelectBoxes();
});