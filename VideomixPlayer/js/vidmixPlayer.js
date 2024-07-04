/*
VideomixPlayer-Plugin
You can use this Plugin to make Video-Mixes
The Elements have following IDs:
	videoplayer: videoplayer
	play: vidplayBtn
    stop: vidstopBtn
    videotime rewind: vidrewBtn
    videotime forwind: vidforwBtn
    previous video: vidskiprewBtn (still without a function)
    next video: vidskipforwBtn (still without a function)
    pitch up: vidpitchupBtn
    pitch down: vidpitchdownBtn
    pitchslider: vidpitchRange
    volumeslider: vidVolumer
    toggle volume: vidtoggleVolume
    FX-Button: vidfxBtn
    play video reverse: vidrevBtn,
    settingsopener: vidsettingBtn
    galleryopenener: vidgalleryBtn (still without a function)
    screen-ratio-button: vidratioBtn
    recordopener: vidrecBtn (still without a function)
    button to change the Player: vidchgPlayer
    fullscreenbutton: vidfullScreen (still without a function)
	all have the number of the config "playerID"
You can use all IDs to control and develop your own videomix-program
(C) 2024 Thomas Dittmar
*/

(function($) {
  $.fn.vidmixPlayer = function(options) {
    var vidconfigs = $.extend({
      "playerID": 1,
      "path": "file:///C:/Users/sonvt/Videos/",
      "fxPath": "file:///C:/Users/sonvt/Music/",
      "src": "Best of Pepe Nietnagel - Scherz mit dem Knörzerich",
      "fxSrc": "vbge9.ogg",
      "ext": ".mp4",
      "pitch": false,
      "pitchrate": 1,
      "volume": 1,
      "controls": false,
      "skiptime": 10,
      "pitchTime": 120,
    }, options);
    
    var vidmixelement = this;
    
    var vidplayerArea = $("<div/>");
    vidplayerArea.css({
      "width": "100%",
      "height": "100%",
      "background": "#303030"
    });
    
    var vidplayer = $("<video id='videoplayer"+vidconfigs.playerID+"' style='width:100%;'></video>");
    vidplayer.css({
      "width": "100%",
      "height": "100%",
      "background": "#151515"
    });
    vidplayer.appendTo(vidplayerArea);
    vidplayer.attr({
      "src": vidconfigs.path+vidconfigs.src+vidconfigs.ext,
      "controls": vidconfigs.controls
    })
      .prop({
      "preservesPitch": vidconfigs.pitch,
      "playbackRate": vidconfigs.pitchrate,
      "volume": vidconfigs.volume,
    });
    
    vidplayerArea.appendTo(vidmixelement);
    
    var vtoolbarArea = $("<div id='playertools"+vidconfigs.playerID+"'></div>");
    vtoolbarArea.css({
    "width": vidplayer.width(),
    "background": "rgba(21,21,21,0.5)",
    "position": "absolute",
    "z-index": "300",
    "left": "10px",
    "top": "10px",
    "display": "none"
  	}).appendTo(vidmixelement);
    
    var vidtimeTools = $("<div style='display:flex; flex-direction:row; width:99.5%; margin-left:1px; margin-bottom:2px;' class='timerBox'><div class='time1' id='searchtime"+vidconfigs.playerID+"'><div id='progtime"+vidconfigs.playerID+"' class='progtime'></div></div><div class='time2' id='playtime"+vidconfigs.playerID+"'>0:00 / 0:00</div></div>");
  	vidtimeTools.appendTo(vtoolbarArea);
    
    var toolbuttonArea = $("<div/>");
    toolbuttonArea.css({
      "width": "100%",
      "display": "flex",
      "flex-direction": "row"
  	}).appendTo(vtoolbarArea);
    
    var showTool;
    
    $("#videoplayer"+vidconfigs.playerID).on("mousemove", function() {
    var lpos = $("#videoplayer"+vidconfigs.playerID).offset().left;
    var tpos = $("#videoplayer"+vidconfigs.playerID).offset().top + $("#videoplayer"+vidconfigs.playerID).height() - 61;
    clearTimeout(showTool);
    $("#playertools"+vidconfigs.playerID).animate({left: lpos + "px", top: tpos + "px"},1).show();
    showTool = setTimeout(function() {
      $("#playertools"+vidconfigs.playerID).hide();
    },6000);
  });
    
    var vidtoolsBtns = $("<button id='vidplayBtn"+vidconfigs.playerID+"' class='toolbuttons'>&#9654;</button>&nbsp;<button id='vidstopBtn"+vidconfigs.playerID+"' class='toolbuttons3' style='margin-left:4px; width:40px;'>&#9632;</button>");
  	vidtoolsBtns.appendTo(toolbuttonArea);
    
    var vidrewBtn = $("<button class='toolbuttons' id='vidrewBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>&laquo;</button>");
  	vidrewBtn.appendTo(toolbuttonArea);
  
  	var vidforwBtn = $("<button class='toolbuttons' id='vidforwBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>&raquo;</button>");
    vidforwBtn.appendTo(toolbuttonArea);
    
    var vidskiprewBtn = $("<button class='toolbuttons' id='vidskiprewBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>|&laquo;</button>");
  	vidskiprewBtn.css({
    "background": "#202100",
    "border-color": "#202100"
  	});
  	vidskiprewBtn.appendTo(toolbuttonArea);
  
  	var vidskipforwBtn = $("<button class='toolbuttons' id='vidskipforwBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>&raquo;|</button>");
  	vidskipforwBtn.css({
    "background": "#202100",
    "border-color": "#202100"
  	});
  	vidskipforwBtn.appendTo(toolbuttonArea);
    
    var vidpitchupBtn = $("<button class='toolbuttons' id='vidpitchupBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>&uArr;</button>");
  	vidpitchupBtn.css({
    "background": "#002900",
    "border-color": "#002900",
  	});
  	vidpitchupBtn.appendTo(toolbuttonArea);
  
  	var vidpitchdownBtn = $("<button class='toolbuttons' id='vidpitchdownBtn"+vidconfigs.playerID+"' style='margin-left:4px; width:40px;'>&dArr;</button>");
  	vidpitchdownBtn.css({
    "background": "#002900",
    "border-color": "#002900",
  	});
  	vidpitchdownBtn.appendTo(toolbuttonArea);
    
    var pitchBox = $("<div/>");
    pitchBox.css({
      "width": "80px",
      "height": "30px",
      "background": "#202020",
      "margin-left": "4px",
      "margin-top": "2px"
  	});
  
    pitchBox.appendTo(toolbuttonArea);
    
    var vidpitchRange = $("<input type='range' id='vidpitchRange"+vidconfigs.playerID+"' class='slider'/>");
    vidpitchRange.css({
      "width": "70px",
      "height": "10px",
      "margin-top": "6px"
  	  }).attr({
      "max": "4",
      "min": "0.25",
      "step": "0.01",
      "value": vidconfigs.pitchrate
  	  });
  
    vidpitchRange.appendTo(pitchBox);
    
    var volumeBox = $("<div/>");
    volumeBox.css({
      "width": "80px",
      "height": "30px",
      "background": "#202020",
      "margin-left": "4px",
      "margin-top": "2px"
  	});
    volumeBox.appendTo(toolbuttonArea);
    
    var vidVolumer = $("<input id='vidVolumer"+vidconfigs.playerID+"' type='range' class='slider'/>");
    vidVolumer.css({
      "width": "70px",
      "height": "10px",
      "margin-top": "6px"
  	  }).attr({
      "max": "1",
      "min": "0",
      "step": "0.01",
      "value": vidconfigs.volume
  	  });
    vidVolumer.appendTo(volumeBox);
    
    var vidtoggleVolume = $("<button class='toolbuttons' id='vidtoggleVolume"+vidconfigs.playerID+"'><img src='Symbole/volume.png' style='filter:invert(100%)'></button>");
  	vidtoggleVolume.appendTo(toolbuttonArea);
    
    var vidfxBtn = $("<button id='vidfxBtn"+vidconfigs.playerID+"' class='toolbuttons'>FX</button>");
  	vidfxBtn.css({
      "background": "#002900",
      "border-color": "#002900"
    });

    vidfxBtn.appendTo(toolbuttonArea);
    
    var vidrevBtn = $("<button id='vidrevBtn"+vidconfigs.playerID+"' class='toolbuttons4'>Rv</button>");
    vidrevBtn.appendTo(toolbuttonArea);
    
    var vidsettingBtn = $("<button id='vidsettingBtn"+vidconfigs.playerID+"' class='toolbuttons' style='background:#2d0000; border-color:#2d0000;'><img src='Symbole/settings.png' style='width:16px; height: 16px; filter:invert(100%);'></button>");
    vidsettingBtn.appendTo(toolbuttonArea);
    
    var vidgalleryBtn = $("<button id='vidgalleryBtn"+vidconfigs.playerID+"' class='toolbuttons' style='background:#002900; border-color:#002900; display:none;'><img src='Symbole/img.png' style='width:16px; height: 16px; filter:invert(100%);'></button>");
    vidgalleryBtn.appendTo(toolbuttonArea);
    
    var vidratioBtn = $("<button id='vidratioBtn"+vidconfigs.playerID+"' class='toolbuttons14'>16:9</button>");
    vidratioBtn.appendTo(toolbuttonArea);
    
    var vidrecBtn = $("<button id='vidrecBtn"+vidconfigs.playerID+"' class='toolbuttons' style='background:#2d0000; border-color:#2d0000;'><img src='Symbole/rec.png' style='width:16px; height: 16px; filter:invert(100%);'></button>");
    vidrecBtn.appendTo(toolbuttonArea);
    
    var vidchgPlayer = $("<button id='vidchgPlayer"+vidconfigs.playerID+"' class='toolbuttons'>&#8660;</button>");
    vidchgPlayer.appendTo(toolbuttonArea);
    
    var vidfullScreen = $("<button id='vidfullScreen"+vidconfigs.playerID+"' class='toolbuttons' id='toggleFull'><img src='Symbole/fullscreen.png' style='width:16px; height: 16px;'></button>");
    vidfullScreen.appendTo(toolbuttonArea);
    
    var vidinfoBox = $("<div id='vidinfoBox'/>");
  	vidinfoBox.css({
      "width": "150px",
      "height": "25px",
      "background": "rgba(15, 15, 15, 0.9)",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "border-radius": "6px",
      "border": "1px solid white",
      "position": "absolute",
      "z-index": "1001",
      "padding-top": "6px",
      "left": "100",
      "top": "20",
      "display": "none"
  	});
  
    vidinfoBox.text("Tool-Title");
    vidinfoBox.appendTo(vidmixelement);
    
    var vidsettingsMod = $("<div id='vidsettingsMod'/>");
  	vidsettingsMod.css({
    "width": "72%",
    "height": "auto",
    "background": "rgba(15, 15, 15, 0.8)",
    "position": "absolute",
    "left": "10px",
    "top": "10px",
    "display": "none",
    "border": "4px outset rgba(255, 255, 255, 0.8)",
    "z-index": "1200"
  	});
  
  	vidsettingsMod.appendTo("body");
    
    var vidsettingsHead = $("<div/>");
  	vidsettingsHead.css({
    "width": "100%",
    "height": "40px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "left"
  	}).text("Video-Settings");
  
  	vidsettingsHead.appendTo(vidsettingsMod);
    
    var vidsettingsPlayerNumber = $("<div/>");
  	vidsettingsPlayerNumber.css({
    "width": "100%",
    "height": "35px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center"
  	}).text("Playernumber: ");
  
  	vidsettingsPlayerNumber.appendTo(vidsettingsMod);
    
    var vidplayerNumber = $("<select id='vidplayerNumber' style='width:150px; height:30px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset silver; border-radius:6px; margin-left:9px;'></select>");
    vidplayerNumber.appendTo(vidsettingsPlayerNumber);
    
    var vidplayerOptions = $("<option value='player1'>Player 1</option><option value='player2'>Player 2</option>");
    vidplayerOptions.appendTo(vidplayerNumber);
    
    var vidcloseBtn = $("<button class='closeBtn'>X</button>");
  	vidcloseBtn.appendTo(vidsettingsHead);
    
    $("#vidsettingBtn"+vidconfigs.playerID).on("click", function() {
    vidsettingsMod.animate({left: window.screen.availWidth/2 - vidsettingsMod.width()/2 + "px", top: window.screen.availHeight/2 - vidsettingsMod.height()/2 + "px"},1).show();
  	});
    
    vidcloseBtn.on("click", function() {
    vidsettingsMod.hide();
  	});
    
    var vidsettingsArea = $("<div/>");
  	vidsettingsArea.css({
    "width": "100%",
    "height": "50px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  	});
  
  	vidsettingsArea.appendTo(vidsettingsMod);
    
    var vidsettTxt1 = $("<div/>");
  	vidsettTxt1.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Screen-Ratio Player1:");
  
  	vidsettTxt1.appendTo(vidsettingsArea);
    
    var vidratioSelect = $("<select id='vidratioSelect'><option value='0'>Standard</option><option value='1'>4:3 (480p)</option><option value='2'>4:3 (360p)</option><option value='3'>3:2</option><option value='4'>WideScreen</option></select>");
  	vidratioSelect.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	});
  
  	vidratioSelect.appendTo(vidsettingsArea);
    
    var vidsettTxt2 = $("<div/>");
  	vidsettTxt2.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Video-Width Player1:");
  
  	vidsettTxt2.appendTo(vidsettingsArea);
    
    var vidWidth = $("<input id='vidWidth' type='number'/>");
  	vidWidth.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  	});
  
  	vidWidth.appendTo(vidsettingsArea);
    
    var vidsettTxt3 = $("<div/>");
  	vidsettTxt3.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Video-Height Player1:");
  
  	vidsettTxt3.appendTo(vidsettingsArea);
    
    var vidHeight = $("<input id='vidHeight' type='number'/>");
  	vidHeight.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  	});
  
  	vidHeight.appendTo(vidsettingsArea);
    
    
    var vidsettingsArea2 = $("<div/>");
  	vidsettingsArea2.css({
    "width": "100%",
    "height": "50px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  	});
  
  	vidsettingsArea2.appendTo(vidsettingsMod);
    
    var vidsettTxt11 = $("<div/>");
  	vidsettTxt11.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Screen-Ratio Player2:");
  
  	vidsettTxt11.appendTo(vidsettingsArea2);
    
    var vidratioSelect2 = $("<select id='vidratioSelect2'><option value='0'>Standard</option><option value='1'>4:3 (480p)</option><option value='2'>4:3 (360p)</option><option value='3'>3:2</option><option value='4'>WideScreen</option></select>");
  	vidratioSelect2.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	});
  
  	vidratioSelect2.appendTo(vidsettingsArea2);
    
    var vidsettTxt12 = $("<div/>");
  	vidsettTxt12.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Video-Width Player2:");
  
  	vidsettTxt12.appendTo(vidsettingsArea2);
    
    var vidWidth2 = $("<input id='vidWidth2' type='number'/>");
  	vidWidth2.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  	});
  	vidWidth2.appendTo(vidsettingsArea2);
    
    var vidsettTxt13 = $("<div/>");
  	vidsettTxt13.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Video-Height Player2:");
  
  	vidsettTxt13.appendTo(vidsettingsArea2);
    
    var vidHeight2 = $("<input id='vidHeight2' type='number'/>");
  	vidHeight2.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  	});
  	vidHeight2.appendTo(vidsettingsArea2);
    
    var vidsettingsArea3 = $("<div/>");
  	vidsettingsArea3.css({
    "width": "100%",
    "height": "50px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  	});
    
    
    vidsettingsArea3.appendTo(vidsettingsMod);
    
    var vidsettTxt4 = $("<div/>");
  
  	vidsettTxt4.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Slomo-Speed:");
  
  	vidsettTxt4.appendTo(vidsettingsArea3);
    
    var vidslomoSpeed = $("<select id='vidslomoSpeed'><option value='0.25'>0.25</option><option value='0.3'>0.30</option><option value='0.4'>0.40</option><option value='0.5' selected>0.50</option><option value='0.6'>0.60</option><option value='0.7'>0.70</option><option value='0.75'>0.75</option><option value='0.8'>0.80</option><option value='0.9'>0.90</option><option value='1'>1.00</option><option value='1.1'>1.10</option><option value='1.25'>1.25</option><option value='1.5'>1.50</option><option value='1.75'>1.75</option><option value='2'>2.00</option><option value='2.5'>2.50</option><option value='3'>3.00</option><option value='3.5'>3.50</option><option value='4'>4.00</option><option value='5'>5.00</option><option value='6'>6.00</option><option value='7'>7.00</option><option value='8'>8.00</option><option value='9'>9.00</option><option value='10'>10.00</option></select>");
    vidslomoSpeed.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	});
  
  	vidslomoSpeed.appendTo(vidsettingsArea3);
    
    var vidsettTxt5 = $("<div/>");
  	vidsettTxt5.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Slomo-Start:");
  
  	vidsettTxt5.appendTo(vidsettingsArea3);
    
    var vidslomoStart = $("<input id='vidslomoStart' type='number'/>");
  	vidslomoStart.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 1,
    "step": 0.01
  	});
  
  	vidslomoStart.appendTo(vidsettingsArea3);
    
    var vidsettTxt6 = $("<div/>");
  	vidsettTxt6.css({
    "width": "240px",
    "height": "50px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("Slomo-End:");
  
  	vidsettTxt6.appendTo(vidsettingsArea3);
    
    var vidslomoEnd = $("<input type='number'/>");
  	vidslomoEnd.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max":  $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 1,
    "step": 0.01
  	});
  
  	vidslomoEnd.appendTo(vidsettingsArea3);
    
    vidratioSelect.on("change", function() {
    var radSel = $(this).val();
    var fscControl1 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (radSel === "0") {
      vidWidth.val(1);
      vidHeight.val(1);
    } else if (radSel === "1") {
      vidWidth.val(1.41);
      vidHeight.val(1);
    } else if (radSel === "2") {
      vidWidth.val(1.41);
      vidHeight.val(1.21);
    } else if (radSel === "3") {
      vidWidth.val(1.21);
      vidHeight.val(1);
    } else if (radSel === "4") {
      vidWidth.val(1);
      vidHeight.val(1.21);
    }
    
    if (fscControl1) {
      vidWidth.trigger("change");
      vidHeight.trigger("change");
    }
      savevidRatioSelection();
  	});
    
    vidratioSelect2.on("change", function() {
    var radSel2 = $(this).val();
    var fscControl2 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (radSel2 === "0") {
      vidWidth2.val(1);
      vidHeight2.val(1);
    } else if (radSel2 === "1") {
      vidWidth2.val(1.41);
      vidHeight2.val(1);
    } else if (radSel2 === "2") {
      vidWidth2.val(1.41);
      vidHeight2.val(1.21);
    } else if (radSel2 === "3") {
      vidWidth2.val(1.21);
      vidHeight2.val(1);
    } else if (radSel2 === "4") {
      vidWidth2.val(1);
      vidHeight2.val(1.21);
    }
    
    if (fscControl2) {
      vidWidth2.trigger("change");
      vidHeight2.trigger("change");
    }
      savevidRatioSelection2();
  	});
    
    vidWidth.on("change", function() {
    var scaleWidth = $(this).val();
    var scaleHeight = vidHeight.val();
    var fscControl1 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (fscControl1) {
      $("#videoplayer"+vidconfigs.playerID).css("transform", "scale("+scaleWidth+", "+scaleHeight+")");
    }
      savevidVideoSize();
  	});
    
    vidWidth2.on("change", function() {
    var scaleWidth2 = $(this).val();
    var scaleHeight2 = vidHeight2.val();
    var fscControl2 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (fscControl2) {
      $("#videoplayer"+vidconfigs.playerID).css("transform", "scale("+scaleWidth2+", "+scaleHeight2+")");
    }
      savevidVideoSize2();
  	});
    
    vidHeight.on("change", function() {
    var scaleWidth = vidWidth.val();
    var scaleHeight = $(this).val();
    var fscControl1 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (fscControl1) {
      $("#videoplayer"+vidconfigs.playerID).css("transform", "scale("+scaleWidth+", "+scaleHeight+")");
    }
  	});
    
    vidHeight2.on("change", function() {
    var scaleWidth2 = vidWidth2.val();
    var scaleHeight2 = $(this).val();
    var fscControl2 = $("#vidfullScreen"+vidconfigs.playerID).attr("style");
    
    if (fscControl2) {
      $("#videoplayer"+vidconfigs.playerID).css("transform", "scale("+scaleWidth2+", "+scaleHeight2+")");
    }
  	});
    
    var vidplaylistHead2 = $("<div/>");
  	vidplaylistHead2.css({
    "width": "100%",
    "height": "30px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
  	}).text("Playlist-Mode");
    
    var vidplaylistMode = $("<div/>");
    vidplaylistMode.css({
    "width": "100%",
    "height": "80px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  	});
    
    vidplaylistHead2.appendTo(vidsettingsMod);
    vidplaylistMode.appendTo(vidsettingsMod);
    
    var vidmode11 = $("<input type='radio' id='vidmode11' name='vpMod2' style='display:none;' checked value='1'/>");
    vidmode11.appendTo(vidplaylistMode);
    var vidlabel11 = $("<label for='vidmode11'>Forward</label>");
    vidlabel11.css({
      "background": "linear-gradient(to right, green, lime, green)",
      "border": "4px inset lime",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    vidlabel11.appendTo(vidplaylistMode);
    
    var vidmode12 = $("<input type='radio' id='vidmode12' name='vpMod2' style='display:none;' value='2'/>");
    vidmode12.appendTo(vidplaylistMode);
    var vidlabel12 = $("<label for='vidmode12'>Reverse</label>");
    vidlabel12.css({
      "background": "#002500",
      "border": "4px outset #002500",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    vidlabel12.appendTo(vidplaylistMode);
    
    var vidmode13 = $("<input type='radio' id='vidmode13' name='vpMod2' style='display:none;' value='3'/>");
    vidmode13.appendTo(vidplaylistMode);
    var vidlabel13 = $("<label for='vidmode13'>Random</label>");
    vidlabel13.css({
      "background": "#002500",
      "border": "4px outset #002500",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    vidlabel13.appendTo(vidplaylistMode);
    
    vidmode11.on("change", function() {
      var plMode11 = $(this);
      
      if (plMode11.is(":checked")) {
        vidlabel11.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        vidlabel12.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        vidlabel13.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    vidmode12.on("change", function() {
      var plMode12 = $(this);
      
      if (plMode12.is(":checked")) {
        vidlabel12.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        vidlabel11.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        vidlabel13.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    vidmode13.on("change", function() {
      var plMode13 = $(this);
      
      if (plMode13.is(":checked")) {
        vidlabel13.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        vidlabel11.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        vidlabel12.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    var vidfxHead = $("<div/>");
    vidfxHead.css({
      "width": "100%",
      "height": "40px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center"
    }).text("FX-Settings & Videoeffect-Rotation");
    
    vidfxHead.appendTo(vidsettingsMod);
    
    var vidfxArea = $("<div/>");
    vidfxArea.css({
      "width": "100%",
      "height": "60px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "16px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidfxArea.appendTo(vidsettingsMod);
    
    var vidfxTxt2 = $("<div/>");
    vidfxTxt2.css({
      "width": "16%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "right",
      "margin-left": "6px",
      "margin-right": "6px",
      "margin-top": "16px"
    }).text("FX-Volume: ");
    
    vidfxTxt2.appendTo(vidfxArea);
    
    var vidfxVa = $("<div/>");
    vidfxVa.css({
      "width": "12%",
      "height": "28px",
      "text-align": "left",
      "margin-top": "18px",
      "margin-right": "12px"
    });
    
    vidfxVa.appendTo(vidfxArea);
    
    var vidfxVolume = $("<input id='vidfxVolume' type='range' value=1 max=1 min=0 step=0.01 class='slider'/>");
    vidfxVolume.css({
      "width": "150px",
      "height": "15px"
    });
    
    vidfxVolume.appendTo(vidfxVa);
    
    var vidfxTxt3 = $("<div/>");
    vidfxTxt3.css({
      "width": "15%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "right",
      "margin-left": "6px",
      "margin-right": "6px",
      "margin-top": "16px"
    }).text("FX-Pitch: ");
    
    vidfxTxt3.appendTo(vidfxArea);
    
    var vidfxpt = $("<div/>");
    vidfxpt.css({
      "width": "15%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "left",
      "margin-top": "18px"
    });
    
    vidfxpt.appendTo(vidfxArea);
    
    var vidfxPitch = $("<input id='vidfxPitch' type='range' value=1 max=4 min=0.25 step=0.01 class='slider'/>");
    vidfxPitch.css({
      "width": "150px",
      "height": "15px",
      "margin-right": "12px"
    });
    
    vidfxPitch.appendTo(vidfxpt);
    
    var vidfxPlayer = $("<audio id='vidfxPlayer'/>");
    vidfxPlayer.css({
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "display": "none"
    }).prop("preservesPitch",false).attr("src", vidconfigs.fxPath+""+vidconfigs.fxSrc);
    
    vidfxPlayer.appendTo(vidmixelement);
    
    var vidfxVolVal = $("<input id='vidfxVolVal' type='text'/>");
    vidfxVolVal.css({
      "width": "60px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px",
      "margin-bottom": "12px"
    });
    
    vidfxVolVal.appendTo(vidfxTxt2);
    
    var vidfxPitchVal = $("<input id='vidfxPitchVal' type='text'/>");
    vidfxPitchVal.css({
      "width": "60px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px",
      "margin-bottom": "12px"
    });
    
    vidfxPitchVal.appendTo(vidfxTxt3);
    
    var vidfxTxt1 = $("<div/>");
    vidfxTxt1.css({
      "width": "25%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "right",
      "margin-left": "6px",
      "margin-right": "6px",
      "padding-top": "12px"
    }).text("Effect-Rotation: ");
    
    vidfxTxt1.appendTo(vidfxArea);
    
    var vidrotlevel = $("<input id='vidrotlevel' type='number'/>");
    vidrotlevel.css({
      "width": "100px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px"
    }).attr("min",1).attr("value",1);
    vidrotlevel.appendTo(vidfxTxt1);
    
    var vidfxtimeHead = $("<div/>");
    vidfxtimeHead.css({
      "width": "100%",
      "height": "40px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center"
    }).text("Background-Times");
    
    vidfxtimeHead.appendTo(vidsettingsMod);
    
    var vidfxtimeArea = $("<div/>");
    vidfxtimeArea.css({
      "width": "100%",
      "height": "40px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "16px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidfxtimeArea.appendTo(vidsettingsMod);
    
    var vidfxtimeTxt1 = $("<div/>");
  	vidfxtimeTxt1.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time1:");
  
  	vidfxtimeTxt1.appendTo(vidfxtimeArea);
    
    var vidfxtime1 = $("<input id='vidfxtime1' type='number'/>");
  	vidfxtime1.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime1.appendTo(vidfxtimeArea);
    
    var vidfxtimeTxt2 = $("<div/>");
  	vidfxtimeTxt2.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time2:");
  
  	vidfxtimeTxt2.appendTo(vidfxtimeArea);
    
    var vidfxtime2 = $("<input id='vidfxtime2' type='number'/>");
  	vidfxtime2.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime2.appendTo(vidfxtimeArea);
    
    var vidfxtimeTxt3 = $("<div/>");
  	vidfxtimeTxt3.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time3:");
  
  	vidfxtimeTxt3.appendTo(vidfxtimeArea);
    
    var vidfxtime3 = $("<input id='vidfxtime2' type='number'/>");
  	vidfxtime3.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime3.appendTo(vidfxtimeArea);
    
    var vidfxtimeArea2 = $("<div/>");
    vidfxtimeArea2.css({
      "width": "100%",
      "height": "40px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "16px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidfxtimeArea2.appendTo(vidsettingsMod);
    
    var vidfxtimeTxt4 = $("<div/>");
  	vidfxtimeTxt4.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time4:");
  
  	vidfxtimeTxt4.appendTo(vidfxtimeArea2);
    
    var vidfxtime4 = $("<input id='vidfxtime4' type='number'/>");
  	vidfxtime4.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime4.appendTo(vidfxtimeArea2);
    
    var vidfxtimeTxt5 = $("<div/>");
  	vidfxtimeTxt5.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time5:");
  
  	vidfxtimeTxt5.appendTo(vidfxtimeArea2);
    
    var vidfxtime5 = $("<input id='vidfxtime5' type='number'/>");
  	vidfxtime5.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime5.appendTo(vidfxtimeArea2);
    
    var vidfxtimeTxt6 = $("<div/>");
  	vidfxtimeTxt6.css({
    "width": "240px",
    "height": "40px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  	}).text("FX-Time6:");
  
  	vidfxtimeTxt6.appendTo(vidfxtimeArea2);
    
    var vidfxtime6 = $("<input id='vidfxtime4' type='number'/>");
  	vidfxtime6.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  	}).attr({
    "max": $("#videoplayer"+vidconfigs.playerID).prop("duration"),
    "min": 0,
    "value": 0,
    "step": 0.1
  	});
  
  	vidfxtime6.appendTo(vidfxtimeArea2);
    
    var miniPlayer = $("<video id='miniPlayer"+vidconfigs.playerID+"'/>");
 	miniPlayer.attr("src",vidconfigs.path +""+ vidconfigs.src + "" + vidconfigs.ext);
  	miniPlayer.css({
    "width": "240px",
    "height": "135px",
    "background": "rgba(15, 15, 15, 0.8)",
    "position": "absolute",
    "z-index": "1000",
    "left": "100",
    "top": "10",
    "display": "none"
  	});
    
  	miniPlayer.appendTo(this);
    
    var vidprevTime = $("<div/>");
  	vidprevTime.css({
    "width": "150px",
    "height": "20px",
    "background": "rgba(15, 15, 15, 0.9)",
    "font-size": "15px",
    "font-weight": "bold",
    "color": "white",
    "border-radius": "10px",
    "border": "4px solid white",
    "text-align": "center",
    "position": "absolute",
    "z-index": "1000",
    "left": "100",
    "top": "10",
    "display": "none"
  	});
    
  	vidprevTime.text("0:00/0:00");
  	vidprevTime.appendTo(vidmixelement);
    
    function setvidTime() {
      var total = $("#videoplayer"+vidconfigs.playerID).prop("duration");
      var timeStamp = $("#videoplayer"+vidconfigs.playerID).prop("currentTime");
      var deltaTime = total - timeStamp;
    
      var vHour = parseInt(timeStamp/3600);
      var vMin = parseInt(timeStamp/60 % 60);
      var vSec = parseInt(timeStamp % 60);
      var rHour = parseInt(deltaTime/3600);
      var rMin = parseInt(deltaTime/60 % 60);
      var rSec = parseInt(deltaTime % 60);
      vMin = (vMin < 10 ? "0"+vMin : vMin);
      vSec = (vSec < 10 ? "0"+vSec : vSec);
      rMin = (rMin < 10 ? "0"+rMin : rMin);
      rSec = (rSec < 10 ? "0"+rSec : rSec);
   
      if (total > 0) {
        $("#playtime"+vidconfigs.playerID).html(vHour + ":" + vMin + ":" + vSec + " / " + rHour + ":" + rMin + ":" + rSec);
      }
    }
    
    function setvidProgress() {
      var total = $("#videoplayer"+vidconfigs.playerID).prop("duration");
      var timeStamp = $("#videoplayer"+vidconfigs.playerID).prop("currentTime");
      var progress = timeStamp/total*100;
      var deltaTime = total - timeStamp;
    
      if (total > 0) {
        $("#progtime"+vidconfigs.playerID).css("width",progress+"%");
        if (deltaTime < 60) {
          $("#progtime"+vidconfigs.playerID).css("background","red");
        } else {
          $("#progtime"+vidconfigs.playerID).css("background","lime");
        }
      }
    }
    
    function moveProgress(e) {
      var barSize = $("#searchtime"+vidconfigs.playerID).width();
      var total = $("#videoplayer"+vidconfigs.playerID).prop("duration");
      var barPos = e.offsetX;
      var videoPos = barPos/barSize*total;
    
      if (total > 0) {
        $("#videoplayer"+vidconfigs.playerID).prop("currentTime",videoPos);
      }
    }
    
    function showItems(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var minPlSize = $("#miniPlayer"+vidconfigs.playerID).width();
      var prevSize = vidprevTime.width();
      var barSize = $("#searchtime"+vidconfigs.playerID).width();
      var total = $("#videoplayer"+vidconfigs.playerID).prop("duration");
      var barPos = e.offsetX;
      var videoPos = barPos/barSize*total;
      var vidDelta = total - videoPos;
    
      var minPlPos = xPos - minPlSize/2;
      var prevPos = xPos - prevSize/2;
      var minVertPos = yPos - 200;
      var prevVertPos = yPos - 60;
    
      var forwPrevHour = parseInt(videoPos/3600);
      var forwPrevMin = parseInt(videoPos/60 %60);
      var forwPrevSec = parseInt(videoPos % 60);
    
      var rePrevHour = parseInt(vidDelta/3600);
      var rePrevMin = parseInt(vidDelta/60 %60);
      var rePrevSec = parseInt(vidDelta % 60);
    
      forwPrevMin = (forwPrevMin < 10 ? "0"+forwPrevMin : forwPrevMin);
      forwPrevSec = (forwPrevSec < 10 ? "0"+forwPrevSec : forwPrevSec);
      rePrevMin = (rePrevMin < 10 ? "0"+rePrevMin : rePrevMin);
      rePrevSec = (rePrevSec < 10 ? "0"+rePrevSec : rePrevSec);
    
      if (total > 0) {
        vidprevTime.html(forwPrevHour + ":" + forwPrevMin + ":" + forwPrevSec + " / " + rePrevHour + ":" + rePrevMin + ":" + rePrevSec);
        $("#miniPlayer"+vidconfigs.playerID).prop("currentTime",videoPos);
      } else {
        vidprevTime.html("No Video Load!");
      }
    
      $("#progtime"+vidconfigs.playerID).css({"height":"12px", "margin-top":"4px"});
      $("#miniPlayer"+vidconfigs.playerID).animate({left: minPlPos+"px", top: minVertPos+"px"},10).show();
      vidprevTime.animate({left: prevPos+"px", top: prevVertPos+"px"},10).show();
    }
    
    var vidpinout = false;
    
    function setvidSlomo() {
      var slStart = vidslomoStart.val();
      var slEnd = vidslomoEnd.val();
      var slSpeed = parseFloat(vidslomoSpeed.val());
      
      if (vidplayerNumber.val() === "player1") {
        if ($("#videoplayer1").prop("currentTime") > slStart && $("#videoplayer1").prop("currentTime") < slEnd) {
        $("#videoplayer1").prop("playbackRate", slSpeed);
        vidfxPlayer.prop("playbackRate", slSpeed);
      	} else {
        $("#videoplayer1").prop("playbackRate", $("#vidpitchRange1").val());
        vidfxPlayer.prop("playbackRate", vidfxPitch.val());
      	}
      } else if (vidplayerNumber.val() === "player2") {
        if ($("#videoplayer2").prop("currentTime") > slStart && $("#videoplayer2").prop("currentTime") < slEnd) {
        $("#videoplayer2").prop("playbackRate", slSpeed);
        vidfxPlayer.prop("playbackRate", slSpeed);
      	} else {
        $("#videoplayer2").prop("playbackRate", $("#vidpitchRange1").val());
        vidfxPlayer.prop("playbackRate", vidfxPitch.val());
      	}
      }
    }
    
    $("#videoplayer"+vidconfigs.playerID).on("timeupdate", function() {
      setvidTime();
      setvidProgress();
      if (!vidpinout) {
        setvidSlomo();
      }
    });
    
    function setvidFxTimes() {
      if (vidplayerNumber.val() === "player1") {
        vidfxtime1.val(Math.round($("#videoplayer1").prop("currentTime")*10)/10);
        vidfxtime2.val(parseFloat(vidfxtime1.val()) + 15);
        vidfxtime3.val(parseFloat(vidfxtime2.val()) + 15);
        vidfxtime4.val(parseFloat(vidfxtime3.val()) + 15);
        vidfxtime5.val(parseFloat(vidfxtime4.val()) + 15);
        vidfxtime6.val(parseFloat(vidfxtime5.val()) + 15);
      } else if (vidplayerNumber.val() === "player2") {
        vidfxtime1.val(Math.round($("#videoplayer2").prop("currentTime")*10)/10);
        vidfxtime2.val(parseFloat(vidfxtime1.val()) + 15);
        vidfxtime3.val(parseFloat(vidfxtime2.val()) + 15);
        vidfxtime4.val(parseFloat(vidfxtime3.val()) + 15);
        vidfxtime5.val(parseFloat(vidfxtime4.val()) + 15);
        vidfxtime6.val(parseFloat(vidfxtime5.val()) + 15);
      }
    }
    
    vidfxtime1.on("focus", setvidFxTimes);
    
    var vidbgtimer1, vidbgtimer2, vidbgtimer3, vidbgtimer4, vidbgtimer5, vidbgtimer6;
    
    function vidplayFxTimes() {
      if (vidplayerNumber.val() === "player1") {
        vidbgtimer1 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime1.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
        
        vidbgtimer2 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime2.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
        
        vidbgtimer3 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime3.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
        
        vidbgtimer4 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime4.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
        
        vidbgtimer5 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime5.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
        
        vidbgtimer6 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime6.val() - $("#videoplayer1").prop("currentTime"))/$("#videoplayer1").prop("playbackRate"))*1000);
      } else if (vidplayerNumber.val() === "player2") {
        vidbgtimer1 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime1.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
        
        vidbgtimer2 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime2.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
        
        vidbgtimer3 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime3.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
        
        vidbgtimer4 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime4.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
        
        vidbgtimer5 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime5.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
        
        vidbgtimer6 = setTimeout(function() {
          vidfxPlayer.trigger("play");
        }, ((vidfxtime6.val() - $("#videoplayer2").prop("currentTime"))/$("#videoplayer2").prop("playbackRate"))*1000);
      }
    }
    
    function vidstopFxTimes() {
      clearTimeout(vidbgtimer1);
      clearTimeout(vidbgtimer2);
      clearTimeout(vidbgtimer3);
      clearTimeout(vidbgtimer4);
      clearTimeout(vidbgtimer5);
      clearTimeout(vidbgtimer6);
    }
    
    $("#videoplayer"+vidconfigs.playerID).on("play", function() {
      vidstopFxTimes();
      vidplayFxTimes();
      
      $("#vidplayBtn"+vidconfigs.playerID).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      }).html("||");
    });
    
    $("#videoplayer"+vidconfigs.playerID).on("pause", function() {
      vidstopFxTimes();
      $("#vidplayBtn"+vidconfigs.playerID).removeAttr("style").html("&#9654;");
    });
    
    vidslomoStart.on("focus", function() {
      $(this).val(Math.round($("#videoplayer"+vidconfigs.playerID).prop("currentTime")));
      vidslomoEnd.val(Math.round($("#videoplayer"+vidconfigs.playerID).prop("currentTime")) + 5);
    });
    
    $("#videoplayer"+vidconfigs.playerID).on("durationchange", function() {
      setvidTime();
    });
    
    $("#searchtime"+vidconfigs.playerID).on("click",moveProgress);
  	$("#searchtime"+vidconfigs.playerID).on("mouseenter", showItems);
  	$("#searchtime"+vidconfigs.playerID).on("mousemove", showItems);
    
    $("#searchtime"+vidconfigs.playerID).on("mouseleave", function() {
      $("#progtime"+vidconfigs.playerID).css({"height":"6px", "margin-top":"6px"});
      $("#miniPlayer"+vidconfigs.playerID).hide();
      vidprevTime.hide();
    });
    
    $("#searchtime"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).on("mousemove",moveProgress);
    });
  
    $("#searchtime"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).off("mousemove");
      $(this).on("mousemove", showItems);
    });
    
    vidfxPitch.on("change", function() {
      var fxpitchRate = vidfxPitch.val();
      vidfxPitchVal.val(fxpitchRate);
      vidfxPlayer.prop("playbackRate", fxpitchRate);
      savevidPitchPlayerBgp();
        });
    
    vidfxPitch.on("mousemove", function() {
      $(this).trigger("change");
        });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("contextmenu", function() {
      $(this).val(1);
      $(this).trigger("change");
      return false;
    });
    
    vidfxPitch.on("contextmenu", function() {
      $(this).val(1);
      $(this).trigger("change");
      return false;
    });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("change", function() {
      var pitchVal = $(this).val();
      $("#videoplayer"+vidconfigs.playerID).prop("playbackRate", pitchVal);
      vidinfoBox.text("Pitch: " + pitchVal);
      savevidPitchPlayer();
  	});

    $("#vidpitchRange"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).on("mousemove", function() {
        $(this).trigger("change");
      });
    });
  
    $("#vidpitchRange"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).off("mousemove").on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  		});
    });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("contextmenu", function() {
      $(this).val(1).trigger("change");
      return false;
    });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("mouseenter", function() {
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
      vidinfoBox.text("Pitch Player 1: " + Math.round(vplayRate*100)/100);
    });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
    
      $(this).trigger("change");
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show().text("Pitch Player 1: " + Math.round(vplayRate*100)/100);
    });
    
    $("#vidpitchRange"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidVolumer"+vidconfigs.playerID).on("change", function() {
      var vvolVal = $(this).val();
      $("#videoplayer"+vidconfigs.playerID).prop("volume", vvolVal);
      vidinfoBox.text("Volume: " + vvolVal*100 + "%");
      savevidVolPlayer();
  	});

    $("#vidVolumer"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).on("mousemove", function() {
        $(this).trigger("change");
      });
    });
  
    $("#vidVolumer"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).off("mousemove").on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  		});
    });
    
    $("#vidVolumer"+vidconfigs.playerID).on("mouseenter", function() {
      var vVolume = $("#videoplayer"+vidconfigs.playerID).prop("volume");
      vidinfoBox.text("Volume Player 1: " + Math.round(vVolume*100)/100);
    });
    
    $("#vidVolumer"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
      var vVolume = $("#videoplayer"+vidconfigs.playerID).prop("volume");
    
      $(this).trigger("change");
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show().text("Volume Player 1: " + Math.round(vVolume*100)/100);
    });
    
    $("#vidVolumer"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    vidfxVolume.on("change", function() {
      var fxVolumeVal = $(this).val();
      vidfxVolVal.val(fxVolumeVal);
      vidfxPlayer.prop("volume", fxVolumeVal);
      savevidVolBgpPlayer();
        });
    
    vidfxVolume.on("mousemove", function() {
      $(this).trigger("change");
        });
    
    var vidratioMenuMod = $("<div/>");
    vidratioMenuMod.css({
      "width": "100px",
      "height": "140px",
      "overflow": "auto",
      "padding": "6px",
      "background": "rgba(15, 15, 15, 0.8)",
      "border": "2px outset rgba(255, 255, 255, 0.6)",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 600,
      "display": "none"
    }).appendTo(vidmixelement);
  
    var vidratioList = $("<ul id='vidratioList'></ul>");
    vidratioList.css({
      "padding": "1px",
      "margin": "1px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left"
    }).appendTo(vidratioMenuMod);
  
    var vidratioVals = $("<li name='1' style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>4:3</li><li name='2' style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>4:3 WS</li><li name='3' style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>3:2</li><li name='4' style='padding-top:6px; padding-bottom:6px; cursor:pointer;'>16:9 WS</li>");
    vidratioVals.appendTo(vidratioList);
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Select Screen");
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("contextmenu", function() {
      if (vidplayerNumber.val() === "player1") {
        vidratioSelect.val(0).trigger("change");
      } else if (vidplayerNumber.val() === "player2") {
        vidratioSelect2.val(0).trigger("change");
      }
      return false;
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("click", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      
      vidratioMenuMod.animate({left:xPos - vidratioMenuMod.width()/2+"px", top:yPos - $("#vidratioBtn"+vidconfigs.playerID).height() - vidratioMenuMod.height() - 20},1).show();
    });
    
    vidratioList.on("mouseenter", function() {
      $("#vidratioList li").on("mouseenter", function() {
        $(this).css("background", "#00b9ff");
      });
      
      $("#vidratioList li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
      
      $("#vidratioList li").on("click", function() {
        if (vidplayerNumber.val() === "player1") {
          vidratioSelect.val($(this).attr("name")).trigger("change");
        } else if (vidplayerNumber.val() === "player2") {
          vidratioSelect2.val($(this).attr("name")).trigger("change");
        }
        vidratioMenuMod.hide();
      });
      
      $("#vidratioList li").on("contextmenu", function() {
        $(this).click();
        return false;
      });
    });
    
    var closeRatio;
    
    vidratioMenuMod.on("mouseleave", function() {
      closeRatio = setTimeout(function() {
        vidratioMenuMod.hide();
      },1500);
    });
    
    vidratioMenuMod.on("mouseenter", function() {
      clearTimeout(closeRatio);
    });
    
    vidratioList.on("mouseleave", function() {
      $("#vidratioList li").off("mouseenter").off("mouseleave").off("click").off("contextmenu");
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("click", function() {
    var vidsymbol = $("#vidtoggleVolume"+vidconfigs.playerID+" img").attr("src");
    
    if (vidsymbol === "Symbole/volume.png") {
      $("#vidVolumer"+vidconfigs.playerID).val(0).trigger("change");
      $("#vidtoggleVolume"+vidconfigs.playerID+" img").attr("src","Symbole/mute.png");
    } else {
      $("#vidVolumer"+vidconfigs.playerID).val(1).trigger("change");
      $("#vidtoggleVolume"+vidconfigs.playerID+" img").attr("src","Symbole/volume.png");
    }
  	});
    
    vtoolbarArea.on("mouseenter", function() {
	clearTimeout(showTool);
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    var vidpitchMenuMod = $("<div/>");
    vidpitchMenuMod.css({
      "width": "90px",
      "height": "200px",
      "overflow": "auto",
      "padding": "6px",
      "background": "rgba(15, 15, 15, 0.8)",
      "border": "2px outset rgba(255, 255, 255, 0.6)",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 600,
      "display": "none"
    }).appendTo(vidmixelement);
    
    var vidpitchList = $("<ul id='vidpitchList'></ul>");
    vidpitchList.css({
      "padding": "1px",
      "margin": "1px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white"
    }).appendTo(vidpitchMenuMod);
    
    var vidpitchVals = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.25</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.50</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.75</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.00</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.25</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.50</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.75</li><li style='padding-top:6px; padding-bottom:6px; cursor:pointer;'>2.00</li>");
    vidpitchVals.appendTo(vidpitchList);
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      
      vidpitchMenuMod.animate({left:xPos - vidpitchMenuMod.width()/2+"px", top:yPos - $("#vidpitchupBtn"+vidconfigs.playerID).height() - vidpitchMenuMod.height() - 20},1).show();
      return false;
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      
      vidpitchMenuMod.animate({left:xPos - vidpitchMenuMod.width()/2+"px", top:yPos - $("#vidpitchdownBtn"+vidconfigs.playerID).height() - vidpitchMenuMod.height() - 20},1).show();
      return false;
    });
    
    var closePitch;
    
    vidpitchMenuMod.on("mouseleave", function() {
      closePitch = setTimeout(function() {
        vidpitchMenuMod.hide();
      },1500);
    });
    
    vidpitchMenuMod.on("mouseenter", function() {
      clearTimeout(closePitch);
    });
    
    vidpitchList.on("mouseenter", function() {
      $("#vidpitchList li").on("mouseenter", function() {
        $(this).css("background", "#00b9ff");
      });
      
      $("#vidpitchList li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
      
      $("#vidpitchList li").on("click", function() {
        $("#vidpitchRange"+vidconfigs.playerID).val($(this).text()).trigger("change");
        vidpitchMenuMod.hide();
      });
      
      $("#vidpitchList li").on("contextmenu", function() {
        $(this).click();
        return false;
      });
    });
    
    vidpitchList.on("mouseleave", function() {
      $("#vidpitchList li").off("mouseenter").off("mouseleave").off("click").off("contextmenu");
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Pitch Up +0.05");
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Pitch Up +0.05");
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidpitchupBtn"+vidconfigs.playerID).on("click", function() {
      $("#vidpitchRange"+vidconfigs.playerID).val(parseFloat($("#vidpitchRange"+vidconfigs.playerID).val()) + 0.05).trigger("change");
    });
    
    $("#vidpitchdownBtn"+vidconfigs.playerID).on("click", function() {
      $("#vidpitchRange"+vidconfigs.playerID).val($("#vidpitchRange"+vidconfigs.playerID).val() - 0.05).trigger("change");
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Volume On/Off");
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidtoggleVolume"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Select Screen");
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidratioBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidfxBtn"+vidconfigs.playerID).on("click", function() {
      vidfxPlayer.trigger("play");
      vidstopFxTimes();
      vidplayFxTimes();
    });
    
    vidfxPlayer.on("playing", function() {
      $("#vidfxBtn"+vidconfigs.playerID).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    vidfxPlayer.on("pause", function() {
      $("#vidfxBtn"+vidconfigs.playerID).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("vidsettingBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("VideoSettings");
    });
    
    $("vidsettingBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("vidsettingBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidsettingBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "red"
      });
    });
    
    $("#vidsettingBtn"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "#290000"
      });
    });
    
    $("#vidrecBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "red"
      });
    });
    
    $("#vidrecBtn"+vidconfigs.playerID).on("mouseup touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "#290000"
      });
    });
    
    $("#vidrecBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Record");
    });
    
    $("#vidrecBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidrecBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidfullScreen"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Fullscreen");
    });
    
    $("#vidfullScreen"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
    $("#vidfullScreen"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidplayBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Play/Pause");
    });
    
    $("#vidplayBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidplayBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidstopBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Stop");
    });
    
    $("#vidstopBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidstopBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidrewBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Rewind "+vidconfigs.skiptime+"s");
    });
    
    $("#vidrewBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidrewBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidforwBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Forward "+vidconfigs.skiptime+"s");
    });
    
    $("#vidforwBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidforwBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidskiprewBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Previous Video");
    });
    
    $("#vidskiprewBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidskiprewBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidskipforwBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Next Video");
    });
    
    $("#vidskipforwBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidskipforwBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidrevBtn"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Play Reverse");
    });
    
    $("#vidrevBtn"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidrevBtn"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidchgPlayer"+vidconfigs.playerID).on("mouseenter", function() {
      vidinfoBox.text("Change To Next Player");
    });
    
    $("#vidchgPlayer"+vidconfigs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = vidinfoBox.width();
      var infoPos = infoWidth/2;
    
      vidinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#vidchgPlayer"+vidconfigs.playerID).on("mouseleave", function() {
      vidinfoBox.hide();
    });
    
    $("#vidplayBtn"+vidconfigs.playerID).on("click", function() {
      var fullTime = $("#videoplayer"+vidconfigs.playerID).prop("duration");
      var status = $(this).attr("style");
      
      if (fullTime > 0) {
        if (!status) {
          $("#videoplayer"+vidconfigs.playerID).trigger("play");
          $(this).css({
            "background": "linear-gradient(to right, navy, skyblue, navy)",
            "border-style": "inset",
            "border-color": "skyblue"
          });
        } else {
          $("#videoplayer"+vidconfigs.playerID).trigger("pause");
          $(this).removeAttr("style");
        }
      }
    });
    
    $("#vidstopBtn"+vidconfigs.playerID).on("click", function() {
      $("#videoplayer"+vidconfigs.playerID).trigger("pause");
      $("#videoplayer"+vidconfigs.playerID).prop("currentTime",0);
      $("#vidplayBtn"+vidconfigs.playerID).html("&#9654;");
  	});
    
    $("#vidrewBtn"+vidconfigs.playerID).on("click", function() {
      $("#videoplayer"+vidconfigs.playerID).prop("currentTime", $("#videoplayer"+vidconfigs.playerID).prop("currentTime") - vidconfigs.skiptime);
    });
    
    $("#vidforwBtn"+vidconfigs.playerID).on("click", function() {
      $("#videoplayer"+vidconfigs.playerID).prop("currentTime", $("#videoplayer"+vidconfigs.playerID).prop("currentTime") + vidconfigs.skiptime);
    });
    
    var vidpitchin, vidpitchout;
    
    function vidpitchIn() {
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
      $("#videoplayer"+vidconfigs.playerID).prop("playbackRate", vplayRate + 0.01);
      
      if (vplayRate > 1) {
        clearInterval(vidpitchin);
        $("#vidplayBtn"+vidconfigs.playerID).removeAttr("disabled").css({
          "background": "linear-gradient(to right, navy, skyblue, navy)",
          "border-color": "skyblue"
        });
        vidpinout = false;
      }
    }
    
    function vidpitchOut() {
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
      $("#videoplayer"+vidconfigs.playerID).prop("playbackRate", vplayRate - 0.01);
      $("#vidplayBtn"+vidconfigs.playerID).attr("disabled", "disabled").css({
          "background": "linear-gradient(to right, #363636, yellow, #363636)",
          "border-color": "yellow"
        });
      
      if (vplayRate < 0.26) {
        clearInterval(vidpitchout);
        $("#vidplayBtn"+vidconfigs.playerID).removeAttr("disabled").removeAttr("style");
        $("#videoplayer"+vidconfigs.playerID).trigger("pause");
        vidpinout = false;
      }
    }
    
    function startvidPitchIn() {
      $("#videoplayer"+vidconfigs.playerID).trigger("play").prop("playbackRate", 0.25);
      $("#vidplayBtn"+vidconfigs.playerID).attr("disabled", "disabled").css({
          "background": "linear-gradient(to right, #363636, yellow, #363636)",
          "border-color": "yellow"
        });
      vidpinout = true;
	  vidpitchin = setInterval(vidpitchIn, vidconfigs.pitchTime);
    }
    
    function startvidPitchOut() {
      $("#vidplayBtn"+vidconfigs.playerID).attr("disabled", "disabled");
      vidpinout = true;
	  vidpitchout = setInterval(vidpitchOut, vidconfigs.pitchTime);
    }
    
    $("#vidplayBtn"+vidconfigs.playerID).on("contextmenu", function() {
      var status = $(this).attr("style");
      
      if (!vidpinout) {
        if (!status) {
        startvidPitchIn();
      	} else {
        startvidPitchOut();
      	}
      return false;
      }
    });
    
    var vidreverser;
    
    function vidplayReverse() {
      var timepos = $("#videoplayer"+vidconfigs.playerID).prop("currentTime");
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
      $("#videoplayer"+vidconfigs.playerID).prop("currentTime", timepos - 0.125 * vplayRate);
  	}
    
    function vidsetReverse() {
      var vplayRate = $("#videoplayer"+vidconfigs.playerID).prop("playbackRate");
      vidreverser = setInterval(function() {
      vidplayReverse();
      }, 90 / vplayRate);
  	}
    
    $("#vidrevBtn"+vidconfigs.playerID).on("click", function() {
      var revStatus = $(this).attr("style");
      
      if (!revStatus) {
        vidsetReverse();
        $(this).css({
          "background": "linear-gradient(to right, #363600, yellow, #363600)",
          "border-style": "inset",
          "border-color": "yellow"
        });
      } else {
        clearInterval(vidreverser);
        $(this).removeAttr("style");
      }
    });
    
    $("#vidstopBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "red"
      });
    });
    
    $("#vidstopBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "#290000"
      });
    });
    
    $("#vidforwBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    $("#vidforwBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    $("#vidrewBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    $("#vidrewBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    $("#vidskipforwBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#vidskipforwBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("#vidskiprewBtn"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#vidskiprewBtn"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("#vidchgPlayer"+vidconfigs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    $("#vidchgPlayer"+vidconfigs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    function setvidAreaSize() {
      if (window.screen.availWidth < 1600) {
        vidsettingsMod.css({
          "width": "80%"
        });
        
        vidsettingsHead.css({
          "height": "30px",
    	  "font-size": "20px"
        });
        
        vidsettingsArea.css({
          "height": "35px",
    	  "font-size": "15px",
          "padding": "10px"
        });
        
        vidsettTxt1.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidratioSelect.css({
          "width": "120px",
          "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt2.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidWidth.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt3.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidHeight.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettingsArea2.css({
          "height": "35px",
    	  "font-size": "15px",
          "padding": "10px"
        });
        
        vidsettTxt11.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidratioSelect2.css({
          "width": "120px",
          "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt12.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidWidth2.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt13.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidHeight2.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettingsArea3.css({
          "height": "35px",
    	  "font-size": "15px",
          "padding": "10px"
        });
        
        vidsettTxt4.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidslomoSpeed.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt5.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidslomoStart.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidsettTxt6.css({
          "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px"
        });
        
        vidslomoEnd.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidplaylistHead2.css({
          "height": "30px",
    	  "font-size": "20px"
        });
        
        vidplaylistMode.css({
          "height": "60px",
    	  "font-size": "20px",
          "padding": "10px"
        });
        
        vidlabel11.css({
          "width": "280px",
      	  "height": "25px",
          "font-size": "20px",
          "margin-left": "10px"
        });
        
        vidlabel12.css({
          "width": "280px",
      	  "height": "25px",
          "font-size": "20px",
          "margin-left": "10px"
        });
        
        vidlabel13.css({
          "width": "280px",
      	  "height": "25px",
          "font-size": "20px",
          "margin-left": "10px"
        });
        
        vidfxHead.css({
          "height": "30px",
    	  "font-size": "20px"
        });
        
        vidfxArea.css({
          "height": "35px",
    	  "font-size": "15px",
          "padding": "10px"
        });
        
        vidfxTxt2.css({
          "height": "20px",
          "font-size": "14px",
          "margin-left": "4px",
      	  "margin-right": "4px",
      	  "margin-top": "10px"
        });
        
        vidfxVa.css({
          "height": "20px",
      	  "margin-right": "8px",
      	  "margin-top": "12px"
        });
        
        vidfxVolume.css({
          "width": "100px",
      	  "height": "12px"
        });
        
        vidfxTxt3.css({
          "height": "20px",
          "font-size": "14px",
          "margin-left": "4px",
      	  "margin-right": "4px",
      	  "margin-top": "10px"
        });
        
        vidfxpt.css({
          "height": "20px",
      	  "margin-right": "8px",
      	  "margin-top": "12px"
        });
        
        vidfxPitch.css({
          "width": "100px",
      	  "height": "12px"
        });
        
        vidfxTxt1.css({
          "height": "20px",
          "font-size": "14px",
          "margin-left": "4px",
      	  "margin-right": "4px",
      	  "margin-top": "10px"
        });
        
        vidfxtimeHead.css({
          "height": "30px",
      	  "font-size": "16px",
        });
        
        vidfxtimeArea.css({
          "height": "30px",
      	  "font-size": "16px",
        });
        
        vidfxtimeTxt1.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime1.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidfxtimeTxt2.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime2.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidfxtimeTxt3.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime3.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidfxtimeArea2.css({
          "height": "30px",
      	  "font-size": "16px",
        });
        
        vidfxtimeTxt4.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime4.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidfxtimeTxt5.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime5.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
        
        vidfxtimeTxt6.css({
    	  "width": "160px",
    	  "height": "30px",
    	  "font-size": "15px",
  		});
        
        vidfxtime6.css({
          "width": "120px",
    	  "height": "20px",
    	  "font-size": "12px"
        });
      }
    }
    
    setvidAreaSize();
    
    function setvidPitchareaSize() {
      if (vidmixelement.width() < 720) {
        $("#vidpitchRange"+vidconfigs.playerID).css("width", "50px");
        $("#vidVolumer"+vidconfigs.playerID).css("width", "50px");
      	pitchBox.css("width", "60px");
        volumeBox.css("width", "60px");
        $("#vidskipforwBtn"+vidconfigs.playerID).hide();
        $("#vidskiprewBtn"+vidconfigs.playerID).hide();
        $("#vidrecBtn"+vidconfigs.playerID).hide();
        $("#vidratioBtn"+vidconfigs.playerID).hide();
        $("#vidchgPlayer"+vidconfigs.playerID).hide();
      }
    }
    
    setvidPitchareaSize();
    
    function savevidVolBgpPlayer() {
      localStorage.setItem("vidvolbgpsave", vidfxVolume.val());
      loadvidVolBgpPlayer();
    }
    
    function loadvidVolBgpPlayer() {
      var vloadbgpVol = localStorage.getItem("vidvolbgpsave");
      vidfxVolume.val(vloadbgpVol);
      vidfxVolVal.val(vloadbgpVol);
    }
    
      try {
        if (!localStorage.getItem("vidvolbgpsave")) {
      	savevidVolBgpPlayer();
    	} else {
      	loadvidVolBgpPlayer();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function savevidPitchPlayerBgp() {
      localStorage.setItem("vidbgppitchsave", vidfxPitch.val());
      loadvidPitchPlayerBgp();
    }
    
    function loadvidPitchPlayerBgp() {
      var vloadBgpPitch = localStorage.getItem("vidbgppitchsave");
      vidfxPitch.val(vloadBgpPitch);
      vidfxPitchVal.val(vloadBgpPitch);
    }
      
      try {
        if (!localStorage.getItem("vidbgppitchsave")) {
      savevidPitchPlayerBgp();
    } else {
      loadvidPitchPlayerBgp();
    }
      } catch(error) {
      console.log(error);
    }
    
    function savevidPitchPlayer() {
      localStorage.setItem("vidpitchsave"+vidconfigs.playerID, $("#vidpitchRange"+vidconfigs.playerID).val());
      loadvidPitchPlayer();
    	}
    
      function loadvidPitchPlayer() {
      var loadPitch = localStorage.getItem("vidpitchsave"+vidconfigs.playerID);
      $("#vidpitchRange"+vidconfigs.playerID).val(loadPitch);
      $("#videoplayer"+vidconfigs.playerID).prop("playbackRate", loadPitch);
    	}
    
      try {
        if (!localStorage.getItem("vidpitchsave")) {
      	savevidPitchPlayer();
    	} else {
      	loadvidPitchPlayer();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function savevidVolPlayer() {
      localStorage.setItem("vidvolsave"+vidconfigs.playerID, $("#vidVolumer"+vidconfigs.playerID).val());
      loadvidVolPlayer();
    }
    
    function loadvidVolPlayer() {
      var loadVol = localStorage.getItem("vidvolsave"+vidconfigs.playerID);
      $("#vidVolumer"+vidconfigs.playerID).val(loadVol);
    }
    
      try {
        if (!localStorage.getItem("vidvolsave")) {
      	savevidVolPlayer();
    	} else {
      	loadvidVolPlayer();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function savevidRatioSelection() {
      localStorage.setItem("vidratsel", vidratioSelect.val());
      loadvidRatioSelection();
    	}
    
      function loadvidRatioSelection() {
      var vidratioVal = localStorage.getItem("vidratsel");
      vidratioSelect.val(vidratioVal);
    	}
    
      try {
        if (!localStorage.getItem("vidratsel")) {
      savevidRatioSelection();
    	} else {
      loadvidRatioSelection();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function savevidRatioSelection2() {
      localStorage.setItem("vidratsel2", vidratioSelect2.val());
      loadvidRatioSelection2();
    	}
    
      function loadvidRatioSelection2() {
      var vidratioVal2 = localStorage.getItem("vidratsel2");
      vidratioSelect2.val(vidratioVal2);
    	}
    
      try {
        if (!localStorage.getItem("vidratsel2")) {
      savevidRatioSelection2();
    	} else {
      loadvidRatioSelection2();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function loadvidPlaylistRadio() {
	  $("input[name='vpMod2']").each(function(index, element) {
	  if ($(this).val() == localStorage.getItem($(this).attr("name"))){
	  $(this).attr("checked","checked").trigger("change");
			}
       	});
	}

    $("input[name='vpMod2']").on("click", function(e) {
        $("input[name='vpMod2']:checked").each(function(index, element) {
            localStorage.setItem($(this).attr("name"),$(this).val());
        });
    });
    
      try {
        loadvidPlaylistRadio();
      } catch(error) {
      console.log(error);
    }
    
    function savevidVideoSize() {
      localStorage.setItem("vvidW", vidWidth.val());
      localStorage.setItem("vvidH", vidHeight.val());
      loadvidVideoSize();
    }
    
    function loadvidVideoSize() {
      var vratioWidth = localStorage.getItem("vvidW");
      var vratioHeight = localStorage.getItem("vvidH");
      vidWidth.val(vratioWidth);
      vidHeight.val(vratioHeight);
    }
    
      try {
        if (!localStorage.getItem("vvidW") && !localStorage.getItem("vvidH")) {
      	savevidVideoSize();
    	} else {
        loadvidVideoSize();
    	}
      } catch(error) {
      console.log(error);
    }
    
    function savevidVideoSize2() {
      localStorage.setItem("vvidW2", vidWidth2.val());
      localStorage.setItem("vvidH2", vidHeight2.val());
      loadvidVideoSize2();
    }
    
    function loadvidVideoSize2() {
      var vratioWidth2 = localStorage.getItem("vvidW2");
      var vratioHeight2 = localStorage.getItem("vvidH2");
      vidWidth2.val(vratioWidth2);
      vidHeight2.val(vratioHeight2);
    }
    
      try {
        if (!localStorage.getItem("vvidW2") && !localStorage.getItem("vvidH2")) {
      	savevidVideoSize2();
    	} else {
        loadvidVideoSize2();
    	}
      } catch(error) {
      console.log(error);
    }
    
    return vidmixelement;
  };
}(jQuery));

