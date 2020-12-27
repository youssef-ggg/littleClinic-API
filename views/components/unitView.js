module.exports = function renderUnitView(modelName,model){

    const centerContent = document.querySelector('.content-center');
    const formView = document.createElement('div');
    const formHeader = document.createElement('div');
    const formBody = document.createElement('div');
    const formFooter = document.createElement('div');
    const formTitle = document.createElement('div');
    const formHeaderAction = document.createElement('div');
    const editBtn = document.createElement('button');
    const editIcon = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createElement('span');

    centerContent.innerHTML = '';
    formView.className = 'form-view';
    formHeader.className =  'form-view-header';
    formBody.className = 'form-view-body';
    formTitle.innerHTML = modelName;
    editBtn.className = 'btn';
    deleteBtn.className = 'btn';
    editIcon.className = 'fas fa-edit';
    deleteIcon.className = 'fas fa-trash-alt'
    editBtn.id = 'edit';
    deleteBtn.id = 'delete';
    formHeaderAction.className = 'header-action';

    centerContent.appendChild(formView);
    formView.appendChild(formHeader);
    formView.appendChild(formBody);
    formView.appendChild(formFooter);
    formHeader.appendChild(formTitle);
    formHeader.appendChild(formHeaderAction);
    formHeaderAction.appendChild(editBtn);
    formHeaderAction.appendChild(deleteBtn);
    editBtn.appendChild(editIcon);
    editBtn.appendChild(document.createTextNode('Edit'));
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(document.createTextNode('delete'));
    
    const elementTitleBox = document.createElement('div');
    const elementValueBox = document.createElement('div');
    
    for (const [key,value] of Object.entries(model))
    {
        
        const elementTitle = document.createElement('div');
        const elementValue = document.createElement('div');

        elementTitleBox.className = 'view-element-title-box';
        elementValueBox.className = 'view-element-value-box';
        elementTitle.className = 'view-element-title';
        elementValue.className = 'view-element-value';

        formBody.appendChild(elementTitleBox);
        formBody.appendChild(elementValueBox);
        elementTitleBox.appendChild(elementTitle);
        elementValueBox.appendChild(elementValue);
        
        elementTitle.innerHTML = `${key}:`;    
        elementValue.innerHTML = value;
        
    }

}

