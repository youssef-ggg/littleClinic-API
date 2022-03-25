const { userRolesTableFormat, userRoleFormFormat } = require('../config/settings')
const settingsTable = require('./settingsTable')
const formBody = require('./formBody')
const { createUserRoleErrorHandler } = require('../errorHandler')

const createRequest = require('../requests/createRequest')

module.exports = async function renderUserRolesTable({ parentDOM, axiosAuth, userAccess }) {

    const card = document.createElement('section')
    card.classList.add('settings-card')
    parentDOM.appendChild(card)

    const cardHeader = document.createElement('section')
    const cardContent = document.createElement('section')
    const cardTitle = document.createElement('h3')
    const viewRoles = document.createElement('button')

    cardTitle.className = 'settings-title'
    cardTitle.innerHTML = 'Access Roles'
    cardHeader.className = 'settings-header'
    viewRoles.className = 'btn'
    viewRoles.id = 'viewRoles'
    viewRoles.innerHTML = 'View Roles'

    cardHeader.appendChild(cardTitle)
    card.appendChild(cardHeader)
    cardHeader.appendChild(viewRoles)
    card.appendChild(cardContent)

    const systemUsersList = await axiosAuth.get('/access/roles')
    const data = systemUsersList ? systemUsersList.data : []
    if (userAccess['SETTINGS'].create) {
        const addRole = document.createElement('button')
        addRole.innerHTML = 'Add Role'
        addRole.classList += 'btn'
        addRole.id = 'addAccess'
        cardHeader.appendChild(addRole)

        addRole.addEventListener('click', function (event) {
            cardContent.innerHTML = ''
            const eleName = 'User Role'
            formBody({ parentDOM: cardContent, eleName, elementKeys: userRoleFormFormat() })

            const saveBtn = document.querySelector('#save')
            saveBtn.addEventListener('click', async function (event) {
                const accessRightInput = dashboardFormInputReader(userRoleFormFormat())
                if (!createUserRoleErrorHandler({
                    userRoleData: accessRightInput, userRoleList: systemUsersList.data
                })) {
                    const responseData = await createRequest({
                        postData: accessRightInput,
                        moduleTitle: 'Access Rights',
                        requestRoute: '/access/addUserRole', axiosAuth
                    })
                    data.push(responseData)
                }
            })
        })
    }


    if (data && data.length > 0) {
        const usersRolesList = userRolesTableFormat(data)

        settingsTable({ parentDOM: cardContent, data: usersRolesList })

        viewRoles.addEventListener('click', function (event) {
            cardContent.innerHTML = ''
            settingsTable({ parentDOM: cardContent, data: userRolesTableFormat(data) })

        })

    }
}