// Set a global alias for the camera and related elements.
/*ui.camera = {
	viewer: document.getElementById('camera'),
	id: 0,
	srcs: [ // Will default to first camera
        '10.40.28.13:5800',
        '10.40.28.15:5801',
    ]
};

// Unlike most addons, this addon doesn't interact with NetworkTables. Therefore, we won't need to add any NT listeners.

// When camera is clicked on, change to the next source.
ui.camera.viewer.onclick = function() {
    ui.camera.id += 1;
	if (ui.camera.id === ui.camera.srcs.length) ui.camera.id = 0;
	ui.camera.viewer.style.backgroundImage = 'url(' + ui.camera.srcs[ui.camera.id] + ')';
};
*/