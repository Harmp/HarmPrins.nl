// Run when webpage is fully loaded
window.onload = function() {
	var tooltips = document.querySelectorAll(".tooltip");
	// For each tooltip
	tooltips.forEach(function(tooltip, index){
		// Set event handlers
		tooltip.addEventListener("mouseover", onTooltipMouseOver);
		tooltip.addEventListener("mouseout", onTooltipMouseOut);
		// Prevent event handlers from being called when invisible text box is hovered over
		tooltip.childNodes[3].addEventListener("mouseover", function(event) {event.stopPropagation();});
		tooltip.childNodes[3].addEventListener("mouseout", function(event) {event.stopPropagation();});
		// Default tooltip text to the left
		// Default css is in the middle in case no javascript is loaded
		setDefaultTooltipPosition(tooltip);
	})
}

function onTooltipMouseOver() {
	// Prevent textbox being defaulted if mouse is over again
	try { clearTimeout(this.mouseOutTimeout); } catch (err) {}
	
	setCorrectTooltipPosition(this);
}

// Prevent tooltip from going off page
function setCorrectTooltipPosition(current) {
	// Get positions of tooltip image and text
	var tooltip = current.childNodes[1].getBoundingClientRect();
	var tooltip_text = current.childNodes[3].getBoundingClientRect();
	
	var window_width = getWindowWidth();
	var image_width = tooltip.width;
	var tooltip_width = tooltip_text.width;
	var image_position = tooltip.left;
	
	// Calculate new tooltip position
	// Example: if tooltip is to the left, make it stick out to the right to prevent it going off page
	new_tooltip_pos = parseInt((image_position/(window_width-image_width))*(image_width-tooltip_width));
	// Set new position
	current.childNodes[3].style.left = parseInt(new_tooltip_pos) + "px";
}

function onTooltipMouseOut() {
	// Keep current tooltip for reference in timeout
	var current = this;
	// Wait until after fade out transition
	this.mouseOutTimeout = setTimeout(function() {
		setDefaultTooltipPosition(current);
	}, 500);
}

// Defaults tooltip to the left. Prevents page from becoming wider than it has to be, which prevents bugs in tooltip position calculation
function setDefaultTooltipPosition(current) {
	// Get positions of tooltip image and text
	var tooltip = current.childNodes[1].getBoundingClientRect();
	var tooltip_text = current.childNodes[3].getBoundingClientRect();
	
	var image_width = tooltip.width;
	var tooltip_width = tooltip_text.width;
	
	// Set new position
	current.childNodes[3].style.left = parseInt(image_width-tooltip_width) + "px";
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