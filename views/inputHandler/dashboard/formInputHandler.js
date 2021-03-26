
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
        else if (input.type == 'date'){
            const birthDate = document.querySelector(`input[name="${input.id}"]`).value;
            userInput[input.id] = new Date(birthDate).getTime();
        }
        else if (input.type == 'radio'){

            input.choices.forEach(choice=>{
                if(document.querySelector(`input[id="${choice}"]`).checked){
                    userInput[input.id] = choice;
                }
            });
            if (!userInput[input.id]){
                userInput[input.id] = "";
            }
        }
        else if (input.type == 'number'){
            const number = document.querySelector(`input[name="${input.id}"]`).value;
            userInput[input.id] = parseFloat(number);
        }
        else if(input.type == 'textarea'){
            userInput[input.id] = document.querySelector(`#${input.id}`).value;
        }
    });

    return userInput;
}