module.exports = function renderForm({ parentDOM, eleName, elementKeys }) {

    //fix to use card row and card col
    const form = document.createElement('form');
    const inputBox = document.createElement('div');
    const formTitle = document.createElement('div');
    const formFooter = document.createElement('div');
    const submit = document.createElement('button');
    const cancel = document.createElement('button');

    form.classList += 'form col-8';
    inputBox.className = 'form-input-box';
    formTitle.className = 'form-title';
    formTitle.innerHTML = `Create ${eleName}`;
    formFooter.className = 'form-footer';
    submit.type = 'submit';
    submit.id = 'save';
    submit.innerHTML = 'Save';
    submit.classList += 'btn form-btn';
    cancel.innerHTML = 'Cancel';
    cancel.className = 'btn form-btn';
    cancel.id = 'cancel';

    parentDOM.appendChild(form);
    form.appendChild(formTitle);
    form.appendChild(inputBox);

    elementKeys.forEach(element => {

        const formItem = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const inputError = document.createElement('span');

        formItem.className = 'form-item';
        label.className = 'form-label';
        label.innerHTML = element.label;
        label.htmlFor = element.id;
        inputError.className = 'form-error';

        inputBox.appendChild(formItem);
        formItem.appendChild(label);

        if (element.type === 'radio') {
            const radioBox = document.createElement('div');
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
            list.className = 'form-input';

            for (const option in options) {
                const htmlOption = document.createElement('option');
                htmlOption.value = option;
                htmlOption.label = options[option];
                list.appendChild(htmlOption);
            };

        }
        else if (element.type === 'textarea') {
            const textAreaInput = document.createElement('textarea');
            textAreaInput.className = 'form-input';
            formItem.appendChild(textAreaInput);
            textAreaInput.id = element.id;
        }
        else if (element.type === 'textArray') {

            const inputElment = document.createElement('input');
            const addToListBtn = document.createElement('button');
            const listInputBox = document.createElement('div');

            inputElment.type = 'text';
            inputElment.className = 'form-input';
            listInputBox.id = element.id;
            addToListBtn.className = 'add-btn fas fa-plus';
            listInputBox.className = 'form-input-list';


            addToListBtn.addEventListener('click', function (event) {
                event.preventDefault();

                if (inputElment.value.length != 0) {
                    const listLine = document.createElement('div');
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
            input.className = 'form-input';
            input.id = element.id;
            input.name = element.id;
            input.type = element.type;
            if (element.value) {
                input.value = element.value;
            }

            formItem.appendChild(input);

        }
        if (element.readOnly == true) {
            input.readOnly = true;
        }
        formItem.appendChild(inputError);
    });

    //----form footer
    form.appendChild(formFooter);
    formFooter.appendChild(submit);
    formFooter.appendChild(cancel);
}