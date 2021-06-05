const table = require("./table");

module.exports = {
    //TODO change name, attributes and functionallty later
    renderActions : (entityName)=>{
    
        const centerContent = document.querySelector('.content-center');
        const actionBox = document.createElement('div');
    
        const searchBar = document.createElement('div');
        const searchInput = document.createElement('input');
        const searchButton = document.createElement('button');
        const searchIcon  = document.createElement('span');
    
        searchBar.className='searchBar';
        searchInput.className = 'search-input';
        searchInput.type = 'text';
        searchInput.placeholder = `Search ${entityName}...`;
        searchButton.className = 'btn search-btn';
        searchIcon.className = 'fas fa-search';
    
        actionBox.appendChild(searchBar);
        searchBar.appendChild(searchInput);
        searchBar.appendChild(searchButton);
        searchButton.appendChild(searchIcon);
    
        
        centerContent.appendChild(actionBox);
        actionBox.className  = 'action-box';
        
        
        // buttonBox.className = 'btn-box';
        // actionBox.appendChild(buttonBox);
        
        
    },
    rendertableAction:options=>{

        const {entityName,pageNum,pageSize,tableCount} = options;
        const centerContent = document.querySelector('.content-center');
        const actionBox = document.createElement('div');
    
        const searchBar = document.createElement('div');
        const searchInput = document.createElement('input');
        const searchButton = document.createElement('button');
        const searchIcon  = document.createElement('span');
        const paginationBox = document.createElement('div');
        const pageRange = document.createElement('span');
        const paginateLeft = document.createElement('button');
        const paginateRight = document.createElement('button');

        actionBox.className  = 'action-box';
        searchBar.className='searchBar';
        searchInput.className = 'search-input';
        searchInput.type = 'text';
        searchInput.placeholder = `Search ${entityName}...`;
        searchButton.className = 'btn search-btn';
        searchIcon.className = 'fas fa-search';
        paginationBox.className = 'pagination-box';
        pageRange.className = 'pagination-text';
        paginateLeft.className = 'btn action-btn fa-lg fas fa-chevron-left';
        paginateRight.className ='btn action-btn fa-lg fas fa-chevron-right';
        paginateLeft.id = 'paginateLeft';
        paginateRight.id = 'paginateRight';
    
        if (pageNum <= 1)
        {
            paginateLeft.setAttribute('disabled','disabled');
        }
        if ((pageNum*pageSize)>=tableCount)
        {
            paginateRight.setAttribute('disabled','disabled');
            pageRange.innerHTML =`${(pageNum*pageSize)-pageSize+1 }-${tableCount} of ${tableCount}`;
        }else {
            pageRange.innerHTML =`${(pageNum-1)*pageSize+1}-${pageNum * pageSize } of ${tableCount}`;
        }

        actionBox.appendChild(searchBar);
        actionBox.appendChild(paginationBox);
        searchBar.appendChild(searchInput);
        searchBar.appendChild(searchButton);
        searchButton.appendChild(searchIcon);
        paginationBox.appendChild(pageRange);
        paginationBox.appendChild(paginateLeft);
        paginationBox.appendChild(paginateRight);
    
        
        centerContent.appendChild(actionBox);
        
        
    },
    renderApntmntTableActions:({parentDOM,appointmentInputData})=>{

        const {date,btnId} = appointmentInputData;

        const cardCol = document.createElement('div');
        const cardRow = document.createElement('div');

        const actionBox = document.createElement('div');
        const dateInput = document.createElement('input');
        const dateBtn = document.createElement('button');

        
        cardRow.classList+= 'row';
        cardCol.classList+= 'col-8'
        dateInput.type = 'date';
        actionBox.className = 'apntmnt-input-box';
        dateInput.classList+='apntmnt-input';
        dateInput.id = 'weekStart';
        dateBtn.classList += 'apntmnt-btn far fa-calendar-alt';
        dateBtn.id = btnId;
        
        const year = date.getFullYear();
        const month = (date.getMonth()+1)>9?date.getMonth()+1:`0${date.getMonth()+1}`;
        const day = date.getDate()>9?date.getDate():`0${date.getDate()}`;
        const fullDate = `${year}-${month}-${day}`;
        dateInput.value =fullDate;

        parentDOM.appendChild(cardRow);
        cardRow.appendChild(cardCol);
        cardCol.appendChild(actionBox);
        actionBox.appendChild(dateInput);
        actionBox.appendChild(dateBtn);
    }
}
