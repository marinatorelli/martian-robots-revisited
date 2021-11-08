
//copy example to clipboard
function copyEvent(id)
{
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy");
}

//send input to server
function postInput(id){
    const input_data = {
        input: document.getElementById(id).value
    } 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input_data),
    }
    fetch('/api', options).then(response =>{
        info = response.json();
        console.log(info);
    });
}
