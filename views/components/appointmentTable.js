module.exports = function renderAppointmentsTable({ parentDOM, appointmentList, apntmntMetaData }) {

    const cardRow = document.createElement('div');
    const cardCol = document.createElement('div');
    const table = document.createElement('div');
    const tableHeader = document.createElement('div');
    const tableBody = document.createElement('div');
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const { startDate, endDate } = apntmntMetaData;
    let currentDate = new Date(startDate.getTime());
    const addDay = 1;
    const headerRow = document.createElement('div');

    cardRow.classList += 'row';
    cardCol.classList += 'col';
    table.className = 'apntmnt-table';
    tableHeader.className = 'apntmnt-header';
    headerRow.className = 'apntmnt-header-row';
    tableBody.className = 'apntmnt-table-body';

    parentDOM.appendChild(cardRow);
    cardRow.appendChild(cardCol);
    cardCol.appendChild(table);
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    tableHeader.appendChild(headerRow);

    do {
        const headerCol = document.createElement('div');
        const headerCard = document.createElement('div');
        headerCol.appendChild(headerCard);
        headerCol.className = 'apntmnt-header-col';
        headerCard.className = 'apntmnt-header-card';
        headerCard.innerHTML = `<span>${currentDate.toLocaleDateString('en-us')}</span> 
            <span>${daysOfWeek[currentDate.getDay()]}</span>`;
        headerRow.appendChild(headerCol);
        currentDate.setDate(currentDate.getDate() + addDay);

    } while (currentDate < endDate);

    currentDate = new Date(startDate.getTime());

    if (appointmentList.length > 0 && Array.isArray(appointmentList)) {
        do {
            const bodyRow = document.createElement('div');
            bodyRow.className = 'apntmnt-body-row';
            tableBody.appendChild(bodyRow);

            appointmentList.forEach(appointment => {
                const appointmentDate = new Date(appointment.date);
                if (appointmentDate.getDate() == currentDate.getDate()) {
                    const bodyCol = document.createElement('div');
                    const appointmentCard = document.createElement('div');
                    appointmentCard.className = 'apntmnt-card';
                    bodyCol.appendChild(appointmentCard);
                    appointmentCard.innerHTML = `
                        <span class="header">${new Date(appointment.date)
                            .toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}
                        <span class="btn-box">
                        <button name="openCm" class="icon-btn far fa-file" id=${appointment.id}></button>
                        </button>
                        </span>
                            </span>
                        <span class="name">${appointment.patientName}</span>
                        <span>${appointment.title}</span>`;

                    if (Date.now() >= appointment.date) {
                        appointmentCard.classList += ' apntmnt-card-passed'
                    }
                    bodyRow.appendChild(bodyCol);
                }
            });

            currentDate.setDate(currentDate.getDate() + addDay);
        } while (currentDate < endDate)

    } else {
        const emptyBody = document.createElement('div');
        const emptyText = document.createElement('span');

        emptyText.innerHTML = 'No appointments this week!';
        emptyBody.className = 'empty-appointment-table';
        tableBody.appendChild(emptyBody);
        emptyBody.appendChild(emptyText);
        tableBody.className = 'empty-appointment-body';
    }

}