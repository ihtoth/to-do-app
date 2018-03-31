function removeLi(id){
  const toDoList = document.getElementById('toDoList');
  toDoList.removeChild(document.getElementById(id));
}

function onReady(){
  const addToDoForm = document.getElementById('addToDoForm');
  const removeLiFromList = document.getElementById('removeLi');
  const newToDoText = document.getElementById('newToDoText');
  const toDoList = document.getElementById('toDoList');

  let liCounter = 0;                                        //counts up from 0, supplies a unique id to each new element added
  let numLi = 0;                                            //keeps track of the number of list items.

  addToDoForm.addEventListener('submit', ()=>{
    event.preventDefault();                                  //prevents page from reloading

    let title = newToDoText.value;                           //saves the new to do item submitted

    let newLi = document.createElement('li');                //creates a new list element
    newLi.className = "mdl-list__item";
    newLi.setAttribute("id", `list-item-${liCounter}`);      //adds material lite class to li element


    let newSpan = document.createElement('span');            //create span to house li
    newSpan.className = "mdl-list__item-primary-content";    //adds material lite class to span element
    newSpan.textContent = title;                             //sets the Span element to the to do item

    //for the checkbox
    let checkboxSpan = document.createElement('span');
    checkboxSpan.className="mdl-list__item-secondary-action mdl-checkbox__label";

    let checkboxLabel = document.createElement('label');
    checkboxLabel.className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect";
     checkboxLabel.setAttribute("for", `list-checkbox-${liCounter}`); //adds unique for to label element

    let checkboxInput = document.createElement('input');              //creates input...
    checkboxInput.type = "checkbox";                                  //makes the input checkbox an actual checkbox
    checkboxInput.className="mdl-checkbox__input";
    checkboxInput.setAttribute("id", `list-checkbox-${liCounter}`);   //adds unique id to label element

    //add checkbox to label, label to span.
    checkboxLabel.appendChild(checkboxInput);
    checkboxSpan.appendChild(checkboxLabel);

    //adds checkbox span (the container for all checkbox related elements) to the new list item.
    newLi.appendChild(checkboxSpan);
    newLi.appendChild(newSpan);                               //adds to do item title to list


    toDoList.appendChild(newLi);                              //adds the new to do item list element to the unordered list (ul)

    liCounter++;                                              //liCounter +1 for next item added.

    if(++numLi == 1){                                         //Add one for when adding first Li, subtract when removing one.
      removeLiFromList.classList.remove("mdl-button--disabled");
      removeLiFromList.classList.add("mdl-button--color");
    }

    newToDoText.value = '';                                  //set the text in the list item input field to blank.

  });


  //does allCheckboxes update every time there's a removal of an li?
  const allCheckboxes = document.getElementsByClassName("mdl-checkbox__input");

  removeLiFromList.addEventListener('click',() => {

    //let checkedCheckboxes = allCheckboxes.filter(c => c > 1); //Why does this not work?

    let liNumList = [];
    //find which checkboxes are checked.
    for (let i = 0; i<allCheckboxes.length; i++){
      let currentID = allCheckboxes[i].id;

      if(allCheckboxes[i].checked){
        console.log(currentID.slice(currentID.lastIndexOf('-')+1));
        liNumList.push(currentID.slice(currentID.lastIndexOf('-')+1));
        }
    }
    //remove checked list elements
    for(let i = 0; i<liNumList.length; i++){
      removeLi(`list-item-${liNumList[i]}`);
      numLi--;
    }
    //change remove button's appearance back to disabled.
    if (numLi == 0){
      removeLiFromList.classList.remove("mdl-button--color");
      removeLiFromList.classList.add("mdl-button--disabled");
    }
  });
}

window.onload = function(){
  onReady();
};
