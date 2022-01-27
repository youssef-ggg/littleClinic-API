
module.exports = function renderEmptyTable({ parentDOM }) {

    parentDOM.innerHTML = ''
    const emptyTable = document.createElement('div')
    const emptyHeader = document.createElement('span')
    const emptyBody = document.createElement('span')
    const addElementBtn = document.createElement('button')
    const addElmentText = document.createElement('span')
    const addElementIcon = document.createElement('i')
    
    emptyHeader.innerHTML = 'Empty table'
    emptyBody.innerHTML = 'This table dosen\'t have any items.'
    addElementBtn.id = 'createModel'
    addElementBtn.className = 'btn round-btn'
    addElementIcon.className = 'fas fa-pencil-ruler'
    addElmentText.innerHTML = 'Add Item'

    parentDOM.appendChild(emptyTable)
    emptyTable.appendChild(emptyHeader)
    emptyTable.appendChild(emptyBody)
    emptyTable.appendChild(addElementBtn)
    addElementBtn.appendChild(addElmentText)
    addElementBtn.appendChild(addElementIcon)

    emptyTable.className = 'col-12'
    emptyTable.classList.add('empty-table')

    emptyHeader.className = 'empty-table-header'
    emptyBody.className = 'empty-table-body'
}