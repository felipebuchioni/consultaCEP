const form = document.querySelector('.form')
const inputCEP = document.getElementById('cep')
const errorMesage = document.getElementById('erro')



form.addEventListener('submit', (event) => {
  event.preventDefault()
  consultaCEP(inputCEP.value)
})

async function consultaCEP(CEP) {

  const cidade = document.getElementById('cidade')
  const bairro = document.getElementById('bairro')
  const logradouro = document.getElementById('logradouro')
  const UF = document.getElementById('estado')

  errorMesage.innerHTML = ''
  cidade.value = ''
  cidade.disabled = false
  cidade.classList.remove('disabled')
  bairro.value = ''
  bairro.disabled = false
  bairro.classList.remove('disabled')
  logradouro.value = ''
  logradouro.disabled = false
  logradouro.classList.remove('disabled')
  UF.value = 'AC'

  try {
    let cep = await fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    let cepConvertido = await cep.json()

    console.log(cepConvertido)

    if (cepConvertido.erro) {
      errorMesage.innerHTML = '<p>O CEP inserido é inexistênte!</p>'
      return
    } 


      if (cepConvertido.bairro != '') {
        bairro.value = cepConvertido.bairro
        bairro.disabled = true
        bairro.classList.add('disabled')
      } if (cepConvertido.logradouro != '') {
        logradouro.value = cepConvertido.logradouro
        logradouro.disabled = true
        logradouro.classList.add('disabled')
      } if(cepConvertido.localidade != '') {
        cidade.value = cepConvertido.localidade
        cidade.disabled = true
        cidade.classList.add('disabled')
      }


      UF.value = cepConvertido.uf

    
  } catch (error) {
    errorMesage.innerHTML = '<p>O formato do CEP está inválido!</p>'
  }
}