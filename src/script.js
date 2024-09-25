const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const email = document.querySelector('.email');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const tipoConsulta = document.querySelector('#consulta');



form.addEventListener('submit', (event) => {
        event.preventDefault();
        validacaoCaracteres();
        validacaoEmail();
        validarCheckBox();
        validarRadioButtons();

    });

function validarRadioButtons() {
    const spanRadioButtons = document.getElementById('#"errorMessage')
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const atLeastOneRadioButtonMarked = Array.from(radioButtons).some(item => item.checked)
    if(atLeastOneRadioButtonMarked){
        errorMessage.classList.add('hidden');
        errorMessage.classList.remove('border-red-500');
    }else {
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('border-red-500');   
    }
}    

function setError(index){
    campos[index].classList.add('border-red-500');
    spans[index].classList.remove('hidden');  
}

function removeError(index){
    campos[index].classList.remove('border-red-500');
    spans[index].classList.add('hidden');   
}

function validacaoCaracteres() {
   campos.forEach((campo, index) => {
        if(campo.value.length < 3){
            setError(index);
        }else{
            removeError(index);
       }      
   }); 
};

function validacaoEmail(){
    if(!emailRegex.test(campos[2].value)){
        return setError(2);
    }else {
        return removeError(2);
    }
};

function validarCheckBox(){
    var checkbox = document.querySelector('#checkbox');
    var spanCheckBox = document.querySelector('.span-checkbox');

        if(!checkbox.checked){
            spanCheckBox.style.display = 'block';
        }else{
            spanCheckBox.style.display = 'none';  
        }   
}

