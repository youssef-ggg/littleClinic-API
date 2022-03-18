module.exports = function updateViewBody({ parentDOM, eleName, elementsMetaData, elementsValues }) {

    const inputBox = document.createElement('section')
    const formTitle = document.createElement('section')
    const formFooter = document.createElement('section')
    const submit = document.createElement('button')
    const cancel = document.createElement('button')

    inputBox.className = 'form-input-box'
    formTitle.className = 'form-title'
    formTitle.innerHTML = `Update ${eleName}`
    formFooter.className = 'form-footer  settings-footer'
    submit.type = 'submit'
    submit.id = 'save'
    submit.innerHTML = 'Save'
    submit.className = 'btn form-btn'
    cancel.innerHTML = 'Cancel'
    cancel.className = 'btn form-btn'
    cancel.id = 'cancel'

    parentDOM.appendChild(inputBox);

    elementsMetaData.forEach(element => {

        const formItem = document.createElement('section')
        const label = document.createElement('label')
        const input = document.createElement('input')
        const inputError = document.createElement('span')

        formItem.className = 'form-item'
        label.className = 'form-label'
        label.innerHTML = element.label
        label.htmlFor = element.id
        inputError.className = 'form-error'

        inputBox.appendChild(formItem)
        formItem.appendChild(label);

        if (element.type === 'list') {
            const { options } = element

            const list = document.createElement('select')

            formItem.appendChild(list)
            list.id = element.id
            list.className = 'form-input'
            list.value = elementsValues[element.id]

            for (const option in options) {
                const htmlOption = document.createElement('option')
                htmlOption.value = option
                htmlOption.label = options[option]
                if (elementsValues[element.id] == options[option]) {
                    htmlOption.selected = 'selected'
                }
                list.appendChild(htmlOption)
            }
        }
        else if (element.type === 'radio') {

            const radioBox = document.createElement('section')
            radioBox.className = 'radio-box'
            radioBox.id = element.id;

            formItem.appendChild(radioBox);

            element.choices.forEach(choice => {

                const choiceLabel = document.createElement('label')
                const radioInput = document.createElement('input')
                const checkmark = document.createElement('span')

                choiceLabel.className = 'radio-label'
                choiceLabel.htmlFor = choice
                radioInput.id = choice
                radioInput.value = choice
                radioInput.type = 'radio'
                radioInput.name = element.id
                checkmark.className = 'checkmark'

                if (elementsValues[element.id].toLowerCase() == choice.toLowerCase()) {
                    radioInput.checked = true
                }

                radioBox.appendChild(choiceLabel)
                choiceLabel.appendChild(radioInput)
                choiceLabel.appendChild(checkmark)
                choiceLabel.appendChild(
                    document.createTextNode(choice.charAt(0).toUpperCase() + choice.slice(1))
                )
            })
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
            input.checked = elementsValues[element.id];
            formItem.appendChild(input);
            formItem.appendChild(checkbox);
        }
        else if (element.type === 'textarea') {
            const textAreaInput = document.createElement('textarea')
            textAreaInput.className = 'form-input'
            formItem.appendChild(textAreaInput)
            textAreaInput.id = element.id
            textAreaInput.value = elementsValues[element.id]
        }
        else if (element.type === 'textArray') {

            const inputElment = document.createElement('input')
            const addToListBtn = document.createElement('button')
            const listInputBox = document.createElement('section')

            inputElment.type = 'text'
            inputElment.className = 'form-input'
            listInputBox.id = element.id
            addToListBtn.className = 'add-btn fas fa-plus'
            listInputBox.className = 'form-input-list'

            addToListBtn.addEventListener('click', function (event) {
                event.preventDefault()

                if (inputElment.value.length != 0) {
                    const listLine = document.createElement('section')
                    const listItem = document.createElement('span')
                    const deleteItem = document.createElement('button')

                    listItem.className = 'list-item'
                    listItem.innerHTML = inputElment.value
                    listItem.id = `${element.id}-item`
                    deleteItem.className = 'add-btn fas fa-trash-alt'
                    inputElment.value = ''
                    listLine.appendChild(listItem)
                    listLine.appendChild(deleteItem)
                    formItem.appendChild(listLine)

                    deleteItem.addEventListener('click', function (event) {
                        event.preventDefault()
                        formItem.removeChild(listLine)
                    })
                }
            })

            formItem.appendChild(listInputBox)
            listInputBox.appendChild(inputElment)
            listInputBox.appendChild(addToListBtn)

            if (elementsValues[element.id] !== null && elementsValues[element.id].length > 0) {
                elementsValues[element.id].forEach(value => {
                    const listLine = document.createElement('section')
                    const listItem = document.createElement('span')
                    const deleteItem = document.createElement('button')

                    listItem.className = 'list-item'
                    listItem.innerHTML = value
                    listItem.id = `${element.id}-item`
                    deleteItem.className = 'add-btn fas fa-trash-alt'
                    listLine.appendChild(listItem)
                    listLine.appendChild(deleteItem)
                    formItem.appendChild(listLine)

                    deleteItem.addEventListener('click', function (event) {
                        event.preventDefault()
                        formItem.removeChild(listLine)
                    })
                })
            }
        }
        else {
            input.className = 'form-input';
            input.id = element.id;
            input.name = element.id;
            input.type = element.type;
            if (element.type == 'date') {
                const dateFormat = new Date(elementsValues[element.id]);
                input.value = dateFormat.toLocaleDateString('fr-CA');
            }
            else if (element.type == 'password') {
                input.value = ''
            }
            else {
                input.value = elementsValues[element.id]
            }
            formItem.appendChild(input)
        }
        formItem.appendChild(inputError)
    })

    //----form footer
    inputBox.appendChild(formFooter)
    formFooter.appendChild(submit)
    formFooter.appendChild(cancel)

}
