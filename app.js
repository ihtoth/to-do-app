
function onReady(){
  let toDos = [];
  const addToDoForm = document.getElementById('addToDoForm');
  let id = 0;

  function createNewToDo(){
    const newToDoText = document.getElementById('newToDoText');
    //disallow adding empty list item to list
    if(!newToDoText.value){return;}


    toDos.push({title:newToDoText.value, complete:false, id:id++});            //literal notation add to array.

    newToDoText.value = '';

    renderTheUI();
  }

  function renderTheUI(){
    const toDoList = document.getElementById('toDoList');

    //reset the newLi's text content
    toDoList.textContent = '';

    toDos.forEach(function(toDo){
      //create the UI we need for each to-do(the Li and checkbox)
      const newItemText = document.createElement('span');            //create span to house li
      newItemText.className = "liText mdl-list__item-primary-content";

      const newLi = document.createElement('li');
      newLi.className = "mdl-list__item";

      //for the checkbox
      const checkboxSpan = document.createElement('span');
      checkboxSpan.className="mdl-list__item-secondary-action mdl-checkbox__label";

      const checkboxLabel = document.createElement('label');
      checkboxLabel.className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect";
      checkboxLabel.setAttribute("for", `list-checkbox-${toDo.id}`);

      const checkbox = document.createElement('input');
      checkbox.className="mdl-checkbox__input";
      checkbox.setAttribute("id", `list-checkbox-${toDo.id}`);
      checkbox.type = 'checkbox';

      //for the delete button attached to each list item
      const deleteButton = document.createElement('button');
      deleteButton.className = "mdl-button mdl-js-button mdl-button--accent";
      deleteButton.textContent = "delete";
      deleteButton.type = 'button';
      deleteButton.addEventListener('click', event =>{
        toDos = toDos.filter(item => item.id != toDo.id);
        renderTheUI();
      });

      //Assign the toDo's title to the list item
      newItemText.textContent = toDo.title;

      /*** update the DOM with the li and checkbox ***/

      //add checkbox to label, label to span.
      checkboxLabel.appendChild(checkbox);
      checkboxSpan.appendChild(checkboxLabel);

      newLi.appendChild(checkboxSpan);
      newLi.appendChild(newItemText);
      newLi.appendChild(deleteButton);
      toDoList.appendChild(newLi);

      componentHandler.upgradeDom();
    });

  }

  addToDoForm.addEventListener('submit', event =>{
    event.preventDefault();
    createNewToDo();

  });

  renderTheUI();

}

window.onload = function(){
  onReady();
};
