// script.js
document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('house-of-quality');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');

    // Add Requirement
    document.getElementById('add-requirement').addEventListener('click', function () {
        const newRow = document.createElement('tr');
        const rowCount = tbody.children.length + 1;

        // Customer Requirement
        newRow.innerHTML = `
            <td>Requirement ${rowCount}</td>
            <td><input type="number" class="importance" value="5"></td>
            ${Array.from({ length: tbody.children[0].querySelectorAll('.relationship').length }, () =>
                `<td><input type="number" class="relationship" value="0"></td>`
            ).join('')}
            ${Array.from({ length: 5 }, () =>
                `<td><input type="number" value="0"></td>`
            ).join('')}
        `;
        tbody.appendChild(newRow);
    });

    // Delete Requirement
    document.getElementById('delete-requirement').addEventListener('click', function () {
        if (tbody.children.length > 3) {
            tbody.removeChild(tbody.lastElementChild);
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

        // Insert new characteristic header under "Technical Characteristics"
        const technicalCharacteristicsHeader = thead.querySelector('tr:first-child th[colspan]');
        const currentColspan = parseInt(technicalCharacteristicsHeader.getAttribute('colspan'));
        technicalCharacteristicsHeader.setAttribute('colspan', currentColspan + 1);

        // Insert new characteristic header after the last characteristic but before Competitor Ratings
        headerRow.insertBefore(newHeader, headerRow.children[headerRow.children.length - 5]);

        // Add new characteristic input to each row
        tbody.querySelectorAll('tr').forEach(row => {
            const newCell = document.createElement('td');
            newCell.innerHTML = `<input type="number" class="relationship" value="0">`;
            row.insertBefore(newCell, row.children[row.children.length - 5]);
        });
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

            // Remove the last characteristic input from each row
            tbody.querySelectorAll('tr').forEach(row => {
                row.removeChild(row.children[row.children.length - 6]);
            });
        } else {
            alert('At least 3 characteristics must remain.');
        }
    });
});