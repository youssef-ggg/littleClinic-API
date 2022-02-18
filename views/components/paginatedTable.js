//TODO:: put all tables in table component
const renderTableBody = require('./tableBody')
const renderTable = require('./table')
const renderEmptyTable = require('./emptyTable')

module.exports = function renderPaginatedTable({ modelList, modelMetaData, parentDOM }) {

    const { title, pageSize, tableActions, ...tableMetaData } = modelMetaData;
    const cache = modelList
    const card = document.createElement('div')
    const cardRow = document.createElement('div')
    const cardCol = document.createElement('div')

    cardRow.classList.add('row')
    cardCol.classList.add('col-8')
    card.classList.add('card')

    parentDOM.appendChild(cardRow)
    cardRow.appendChild(cardCol)
    cardCol.appendChild(card)

    const cardHeader = document.createElement('div')
    const tableTitle = document.createElement('h3')
    const tableActionsBtn = document.createElement('i')
    const dropDownMenu = document.createElement('ul')
    const dropDownMenuContent = document.createElement('div')

    if (cache && cache.length > pageSize) {
        const paginatedTableBox = document.createElement('div')
        parentDOM.appendChild(paginatedTableBox)

        const actionBox = document.createElement('div')
        const searchBar = document.createElement('form')
        const searchInput = document.createElement('input')
        const searchBtn = document.createElement('button')
        const paginationBox = document.createElement('span')
        const paginationText = document.createElement('span')
        const leftPagination = document.createElement('button')
        const rightPagination = document.createElement('button')

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

            tableActionsBtn.addEventListener('click', function (event) {
                if (dropDownMenu.classList.contains('display-none')) {
                    dropDownMenu.classList.remove('display-none')
                }
                else {
                    dropDownMenu.classList.add('display-none')
                }
            })
        })

        cardHeader.className = 'card-header'
        dropDownMenu.classList = 'dropdown-menu display-none'
        dropDownMenuContent.className = 'dropdown-menu-content'
        tableActionsBtn.classList += 'fas fa-ellipsis-h'
        tableActionsBtn.id = 'openTableActions'
        actionBox.className = 'action-box'
        paginationBox.className = 'pagination-box'
        paginationText.className = 'pagination-text'
        leftPagination.className = 'pagination-btn fas fa-chevron-left'
        rightPagination.className = 'pagination-btn fas fa-chevron-right'
        searchBar.className = 'search-bar'
        searchInput.className = 'search-input'
        searchBtn.className = 'search-btn fas fa-search'

        card.appendChild(cardHeader)
        cardHeader.appendChild(tableTitle)
        cardHeader.appendChild(actionBox)
        cardHeader.appendChild(tableActionsBtn)
        cardHeader.appendChild(dropDownMenu)
        actionBox.appendChild(searchBar)
        searchBar.appendChild(searchInput)
        searchBar.appendChild(searchBtn)
        actionBox.appendChild(paginationBox)
        paginationBox.appendChild(paginationText)
        paginationBox.appendChild(leftPagination)
        paginationBox.appendChild(rightPagination)
        dropDownMenu.appendChild(dropDownMenuContent)

        tableTitle.innerHTML = title

        let pageIndex = 0
        let pageLength = calculatePageLength(pageIndex, pageSize, cache.length)
        let page = cache.slice(pageIndex, pageLength)

        leftRightPagnationManager(leftPagination, rightPagination, pageIndex, pageLength, cache.length)
        paginationText.innerHTML = `${pageIndex + 1}-${pageIndex + pageLength}/${modelList.length}`
        renderTableBody({ parentDOM: card, modelList: page, modelMetaData: tableMetaData })

        leftPagination.addEventListener('click', function (event) {
            const pageStepObject =
                paginateLeft(pageIndex, pageSize, cache.length, paginationText, leftPagination, rightPagination)
            pageIndex = pageStepObject.pageIndex
            pageLength = pageStepObject.pageLength
            page = cache.slice(pageIndex, pageIndex + pageLength)
            cardContent = document.querySelector(".card-content")
            card.removeChild(cardContent)
            renderTableBody({ parentDOM: card, modelList: page, modelMetaData: tableMetaData })
        })

        rightPagination.addEventListener('click', function (event) {
            const pageStepObject =
                paginateRight(pageIndex, pageSize, cache.length, paginationText, leftPagination, rightPagination)
            pageIndex = pageStepObject.pageIndex
            pageLength = pageStepObject.pageLength
            page = cache.slice(pageIndex, pageIndex + pageLength)
            cardContent = document.querySelector(".card-content")
            card.removeChild(cardContent)
            renderTableBody({ parentDOM: card, modelList: page, modelMetaData: tableMetaData })
        })

        searchBtn.addEventListener('click', async function (event) {
            event.preventDefault()
            parentDOM.innerHTML = ''
            const { axiosAuth } = modelMetaData.unitView
            const { searchUrlModule, tableFormat,searchField } = modelMetaData.searchView
            const searchResponse =
                await axiosAuth.get(`/${searchUrlModule}/search/byfield?fieldName=${searchField}&fieldRegex=.*${searchInput.value
                    }.*&caseSensitive=false`)
            const searchedTableData = tableFormat(searchResponse.data);
            renderPaginatedTable({ modelList: searchedTableData, modelMetaData, parentDOM })
        })

    } else if (cache && cache.length !== 0) {
        renderTable({ parentDOM, modelList: cache, modelMetaData })
    } else {
        renderEmptyTable({ parentDOM })
    }
}

function paginateRight(pageIndex, pageSize, cacheSize, paginationText, leftPagination, rightPagination) {

    let pageLength = 0
    if ((pageIndex + pageSize) <= cacheSize) {
        pageLength = pageSize
        pageIndex += pageSize

    }
    else {
        pageLength = cacheSize - pageIndex
        pageIndex += (cacheSize - pageIndex)
    }
    if (checkCanRightpaginate(pageIndex, pageLength, cacheSize)) {
        rightPagination.disabled = false
        rightPagination.classList.remove('disabled-btn')
    } else {
        rightPagination.disabled = true
        rightPagination.classList += ' disabled-btn'
        pageLength = cacheSize - pageIndex
    }
    leftPagination.disabled = false
    leftPagination.classList.remove('disabled-btn')
    paginationText.innerHTML = `${pageIndex + 1}-${pageIndex + pageLength}/${cacheSize}`
    return { pageIndex, pageLength }
}

function paginateLeft(pageIndex, pageSize, cacheSize, paginationText, leftPagination, rightPagination) {

    let pageLength = 0
    if (pageIndex - pageSize >= 0) {
        pageLength = pageSize
        pageIndex -= pageSize
    }
    else {
        pageLength = pageIndex
        pageIndex = 0

    }
    if (checkCanLeftPaginate(pageIndex)) {
        leftPagination.disabled = false
        leftPagination.classList.remove('disabled-btn')

    } else {
        leftPagination.disabled = true
        leftPagination.classList += ' disabled-btn'
    }
    rightPagination.disabled = false
    rightPagination.classList.remove('disabled-btn')
    paginationText.innerHTML = `${pageIndex + 1}-${pageIndex + pageLength}/${cacheSize}`
    return { pageIndex, pageLength }
}

function checkCanRightpaginate(pageIndex, pageLength, cacheSize) {
    if ((pageIndex + pageLength) <= cacheSize) {
        return true
    }
    return false
}

function checkCanLeftPaginate(pageIndex) {
    if (pageIndex > 0) {
        return true
    }
    return false
}

function leftRightPagnationManager(leftPagination, rightPagination, pageIndex, pageLength, cacheSize) {

    if (!checkCanLeftPaginate(pageIndex)) {
        leftPagination.disabled = true
        leftPagination.classList += ' disabled-btn'
    } else {
        leftPagination.disabled = false
        leftPagination.classList.remove('disabled-btn')
    }
    if (!checkCanRightpaginate(pageIndex, pageLength, cacheSize)) {
        rightPagination.disabled = true
        rightPagination.classList += ' disabled-btn'
    } else {
        rightPagination.disabled = false
        rightPagination.classList.remove('disabled-btn')
    }
}

function calculatePageLength(pageIndex, pageSize, cacheSize) {
    let pageLength = 0
    if ((pageIndex + pageSize) <= cacheSize) {
        pageLength = pageSize
        pageIndex += pageSize

    }
    else {
        pageLength = cacheSize - pageIndex
        pageIndex += (cacheSize - pageIndex)
    }
    return pageLength
}