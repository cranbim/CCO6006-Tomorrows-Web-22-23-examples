
const myData={
    status:"nothing yet"
}
const displayedData=document.createElement('ul')
const dataDiv=document.getElementById('data-div')
dataDiv.appendChild(displayedData)


function fetchData(howMany){
    let options={
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({qty:howMany})
    }
    fetch('/data',options)
        .then(response=>response.json())
        .then(fetchedData=>handleDataFromServer(fetchedData))
}

function handleDataFromServer(receivedData){
    console.log('received from server ...')
    console.log(receivedData.data)
    // let cleanData=[]
    
    displayedData.innerHTML=''
    myData.data=[]
    receivedData.data.forEach((item)=>{
        myData.status='updated'
        myData.data.push({
            animal: item.class,
            value: item.value
        })
        if(item.class=='duck'){
            let newEntry=document.createElement('li')
            let cleanValue=parseInt(item.value*100)/100
            newEntry.innerText=`animal: ${item.class}, value: ${cleanValue}`
            displayedData.appendChild(newEntry)
        }
    })

}