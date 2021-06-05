module.exports = {
    
    tabs : (tabTitle,tabs)=>{
    
        const leftContent = document.querySelector('.wrapper');
        const leftContentHeader = document.createElement('div');
        const leftContentBody = document.createElement('div');
        const leftContentFooter = document.createElement('div');

        leftContent.innerHTML ='';
        leftContent.classList.remove('create-entity');
        leftContentHeader.innerHTML = tabTitle;
        leftContentHeader.className = 'content-left-header';
        leftContentBody.className = 'content-left-body';
        leftContentFooter.className = 'content-left-footer';

        leftContent.appendChild(leftContentHeader);
        leftContent.appendChild(leftContentBody);
        leftContent.appendChild(leftContentFooter);

        tabs.forEach(tab=>{
            const tabButton = document.createElement('button');
            const icon = document.createElement('span');


            leftContentBody.appendChild(tabButton);
            tabButton.appendChild(icon);
            tabButton.appendChild(document.createTextNode(tab.name));
            tabButton.id = tab.id;
            tabButton.className = 'tabs';
            icon.className = tab.icon;
        });
    },
    cards:({parentElement,cardTitle,cardElements})=>{

        const cardRow = document.createElement('div');
        const cardCol = document.createElement('div');
        const card = document.createElement('div');
        const cardContent = document.createElement('div');
        
        card.classList.add('card');
        cardContent.classList.add('card-content');
        parentElement.appendChild(card);
        card.appendChild(cardContent);
        
        cardElements.forEach(cardElement=>{
            const cardBtn = document.createElement('button');
            const btnIcon = document.createElement('i');
            const btnText = document.createElement('span');

            btnIcon.classList+=(cardElement.icon);
            btnText.innerHTML = cardElement.name;
            cardBtn.id = cardElement.id;

            cardContent.appendChild(cardBtn);
            cardBtn.appendChild(btnIcon);
            cardBtn.appendChild(btnText);
            btnText.innerHTML = cardElements[0].name;
        });

        
    },
    //give better name
    clearLeftNav:(tabInfo)=>{
        const leftContent = document.querySelector('.content-left');
        const leftContentBody = document.createElement('div');
        
        leftContent.innerHTML = '';
        leftContent.appendChild(leftContentBody);
        leftContent.classList.add('create-entity');
        leftContentBody.className = 'content-left-body';
        leftContentBody.innerHTML = tabInfo;
    }
}