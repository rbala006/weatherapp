console.log("Client side js")


const weatherForm = document.querySelector('Form')
const weatherInput=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent='Loading'
    message2.textContent=''
    const location=weatherInput.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
                message1.textContent=data.error
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
        })
    })
})