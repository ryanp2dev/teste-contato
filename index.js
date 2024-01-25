const $stepText = $('#step-text')
const $stepDescription = $('#step-description')
const $stepOne = $('.step.one')
const $stepTwo = $('.step.two')
const $stepThree = $('.step.three')

const $inputNome = $("#nome")
const $inputSobrenome = $("#sobrenome")
const $inputDataDeNascimento = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
const $containerBtnFormOne = $('#containerBtnFormOne')
const $btnFormOne = $("#btnFormOne")
const $inputEndereco = $('#endereco')
const $inputComplemento = $("#complemento")
const $inputCidade = $("#cidade")
const $inputCep = $("#cep")
const $containerBtnFormTwo = $('#containerBtnFormTwo')
const $btnFormTwo = $('#btnFormTwo')
const $inputHabilidades = $("#habilidades")
const $inputPontosForte= $("#pontosForte")
const $containerBtnFormThree = $('#containerBtnFormThree')
const $btnFormThree = $('#btnFormThree')
const $title = $('#title')


let nomeValido = false;
let sobreNomeValido = false;
let dataNascimentoValido= false;
let emailValido = false;
let cidadeValido = false;
let enderecoValido = false;
let cepValido = false;
let habilidadesvalido = false;
let pontosFortesvalido = false;


const minLengthText = 2
maxLengthTextArea = 10
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element,minLength,maxLength,regex){
    const closest =  $(element).closest(".input-data");
        if(!element.value
            || ( minLength && element.value.trim().length < minLength)
            || (maxLength && element.value.trim().length > maxLength)
            || (regex && !element.value.toLowerCase().match(regex))
            ){
            closest.addClass('error')
            return false
        }else{
            closest.removeClass('error')
            return true
        }
}


function validarFormularioUm(){
    if(nomeValido && dataNascimentoValido && sobreNomeValido && emailValido) {
        $containerBtnFormOne.removeClass("disabled")
        $btnFormOne.removeClass("disabled")
        $btnFormOne.off('click').on("click",iniciarFormulario2)
    }else{
        $containerBtnFormOne.addClass("disabled")
        $btnFormOne.addClass("disabled")
        $btnFormOne.off("click")
       
    }
}

function iniciarFormulario2(){
    $stepText.text("Passo 2 de 3 dados de correspondencia")
    $stepDescription.text("Precisamos desses dados para entra em contato.")
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function(){
        enderecoValido= validarInput(this,maxLengthTextArea)
        validarFormularioDois()
    })

    $inputCidade.keyup(function(){
        cidadeValido = validarInput(this,minLengthText)
        validarFormularioDois()

    })

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g, '')
        cepValido = validarInput(this,null,null,cepRegex)
        if(cepValido){
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
            validarFormularioDois()

        }
    })
}


function validarFormularioDois(){
    if(enderecoValido && cepValido && cidadeValido) {
        $containerBtnFormTwo.removeClass("disabled")
        $btnFormTwo.removeClass("disabled")
        $btnFormTwo.off('click').on("click",iniciarFormulario3)
    }else {
        $containerBtnFormTwo.addClass("disabled")
        $btnFormTwo.addClass("disabled")
        $btnFormTwo.off("click")
    }
}


function iniciarFormulario3() {
    $stepText.text("Passo 3 de 3 - Conte-nos sobre você")
    $stepDescription.text("Nao economize palavra, aqui é onde você pode se destacar.")
    $stepOne.hide();
    $stepTwo.hide();
    $stepThree.show();

    $inputHabilidades.keyup(function(){
      habilidadesvalido =  validarInput(this,maxLengthTextArea)
      validarFormularioTres()

    })

    $inputPontosForte.keyup(function(){
        pontosFortesvalido =validarInput(this,maxLengthTextArea)
        validarFormularioTres()
    })
}


function validarFormularioTres(){
    if(habilidadesvalido && pontosFortesvalido){
        $containerBtnFormThree.removeClass('disabled')
        $btnFormThree.removeClass('disabled')
        $btnFormThree.off('click').on('click', finilazinarFormulario)

    }else{
        $containerBtnFormThree.addClass('disabled')
        $btnFormThree.addClass('disabled')
        $btnFormThree.off('click')
    }
}


function finilazinarFormulario(){
    $stepThree.hide();
    $stepDescription.hide()

    $title.text('Muito obrigado pela sua inscrição!');
    $stepText.text('Entraremos em contato assim que possível, nosso prazo médio de resposta é de 5 dias. Fique atento na sua caixa de email.');
}

function init() {
    $stepText.text("Passo 1 de 3 dados pessoais")
    $stepDescription.text("Descreava seus dados para que possamos te conhecer melhor.")
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function(){
      nomeValido =  validarInput(this,minLengthText)
      validarFormularioUm()
    })

    $inputSobrenome.keyup(function(){
        sobreNomeValido = validarInput(this,minLengthText)
        validarFormularioUm()
       
    })

   
    $inputDataDeNascimento.change(function(){
       dataNascimentoValido = validarInput(this,minLengthText)
       validarFormularioUm()
    })


    $inputDataDeNascimento.keyup(function(){
      dataNascimentoValido =  validarInput(this,minLengthText)
      validarFormularioUm()
    })

    $inputEmail.keyup(function(){
       emailValido = validarInput(this,null,null,emailRegex)
       validarFormularioUm()
    })

    $inputDataDeNascimento.on('focus',function(){
        this.type = 'date';
    })

    $inputDataDeNascimento.on('blur',function(){
        if(!this.value){
            this.type = 'text'
        }
    })

}
async function salvarNoTrello(){
    try {
        const nome = $inputNome.val();
        const sobrenome = $inputSobrenome.val()
    }catch(e){
        console.log("Ocorreu um erro ao salvatr no trello:",e)
    }
}


init()