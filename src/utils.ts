const createElement =  (tag):((obj?: Object)=>HTMLElement) =>{
  
   let newNode: HTMLElement =  document.createElement(tag)
        const setAttributes = (obj?:Object):HTMLElement =>{
            
            for(let key in obj){
                newNode.setAttribute(key, obj[key])
            }
            return newNode
        }
       
    return setAttributes
}

export const div =(attributes?:Object)=>(...children:HTMLElement[]|string[]):HTMLElement=>{
    let newDiv: HTMLElement = createElement('div')(attributes)

    if(children.length>0){
    children.forEach((child:HTMLElement|string)=>{
            if(child instanceof HTMLElement){

                newDiv.appendChild(child)
            }else{
                newDiv.innerText = child
            }
       
    })}
 
    return newDiv
}





div()(div()(),div()())