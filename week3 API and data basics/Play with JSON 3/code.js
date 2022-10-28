console.log("Yes, I am working")


//fetch API call ( a promise)
fetch('rabbits.json')
    //hanndle the response and convert from json
    .then(response=>response.json())
    //handle the js object that we get back
    .then(handleRabbitData)

function handleRabbitData(rabbitData){
    let rabbitUL=document.createElement('ul')
    document.body.appendChild(rabbitUL)
    rabbitData.rabbits.forEach(rabbit=>{
        console.log(rabbit.name+": "+rabbit.age)
        let li=document.createElement('li')
        li.innerText=rabbit.name+": "+rabbit.age
        rabbitUL.appendChild(li)
    })
}
    