let screen = document.getElementById('screen');
buttons=document.querySelectorAll('button');
let screenValue= '';
for(item of buttons){
    item.addEventListener('click',(e)=>{  //e text 
        buttonText=e.target.innerText;  //it will give written inside button
         console.log('Button text is ',buttonText)
         if(buttonText=='X'){
             buttonText= '*';
             screenValue += buttonText;
             screen.value=screenValue;
         
         }
         else if (buttonText=='C'){     //blank screen
            screenValue ="";
            screen.value=screenValue;
        
         }
         else if (buttonText =='='){     //it will evaluate 
              screen.value = eval(screenValue);
         }
         else{
            screenValue += buttonText;
            screen.value=screenValue;
         }

    })
}
