// Run when webpage is fully loaded
window.onload = function() {
	var tooltips = document.querySelectorAll(".tooltip");
	// For each tooltip
	tooltips.forEach(function(tooltip, index){
		// Set event handlers
		tooltip.addEventListener("mouseover", onMouseOver);
		tooltip.addEventListener("mouseout", onMouseOut);
		// Default tooltip text to the left
		// Default css is in the middle in case no javascript is loaded
		setDefaultTooltipPosition(tooltip);
	})
}

function onMouseOver(){
	// Keep mousover position
	this.mouseIsOver = true;
	
	setCorrectTooltipPosition(this);
}

// Prevent tooltip from going off page
function setCorrectTooltipPosition(current){
	// Get positions of tooltip image and text
	var tooltip = current.childNodes[0].getBoundingClientRect();
	var tooltip_text = current.childNodes[1].getBoundingClientRect();
	
	var window_width = getWindowWidth();
	var image_width = tooltip.width;
	var tooltip_width = tooltip_text.width;
	var image_position = tooltip.left;
	
	// Calculate new tooltip position
	// Example: if tooltip is to the left, make it stick out to the right to prevent it going off page
	new_tooltip_pos = parseInt((image_position/(window_width-image_width))*(image_width-tooltip_width));
	// Set new position
	current.childNodes[1].style.left = parseInt(new_tooltip_pos) + "px";
}

function onMouseOut(){
	// Keep mousover position
	this.mouseIsOver = false;
	
	// Keep current tooltip for later reference
	var current = this;
	// Wait until after fade out transition
	setTimeout(function(){
		// Prevent reset from running if mouse hovers over tooltip again
		if (!current.mouseIsOver){
			setDefaultTooltipPosition(current);
		}
	}, 750);
}

// Defaults tooltip to the left. Prevents page from becoming wider than it has to be, which prevents bugs in tooltip position calculation
function setDefaultTooltipPosition(current){
	// Get positions of tooltip image and text
	var tooltip = current.childNodes[0].getBoundingClientRect();
	var tooltip_text = current.childNodes[1].getBoundingClientRect();
	
	var image_width = tooltip.width;
	var tooltip_width = tooltip_text.width;
	
	// Set new position
	current.childNodes[1].style.left = parseInt(image_width-tooltip_width) + "px";
}

// Get current window width
function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}