const item = document.getElementsByClassName("item__container");
const ingr = document.getElementsByClassName("ingredient");
// import {items} from '../server/server.js'

function showDesc(){
    console.log()
    itemDesc = item.lastChild;
    if(itemDesc.display == 'none'){
        itemDesc.display == 'block'
    }else{
        itemDesc.display == 'none'
    }
}

// item.addEventListener("click", showDesc);

document.addEventListener("DOMContentLoaded", function(e){   
    
    for(var i = 0; i<item.length; i++) {
        item[i].addEventListener("click", function(event){
    
    console.log(this)
    const itemDesc = this.getElementsByClassName('item__description')[0];
    console.log(itemDesc)
    console.log(itemDesc.classList)
    if(itemDesc.classList.contains('hidden')){
        itemDesc.classList.remove('hidden');
        this.classList.add('selected');
    }else{
        itemDesc.classList.add('hidden')
        this.classList.remove('selected');
    }
})
    };   
     
})


// document.addEventListener("DOMContentLoaded", function(e){   
    
//     for(var i = 0; i<item.length; i++) {
//         ingr[i].addEventListener("click", function(event){
    
//     console.log(this)

// })
//     };   
     
// })

