const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function setError(index){
    campos[index].classList.add('border-red-500');
    spans[index].classList.remove('hidden');
}

function removeError(index){
    campos[index].classList.remove('border-red-500');
    spans[index].classList.add('hidden')
}

function validacaoNome() {
   campos.forEach((campo, index) => {
       if(campo.value.length < 3){
           setError(index);
       }else{
           removeError(index);
       }
   }) 
};
