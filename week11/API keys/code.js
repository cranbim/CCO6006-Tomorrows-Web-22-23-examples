const myVisibleAPIkey="ABCxyz123456"
const myURLBase="https://someapi.coolapis.com/"

//let apiQueryURL=`${myURLBase}?api_key=${myVisibleAPIkey}`
let apiQueryURL=myURLBase+"?api_key="+myVisibleAPIkey

console.log(apiQueryURL)

// apiQueryURL=myURLBase+"?api_key="+mySecretAPIKey

console.log(apiQueryURL)