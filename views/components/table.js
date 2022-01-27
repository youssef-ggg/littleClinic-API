module.exports = function renderTable({ parentDOM, modelList, modelMetaData }) {

    const { unitView, tableActions } = modelMetaData;

    const cardRow = document.createElement('div');
    const cardCol = document.createElement('div');
    const card = document.createElement('div');

    cardRow.classList.add('row');
    cardCol.classList.add('col-8');
    card.classList.add('card');

    parentDOM.appendChild(cardRow);
    cardRow.appendChild(cardCol);
    cardCol.appendChild(card);

    if (modelList) {
        const cardHeader = document.createElement('div');
        const cardContent = document.createElement('div');
        const tableTitle = document.createElement('h3');
        const tableActionsBtn = document.createElement('i');
        const dropDownMenu = document.createElement('ul');
        const dropDownMenuContent = document.createElement('div');

        tableActions.forEach(action => {
            const dropDownMenuItem = document.createElement('div');
            const dropDownMenuLink = document.createElement('a');
            const dropDownMenuLinkContent = document.createElement('div');
            const dropDownMenuLinkIcon = document.createElement('i');
            const dropDownMenuLinkTitle = document.createElement('span');

            dropDownMenuItem.classList += 'dropdown-menu-item';
            dropDownMenuLink.id = action.id;
            dropDownMenuLink.classList += 'dropdown-menu-link';
            dropDownMenuLinkIcon.classList += action.icon;
            dropDownMenuLinkTitle.innerHTML = action.name;

            dropDownMenuContent.appendChild(dropDownMenuItem);
            dropDownMenuItem.appendChild(dropDownMenuLink);
            dropDownMenuLink.appendChild(dropDownMenuLinkContent);
            dropDownMenuLinkContent.appendChild(dropDownMenuLinkIcon);
            dropDownMenuLinkContent.appendChild(dropDownMenuLinkTitle);
        });

        tableActionsBtn.addEventListener('click', function (event) {
            if (dropDownMenu.classList.contains('display-none')) {
                dropDownMenu.classList.remove('display-none');
            }
            else {
                dropDownMenu.classList.add('display-none');
            }
        });


        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        let tableRow = document.createElement('tr');

        table.className = 'table-content';
        cardHeader.className = 'card-header';
        cardContent.className = 'card-content';
        dropDownMenu.classList = 'dropdown-menu display-none';
        dropDownMenuContent.className = 'dropdown-menu-content';
        tableTitle.className = '';
        tableActionsBtn.classList += 'fas fa-ellipsis-h';
        tableActionsBtn.id = 'openTableActions';

        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        cardHeader.appendChild(tableTitle);
        cardHeader.appendChild(tableActionsBtn);
        cardHeader.appendChild(dropDownMenu);
        dropDownMenu.appendChild(dropDownMenuContent);
        cardContent.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(tableRow);

        tableTitle.innerHTML = modelMetaData.title;
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

        card.appendChild(emptyTable);
        emptyTable.appendChild(emptyHeader);
        emptyTable.appendChild(emptyBody);

        emptyTable.className = 'empty-table';
        emptyHeader.className = 'empty-table-header';
        emptyBody.className = 'empty-table-body';
    }

}