// Define UI elements
let ui = {
	fmsDebugMsg: document.getElementById('fmsDebugMsg'),
	robotCodeBuild: document.getElementById('robotCodeBuild'),
	robotScanTime: document.getElementById('robotScanTime'),
	
	// auton selectors
	openChooserWindowBtn: document.getElementById('openChooserWindowBtn'),
	
	// chassis

	//climber
	climberStatus: document.getElementById('climber-status'),
	
	// infeed arm diagram
	robotDiagram: {
		robot: document.getElementById('robot'),
	},

	//vision
	visionTargetIndicator: document.getElementById('visionTargetIndicator'),
	visionAngle1Indicator: document.getElementById('visionAngle1Indicator'),
	visionConnectionIndicator: document.getElementById('visionConnectionIndicator'),
	visionDistanceIndicator: document.getElementById('visionDistanceIndicator'),
		
	// elevator
	elevatorPosition: document.getElementById('elevatorPosition'),

	// bucket
	gamepiece: document.getElementById('gamepiece'),
	hatchcenter: document.getElementById('hatch-center'),

	// camera
	camera: document.getElementById('camera'),
	
	// spinner **To Be Editted**
	spinnerColor: document.getElementById('spinnerColor'),
	spinnerRotations: document.getElementById('spinnerRotations'),
	
	// powercell count **To be Editted**
	powerCellCount: document.getElementById('powerCellCount'),
	
	// infeed position **To Be Editted**F
	infeedPosition: document.getElementById('infeedPosition'),

	isAltShot : document.getElementById('Is Alt Shot'),

	isReadyToShoot : document.getElementById('Is At Speed'),

	shooterOffset : document.getElementById('shotOffset'),

	shooterDist : document.getElementById('shotDistance'),

	shooterSensorDistance : document.getElementById('sensorDist')

};


// Key Listeners
// ========================================================================================
// header
// ========================================================================================
// robotState is in connection.js

NetworkTables.addKeyListener('/SmartDashboard/FMS Debug Msg', (key, value) => {
    ui.fmsDebugMsg.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Robot Build', (key, value) => {
    ui.robotCodeBuild.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Scan Time (2 sec roll avg)', (key, value) => {
    //ui.robotScanTime.value = value;
});
// ========================================================================================
// auton mode
// ========================================================================================
// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/Auton/options', (key, value) => {
	openChooserWindowBtn.disabled = false;
	openChooserWindowBtn.textContent = '= Click to Open Chooser Window =';
	
	clearAutonButtons();

    // dynamically build list of auton options
    for (let i = 0; i < value.length; i++) {
        addButton(value[i]);           
	}

	selectedAuton.value = "** Not selected **"
});

NetworkTables.addKeyListener('/SmartDashboard/Auton/default', (key, value) => {
	setAutonDefault(value.toString());
	selectedAuton.value = value;
});

NetworkTables.addKeyListener('/SmartDashboard/Auton/selected', (key, value) => {
	setAutonDefault(value.toString());
	selectedAuton.value = value;
});

// ========================================================================================
// auton starting side
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Side Start/options', (key, value) => {
//function loadTestAutonSides() {
	openChooserWindowBtn.disabled = false;
	openChooserWindowBtn.textContent = '= Click to Open Chooser Window =';

	clearAutonSideButtons();

    // dynamically build list of auton options	
	for (let i = 0; i < value.length; i++) {
        addSideButton(value[i]);           
    }

	selectedSide.value = "** Not selected **"
});

NetworkTables.addKeyListener('/SmartDashboard/Side Start/default', (key, value) => {
	setSideDefault(value.toString());
	selectedSide.value = value;
});


// ========================================================================================
// Vision
// =======================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Vision:IsTargetInFOV', (key, value) => {
	if (value)	{
		ui.visionTargetIndicator.style = "background-color:green;";
		ui.visionAngle1Indicator.style = "background-color:green;";
	} else {
		ui.visionTargetIndicator.style = "background-color:red;";
		ui.visionAngle1Indicator.style = "background-color:red;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/Vision:Angle1InDegrees', (key, value) => {	
	ui.visionAngle1Indicator.textContent = value + "\u00B0";
});

NetworkTables.addKeyListener('/SmartDashboard/Vision:Angle2InDegrees', (key, value) => {	
	ui.visionAngle2Indicator.textContent = value + "\u00B0";
});

NetworkTables.addKeyListener('/SmartDashboard/Vision:ActualDistance', (key, value) => {	
	if(value < 100 && value != 0) {
		ui.visionDistanceIndicator.textContent = Math.round(value) + "in";
		if (value <= 20) {
			ui.visionDistanceIndicator.style = "background-color:green;";
		} 
		else if(value <= 60) {
			ui.visionDistanceIndicator.style = "background-color:yellow;";
		} else {
			ui.visionDistanceIndicator.style = "background-color:red;";
		}
	} else {
		ui.visionDistanceIndicator.style = "background-color:red;";
		ui.visionDistanceIndicator.textContent = "NO";
	}	
});

NetworkTables.addKeyListener('/SmartDashboard/Vision:IsPingable', (key, value) => {	
	if(value) {
		//ui.visionConnectionIndicator.style = "visibility:hidden;";
		ui.visionConnectionIndicator.style = "background-color:#2B3A42;";
	} else {
		//ui.visionConnectionIndicator.style = "visibility:visible;";
		ui.visionConnectionIndicator.style = "background-color:red;";
	}
});
// ========================================================================================
// Chassis
// ========================================================================================

// ========================================================================================
// Climber
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/ClimberIsRunning', (key, value) => {	
	if(value){
		ui.climberStatus.style.visibility = visible;
	} else {
		ui.climberStatus.style.visibility = hidden;
	}
});

// ========================================================================================
// Elevator
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Elevator: Position', (key, value) => {
	if (value == "LEVEL_1"){
		ui.elevatorPosition.style.fill = "green";
		ui.elevatorPosition.textContent = "1";
	}
	else if (value == "LEVEL_2"){
		ui.elevatorPosition.style.fill = "yellow";
		ui.elevatorPosition.textContent = "2";
	}
	else if (value == "LEVEL_3"){
		ui.elevatorPosition.style.fill = "red";
		ui.elevatorPosition.textContent = "3";
	} else {
		ui.elevatorPosition.style.fill = "cornsilk";
		ui.elevatorPosition.textContent = "F";
	}
});

// ========================================================================================
// Bucket Group Box
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Cargo:HasHatch', (key, value) => {	
	if (value) {
		ui.gamepiece.style.fill = "yellow";
		ui.gamepiece.style.stroke = "darkgrey";
		ui.hatchcenter.style.visibility = "visible";
	} else {
		ui.gamepiece.style.fill = "darkorange";
		ui.gamepiece.style.stroke = "orange";
		ui.hatchcenter.style.visibility = "hidden";
	}
});

// ========================================================================================
// SPINNER
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Spinner:Rotations', (key, value) => {
	if (value >= 3 && value <= 5) {
		ui.spinnerRotations.style = "background-color:green;";
	} else {
		ui.spinnerRotations.style = "background-color:red;";
	}
});

NetworkTables.addKeyListener('/SmartDashboard/Spinner:Color', (key, value) => {
	
});

// ========================================================================================
// POWERCELL COUNT 
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Cell Count', (key, value) => {
	ui.powerCellCount.textContent = value;
	});
	
		//	let pc = valueOf(powerCellCount);
	
//	for (let pc = 0; pc < PowerCellDetected; pc++)
//	for (let pc = 0; pc++) {
//        powerCellCount(value[pc]);  
//    }
//	if (powerCellCount = 6) {
//		powerCellCount= 1;
//	}

// ========================================================================================
// INFEED
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/Singulator:Sensor', (key, value) => {
	 if (value == "IN"){
		ui.elevatorPosition.style.fill = "green";
		ui.elevatorPosition.textContent = "In";
	} else if (value == "OUT"){
		ui.elevatorPosition.style.fill = "yellow";
		ui.elevatorPosition.textContent = "Out";
	} else {
		ui.elevatorPosition.style.fill = "cornsilk";
		ui.elevatorPosition.textContent = "F";
	}
});

// ========================================================================================
// Shooter
// ========================================================================================

NetworkTables.addKeyListener('/SmartDashboard/Is At Speed', (key, value) =>
{
	if( value == true)
	{
		ui.isReadyToShoot.style = "background-color:green;";

		ui.isReadyToShoot.textContent = "Shoot";
	}
	else{
		ui.isReadyToShoot.style = "background-color:red;";
		ui.isReadyToShoot.textContent = "NOT READY";
	}
});
NetworkTables.addKeyListener('/SmartDashboard/Shooter Distance', (key, value) =>
{
	ui.shooterDist.textContent = value;
});
NetworkTables.addKeyListener('/SmartDashboard/Shooter Offset', (key, value) =>
{
	ui.shooterOffset.textContent = value;
});
NetworkTables.addKeyListener('/SmartDashboard/Shooter Sensor Distance', (key, value) =>
{
	ui.shooterSensorDistance.textContent = value;
});
NetworkTables.addKeyListener('/SmartDashboard/Is Alternate Shot', (key, value) =>
{
	if( value == true)
	{
		ui.isAltShot.style = "background-color:red;";
		ui.isAltShot.textContent = "Alternate";
	}
	else{
		ui.isAltShot.style = "background-color:green";
		ui.isAltShot.textContent = "Normal";
	}
});



// ========================================================================================
// misc 
// ========================================================================================
NetworkTables.addKeyListener('/SmartDashboard/CamSelection', (key, value) => {	
	camera.setAttribute('src', value);
});

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
});