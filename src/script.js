const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const email = document.querySelector('.email');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const tipoConsulta = document.querySelector('#consulta');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const errorMessage = document.querySelector('.errorMessage'); 
const toast = document.querySelector('.toast'); 

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let isValid = true;
    
    isValid = validacaoCaracteres() && isValid;
    isValid = validacaoEmail() && isValid;
    isValid = validarCheckBox() && isValid;
    isValid = validarRadioButtons() && isValid;
    
    if (isValid) {
        toast.classList.remove('hidden');

    }else{
        toast.classList.add('hidden');
    }
});


function validarRadioButtons() {
    const atLeastOneRadioButtonMarked = Array.from(radioButtons).some(item => item.checked);
    if (atLeastOneRadioButtonMarked) {
        errorMessage.classList.add('hidden');
        return true;
    } else {
        errorMessage.classList.remove('hidden');
        return false;
    }
}    

function setError(index) {
    campos[index].classList.add('border-red-500');
    spans[index].classList.remove('hidden');  
}

function removeError(index) {
    campos[index].classList.remove('border-red-500');
    spans[index].classList.add('hidden');   
}

function validacaoCaracteres() {
    let isValid = true;
    campos.forEach((campo, index) => {
        if (campo.type !== 'checkbox' && campo.type !== 'radio') {
            if (campo.value.length < 3) {
                setError(index);
                isValid = false;
            } else {
                removeError(index);
            }
        }
    });
    return isValid;
}
 
function validacaoEmail() {
    if (!emailRegex.test(campos[2].value)) {
        setError(2);
        return false;
    } else {
        removeError(2);
        return true;
    }
}

function validarCheckBox() {
    var checkbox = document.querySelector('#checkbox');
    var spanCheckBox = document.querySelector('.span-checkbox');
    if (!checkbox.checked) {
        spanCheckBox.style.display = 'block';
        return false;
    } else {
        spanCheckBox.style.display = 'none';
        return true;
    }   
}