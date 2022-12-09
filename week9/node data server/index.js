const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))
app.use(express.static('public'))
app.use(express.json())
// generateData(20)

// app.post('/api', (request, response)=>{
//     console.log(request.body)
//     response.json({
//         status: 'success',
//         message: 'thanks for the data'
//     })
// })

app.post('/data', (request, response)=>{
    // console.log(request.body)
    var qty=request.body.qty||0
    console.log('request for '+qty+' data items')
    response.json(generateData(qty))
})

function generateData(n){
    const data={}
    const types=["rabbit","duck","squirrel"]
    const valMin=10
    const valMax=75
    data.meta={
        server: 'ABC123',
        date: Date.now(),
        someRandomOtherMetaData: {
            a:1,
            b:2,
            c:3
        }
    }
    data.data=[]
    for(let i=0; i<n; i++){
        let entry={}
        entry.class=types[Math.floor(Math.random() * types.length)];
        entry.value=Math.random()*(valMax-valMin)+valMin
        entry.otherStuff={
            x:9,
            y:8,
            z:7
        }
        data.data.push(entry)
    }

    // console.log(data)
    return data
}