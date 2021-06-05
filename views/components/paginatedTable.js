//TODO:: put all tables in table component
module.exports = function renderPaginatedTable({modelList,modelMetaData,DOMParent}){

    const {unitView,pageSize} = modelMetaData;

    const cardRow = document.createElement('div');
    const cardCol = document.createElement('div');
    const card = document.createElement('div');

    cardRow.classList.add('row');
    cardCol.classList.add('col-8');
    card.classList.add('card');

    DOMParent.appendChild(cardRow);
    cardRow.appendChild(cardCol);
    cardCol.appendChild(card);

    if (modelList.length == 0 || !modelList)
    {
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
    else {
        const cardHeader = document.createElement('div');
        const cardContent = document.createElement('div');
        const tableTitle = document.createElement('h3');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        let tableRow = document.createElement('tr');
        
        
        table.className = 'table-content';
        cardHeader.className='card-header';
        cardContent.className='card-content';
        tableTitle.className='';

        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        cardHeader.appendChild(tableTitle);
        cardContent.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(tableRow);

        tableTitle.innerHTML = modelMetaData.title; 
        const {id,...getModelKeys} = modelList[0];
        const modelKeys = Object.keys(getModelKeys);
        let colTitle = document.createElement('th');
        
        modelKeys.forEach((key)=>{
            colTitle = document.createElement('th');
            tableRow.appendChild(colTitle);
            colTitle.appendChild(document.createTextNode(key));       
        });
        
        modelList.forEach((element)=>{
            const {id,...rowData} = element;
            tableRow = document.createElement('tr');
            tableRow.className = 'table-row';
            
            tbody.appendChild(tableRow);
            let values = Object.values(rowData);
            
            values.forEach((value)=>{
                const col = document.createElement('td');
                tableRow.appendChild(col);
                col.appendChild(document.createTextNode(value));
    
            });
            const {unitRenderer,axiosAuth,url} = unitView;
            
            tableRow.addEventListener('click',async function(){
                //fix here transfere query string some where else
                const response = await axiosAuth.get(`${url}${id}`);
                unitRenderer(response.data);
            });
    
        }); 
    }


    const paginationBox = document.createElement('div');
    const paginationBtns = document.createElement('div');
}