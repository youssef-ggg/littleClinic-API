const tableWithBtns = require('./tableWithBtns')
const renderUserRolesTable = require('./usersSettingsTable')

module.exports = function renderTabs({ parentDOM, tabs, axiosAuth, userAccess }) {

    const tabContianer = document.createElement('div')
    const tabHeader = document.createElement('div')
    const tabsList = document.createElement('ul')
    const tabBody = document.createElement('div')

    tabContianer.classList.add('col-12')
    tabContianer.classList.add('tab-container')
    tabHeader.className = 'tab-header'
    tabBody.className = 'tab-body'
    parentDOM.appendChild(tabContianer)
    tabContianer.appendChild(tabHeader)
    tabHeader.appendChild(tabsList)
    tabContianer.appendChild(tabBody)

    let index = 1
    content = []

    tabs.forEach(tab => {
        // const tabInput = document.createElement('input')
        const tabLabel = document.createElement('div')
        const tabIcon = document.createElement('i')
        const tabSpanText = document.createElement('span')

        tabIcon.className = tab.icon
        tabLabel.className = 'tab-label'

        // tabContianer.appendChild(tabInput)
        tabsList.appendChild(tabLabel)
        tabLabel.appendChild(tabIcon)
        tabLabel.appendChild(tabSpanText)
        tabSpanText.innerHTML = tab.title


        const tabSection = document.createElement('div')
        tabBody.appendChild(tabSection)
        if (tab.id == 'accessRights') {
            tableWithBtns({ parentDOM: tabSection, axiosAuth, userAccess })
        } else if (tab.id == 'usersSettings') {
            renderUserRolesTable({ parentDOM: tabSection, axiosAuth, userAccess })
        } else {
            tabSection.innerHTML = `still needs work ${index}`
        }

        if (index === 1) {
            tabLabel.classList.add('active')
            tabSection.classList.add('active')
        }
        tabLabel.addEventListener('click', function (event) {
            activeTabs = document.querySelectorAll('.active')
            activeTabs.forEach(activeTab => {
                activeTab.classList.remove('active')
            })

            tabLabel.classList.add('active')
            tabSection.classList.add('active')

        })

        index++
    })

}