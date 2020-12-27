const validator = require('validator');

module.exports = function errorHandler (){

    function formInputPatient(patientInfo){

        const {name,phoneNumber,gender,birthDate} = patientInfo;
        let haserror = false;

        for (const [key,value] of Object.entries({name,phoneNumber,birthDate}))
        {
            const inputElement = document.querySelector(`#${key}`);
            const errorMsg = document.querySelector(`#${key} ~.form-error`);

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            if(!value || value === "")
            {
                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= `Must have a ${key}.`;
                haserror = true;
            }
        }

        if (!validator.isAlpha(validator.blacklist(name, ' ')))
        {
                const inputElement = document.querySelector(`#name`);
                const errorMsg = document.querySelector('#name ~.form-error');

                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= 'Name must only contian letters.';
                haserror = true;
        }
        else if(name.length < 3)
        {
                const inputElement = document.querySelector(`#name`);
                const errorMsg = document.querySelector('#name ~.form-error');

                inputElement.classList.add('form-input-error');
                errorMsg.innerHTML= 'Name must be at least three charachters long.';
                haserror = true;

        }

        if (!validator.isInt(phoneNumber))
        {
            const inputElement = document.querySelector(`#phoneNumber`);
            const errorMsg = document.querySelector('#phoneNumber ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Phone number must only contian digits.';
            haserror = true;
        }
        if(!gender){

            const inputRadio = document.querySelectorAll('.radio-box input[type="radio"]');
            const errorMsg  = document.querySelector('.radio-box ~.form-error');

            inputRadio.forEach(
                radioBtn=>radioBtn.addEventListener('click',()=>{
                    errorMsg.innerHTML = '';
                })
            );
            errorMsg.innerHTML = 'Must have a gender.';
            haserror = true;
        }

        return haserror;
    }

    function formInputDiagnosis(diagnosisInfo){

        const {cheifComplaint,problems,medications,treatment,orders}= diagnosisInfo;
        let hasError = false;

        
        if (!cheifComplaint || cheifComplaint == ''){
            const inputElement = document.querySelector('#cheifComplaint');
            const errorMsg = document.querySelector('#cheifComplaint ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Diagnosis must have a cheif complaint.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            hasError =  true;
        }
        if(problems.length == 0)
        {
            const inputElement = document.querySelector('#problems input');
            const errorMsg = document.querySelector('#problems ~.form-error');
            const inputBtn = document.querySelector('#problems input ~.add-btn');
 
            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML = 'A diagnosis must have a problem.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            inputBtn.addEventListener('click',()=>{
                inputElement.classList.remove('form-input-error');
                    errorMsg.innerHTML = '';
            });
            hasError = true;
        
        }
        if(medications.length == 0 && treatment.length == 0 && orders.length == 0)
        {
            const inputLabelList = ['#medications','#treatment','#orders'];
            const formInputBox = document.querySelector('.form-input-box');
            const errorBox = document.createElement('div');

            hasError = true;
            errorBox.className = 'form-error';
            errorBox.id = 'error-box';
            inputLabelList.forEach(label=>{
                const inputElement = document.querySelector(`${label} input`);
                const inputBtn = document.querySelector(`${label} input ~ .add-btn`);
                inputElement.classList.add('form-input-error');

                inputElement.addEventListener('input',()=>{
                    inputElement.classList.remove('form-input-error');
                    if(formInputBox.contains(document.querySelector('#error-box')))
                        formInputBox.removeChild(errorBox);
                });

                inputBtn.addEventListener('click',()=>{
                    inputElement.classList.remove('form-input-error');
                    formInputBox.removeChild(errorBox);
                });
            });
            errorBox.innerHTML = `A diagnosis must at least have one of the following 
                                <strong>medication, treatment</strong> or <strong>orders</strong>!`;
            
            if(!formInputBox.contains(document.querySelector('#error-box')))
            formInputBox.appendChild(errorBox);
            
        }


        return hasError;
    }

    function formInputAppointment(appointment){

        const {title,patientName,time,date} = appointment;
        let hasError = false;

        if(title == '' || !title)
        {
            const inputElement = document.querySelector('#title');
            const errorMsg = document.querySelector('#title ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Appointment must have a Title.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });
        }
        if(patientName == '' || !patientName)
        {
            const inputElement = document.querySelector('#patientName');
            const errorMsg = document.querySelector('#patientName ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Appointment must have a patient Name.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            hasError = true;
   
        }
        if (time == '' || !time)
        {
            const inputElement = document.querySelector('#time');
            const errorMsg = document.querySelector('#time ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Appointment must have a time.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            hasError = true;
        }
        if (date == '' || !date)
        {
            const inputElement = document.querySelector('#date');
            const errorMsg = document.querySelector('#date ~.form-error');

            inputElement.classList.add('form-input-error');
            errorMsg.innerHTML= 'Appointment must have a date.';

            inputElement.addEventListener('input',()=>{
                inputElement.classList.remove('form-input-error');
                errorMsg.innerHTML = '';
            });

            hasError = true;
        }

        return hasError;
    }

    return Object.freeze({
        formInputPatient,
        formInputDiagnosis,
        formInputAppointment
    });


}