const table = require("./table")

module.exports = function financialTransactionTable({ parentDOM, modelList, modelMetaData }) {

    const { tableActions, dateData } = modelMetaData
    const currentDate = new Date()
    //currentMonth + 1 javascript month starts at 0
    const currentMonth = dateData.month// + 1
    const currentYear = dateData.year

    const cardRow = document.createElement('div')
    const cardCol = document.createElement('div')
    const card = document.createElement('div')

    cardRow.classList.add('row')
    cardCol.classList.add('col-12')
    card.classList.add('card')

    parentDOM.appendChild(cardRow)
    cardRow.appendChild(cardCol)
    cardCol.appendChild(card)


    //non empty table
    const cardHeader = document.createElement('div')
    const cardContent = document.createElement('div')
    const tableTitle = document.createElement('h3')
    const monthInputDiv = document.createElement('span')
    const tableMonthInput = document.createElement('input')
    const chooseMonthBtn = document.createElement('button')
    const tableActionsBtn = document.createElement('i')
    const dropDownMenu = document.createElement('ul')
    const dropDownMenuContent = document.createElement('div')

    tableActions.forEach(action => {
        const dropDownMenuItem = document.createElement('div')
        const dropDownMenuLink = document.createElement('a')
        const dropDownMenuLinkContent = document.createElement('div')
        const dropDownMenuLinkIcon = document.createElement('i')
        const dropDownMenuLinkTitle = document.createElement('span')

        dropDownMenuItem.classList += 'dropdown-menu-item'
        dropDownMenuLink.id = action.id
        dropDownMenuLink.classList += 'dropdown-menu-link'
        dropDownMenuLinkIcon.classList += action.icon
        dropDownMenuLinkTitle.innerHTML = action.name

        dropDownMenuContent.appendChild(dropDownMenuItem)
        dropDownMenuItem.appendChild(dropDownMenuLink)
        dropDownMenuLink.appendChild(dropDownMenuLinkContent)
        dropDownMenuLinkContent.appendChild(dropDownMenuLinkIcon)
        dropDownMenuLinkContent.appendChild(dropDownMenuLinkTitle)
    });

    tableMonthInput.type = 'month'
    tableMonthInput.id = 'monthInput'
    chooseMonthBtn.id = 'monthChoice'

    tableActionsBtn.addEventListener('click', function (event) {
        if (dropDownMenu.classList.contains('display-none')) {
            dropDownMenu.classList.remove('display-none')
        }
        else {
            dropDownMenu.classList.add('display-none')
        }
    });

    cardHeader.className = 'card-header'
    cardContent.className = 'card-content transaction-table'
    dropDownMenu.classList = 'dropdown-menu display-none'
    dropDownMenuContent.className = 'dropdown-menu-content'

    tableTitle.className = ''
    tableActionsBtn.classList += 'fas fa-ellipsis-h'
    tableActionsBtn.id = 'openTableActions'
    monthInputDiv.className = 'date-input-box'
    tableMonthInput.value = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}`
    tableMonthInput.min = `${currentYear - 6}-1`
    tableMonthInput.classList += 'date-input'
    chooseMonthBtn.classList += 'date-btn fas fa-history'

    card.appendChild(cardHeader)
    card.appendChild(cardContent)
    cardHeader.appendChild(tableTitle)
    cardHeader.appendChild(monthInputDiv)
    cardHeader.appendChild(tableActionsBtn)
    cardHeader.appendChild(dropDownMenu)
    monthInputDiv.appendChild(tableMonthInput)
    monthInputDiv.appendChild(chooseMonthBtn)
    dropDownMenu.appendChild(dropDownMenuContent)

    tableTitle.innerHTML = modelMetaData.tableHeader

    const transactionDetailsTable = document.createElement('table')
    const headers = document.createElement('thead')
    const body = document.createElement('tbody')
    const firstHeader = document.createElement('tr')
    const secondHeader = document.createElement('tr')

    cardContent.appendChild(transactionDetailsTable)
    transactionDetailsTable.appendChild(headers)
    headers.appendChild(firstHeader)
    headers.appendChild(secondHeader)
    transactionDetailsTable.appendChild(body)

    const upperTableHeaders = [
        { title: 'Transaction Detalis', colSpanLen: 3 },
        { title: 'Cash In', colSpanLen: 4 },
        { title: 'Cash Out', colSpanLen: 4 }
    ]
    const modelKeys = [
        'Date', 'Description', 'Reference', 'Sales', 'Investment', 'Other', 'Total Cash In',
        'Salaries', 'Equipment', 'ads', 'Total Cash Out', 'Amount'
    ]
    const colTitles = [
        "date",
        "description",
        "referenceNum",
        "revenue",
        "investment",
        "other",
        "Cash In",
        "wages",
        "equipment",
        "marketing",
        "Cash Out",
        "amount"
    ]
    const { monthlyTransactions, monthlyBalance } = modelList

    upperTableHeaders.forEach(upperHeader => {
        const colUpperTitle = document.createElement('th')
        colUpperTitle.colSpan = upperHeader.colSpanLen
        firstHeader.appendChild(colUpperTitle)
        colUpperTitle.appendChild(document.createTextNode(upperHeader.title));
    })

    modelKeys.forEach(key => {
        const colUpperTitle = document.createElement('th')
        secondHeader.appendChild(colUpperTitle)
        colUpperTitle.appendChild(document.createTextNode(key));
    })
    //--------opening balance--------------- 
    const openingBalanceRow = document.createElement('tr')
    openingBalanceRow.className = 'table-row'
    body.appendChild(openingBalanceRow)

    monthlyBalance[0]['referenceNum'] = ' '
    colTitles.forEach(key => {
        const tableCol = document.createElement('td')
        if (monthlyBalance[0][key] < 0) {
            tableCol.innerHTML = `(${monthlyBalance[0][key] * -1})`
            tableCol.style.color = 'red'
        } else {
            tableCol.innerHTML = monthlyBalance[0][key]
        }
        tableCol.style.textAlign = 'right'
        openingBalanceRow.appendChild(tableCol)
    })
    //---------------------------------------------------

    monthlyTransactions.forEach(value => {
        const tableRow = document.createElement('tr')
        tableRow.className = 'table-row'
        body.appendChild(tableRow)
        colTitles.forEach(key => {
            const tableCol = document.createElement('td')

            if (value[key] < 0) {
                tableCol.innerHTML = `(${value[key] * -1})`
                tableCol.style.color = 'red'
            } else {
                tableCol.innerHTML = value[key] || value[key] === 0 ? value[key] : ''
            }
            tableCol.style.textAlign = 'right'
            tableRow.appendChild(tableCol)
        })
    })

    //--------closing balance--------------- 
    const closingBalanceRow = document.createElement('tr')
    closingBalanceRow.className = 'table-row'
    body.appendChild(closingBalanceRow)
    monthlyBalance[1]['referenceNum'] = ' '

    colTitles.forEach(key => {
        const tableCol = document.createElement('td')
        if (monthlyBalance[1][key] < 0) {
            tableCol.innerHTML = `(${monthlyBalance[1][key] * -1})`
            tableCol.style.color = 'red'
        } else {
            tableCol.innerHTML = monthlyBalance[1][key]
        }
        tableCol.style.textAlign = 'right'
        closingBalanceRow.appendChild(tableCol)
    })
    //---------------------------------------------------


}