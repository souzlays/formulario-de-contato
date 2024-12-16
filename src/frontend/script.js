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

        const formData = {
            userName: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            userEmail: document.getElementById('emailAdress').value,
            consulta: document.querySelector('input[name="consulta"]:checked')?.value,
            message: document.getElementById('message').value,
            acceptContact: document.getElementById('checkbox').checked
        };

        showToast(4000);

        fetch('http://localhost:3000/api/form-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Detalhes do erro:', error);
        });
    } else {
        toast.classList.add('hidden');
    }
});

function showToast(duration) {
    toast.classList.remove('hidden', 'opacity-0');
    toast.classList.add('opacity-100');
   
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 700);
    }, duration);
}



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
        if (campo.type !== 'checkbox' && campo.type !== 'radio' && campo.type !== 'email') {
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