var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var priority = document.getElementById('priority');
var filter = document.getElementById('filter');
var budget = document.getElementById('addBudget');
var budgetContainer = document.getElementById('budgetContainer');
var expensesTotal = document.getElementById('expensesTotal');


//Set Budget event
submitBudget.addEventListener('click', setBudget)
// Form Submit Event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter Event
filter.addEventListener('click', filterItems);
//Arrange items event
//arrange.addEventListener('change', arrangeItems)

// Set Budget
function setBudget(e) {
    e.preventDefault();
    budgetAmount = document.getElementById('budget').value;
    budgetElement = document.createElement('h1')
    budgetElement.className = 'badge badge-light text-wrap p-4';
    budgetElement.innerHTML = 'Budget:<br><br>$'+budgetAmount;
    budgetElement.setAttribute('id', 'BudgetTotal')
    budgetContainer.appendChild(budgetElement)
    submitBudget.style.display = "none";
    document.getElementById('addBudget').style.display = 'none';
    console.log(budgetContainer)
    expensesTotal.style.display = 'inline-block';
    document.getElementById('submitActivityContainer').style.display = 'block';
    calculateExpenses();
}

// Set total expenses
function calculateExpenses(){
    // Get lis
    var items = itemList.getElementsByTagName('li');
    var expensesTotalAmount = 0;

    console.log(1)
    // Convert to an array
    Array.from(items); 
    
    for(i=0; i < items.length; i++){
        expensesTotalAmount += items[i].value;
        console.log(items);
        console.log(items[i].value);
        console.log(expensesTotalAmount);
    }

    if (expensesTotalAmount > budgetAmount){
    expensesTotal.style.background = 'red'
    } else {
    expensesTotal.style.background = 'white'
    }
    expensesTotal.innerHTML = 'Expenses:<br><br>$'+expensesTotalAmount;
}

// Add item
function addItem(e){
    e.preventDefault();

    // Get input value
    var newPayment = document.getElementById('item').value;

    // Create li for new item
    var li = document.createElement('li');
    // Add Class
    li.className = 'list-group-item';

    // assign background color based off priority level selected
    prioritySelected = priority[priority.value - 1].innerHTML;
    if(priority.value - 1 === 0){
        selectedBtnColor = 'btn-success';
    } else if(priority.value - 1 === 1) {
        console.log("Med");
        selectedBtnColor = 'btn-warning';
    } else {
        selectedBtnColor = 'btn-danger';
        console.log("High");
    }

    // Add priority + text node with input value
    li.innerHTML = '<span type=\"button\" class=\"badge text-wrap p-2 mr-2 float-left ' +selectedBtnColor+ '\">'+prioritySelected+'</span> '+newPayment;
    
    //create del button element
    var deleteBtn = document.createElement('button');
    // Add classes to delete button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    //Append button to li
    li.appendChild(deleteBtn);

    //get Amount value
    var newAmount = document.getElementById('amount').value;
    // create div to be inserted
    newAmountInsert = document.createElement('div');
    //add amount value to div
    newAmountInsert.innerHTML = '$'+newAmount;
    // Add class to amount item
    newAmountInsert.className = 'badge badge-info text-wrap p-2 mr-2 float-left';
    // Add ID to amount item
    newAmountInsert.setAttribute("id", "itemAmount");
    //Append amount to li
    li.appendChild(newAmountInsert);
    //add amount value to li
    li.value = newAmount;

    //Append li to list
    itemList.appendChild(li);
    //delete inner contents of activity adder
    document.getElementById('item').value = "";
    document.getElementById('item').placeholder = "Next payment For?";

    // Display Block for container - meant for first input
    document.getElementById('ActivityContainer').style.display = 'block';
    calculateExpenses();
}

// Rearrange Order

// remove item
function removeItem(e){
    if (e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }

    }
    calculateExpenses();
}

// Filter Items based off importance
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
    console.log(e);
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(e.target.value == "All") {
            item.style.display = 'block';
        } else if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
            console.log(itemName.toLowerCase().indexOf(text));
        } else {
            item.style.display = 'none';
            console.log(itemName.toLowerCase().indexOf(text));
        }
    });
}




























































// EXAMINE THE DOCUMENT OBJECT //

// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// document.title = 123;
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);
// document.all[10].textContent = 'Hello';
// console.log(document.forms[0]);
// console.log(document.links);
//console.log(document.images);

// GETELEMENTBYID
//console.log(document.getElementById('header-title'));
//var headerTitle = document.getElementById('header-title');
//var header = document.getElementById('main-header');
// console.log(headerTitle);
// headerTitle.textContent = "Hello";
// headerTitle.innerText = "Goodbye";
//console.log(headerTitle.innerText);
//headerTitle.innerHTML = '<h3>Hello</h3>';
//header.style.borderBottom = 'solid 3px black';

// GETELEMENTSBYCLASSNAME //
// var items = document.getElementsByClassName('list-group-item');
// console.log(items);
// items[1].textContent = 'Hello 2';
// items[1].style.fontWeight = 'bold';
// items[1].style.background = 'yellow';

// for(i=0; i < items.length; i++) {
//     items[i].style.background = 'gray';
//     console.log('first');
// }; 

// GETELEMENTSBYTAGNAME //
// var li = document.getElementsByTagName('li');
// console.log(li);
// li[1].textContent = 'Hello 2';
// li[1].style.fontWeight = 'bold';
// li[1].style.background = 'yellow';

// for(i=0; i < li.length; i++) {
//     li[i].style.background = 'gray';
//     console.log('first');
// }; 
    
// QUERYSELECTOR //
// var header = document.querySelector('#main-header');
// header.style.borderBottom = 'solid 4px gray'

// var input = document.querySelector('input');
// input.value = 'Hello World'

// var submit = document.querySelector('input[type="submit"]');
// submit.value="Send";

// var item = document.querySelector('.list-group-item');
// item.style.color = 'red';

// var lastItem = document.querySelector('.list-group-item:last-child');
// lastItem.style.color = 'blue';

// var secondItem = document.querySelector('.list-group-item:nth-child(2)');
// secondItem.style.color = 'green';

// QUERYSELECTORALL //
// var titles = document.querySelectorAll('.title');

// console.log(titles);
// titles[0].textContent = "Hello";

// var odd = document.querySelectorAll('li:nth-child(odd)');
// var even = document.querySelectorAll('li:nth-child(even)');

// for (var i = 0; i < odd.length; i++) {
//     odd[i].style.backgroundColor = 'silver';
// // }

// // for (var i = 0; i < even.length; i++) {
// //     even[i].style.backgroundColor = 'gray';
// }

// TRAVERSING THE DOM //
// var itemList = document.querySelector('#items');
// parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.background = 'silver';
// console.log(itemList.parentNode.parentNode);

// parentElement
// console.log(itemList.parentElement);
// itemList.parentElement.style.background = 'silver';
// console.log(itemList.parentElement.parentElement); 

// childNodes
// console.log(itemList.childNodes)

// console.log(itemList.children)
// console.log(itemList.children[1])
// itemList.children[1].style.background = 'yellow';

// // FirstChild
// console.log(itemList.firstChild)
// // firstElementChild
// console.log(itemList.firstChild)
// console.log(itemList.firstElementChild);
// itemList.firstElementChild.textContent = "Hello 1";

// lastChild
// console.log(itemList.lastChkild)
// lastElementChild
// console.log(itemList.lastElementChild);
// itemList.lastElementChild.textContent = "Hello 4";

// nextSibling
// console.log(itemList.nextSibling);
// nextElementSibling
// console.log(itemList.nextElementSibling)

// previousSibling
// console.log(itemList.previousSibling)
// previousElementSibling
// console.log(itemList.previousElementSibling);
// itemList.previousElementSibling.style.color = 'green';

// / createElement

// Create a div
// var newDiv = document.createElement('div');

// Add class
// newDiv.className= 'hello';

// Add id
// newDiv.id = 'hello1';

// Add attr
// newDiv.setAttribute('title', 'Hello Div')

// Create text node
// var newDivText = document.createTextNode('Hello World');

// Add text to div
// newDiv.appendChild(newDivText);

// var container = document.querySelector('header .container');
// var h1 = document.querySelector('header h1');

// console.log(newDiv);

// newDiv.style.fontSize = '30px';

// container.insertBefore(newDiv, h1);

// var button = document.getElementById('button').addEventListener('click', function(){
//     console.log(123);
// }) //better to call a seperate function


// Events //

// var button = document.getElementById('button').addEventListener('click', buttonClick)

// function buttonClick(e) {
    //console.log('button clicked')
    // document.getElementById('header-title').textContent = 'Changed';
    // document.querySelector('#main').style.backgroundColor = 'blue';
    // console.log(e.target);
    // console.log(e.target.id);
    // console.log(e.target.className);
    // console.log(e.target.classList);
    // var output = document.getElementById('output');
    // output.innerHTML = '<h3> '+e.target.id+'</h3>';
    
    // console.log(e.type);
    
    // console.log(e.clientX)
    // console.log(e.clientY)
    
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    // console.log(e.altKey);
    // }
    
    // var button = document.getElementById('button');
    // var box = document.getElementById('box');
    // addEventListener('click', runEvent);
    // addEventListener('dblclick', runEvent);
    // addEventListener('mousedown', runEvent);
    // addEventListener('mouseup', runEvent);
    
    // box.addEventListener('mouseenter', runEvent)
    // box.addEventListener('mouseleave', runEvent)

    // box.addEventListener('mouseover', runEvent)
    // box.addEventListener('mouseout', runEvent)
    
    // box.addEventListener('mousemove', runEvent);

    // var itemInput = document.querySelector('input[type="text"]');
    // var form = document.querySelector('form');
    // var select = document.querySelector('select')

    // itemInput.addEventListener('keydown', runEvent);
    // itemInput.addEventListener('keyup', runEvent);
    // itemInput.addEventListener('keypress', runEvent);
    
    // itemInput.addEventListener('focus', runEvent);
    // itemInput.addEventListener('blur', runEvent);
    
    // itemInput.addEventListener('cut', runEvent);
    // itemInput.addEventListener('paste', runEvent);
    
    // itemInput.addEventListener('input', runEvent);

    // select.addEventListener('change', runEvent)
    // select.addEventListener('input', runEvent)

    // form.addEventListener('submit', runEvent);

    // function runEvent(e) {
    //     e.preventDefault(); //prevents text dissappearing from submit button
    //     console.log('EVENT TYPE: '+e.type);
    //     console.log(e.target.value);
    //     console.log(e.target.value);
    //     document.getElementById('output').innerHTML = '<h3>'+e.target.value+'</h3>'
    //     output.innerHTML = '<h3>MouseX: '+e.offsetX+' </h3><h3>MouseY: '+e.offsetY+'</h3>';

    //     document.body.style.backgroundColor = "rgb("+e.offsetX+","+e.offsetY+", 40)";
    // }
    
    









