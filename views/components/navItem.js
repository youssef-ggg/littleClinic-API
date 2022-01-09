module.exports = Object.freeze({

    createNavItem: ({ parentDOM, itemId, itemTitle, itemIcon }) => {

        const sideBarNavItem = document.createElement('li')
        const sideBarLink = document.createElement('a')
        const sideBarDiv = document.createElement('div')
        const sideBarIcon = document.createElement('i')
        const sideBarTitle = document.createElement('span')

        sideBarNavItem.className = 'sidebar-nav-item'
        sideBarLink.className = 'sidebar-nav-link'
        sideBarLink.id = itemId
        sideBarIcon.className = itemIcon
        sideBarTitle.innerHTML = itemTitle

        parentDOM.appendChild(sideBarNavItem)
        sideBarNavItem.appendChild(sideBarLink)
        sideBarLink.appendChild(sideBarDiv)
        sideBarDiv.appendChild(sideBarIcon)
        sideBarLink.appendChild(sideBarTitle)

    }
})