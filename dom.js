var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var priority = document.getElementById('priority');
var filter = document.getElementById('filter');
var budget = document.getElementById('addBudget');
var budgetContainer = document.getElementById('budgetContainer');
var expensesTotal = document.getElementById('expensesTotal');
var leftOver = document.getElementById('budgetDifference');
var minimizeToggle = document.getElementById('minimizeToggle1');
var minimizeToggle2 = document.getElementById('minimizeToggle2');



//Set Budget event
submitBudget.addEventListener('click', setBudget)
// Form Submit Event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem)
// change status event
itemList.addEventListener('click', changeStatus)
// change status event
itemList.addEventListener('click', changeOrder)
// Filter Event
filter.addEventListener('click', filterItems);
// minimize maximize Event
minimizeToggle.addEventListener('click', minimizeToggleItems);
minimizeToggle2.addEventListener('click', minimizeToggleItems);

// Set Budget
function setBudget(e) {
    e.preventDefault();
    budgetAmount = document.getElementById('budget').value;
    budgetAmount = budgetAmount.replace(/,/g, "").replace(/\$/g, '');
    budgetElement = document.createElement('h1')
    budgetElement.className = 'order-1 badge badge-light text-wrap';
    budgetElement.innerHTML = 'Budget:<br>$'+budgetAmount;
    budgetElement.setAttribute('id', 'budgetTotal')
    budgetContainer.appendChild(budgetElement)
    submitBudget.style.display = "none";
    document.getElementById('addBudget').style.display = 'none';
    expensesTotal.style.display = 'inline-block';
    document.getElementById('submitActivityContainer').style.display = 'block';
    document.getElementById('budgetDifference').style.display = 'inline-block';
    calculateExpenses();
}

// Set total expenses
var expensesTotalAmount;
function calculateExpenses(){
    // Get lis
    var items = itemList.getElementsByTagName('li');
    expensesTotalAmount = 0;

    // Convert to an array
    Array.from(items); 
    
    for(i=0; i < items.length; i++){
        expensesTotalAmount += items[i].value;
    }
    expensesTotal.children[0].innerHTML = 'Expenses:<br>$'+expensesTotalAmount;
    budgetBar();
}

// Set total expenses
var leftOverAmount = 0;
var budgetBar;
function budgetBar(){   
    //document.getElementById('budgetTotal');
    
    leftOverAmount = budgetAmount - expensesTotalAmount;
    leftOver.children[0].innerHTML = 'Left Over:<br>$'+leftOverAmount;
    leftOverPercentage();
}

// find left over percentage
var percentageLeftOver;
var percentageUsed;
function leftOverPercentage () {
    percentageUsed = (expensesTotalAmount * 100) / budgetAmount;
    percentageLeftOver = (percentageUsed - 100) * -1;

    //Apply to left over bar
    for (let i=100; i>percentageLeftOver; i--) {
                var budgetBar = document.getElementById('budgetBar');
                budgetBar.style.width = i+'%';
    }  

    //Apply to expenses bar
    for (let e=0; e<percentageUsed; e++) {
        var expenseBar = document.getElementById('expenseBar');
        expenseBar.style.width = e+'%';
        
        if(e>100) {
            expenseBar.style.width = 100+'%';
        }

    }  

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
        selectedBtnColor = 'btn-warning';
    } else {
        selectedBtnColor = 'btn-danger';
    }
    priorityButton = '<span type=\"button\" class=\"badge text-wrap p-2 mr-2 float-left status ' +selectedBtnColor+ '\">'+prioritySelected+'</span> '+newPayment;
    // Add priority + text node with input value
    li.innerHTML = li.innerHTML+priorityButton;
    
    //create del button element
    var deleteBtn = document.createElement('i');
    // Add classes to delete button
    deleteBtn.className = 'far fa-trash-alt btn btn-danger btn-sm float-right delete';
    //Append button to li
    li.appendChild(deleteBtn);

    //get Amount value
    var newAmount = document.getElementById('amount').value;
    newAmount = newAmount.replace(/,/g, "").replace(/\$/g, '');
    // create div to be inserted
    newAmountInsert = document.createElement('div');
    //add amount value to div
    newAmountInsert.innerHTML = '$'+newAmount;
    // Add class to amount item
    newAmountInsert.className = 'badge text-wrap p-2 mr-2 float-left';
    // Add ID to amount item
    newAmountInsert.setAttribute("id", "itemAmount");
    //Append amount to li
    li.appendChild(newAmountInsert);
    //add amount value to li
    li.value = newAmount;
    li.style.border = '1px inset silver';
    li.draggable = "true";
    li.ondragover = "dragOver(event)";
    li.ondragstart = "dragStart(event)";

    document.getElementById('amount').value = "";
    console.log(li.ondragover)
    //Append li to list
    itemList.appendChild(li);
    //delete inner contents of activity adder
    document.getElementById('item').value = "";
    document.getElementById('item').placeholder = "Next payment For?";

    // Display Block for container - meant for first input
    document.getElementById('ActivityContainer').style.display = 'block';
    calculateExpenses();
}

// change status
function changeStatus(e){
    if (e.target.classList.contains('status')){
        if(e.target.classList.contains('btn-success')){
            e.target.classList.remove('btn-success');
            e.target.classList = e.target.classList+' btn-warning';
            e.target.innerHTML = "Pending";
        } else if(e.target.classList.contains('btn-warning')){
            e.target.classList.remove('btn-warning');
            e.target.classList = e.target.classList+' btn-danger';
            e.target.innerHTML = "Unpaid";
        } else {
            e.target.classList.remove('btn-danger');
            e.target.classList = e.target.classList+' btn-success';
            e.target.innerHTML = "Paid";
        }

    }
}
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

// change list order
function changeOrder(e){
    if (e.target.classList.contains('list-group-item')){
        var selectedItem = e.target;
        selectedItem.style.border = '2px dotted yellow';
        setTimeout(function(){selectedItem.style.border = '1px inset silver';}, 4000);
    }
}

// Filter Items based off importance
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
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

// Arrange Items

var _el;
function dragOver(e) {
    console.log('dragOver Beg '+e.target);
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
    console.log('dragStart Beg '+e.target);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null); // Thanks to bqlou for their comment.
  _el = e.target;
}

function isBefore(el1, el2) {
    console.log('isBefore Beg '+e.target);
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}

function minimizeToggleItems(e){
    console.log(e.target)
    console.log(e.target.parentNode)
    e.target.parentNode.style.height = '100px';
    e.target.parentNode.style.height = '50px';
    //e.target.parentNode.style.display = 'block';

    
    
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
    
    









