module.exports = {
    tabs: ({ patentDOM, navItems ,tabTitle}) => {

        const cardCol = document.createElement('div');
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardHeaderTitle = document.createElement('h3');
        const cardContent = document.createElement('div');

        cardCol.classList += 'col-3 tabs';
        card.classList += 'card';
        cardHeader.classList += 'card-header';
        cardContent.classList += 'card-content navbar-content';
        cardHeaderTitle.innerHTML = tabTitle || 'Add tab title';

        patentDOM.appendChild(cardCol);
        cardCol.appendChild(card);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        cardHeader.appendChild(cardHeaderTitle);

        navItems.forEach(item => {
            const navBtn = document.createElement('button');
            const navBtnIcon = document.createElement('i');
            const navBtnTitle = document.createElement('span');

            navBtn.classList += 'rightNav-btn';
            navBtnIcon.classList += item.icon;
            navBtnTitle.innerHTML += item.name;
            navBtnTitle.id = item.id;

            cardContent.appendChild(navBtn);
            navBtn.appendChild(navBtnIcon);
            navBtn.appendChild(navBtnTitle);
        });

    }
}