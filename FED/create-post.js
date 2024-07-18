let postObj={}
let token=localStorage.getItem("token")

function handleInput(event)
{
    postObj[event.target.id]=event.target.value;
}

async function createPost(event)
{
    event.preventDefault()
    //postObj={...postObj,token:token} token header mae jata hai thats why esae body mae add karnae ki jarurat nahi hai

    //send request to backend
    let response=await fetch("http://localhost:5000/socialMedia/posts/createPost",{

        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Basic ${token}`
        },
        body:JSON.stringify(postObj)
    });

    let result=await response.json()
    console.log(result)
    //false hua toh
    if(!result.status)
    {
            alert(result.msg)
            window.location.href="login.html"
    }
    else
    {
        window.location.href="view-posts.html"
    }
}

async function validateToken()
{
    let response=await fetch("http://localhost:5000/socialMedia/authToken/validate",{
        method:"GET",
        headers:{
            'Content-type':"application/json",
            'Authorization':`Basic ${token}`
        }
    })
    let result=await response.json();
    console.log(result)

    
}