let autonChooserWindow = document.getElementById("autonChooserWindow"),
    autonChooserBtnContainer = document.getElementById("autonChooserBtnContainer"),
    autonSideChooserBtnContainer = document.getElementById("autonSideChooserBtnContainer"), 
    selectedAuton = document.getElementById("selectedAuton"),
    selectedSide = document.getElementById("selectedSide"),
    openChooserWindowBtn = document.getElementById("openChooserWindowBtn"),
    closeChooserWindowBtn = document.getElementById("closeChooserWindowBtn");   

// dynamically add a button object to the container
function addButton(label) {
    //Create an input type dynamically. 
    var newButton = document.createElement("BUTTON");
    newButton.value = label;

    //add the label 
    var t = document.createTextNode(label);
    newButton.appendChild(t);

    //Assign button to Class along with additional properties
    newButton.classList.add('auton-button');
    newButton.style.marginTop = "15px";
    newButton.style.marginBottom = "15px";

    newButton.onclick = function(e) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;

        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        // grab the value (selected auton) of the button
        selectedAuton.value = targ.value;
        NetworkTables.putValue('/SmartDashboard/Auton/selected', selectedAuton.value);
    
        //Change Selected Button appearance and reset all others
        var autonButtonList = autonChooserBtnContainer.getElementsByClassName("auton-button");
        for (var i = 0 ; i < autonButtonList.length ; i++) {   
            autonButtonList[i].style.backgroundColor = "#444";
            autonButtonList[i].style.color = "white";
        }       
        newButton.style.backgroundColor = "white";
        newButton.style.color = "purple";
        newButton.style.fontWeight = "bold";
    }

    //Append the element in page
    autonChooserBtnContainer.appendChild(newButton);
}

// dynamically add a button object to the container
function addSideButton(label) {
    //Create an input type dynamically. 
    var newButton = document.createElement("BUTTON");
    newButton.value = label;

    //add the label 
    var t = document.createTextNode(label);
    newButton.appendChild(t);

    //Assign Button to Class
    newButton.classList.add('auton-button');

    newButton.onclick = function(e) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;

        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        // grab the value (selected auton) of the button
        selectedSide.value = targ.value;
        NetworkTables.putValue('/SmartDashboard/Side Start/selected', selectedSide.value);

        //Change Selected Button appearance and reset all others
        var autonSideButtonList = autonSideChooserBtnContainer.getElementsByClassName("auton-button");
        for (var i = 0 ; i < autonSideButtonList.length ; i++) {   
            autonSideButtonList[i].style.backgroundColor = "#444";
            autonSideButtonList[i].style.color = "white";
        }      
        newButton.style.backgroundColor = "white";
        newButton.style.color = "purple";
        newButton.style.fontWeight = "bold";
    }

    //Append the element in page
    autonSideChooserBtnContainer.appendChild(newButton);
}

function setSideDefault(side) {
    var autonSideButtonList = autonSideChooserBtnContainer.getElementsByClassName("auton-button");
    for (var i = 0 ; i < autonSideButtonList.length ; i++) {   
        if(autonSideButtonList[i].value == side){
            autonSideButtonList[i].style.backgroundColor = "white";
            autonSideButtonList[i].style.color = "purple";
            autonSideButtonList[i].style.fontWeight = "bold";
        }
    } 
}

function setAutonDefault(auton) {
    var autonButtonList = autonChooserBtnContainer.getElementsByClassName("auton-button");
    for (var i = 0 ; i < autonButtonList.length ; i++) {   
        if(autonButtonList[i].value == auton){
            autonButtonList[i].style.backgroundColor = "white";
            autonButtonList[i].style.color = "purple";
            autonButtonList[i].style.fontWeight = "bold";
        }
    } 
}

//Delete Current Buttons in Button Container [prevents repeats]
function clearAutonButtons() {
    var autonButtonList = autonChooserBtnContainer.getElementsByClassName("auton-button");
    while (autonButtonList.length > 0) {
        autonChooserBtnContainer.removeChild(autonButtonList[0]);
    }
}

function clearAutonSideButtons() {
    var autonSideButtonList = autonSideChooserBtnContainer.getElementsByClassName("auton-button");
    while (autonSideButtonList.length > 0) {
        autonSideChooserBtnContainer.removeChild(autonSideButtonList[0]);
    }
}

// button _onclick handler
openChooserWindowBtn.onclick = () => {
    autonChooserWindow.style.display = 'block';
    autonChooserBtnContainer.style.display = 'block';
    autonSideChooserBtnContainer.style.display = 'block';
    autonChooserWindow.style.visibility = 'visible';
    autonChooserBtnContainer.style.visibility = 'visible';
    autonSideChooserBtnContainer.style.visibility = 'visible';
};

closeChooserWindowBtn.onclick = () => {
    autonChooserWindow.style.display = 'none';
    autonChooserBtnContainer.style.display = 'none';
    autonSideChooserBtnContainer.style.display = 'none';
    autonChooserWindow.style.visibility = 'hidden';
    autonChooserBtnContainer.style.visibility = 'hidden';
    autonSideChooserBtnContainer.style.visibility = 'hidden';
}
/*
// hide
    div.style.visibility = 'hidden';
    // OR
    div.style.display = 'none';

    // show
    div.style.visibility = 'visible';
    // OR
    div.style.display = 'block';
*/