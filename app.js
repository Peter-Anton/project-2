/* Global Variables */
const baseUrl='https://api.openweathermap.org/data/2.5/forecast?zip=';
const APIkey=',&appid=32e24b63fbcfc193ec00f831c20b5c94&units=imperial';
const server="http://localhost:3030"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();//we make +1 because get month start from zero
/*
*first we will make ana event listner to the button generate so when we click on this button we will do function Action
* action function will make some promesis
* first it will call getData which will take data from the user (aka zip);
* then it will call post data function to post data in the given url
*then after make all this promises it will call update UI function to show the data to the user
* */
document.getElementById('generate').addEventListener('click',Action);
function Action(e){
    const zip=document.getElementById('zip').value;
    const userResponse=document.getElementById('feelings').value;
        getData(zip)
        .then((data) =>{
            console.log(data);
            return postData(`${server}/addWeather`,{temp: data.list[0].main.temp,
                 date: newDate,
           content: userResponse })})
    .then(
        r =>updateUI()
    )
 }
/* get data will take zip variable then it will fetch it with the base url and the api key to get the data of the entered zip
 */
const getData=async (zip)=>{
    const res=await fetch(baseUrl+zip+APIkey);
    try {
        const data=await res.json();
        console.log(data);
        return data
    }
    catch (error){
        console.log('error',error);
    }
}
/*
*post data will take the data taken from get function to push it in the object and the given url
* */
const postData=async (url='',projectData={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });
    console.log(response);
    try{
        const newData=await response.json();
        console.log(newData);
        return newData;
    }
    catch (error){
        console.log('error',error);
    }
}
/*
*update UI will fetch data from localhost url and add them to the inner html to appear to the user
*/
const updateUI=async ()=>{
    const request=await fetch(`${server}/all`)
    try {
        const allData=await request.json();
        document.getElementById('temp').innerHTML=`temp=${allData.temp}`;
        document.getElementById('date').innerHTML=`date=${allData.date}`;
        document.getElementById('content').innerHTML=`feelings=${allData.userResponse}`;
    }catch (error){
        console.log("error",error);
    }
}
