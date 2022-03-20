const { userRolesTableFormat } = require('../config/settings')

module.exports = async function renderUserRolesTable({ parentDOM, axiosAuth, userAccess }) {

    const card = document.createElement('section')
    card.classList.add('settings-card')
    parentDOM.appendChild(card)

    const cardHeader = document.createElement('section')
    const cardContent = document.createElement('section')
    const cardTitle = document.createElement('h3')
    cardTitle.className = 'settings-title'
    cardTitle.innerHTML = 'Access Roles'
    cardHeader.className = 'settings-header'

    const addRole = document.createElement('button')
    addRole.innerHTML = 'Add Role'
    addRole.classList += 'btn'
    addRole.id = 'addAccess'

    cardHeader.appendChild(cardTitle)
    cardHeader.appendChild(addRole)
    card.appendChild(cardHeader)
    card.appendChild(cardContent)

    const systemUsersList = await axiosAuth.get('/access/roles')

    if (systemUsersList) {
        const { data } = systemUsersList

        const usersRolesList = userRolesTableFormat(data)

        if (usersRolesList && usersRolesList.length > 0) {
            const table = document.createElement('table')
            const thead = document.createElement('thead')
            const tbody = document.createElement('tbody')
            let tableRow = document.createElement('tr')

            table.className = 'table-content'
            cardContent.className = 'card-content'

            cardContent.appendChild(table)
            table.appendChild(thead)
            table.appendChild(tbody)
            thead.appendChild(tableRow)

            const { id, ...getModelKeys } = usersRolesList[0]
            const modelKeys = Object.keys(getModelKeys)
            let colTitle = document.createElement('th')

            modelKeys.forEach((key) => {
                colTitle = document.createElement('th')
                tableRow.appendChild(colTitle)
                colTitle.appendChild(document.createTextNode(key))
            })

            usersRolesList.forEach((element) => {
                const { id, ...rowData } = element
                tableRow = document.createElement('tr')
                tableRow.className = 'table-row'

                tbody.appendChild(tableRow);
                let values = Object.values(rowData)

                values.forEach((value) => {
                    const col = document.createElement('td')
                    tableRow.appendChild(col)
                    col.appendChild(document.createTextNode(value))

                })
                tableRow.addEventListener('click', async function () {
                    //fix here transfere query string some where else
                    // const response = await axiosAuth.get(`${url}${id}`);
                    // unitRenderer(response.data);
                })
            })
        }
        else {

            const emptyTable = document.createElement('div')
            const emptyHeader = document.createElement('span')
            const emptyBody = document.createElement('span')

            emptyHeader.innerHTML = 'Empty table'
            emptyBody.innerHTML = 'your entities appear hear.'

            parentDOM.appendChild(emptyTable)
            emptyTable.appendChild(emptyHeader)
            emptyTable.appendChild(emptyBody)

            emptyTable.className = 'empty-table'
            emptyHeader.className = 'empty-table-header'
            emptyBody.className = 'empty-table-body'

        }

    }
}