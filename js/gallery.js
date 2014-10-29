
//"--------------http://stackoverflow.com/questions/1464843/jquery-dialog-button-variable------------" 

blog = {};
blog.center = blog.center || {};
blog.center.debugMode = false;

///*** *****************************
///*** 
///*** *****************************
blog.isFirstLoad = function(namesp, jsFile) {
    alert('in gallery blog.isFirstLoad');
    var isFirst = namesp.firstLoad === undefined;
    if(isFirst)
    namesp.firstLoad = false;
    if (!isFirst) {
        alert('in gallery blog.isFirstLoad isFirst=false');
        console.log(
            "Warning: Javascript file is included twice: " + 
                jsFile);
    }
    else
      alert('in gallery blog.isFirstLoad isFirst=true');
    return isFirst;
};
///*** *****************************
///*** 
///*** *****************************
function GetProjectId() {
    return 10;
}
///*** *****************************
///*** 
///*** *****************************
function ConfirmDialog() {
    var yesButtonName = "Yes";
    var noButtonName = "No";
    this.showMessage = function(message, callback, argument) {
        var $dialog = $('<div></div>')
                .html(message)
                .dialog({
            modal: true,
            closeOnEscape: true,
            buttons: [
                {
                    text: yesButtonName,
                    click: function() {
                        if (callback && typeof(callback) === "function") {
                            if (argument == 'undefined') {
                                callback();
                            } else {
                                callback(argument);
                            }
                        } else {
                            $(this).dialog("close");
                        }
                    }
                },
                {
                    text: noButtonName,
                    click: function() {
                        $(this).dialog("close");
                    }

                }
            ]
        });
        $dialog.dialog("open");
    };

    this.setYesButtonName = function(name) {
        yesButtonName = name;
        return this;
    };

    this.setNoButtonName = function(name) {
        noButtonName = name;
        return this;
    };
}

//** ***********************************************
//   Function loadActiveimagesToSlidShow
//   Param :Id
//   Desc:
//** ***********************************************
function loadActiveimagesToSlidShow(id) {//data to be sent to server
    console.log('loadActiveimagesToSlidShow  id:' + id);
    (jQuery).ajax({
        url: '/RPSlideshow/image.php',
        type: 'POST',
        async: false, // true/false virker
        cache: false,
        processData: true, // false virker ikke
        data: {id: id},
        datatype: 'text', // 'json',//    
        success: callbackLoadActiveimagesToSlidShow,
        error: function(xhr, status, error) {
            alert(error);
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            return false;
        },
    }).done(function(data) {
        if (console && console.log) {
            //  console.log("Sample of data:", data.slice(0, 100));
        }

        //Ajax post data to server
        //$.post('/RPSlideshow/aviveimage.php', post_data, function(data){  

    }).fail(function(err) {  //load any error data
        // $("#result").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
    });
}
;
//** ***********************************************
function callbackLoadActiveimagesToSlidShow(data) {
//alert("rspi   callbackLoadActiveimagesToSlidShow");
   console.log('callbackLoadActiveimagesToSlidShow ');
    (jQuery)('#camera_wrap_4').empty();
    
       
    (jQuery).each(jQuery.parseJSON(data), function(key, value) {//JSON.parse(data) 
     console.log('0000000000000000000000000000000000--->'+value.image+'<---------000000000000000000000000000000000000000000000');
     console.log('==0===>callbackLoadActiveimagesToSlidShow select image: ('+value.image+')  key:  ' + key
                + ' >mid:' + value.mid
                + ' >cid:' + value.cid
                + ' >path:' + value.path
                + ' >image:' + value.image+'\r'+'<br>'
                + ' >activ:' + value.active +'\r');
     console.log('==1=== camera info titel ==>callbackLoadActiveimagesToSlidShow'  +'\r'         
                + ' >titel :'       +           value.titel +'\r'
                + ' >font :'        +           value.titel_font +'\r'
                + ' >fontsize :'    +           value.titel_fontsize +'\r'
                + ' >fontweight :'  +           value.titel_fontweight +'\r'
                + ' >fontcolor :'   +           value.titel_fontcolor);   
     console.log('===2==camera info text =>callbackLoadActiveimagesToSlidShow'  +'\r'
                + ' >text text:'         + value.text + "<---info text--"+'\r'
                + ' >text type :'        + value.info_rolling_type +'\r'
                + ' >text font :'        + value.info_font+'\r'
                + ' >text fontsize :'    + value.info_fontsize+'\r'
                + ' >text fontweight :'  + value.info_fontweight+'\r'
                + ' >text font_color :'  + value.info_fontcolor
                + ' >text effect :'      + value.info_effect+'\r'
                + ' >text effecttime :'  + value.info_effecttime+'\r'
                + ' >text bgcolor :'     + value.info_bgcolor+'\r'
                + ' >text transparent :' + value.info_transparent
         );
                //camera caption
       console.log('==3===Caption =>callbackLoadActiveimagesToSlidShow'  +'\r'       
                + ' >caption Text :'+ value.rolling_text +'\r'
                + ' >caption type :'         + value.rolling_type +'\r'
                + ' >caption fontweight:'    + value.cap_fontweight+'\r'
                + ' >caption font :'         + value.cap_font+'\r'
                + ' >caption fontsize :'     + value.cap_fontsize+'\r'
                + ' >caption fontweight:'    + value.cap_fontweight+'\r'
                + ' >caption font_color:'    + value.cap_fontcolor+'\r'
                + ' >caption effect :'       + value.cap_effect+'\r'
                + ' >caption effecttime:'    + value.cap_effecttime+'\r'
                + ' >caption bgcolor :'      + value.cap_bgcolor+'\r'
                + ' >caption transparent:'   + value.cap_transparent  +'\r');
                //Camera text1 
        console.log('==4=== text1 ==>callbackLoadActiveimagesToSlidShow'  +'\r'         
                + ' >Text :'+ value.text1_text +'\r'
                + ' >text1_rolling_type :'   + value.text1_rolling_type +'\r'
                + ' >text1 fontweight:'      + value.text1_fontweight+'\r'
                + ' >text1 font :'           + value.text1_font+'\r'
                + ' >text1 fontsize :'       + value.text1_fontsize+'\r'
                + ' >text1 fontweight :'     + value.text1_fontweight+'\r'
                + ' >text1 font_color :'     + value.text1_fontcolor+'\r'
                + ' >text1 effect :'         + value.text1_effect+'\r'
                + ' >text1 effecttime :'     + value.text1_effecttime+'\r'
                + ' >text1 bgcolor :'        + value.text1_bgcolor+'\r'
                + ' >text1 transparent :'    + value.text1_transparent
                );
                   
 
        
//return;
        var captionType;
        if (value.rolling_type != null) {
            captionType = (value.rolling_type).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
       console.log('==================================>captionType:'+captionType);



/*
        if (value.rolling_type == null)
            return;
        if (value.path == null)
            return;*/
        // image: sea.jpg    bid: sea_id
        var str = (value.image).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        var n = str.indexOf(".");
        var image = str.substring(0, n);  //var datasrc="images/upload/bridge.jpg";
        var bid = str.substring(0, n) + "_id";
        /*
        var mySpan=(jQuery)('<span id="mySpanId" style="color:black;" >kkkkkkkkkkkkkkkkkkkk</span>');
        //mySpan.appendTo('#camera_wrap_4');
        //jQuery("#" + bid).append(mySpan);
          jQuery("#mySpanId").text('Do it again') ;
          jQuery("#mySpanId").html('Do it again') ;
          jQuery("#mySpanId").innerHTML='Ignore';
          mySpan.text('Ignore');
          mySpan.html('html');
          mySpan.innerHTML='Ignore';*/
      //  alert("--------->>>>>>>>>>>>"+ jQuery("#mySpanId").width());
      //  alert("--------->>>>>>>>>>>>"+ mySpan.width());
         
        //remove space
        var datasrc = (value.path).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                + (value.image).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        console.log('<div id= "' + bid + '" data-src="' + datasrc + '"  ></div>');
        var img = (jQuery)('<div id= "' + bid + '" data-src="' + datasrc + '"  ></div>'); //Equivalent: $(document.createElement('img'))
        console.log('main div id: ' + bid);
        img.appendTo('#camera_wrap_4');
        jQuery("#bid").css("width", "100px");//hashed
        //******************* Caption ********************
        captionText=value.rolling_text;
        //alert('captionText:'+captionText);
        if (captionText != null && (captionText.length > 0)) {
            var textDiv = '<div  class="camera_caption "' + captionType + '"> ' + value.rolling_text   + ' </div>';
            jQuery("#" + bid).append(textDiv);  //OK 
            //jQuery(".camera_caption").css("color", "red");
            jQuery(".camera_caption").css("font-size", (value.cap_fontsize + "px"));
            jQuery(".camera_caption").css("color", value.cap_fontcolor );
            jQuery(".camera_caption").css("font-family",value.cap_font);
            jQuery(".camera_caption").css("font-weight", value.cap_fontweight);
         
            
            
         
        }  
        
        //**********************Info**********************//
        var infoText;
        if (value.text != null) {
            infoText = (value.text).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
        ;
        var infoType;
        if (value.info_rolling_type != null) {
            infoType = (value.info_rolling_type).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var infoTitel;
        if (value.titel != null) {
            infoTitel = (value.titel).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var infoBgcolor;
        if (value.info_bgcolor != null) {
            infoBgcolor = (value.info_bgcolor).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var captionText;
        if (value.rolling_text != null) {
            captionText = (value.rolling_text).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var dataEasing;
        if (value.info_effect != null) {
            dataEasing = (value.info_effect).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var infoFontsize;
        if (value.info_fontsize != null) {
            infoFontsize = (value.info_fontsize).replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }
        ;
        var testdiv = "";
        if (infoText == null && infoText == null)
           return;
            var infoRollingType = "camera_info " + infoType;
            
            
            //************* Titel  ***************  
            var titelId = image + 'titelid';
            var infoTitleDiv = '<div id="' + titelId + '"  >' + infoTitel + '<div>';
            
            //************* Text  ***************  
            console.log("------------------------rspi-------------------------------------->infoTitel:" + infoTitel.length);
            var textId = image + 'textid';
            var infoTextDiv = '<div id="' + textId + '"  >' + infoText + '<div>';
            
            //************* main div  ***************  
            var infoDivId = image + 'maindivid';
            var infoDiv = '<div id="' + infoDivId + '"  style=" width:"52px";  background-color:"blue";  opacity: 1;  "  class="' + infoRollingType + '" data-easing="' + dataEasing + '"></div>';
            // Main div
            jQuery("#" + bid).append(infoDiv);        //Add to image Div
            //jQuery("#"+infoDivId).css("width", "252px"); 
            
            
            
            
            if(infoTitel != null ){
              jQuery("#" + infoDivId).append(infoTitleDiv);//Add titel did to infoDivI           
             // jQuery("#" + infoDivId).append(infoTitel);//Add titel did to infoDivI
             // alert('infoTitel:font size '+ value.titel_fontsize+ "px");
              jQuery("#" + titelId ).css("font-size", (value.titel_fontsize + "px"));
              //jQuery("#" + titelId ).css("font-size", ("55px"));
              jQuery("#" + titelId).css("color", value.titel_fontcolor );
              jQuery("#" + titelId).css("font-family",value.titel_font);
              jQuery("#" + titelId).css("font-weight", value.titel_fontweight);
              jQuery("#" + infoDivId).css("width", (convertStringToPixel(infoTitel))*3);
              var infoDivLeft=$(window).width()- (convertStringToPixel(infoTitel))*3 - 100;
              $("#" + infoDivId).css({top: 200, left: (infoDivLeft + "px"), position:'absolute'});
            }
            
            jQuery("#" + infoDivId).css("font-size", (infoFontsize + "px"));
            jQuery("#" + infoDivId).css({"color": value.info_font, "font-weight": value.info_fontweight});
            jQuery("#" + infoDivId).css("text-align", "center");
            //jQuery(id).css('background', convertHex(colourNameToHex(infoBgcolor), 100));
            //*** Div info Text ***
            var id = "#" + infoDivId + " " + "#" + textId;
            if (infoText != null ){
               jQuery("#" + infoDivId).append(infoTextDiv);          //Add titel did to infoDivId
               jQuery("#" + textId).css("font-size",   (value.info_fontsize+"px"));
               //jQuery("#" + textId).css("font-size", "55px");
               jQuery("#" + textId).css("color",       value.info_fontcolor );
               jQuery("#" + textId).css("font-family", value.info_font);
               jQuery("#" + textId).css("font-weight", value.info_fontweight);  
               }
               //jQuery(id).css('background-color', convertHex('#F977BD', 1));  //
               //jQuery(id).css('background', convertHex(colourNameToHex(infoBgcolor), 0));
                 //jQuery(".camera_info").css({'background-color':'blue'});
                 //alert(colourNameToHex(value.info_bgcolor));  //
                 jQuery("#" + infoDivId).css('background-color', convertHex(colourNameToHex(value.info_bgcolor), value.info_transparent));  //OK
                 //jQuery('.camera_info').css('background-color', convertHex('#F977BD', 50));  //OK
                 //alert('value.image:'+value.image+' <---> '+value.info_bgcolor+' <--->  '+value.info_transparent);
                 //var colorInHex=colourNameToHex(value.info_bgcolor);
                 //jQuery('.camera_info').css('background-color', convertHex(colorInHex,value.info_transparent));  //OK
              //jQuery(".camera_info").css({ 'opacity':0.8,'background-color':'blue'});
              //jQuery(".camera_info").css(  'opacity','0.8' );

            //jQuery("#" + textId).css("background",'red');
           // jQuery("#" + textId).css({'background-color':'red','opacity':0.5});
           // jQuery("#" + infoDivId).css({'background-color':'blue','opacity':0.1});
           // jQuery("#" + infoDivId).css({ opacity:0.8!important });
            var  opacityValue=value.info_transparent/100;
           /*
            jQuery("#" + textId).css({ opacity: 0.0 });
            jQuery("#" + titelId).css({opacity:  0.0 } );
            jQuery("#" + infoDivId).css({opacity:  0.0} );
*/
            //**********************titel Info**********************//
        
            //******************* Text1 ********************
            var text1Text;//remove spaces
            if (value.text1_text != null) {
                text1Text = (value.text1_text).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1RollingType;
            if (value.text1_rolling_type != null) {
                text1RollingType = (value.text1_rolling_type).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Font;
            if (value.text1_font != null) {
                text1Font = (value.text1_font).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Fontsize;
            if (value.text1_fontsize != null) {
                text1Fontsize = (value.text1_fontsize).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Fontweight;
            if (value.text1_fontweight != null) {
                text1Fontweight = (value.text1_fontweight).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1FontColor;
            if (value.text1_fontcolor != null) {
                text1FontColor = (value.text1_fontcolor).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Effect;
            if (value.text1_effect != null) {
                text1Effect = (value.text1_effect).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Effecttime;
            if (value.text1_effecttime != null) {
                text1Effecttime = (value.text1_effecttime).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1BgColor;
            if (value.text1_bgcolor != null) {
                text1BgColor = (value.text1_bgcolor).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
            var text1Transparent;
            if (value.text1_transparent != null) {
                text1Transparent = (value.text1_transparent).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }

            text1RollingType = "moveFromLeft"; //"moveFromRight";
            //text1Effect="easeInOutBounce";
            //text1Text="Detrte er camera text1";
            var text1DivId = image + 'text1id';
            var text1Classe = "camera_text1 " + text1RollingType;
            if (text1Text != null && (text1Text.length > 0)) {
                var text1Div = '<div id="' + text1DivId + '" class="' + text1Classe + '" data-easing="' + text1Effect + '">"' + text1Text + '"</div>';
                jQuery("#" + bid).append(text1Div);  //OK
                jQuery(".camera_text1").css("color", text1FontColor);
                //jQuery("#" + text1DivId).css('background', convertHex(colourNameToHex(text1BgColor), 50));
                //jQuery("#"+text1DivId).css('background', text1BgColor);
            }
            
       

       
 
// Returns width of HTML document
 
           

    });
}
;



///*** *****************************
///*** 
///*** *****************************
/*
  $("#logo").live("click", function(e) {
                alert('logo');
                $('content').css("width", "940px");
                $('.header_box').css("width", "940px");
                var page = 'center';
                $('#containt').load(page + '.html');
                $(".ltcol").show();
                e.preventDefault();//If this method is called, the default action of the event will not be triggered.
                // $('#containt').load('center.html');
                return false;

            });*/
            
            


