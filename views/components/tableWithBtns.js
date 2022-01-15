const formBody = require('./formBody')
const { accessRightsFormFormat } = require('../config/settings')
const dashboardFormInputReader = require('../inputHandler/dashboard/formInputHandler')
const { createAccessRightsErrorHandler } = require('../errorHandler')
const createRequest = require('../requests/createRequest')

module.exports = async function renderBtnsTable({ parentDOM, axiosAuth }) {

    const card = document.createElement('section')
    card.classList.add('settings-card')
    parentDOM.appendChild(card)

    const cardHeader = document.createElement('section')
    const cardContent = document.createElement('section')
    const cardTitle = document.createElement('h3')
    cardTitle.className = 'settings-title'
    cardTitle.innerHTML = 'Grant Remove Access Rights'
    cardHeader.className = 'settings-header'

    const systemUsersList = await axiosAuth.get('/access/roles')
    const response = await axiosAuth.get(`/access/usersRights`)
    if (systemUsersList) {

        const list = document.createElement('select')
        const manageBtn = document.createElement('button')
        const addAccess = document.createElement('button')

        const { data } = response
        const usersRolesList = []
        list.id = 'selectedRole'
        list.className = 'settings-list-input'
        manageBtn.innerHTML = 'view Access'
        manageBtn.id = 'getAccess'
        manageBtn.classList += 'btn'
        addAccess.innerHTML = 'Add Access'
        addAccess.classList += 'btn'
        addAccess.id = 'addAccess'

        systemUsersList.data.forEach(roleObject => {
            const htmlOption = document.createElement('option')
            usersRolesList.push(roleObject.role)
            htmlOption.value = roleObject.role
            htmlOption.label = roleObject.role
            list.appendChild(htmlOption)
        })
        cardHeader.appendChild(list)
        cardHeader.appendChild(manageBtn)
        cardHeader.appendChild(addAccess)
        card.appendChild(cardHeader)

        manageBtn.addEventListener('click', () => {
            card.appendChild(cardContent)
            cardContent.innerHTML = ''
            if (data[list.value]) {
                const table = document.createElement('table')
                const thead = document.createElement('thead')
                const tbody = document.createElement('tbody')
                let tableRow = document.createElement('tr')

                table.className = 'table-content'

                cardContent.appendChild(table)
                table.appendChild(thead)
                table.appendChild(tbody)
                thead.appendChild(tableRow)

                const { id, createdOn, modifiedOn, ...getModelKeys } = data[list.value][0]
                const modelKeys = Object.keys(getModelKeys)
                let colTitle = document.createElement('th')

                modelKeys.forEach((key) => {
                    colTitle = document.createElement('th')
                    tableRow.appendChild(colTitle)
                    if (key == 'userRole') {
                        key = 'Role'
                    }
                    colTitle.appendChild(document.createTextNode(
                        key.charAt(0).toUpperCase() + key.slice(1)))
                })

                data[list.value].forEach(element => {
                    const { id, createdOn, modifiedOn, ...rowData } = element
                    tableRow = document.createElement('tr')
                    tableRow.className = 'table-row'

                    tbody.appendChild(tableRow)
                    let values = Object.values(rowData)

                    values.forEach((value) => {
                        const col = document.createElement('td')
                        tableRow.appendChild(col)
                        if (typeof (value) == 'boolean') {
                            const checkbox = document.createElement('input')
                            checkbox.type = 'checkbox'
                            checkbox.className = 'settings-checkbox'
                            checkbox.checked = value
                            checkbox.readOnly = true
                            col.appendChild(checkbox)

                        } else {
                            col.appendChild(document.createTextNode(value))
                        }
                    })
                })
            } else {
                const emptyTable = document.createElement('section')
                const emptyHeader = document.createElement('span')
                const emptyBody = document.createElement('span')

                emptyHeader.innerHTML = 'Empty table'
                emptyBody.innerHTML = 'This user role dosen\'t have any access rights.'

                cardContent.appendChild(emptyTable)
                emptyTable.appendChild(emptyHeader)
                emptyTable.appendChild(emptyBody)

                emptyTable.className = 'active'
                emptyTable.classList.add('empty-table')

                emptyHeader.className = 'empty-table-header'
                emptyBody.className = 'empty-table-body'
            }

        })

        addAccess.addEventListener('click', () => {
            const eleName = 'Access Right'
            card.appendChild(cardContent)
            cardContent.innerHTML = ''

            const elementKeys = accessRightsFormFormat({ usersRoles: usersRolesList })
            formBody({ parentDOM: cardContent, eleName, elementKeys })

            const saveBtn = document.querySelector('#save')
            saveBtn.addEventListener('click',async function (event) {
                const accessRightInput = dashboardFormInputReader(elementKeys)

                if (!createAccessRightsErrorHandler({ accessRightsList: data, accessRightInput })) {
                    const responseData = await createRequest({
                        postData: accessRightInput,
                        moduleTitle: 'Access Rights',
                        requestRoute: '/access/addRole', axiosAuth
                    })
                }
            })

        })
    }
}