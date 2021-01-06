module.exports = function toastNote(message,state){
    
    const toast = document.createElement('div');

    document.body.appendChild(toast);
    toast.innerHTML = message;

    toast.className = `toast toast-${state}`;

    setTimeout(()=>{
        document.body.removeChild(toast);
    },1500);

    
}