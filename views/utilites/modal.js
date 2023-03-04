const renderFormBody = require('../components/formBody')

module.exports = function modal(parentDOM, modalData) {

    const { title, content } = modalData;

    const modalOverlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const modalTitle = document.createElement('div');
    const modalTitleText = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('div');
    const modalText = document.createElement('div');
    const modalButtonBox = document.createElement('div');


    modalOverlay.className = 'modal-overlay';
    modalWindow.className = 'modal-window';
    modalContent.className = 'modal-content';
    modalText.className = 'modal-text';
    modalTitle.className = 'modal-title';
    modalClose.className = 'fas fa-times modal-close';
    modalButtonBox.className = 'modal-button-box';

    parentDOM.appendChild(modalOverlay);
    modalOverlay.appendChild(modalWindow);


    modalWindow.appendChild(modalTitle);
    modalWindow.appendChild(modalContent);
    modalContent.appendChild(modalText);


    modalTitle.appendChild(modalTitleText);
    modalTitle.appendChild(modalClose);
    modalTitleText.innerHTML = title;
    modalText.innerHTML = content;
    if (modalData.inputs) {
        modalWindow.classList.add('modal-form');
        modalText.classList.add('modal-form-title');
        const inputBox = document.createElement('section');
        inputBox.className = 'modal-input-box';
        modalContent.appendChild(inputBox);

        modalData.inputs.forEach(element => {

            const formItem = document.createElement('section');
            const label = document.createElement('label');
            const input = document.createElement('input');
            const inputError = document.createElement('span');

            formItem.className = 'form-item input-container ';
            label.className = 'form-label-modal';
            label.innerHTML = element.label;
            label.htmlFor = element.id;
            inputError.className = 'form-error';

            inputBox.appendChild(formItem);
            formItem.appendChild(label);

            if (element.type === 'radio') {
                const radioBox = document.createElement('section');
                radioBox.className = 'radio-box';
                radioBox.id = element.id;

                formItem.appendChild(radioBox);

                element.choices.forEach(choice => {

                    const choiceLabel = document.createElement('label');
                    const radioInput = document.createElement('input');
                    const checkmark = document.createElement('span');

                    choiceLabel.className = 'radio-label';
                    choiceLabel.htmlFor = choice;
                    radioInput.id = choice;
                    radioInput.value = choice;
                    radioInput.type = 'radio';
                    radioInput.name = element.id;
                    checkmark.className = 'checkmark';

                    radioBox.appendChild(choiceLabel);
                    choiceLabel.appendChild(radioInput);
                    choiceLabel.appendChild(checkmark);
                    choiceLabel.appendChild(document.createTextNode(choice));


                });
            }
            else if (element.type == 'checkbox') {
                const checkbox = document.createElement('label');
                label.removeAttribute('for');
                checkbox.className = 'switch';
                checkbox.htmlFor = element.id;
                formItem.classList += ' checkbox-item';
                input.id = element.id;
                input.name = element.id;
                input.type = element.type;
                formItem.appendChild(input);
                formItem.appendChild(checkbox);
            }
            else if (element.type === 'list') {
                const { options } = element;

                const list = document.createElement('select');

                formItem.appendChild(list);
                list.id = element.id;
                list.className = 'form-input-modal';

                for (const option in options) {
                    const htmlOption = document.createElement('option');
                    htmlOption.value = option;
                    htmlOption.label = options[option];
                    list.appendChild(htmlOption);
                };

            }
            else if (element.type === 'textarea') {
                const textAreaInput = document.createElement('textarea');
                textAreaInput.className = 'form-input-modal';
                formItem.appendChild(textAreaInput);
                textAreaInput.id = element.id;
            }
            else if (element.type === 'textArray') {

                const inputElment = document.createElement('input');
                const addToListBtn = document.createElement('button');
                const listInputBox = document.createElement('section');

                inputElment.type = 'text';
                inputElment.className = 'form-input-modal';
                listInputBox.id = element.id;
                addToListBtn.className = 'add-btn fas fa-plus';
                listInputBox.className = 'form-input-list';


                addToListBtn.addEventListener('click', function (event) {
                    event.preventDefault();

                    if (inputElment.value.length != 0) {
                        const listLine = document.createElement('section');
                        const listItem = document.createElement('span');
                        const deleteItem = document.createElement('button');

                        listItem.className = 'list-item';
                        listItem.innerHTML = inputElment.value;
                        listItem.id = `${element.id}-item`;
                        deleteItem.className = 'add-btn fas fa-trash-alt';
                        inputElment.value = '';
                        listLine.appendChild(listItem);
                        listLine.appendChild(deleteItem);
                        formItem.appendChild(listLine);

                        deleteItem.addEventListener('click', function (event) {
                            event.preventDefault();
                            formItem.removeChild(listLine);
                        });

                    }
                });

                formItem.appendChild(listInputBox);
                listInputBox.appendChild(inputElment);
                listInputBox.appendChild(addToListBtn);


            }
            else {
                input.className = 'form-input-modal';
                input.id = element.id;
                input.name = element.id;
                input.type = element.type;
                if (element.value) {
                    input.value = element.value;
                }

                formItem.appendChild(input);

            }
            formItem.appendChild(inputError);
        });
    }
    if (modalData.buttons) {
        modalContent.appendChild(modalButtonBox);
        modalData.buttons.forEach(button => {
            const modalButton = document.createElement('button');
            modalButton.className = 'btn-modal';
            modalButton.innerHTML = button.name;
            modalButton.id = button.id;
            modalButtonBox.appendChild(modalButton);

            if (modalButton.id == 'cancel')
                modalButton.addEventListener('click', function (event) {
                    parentDOM.removeChild(modalOverlay);
                });
        });
    }

    modalClose.addEventListener('click', function (event) {
        parentDOM.removeChild(modalOverlay);
    });
}