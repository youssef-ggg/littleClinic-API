module.exports = function renderTableBody({ parentDOM, modelList, modelMetaData }) {


    const { unitView } = modelMetaData;
    if (modelList && modelList.length > 0) {
        const cardContent = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        let tableRow = document.createElement('tr');

        table.className = 'table-content';
        cardContent.className = 'card-content';

        parentDOM.appendChild(cardContent);
        cardContent.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(tableRow);

        const { id, ...getModelKeys } = modelList[0];
        const modelKeys = Object.keys(getModelKeys);
        let colTitle = document.createElement('th');

        modelKeys.forEach((key) => {
            colTitle = document.createElement('th');
            tableRow.appendChild(colTitle);
            colTitle.appendChild(document.createTextNode(key));
        });

        modelList.forEach((element) => {
            const { id, ...rowData } = element;
            tableRow = document.createElement('tr');
            tableRow.className = 'table-row';

            tbody.appendChild(tableRow);
            let values = Object.values(rowData);

            values.forEach((value) => {
                const col = document.createElement('td');
                tableRow.appendChild(col);
                col.appendChild(document.createTextNode(value));

            });
            const { unitRenderer, axiosAuth, url } = unitView;

            tableRow.addEventListener('click', async function () {
                //fix here transfere query string some where else
                const response = await axiosAuth.get(`${url}${id}`);
                unitRenderer(response.data);
            });
        });
    }
    else {

        const emptyTable = document.createElement('div');
        const emptyHeader = document.createElement('span');
        const emptyBody = document.createElement('span');

        emptyHeader.innerHTML = 'Empty table';
        emptyBody.innerHTML = 'your entities appear hear.';

        parentDOM.appendChild(emptyTable);
        emptyTable.appendChild(emptyHeader);
        emptyTable.appendChild(emptyBody);

        emptyTable.className = 'empty-table';
        emptyHeader.className = 'empty-table-header';
        emptyBody.className = 'empty-table-body';

    }

}