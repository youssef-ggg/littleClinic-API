module.exports = function modal(parentDOM,modalData){

    const {title,content}=modalData;

    const modalOverlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const modalTitle = document.createElement('div');
    const modalTitleText = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('div');
    const modalText = document.createElement('div');
    const modalButtonBox = document.createElement('div');

    
    modalOverlay.className = 'modal-overlay';
    modalWindow.className = 'modal-window';
    modalContent.className = 'modal-content';
    modalText.className = 'modal-text';
    modalTitle.className = 'modal-title';
    modalClose.className = 'fas fa-times modal-close';
    modalButtonBox.className = 'modal-button-box';
   
    parentDOM.appendChild(modalOverlay);
    modalOverlay.appendChild(modalWindow);


    modalWindow.appendChild(modalTitle);
    modalWindow.appendChild(modalContent);
    modalContent.appendChild(modalText);
    
    
    modalTitle.appendChild(modalTitleText);
    modalTitle.appendChild(modalClose);
    modalTitleText.innerHTML = title;
    modalText.innerHTML = content;
    
    if(modalData.buttons)
    {
        modalContent.appendChild(modalButtonBox);
        modalData.buttons.forEach(button => {
            const modalButton = document.createElement('button');
            modalButton.className = 'btn-modal';
            modalButton.innerHTML = button.name;
            modalButton.id = button.id;
            modalButtonBox.appendChild(modalButton);

            if(modalButton.id == 'cancel')
                modalButton.addEventListener('click',function(event){
                    parentDOM.removeChild(modalOverlay);
                });
        });
    }

    modalClose.addEventListener('click',function(event){
        parentDOM.removeChild(modalOverlay);
    });
}