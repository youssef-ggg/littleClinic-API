
module.exports = function dashboardFormInputReader(inputFormat){

    const userInput = {};
    inputFormat.forEach(input=>{
        if(input.type == 'text' || input.type=='password')
        {
            userInput[input.id] = document.querySelector(`input[name="${input.id}"]`).value;
        }
        else if (input.type == 'textArray'){
            const list = [];
            document.querySelectorAll(`#${input.id}-item`)
                .forEach(node=>node.innerHTML!=""?list.push(node.innerHTML):false);
            
            if(list.length>0){
                userInput[input.id] = list;
            }
        }
    });

    return userInput;
}