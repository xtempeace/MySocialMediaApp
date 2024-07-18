//validate karna hai then all post ko db sae fetch karna hai
let token=localStorage.getItem("token")

async function validateToken()
{
    

    //backend pae token send karengae validat karnae kae liyae
    //token ko fed sae bed pae header kae andar bheja jata hai , body kae andar nahi send kartae hai
    let response=await fetch("http://localhost:5000/socialMedia/authToken/validateToken",{
        method:"GET",
        headers:{
        'Content-type':'application/json',
        'Authorization':`Basic ${token}`
        }
    })

    let result=await response.json()
    console.log(result)

    
    if(result.status){

        //array is empty
        if(result.data.length <= 0){
            document.getElementById("msg").innerHTML = `If there are no posts to display, create a new post by <a href="create-post.html">clicking here</a>.`
        }
        else{
            
            let postData = result.data;
            //console.log(result.payload.user_name)
            //kawan user login kiya hai
            document.getElementById("userId").innerHTML=result.payload.user_name;
            
            let container = document.getElementById("post-container");

            postData.map((post,index)=>{
                
                

                let div = document.createElement("span");
                div.setAttribute("id",`${post.username}_${index+1}`);
                div.setAttribute("class", "postBlocks");

                div.innerHTML =`
                <h1>${post.category} : ${post.title}</h1>
                <hr>
                <p>Content: ${post.content}</p>
                <hr>
                <span>
                    <p><b>Author : </b> ${post.author}</p>
                    <p><b>Created On: </b> ${post.created_On}</p>
                </span>
                <br>
                <button onclick ="editPost('${post._id}')">Edit</button>
                <button onclick ="deletePost('${post._id}')">Delete</button>
                <br>
                <button  id="likePostBtn" onclick ="likePost('${post._id},${result.payload.user_name}')">Like: ${post.likes.length}</button>
                `;

                container.appendChild(div);
                return;
            })
            
        }
    }else{
        alert(result.msg);
        window.location.href = "login.html";
    }
}

function createPostPage() {
    window.location.href = "create-post.html" 
}

async function handleAuthorPost(event) {
    let authorName = event.target.value;
    if (authorName != "") {
        
        let container = document.getElementById("msg");
        container.innerHTML = ""

        let response = await fetch(`http://localhost:5000/socialMedia/posts/author/${authorName}`, {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        })
        let result = await response.json();
        // console.log(result);

        if (result.status) {
            let container = document.getElementById("post-container");
            container.innerHTML = ""
            let postData = result.data;

            postData.map((post, index) => {
                let div = document.createElement("span");

                div.setAttribute("id", `${post.username}_${index + 1}`);
                div.setAttribute("class", "postBlocks");

                div.innerHTML = `
            <h1>${post.category} : ${post.title}</h1>
            <hr>
            <p>Content: ${post.content}</p>
            <hr>
            <span>
                <p><b>Author : </b> ${post.author}</p>
                <p><b>Created On: </b> ${post.created_On}</p>
            </span>
            <br>
            <button onclick ="editPost('${post._id}')">Edit</button>
            <button onclick ="deletePost('${post._id}')">Delete</button>
            <br>
            <button id="likePostBtn" onclick ="likePost('${post._id},${result.payload.user_name}')">Like: ${post.likes.length}</button>
            `;

                container.appendChild(div);
            })
        } else {
            let container = document.getElementById("post-container");
            container.innerHTML = ""
            document.getElementById("msg").innerText = result.msg;
        }
    }
    else{
        document.getElementById("msg").innerText = "Enter valid Author Name";
        window.location.reload();//esasae sara post show hoga,jab authorName mae kuch nahi hoga toh
    }
}


function editPost(id){
    localStorage.setItem("editpostId", id);
    window.location.href = "edit-post.html";
    // console.log(id);
}


async function deletePost(id){
    // console.log(id);

    let response = await fetch(`http://localhost:5000/socialMedia/posts/deletePost/${id}`,{
        method:"DELETE",
        headers:{'Content-type':'application/json'}
    })

    let result = await response.json();
    // console.log(result);

    if(result.status){
        alert(result.msg);
        window.location.reload();//Use of this ?
    }else{
        alert("There's some problem in deleting the post.");
        window.location.reload();
    }
}


async function likePost(postId,userName){
    //kis particula r ueser nae like kara hai
    let response = await fetch(
        `http://localhost:5000/socialMedia/posts/likePost/${postId}/${userName}`,
        {
        method:"GET",
        headers:{
            'Content-type':'application/json',
            'Authorization':`Basic ${token}`
        }
    }
)
    let result = await response.json();
    console.log(result);

    if(result.status){
        // validateToken();
        // document.getElementById("likeCount").innerText = result.data
    }
}