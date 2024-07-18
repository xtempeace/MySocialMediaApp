let userObj={}

function handleInput(event){
    userObj[event.target.id]=event.target.value;
    
    
}

//mach current password to the previous password
function handlePass(event){
    let prevPass=userObj.password;
    let cnfPass=event.target.value;

    if(prevPass==cnfPass){
        
        document.getElementById("msg").innerHTML='Password Matched';
        document.getElementById("registerBtn").disabled=false;//button ko active kar diyae hai
        return true; //? matlab kya hai return karnae kaa
        
    }
    else{
        document.getElementById("msg").innerHTML="Password Didn't Matched";
        return false;
    }
}


//ekk hi bar mae user kaa data backend pae bhej dega
async function register(event){
    
    event.preventDefault();//yae agar add nahi karengae toh, register button dabnae kae baad sara box kaa contain erase hoo jaega
    //without await hamae ekk promise return hoga, esae resolve karnae kae liyae hamae await lagana padega
    //fetch sae request send kartae hai
    let result=await fetch("http://localhost:5000/socialMedia/user/register",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body: JSON.stringify(userObj)
    })
    
    //console.log(userObj)
    //console.log(result)
    //alert("Registration Successful")
    //window.location.href='login.html' //redirect to login.html page from register.html file
    let response=await result.json()
    console.log(response);
    
    if(response.status)
    {
        alert(response.msg);
        window.location.href='login.html'
    }
    else 
    {
        alert("Registration Failed");
        window.location.href='registration.html'
    }


}


