module.exports = {
    
    tabs : (tabTitle,tabs)=>{
    
        const leftContent = document.querySelector('.content-left');
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