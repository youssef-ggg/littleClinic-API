module.exports = {

    tableActions:({parentDOM,actions})=>{
        
        const cardRow = document.createElement('div');
        const cardCol = document.createElement('div');
        const btnToolBar = document.createElement('div');
        const cardContent = document.createElement('div');
        
        cardRow.className = 'row';
        cardCol.className = 'col-8';
        btnToolBar.className = 'btn-toolbar';
        cardContent.className = '';
        
        parentDOM.appendChild(cardRow);
        cardRow.appendChild(cardCol);
        cardCol.appendChild(btnToolBar);
        btnToolBar.appendChild(cardContent);

        actions.forEach(action => {
            if(action.type == 'button'){
                const addModelBtn = document.createElement('button');
                const addModelIcon = document.createElement('i');
                const addModelText =document.createElement('span');

                addModelBtn.classList += 'btn';
                addModelBtn.id = action.id;
                addModelIcon.classList+='fas fa-pencil-ruler';
                addModelText.innerHTML = action.name;

                cardContent.appendChild(addModelBtn);
                addModelBtn.appendChild(addModelIcon);
                addModelBtn.appendChild(addModelText);
                
            }
            // else if(action.type == 'title'){
            //     const cardHeader = '';
                
            // }
        });

    },
    largeTableActions:({parentDOM,actions})=>{
        const cardRow = document.createElement('div');
        const cardCol = document.createElement('div');
        const btnToolBar = document.createElement('div');
        const cardContent = document.createElement('div');
        
        cardRow.className = 'row';
        cardCol.className = 'col-8';
        btnToolBar.className = 'btn-toolbar';
        cardContent.className = '';
        
        parentDOM.appendChild(cardRow);
        cardRow.appendChild(cardCol);
        cardCol.appendChild(btnToolBar);
        btnToolBar.appendChild(cardContent);

        actions.forEach(action => {
            if(action.type == 'tableLabel'){
                const tableLabelBox = document.createElement('div');
                const tableLabel = document.createElement('h3');

                tableLabelBox.classList+='label-toolbar';
                tableLabel.innerHTML = `${action.name} Table`;;

                cardContent.appendChild(tableLabelBox);
                tableLabelBox.appendChild(tableLabel);

            }
            else if(action.type == 'button'){
                const addModelBtn = document.createElement('button');
                const addModelIcon = document.createElement('i');
                const addModelText =document.createElement('span');

                addModelBtn.classList += 'btn';
                addModelBtn.id = action.id;
                addModelIcon.classList+='fas fa-pencil-ruler';
                addModelText.innerHTML = action.name;

                cardContent.appendChild(addModelBtn);
                addModelBtn.appendChild(addModelIcon);
                addModelBtn.appendChild(addModelText);
                
            }
        });
    }
}