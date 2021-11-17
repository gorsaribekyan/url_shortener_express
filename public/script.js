
function func(){
    var url = document.getElementById("url").value;
    console.log(url)
    fetch("/short-my-url", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            url : url
        })
        

    })
    .then((resp) => resp.json())
    .then((data) => atfer_get_data(data))

    .catch((err) => console.log(err))
}


function atfer_get_data(data) {
    if(data["errors"]){
        var x = ''
        for(let i of data["errors"]){
          x += i["msg"] + "<br>"
        }
        document.getElementById("result").innerHTML = x;
    }else{
        document.getElementById("result").innerHTML = data["shortenUrl"];        
    }
}