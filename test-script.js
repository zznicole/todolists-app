const mainInput = document.querySelector('.main_input');
const ul = document.querySelector('ul');
const itemsLeft = document.querySelector('.items-left');
const active = document.querySelector('.active');
const all = document.querySelector('.all');
const completed = document.querySelector('.completed');
const selectAll = document.querySelector('.far');
let switchIt = false;



//create an id for each todo which is how we will track each todo for completion and deletion
function randomGen(str = 'qwertyuio') {
	return (
		str
			.split('')
			.sort(() => Math.random() - 0.5)
			.join('') +
		'_' +
		Math.floor(Math.random() * 1000)
	);
}

class Todos{
  constructor(){
    this.todo = [];
  }
  addTodo(){
    this.todo = this.todo.concat({
    name: mainInput.value,
    completed: false,
    id: randomGen()
    })
  }


  render(parent){
    //show a message when list is empty
    if(!newtodo.todo.length) {
      document.querySelector(".emptyMessage").style.display = "none";
    } else {
      document.querySelector(".emptyMessage").style.display = "block";
    }

    //items left detailsBox
    function itemsLeftText(){
      itemsLeft.textContent = newtodo.todo.filter(t => t.completed == false).length;
    }
    itemsLeftText();
    //completed items left 

    ul.innerHTML = '';
    this.todo.forEach(t =>{
      let li =document.createElement('li');
      li.classList.add('li');
      let p = document.createElement('p');
      p.classList.add('para-1')
      let badWords = t.name.replace(
				/poop|damn|shit|fuck|motherfucker|hell/gi,
				'🤐*censor*'
			);
			p.textContent = badWords;  
      let input = document.createElement('input');
      input.setAttribute('type','checkbox');
      input.checked = t.completed;
      input.checked ? p.style.textDecorationLine = 'line-through': p.style.textDecorationLine = 'none';
      input.setAttribute('data-key',t.id)
      input.classList.add('status');
      let deleteit = document.createElement('button');
      deleteit.setAttribute('data-key',t.id)
      deleteit.classList.add('deleteit');
      deleteit.textContent = 'X'
      li.append(input,p,deleteit);
      parent.append(li);

      //replace para with input box on doubleclick
      const replaceItFunc = function(event){
        const editInput = document.createElement('input');
        editInput.classList.add('editInput');
        li.replaceChild(editInput,p);
        editInput.value = t.name;
        editInput.focus();
        editInput.addEventListener('keyup',event => {
          if(event.keyCode == 13){
            console.log(event.keyCode);
            t.name = editInput.value;
            newtodo.render(ul);
          }
        })
        editInput.addEventListener('blur',event => {
          t.name = editInput.value;
          newtodo.render(ul);
        })
      }
      p.addEventListener('dblclick',replaceItFunc);
      //completed replace para with inputbox on doubleclick
        
      //to delete todo 
      const deleteTodo = function({target}){
        newtodo.todo = newtodo.todo.filter(t => target.dataset.key != t.id);
        newtodo.render(ul);
      }  
      deleteit.addEventListener('click',deleteTodo)
      // //completed delete todo


      //toggle todo
      const toggle = function({target}){
        newtodo.todo = newtodo.todo.map(t =>{
          if(target.dataset.key == t.id){
            t.completed = !t.completed;
          }
          return t;
        });
          newtodo.render(ul);
      }
      input.addEventListener('click',toggle);
      //completed toggle todo
    })
  }
}


let newtodo = new Todos;


//to add a todo by enter
const enterTodo = function(event){


// set max 20 todos
//ingnore empty enter
  if(event.keyCode == 13 && newtodo.todo.length < 20 && mainInput.value !==""){
    

  //check if the input todo already exists, it will not be added to the list, but show a message.
    if(newtodo.todo.some(todo => todo.name == mainInput.value.toLowerCase())) {
      alert('This task already exists.');
      return;
    };
  

    // newtodo.name = event.target.value 
    newtodo.addTodo();
    event.target.value = '';
    newtodo.render(ul);
  }
}
mainInput.addEventListener('keyup', enterTodo)  
//completed adding todo by enter


newtodo.render(ul);


//Add search function
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = document.getElementsByTagName('li');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    // fixed search issue by deleting .getElementsByTagName("li")[0] which was after li[i] on line 69
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
myFunction();
//Completed search function

  
