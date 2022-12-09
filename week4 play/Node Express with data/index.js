const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('nano listening at port 3000'))
app.use(express.static('public'))
app.use(express.json())

app.post('/api', (request, response)=>{
    console.log(request.body)
    response.json({
        status: 'success',
        message: 'thanks for the data'
    })
})

app.get('/data', (request, response)=>{
    // console.log(request.body)
    response.json({
        message: 'some new data from the server',
        data: [0,1,2,3,4]
    })
})

