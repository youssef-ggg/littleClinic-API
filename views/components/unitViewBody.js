module.exports = function renderUnitBodyView({ parentDOM, modelName, model }) {

    const formView = document.createElement('section');
    const formHeader = document.createElement('section');
    const formBody = document.createElement('section');
    // const formFooter = document.createElement('div');
    const formTitle = document.createElement('section');
    const formHeaderAction = document.createElement('section');
    const editBtn = document.createElement('button');
    const editIcon = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createElement('span');

    // formView.className = 'form-view';
    formHeader.className = 'form-view-header';
    formBody.className = 'form-view-body';
    formTitle.innerHTML = modelName;
    editBtn.className = 'unitview-btn';
    deleteBtn.className = 'unitview-btn';
    editIcon.className = 'fas fa-edit';
    deleteIcon.className = 'fas fa-trash-alt'
    editBtn.id = 'edit';
    deleteBtn.id = 'delete';
    formHeaderAction.className = 'header-action';

    parentDOM.appendChild(formView);
    formView.appendChild(formHeader);
    formView.appendChild(formBody);
    // formView.appendChild(formFooter);
    formHeader.appendChild(formTitle);
    formHeader.appendChild(formHeaderAction);
    formHeaderAction.appendChild(editBtn);
    formHeaderAction.appendChild(deleteBtn);
    editBtn.appendChild(editIcon);
    editBtn.appendChild(document.createTextNode('Edit'));
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(document.createTextNode('delete'));


    for (const [key, value] of Object.entries(model)) {
        const elementBox = document.createElement('section');
        const elementTitle = document.createElement('section');
        const elementValue = document.createElement('section');

        elementBox.className = 'view-element-box';
        elementTitle.className = 'view-element-title';
        elementValue.className = 'view-element-value';

        formBody.appendChild(elementBox);
        elementBox.appendChild(elementTitle);
        elementBox.appendChild(elementValue);

        elementTitle.innerHTML = key;
        elementValue.innerHTML = value;

    }

}