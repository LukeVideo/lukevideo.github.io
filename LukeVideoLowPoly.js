"use strict"

// register the application module
b4w.register("LukeVideoLowPoly", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_data      = require("data");
var m_trans     = require("transform");
var m_scenes    = require("scenes");
var m_ctl       = require("controls")
var m_logic_nodes= require("logic_nodes")

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: true,
        console_verbose: true,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }
    m_logic_nodes.append_custom_callback("cubeClick", cubeClick);
    m_logic_nodes.append_custom_callback("backgroundClick", backgroundClick);
    
    var parts = ["luke.martin.video", "gmail", "com", "&#46;", "&#64;"];
    var email = parts[0] + parts[4] + parts[1] + parts[3] + parts[2];
    document.getElementById("email").innerHTML=email; 
    
    document.getElementById("sunglassesChange").addEventListener("click", sunglassesChange);
    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load("LukeVideoLowPoly.json", load_cb);
}

function cubeClick(trucID){
    backgroundClick()
    var vignette = document.getElementById(trucID);
    console.log(vignette);
    if (vignette.style.visibility === "visible"){
      vignette.style.visibility = "hidden";
    }
    else {
      vignette.style.visibility = "visible";
    }
}


function backgroundClick(){

    var vignettes = document.getElementsByClassName('vignette');
    Array.prototype.map.call(vignettes, function(el) {
    el.style.visibility = "hidden";
});
}
function sunglassesChange(){
    console.log("sunglassesChange called !");
    m_logic_nodes.run_entrypoint("Scene", "sunglassesTree")
}


/**
 * callback executed when the scene is loaded
 */
function load_cb(data_id) {
    m_app.enable_camera_controls();

    // place your code here

}


});

// import the app module and start the app by calling the init method
b4w.require("LukeVideoLowPoly").init();
