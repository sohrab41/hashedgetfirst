/*** ****************************************************************
 * @param {type} txt
 * @returns {@exp;txt@call;replace}
 *              
 *** *****************************************************************/
function changeFirstCharecter(txt) {
    return txt.replace(/^(.)|\s(.)/g, function($1) {
        return $1.toUpperCase( );
    });
}
/*** ************************************************************ ***
 * @param {type} dropDownType
 * @param {type} textDropDown
 * @param {type} titelDropDown
 * @returns {fillOneDopdownList}             
 * ************************************************************** ***/
fillOneDopdownList = function(dropDownType, textDropDown, titelDropDown) {
    //function fillOneDopdownList(dropDownType, textDropDown, titelDropDown) {
    post_data = {'selectType': dropDownType};
    var selecttextfont = $(textDropDown);
    $(selecttextfont).html("");
    //Ajax post data to server
    selecttextfont.append($('<option></option>').val('').html(''));
    $.post('php/utilities.php', post_data, function(data, status) {
        (jQuery).each(jQuery.parseJSON(data), function(key, value) {//JSON.parse(data) 
            // console.log("Key:  " + key + "  Value:" + value);
            if (dropDownType !== 'rolltype')
                value = value.toLowerCase();
            selecttextfont.append($('<option></option>').val(value).html(value));

        });
    });
    //console.log('fillDopdownList:  ' + dropDownType);
}
;

/*** ************************************************************ ***
 * @param {type} type
 * ************************************************************** ***/
function fillDopdownList(type) {
    //alert('fillDopdownList(type): '+type);
    fillOneDopdownList('font', '#selectFont', '');
    fillOneDopdownList('fontcolor', '#selectFColor', '');
    fillOneDopdownList('fontsize', '#selectFSize', '');
    fillOneDopdownList('fontweight', '#selectFWeight', '');
    if (type === 'bgcolor')
        fillOneDopdownList('bgcolor', '#selectBgColor', '');
}
;
/*** ************************************************************ ***
 * @param {type} type
 * ************************************************************** ***/
function fillNewsDopdownList(type) {
    //alert('fillDopdownList(type): '+type);
    fillOneDopdownList('font', '#selectFont', '');
    fillOneDopdownList('font', '#selectTextFont', '');

    fillOneDopdownList('fontcolor', '#selectFColor', '');
    fillOneDopdownList('fontcolor', '#selectTextFColor', '');

    fillOneDopdownList('fontsize', '#selectFSize', '');
    fillOneDopdownList('fontsize', '#selectTextFSize', '');

    fillOneDopdownList('fontweight', '#selectFWeight', '');
    fillOneDopdownList('fontweight', '#selectTextFWeight', '');

    if (type === 'bgcolor') {
        fillOneDopdownList('bgcolor', '#selectBgColor', '');//selectBgTextColo
        fillOneDopdownList('bgcolor', '#selectBgTextColor', '');
    }
}
;

///*** *****************************
///*** 
///*** *****************************
function GetProjectId() {
    return 10;
}
;


///******************************* From center*************************************


/*** ************************************************************ ***
 * 
 * 
 *** ************************************************************ ***/
$("#btnClose").click(function() {
   // alert("button");
    location.reload();
      //return e.preventDefault();
});
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @returns {getsectionhead}             
 *** ************************************************************ ***/
function getsectiontext(pid, pname) {
    try {
      //alert("getsectiontext");
        post_data = {'pid': pid, 'pname': pname};
        $.ajax({
            url: 'php/getsectiontext.php',
            type: "POST", async: false, data: post_data, datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                //alert(data);
                if (obj.status === true) {
                    //alert('obj.outarray:  obj.status === true  '+obj.outarray);
                    $.each(obj.outarray, function(index, val) {
                        //console.log(val.pid);
//alert('utilities.js \n getsectiontext read from section \n text:  '+val.text+'  val.name:  '+val.name+' pid: '+pid+'  pname:'+ pname)
                        if (pname.toLowerCase() !== 'all' && (pname.indexOf("Head") < 0))
                            $("#section1").val(val.text);
                        $('#selectFont').val(val.font);
                        $('#selectFSize').val(val.fontsize);
                        $('#selectFWeight').val(val.fontweight);
                        $('#selectFColor').val(val.color);
                        // if it is not all It is just one, så  change color of sell 
                        if (pname.toLowerCase() !== 'all' && (pname.indexOf("Head") < 0)) {
                            // alert('tak it');
                            $('#selectFColorId').css('background-color', val.color);
                        }
                       // alert('!!!!! name: '+val.name+' \n fontsize: '+val.fontsize+" \n val.text: "+val.text);
                        $("#" + val.name).html(val.text);
                        /*$("#" + val.name).val('val.text');*/
                        $("#section1").css('color',val.color);
                        $('#' + val.name).css('font-size', val.fontsize + 'px');
                        $("#" + val.name).css('color', val.color);
                        $("#" + val.name).css("font-family", changeFirstCharecter(val.font));
                        $("#" + val.name).css("font-weight", val.fontweight);//$('#selectFWeight').val()

                    });
                }
                else {
                    alert('Error reading sectiontext table, please contact admin: \n' + obj.rtntxt);
                }
            }, //Ajax events
            error: function(xhr, status, error) {
               alert('error in utilities.js getsectiontext(' + pid + ', ' + pname + ')');
            }
        });

      
    } catch (e) {
        alert("exception in getsectiontext(" + pid + ", " + pname + "):" + e);
    }
}
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @returns {getsectionhead}             
 *** ************************************************************ ***/
function getsectionhead(pid, pname) {
    try {
        post_data = {'pid': pid, 'pname': pname};
        $.ajax({
            url: 'php/getsectionhead.php',
            type: "POST", async: false, data: post_data, datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
               // alert("Header date: "+data);
                if (obj.status === true) {
                     // alert("Header date: true");
                    $.each(obj.outarray, function(index, value) {
                      //alert("Header date: true each");
                       //alert('1:              utilites.js getsectionhead('+pid+','+ pname+') value.name:'+value.name+' value.text:'+ value.text + ' $("#section1").val:   '+$("#section1").val());
                        if ((pname.toLowerCase() !== 'all') && (pname.indexOf("Head") > 0))
                            $("#section1").val(value.text);
                        console.log('2: utilites.js getsectionhead(' + pid + ',' + pname + ') value.name:' + value.name + ' value.text:' + value.text + '  $("#section1").val:   ' + $("#section1").val());
                        $('#selectFont').val(value.font);
                        $('#selectFSize').val(value.fontsize);
                        $('#selectFWeight').val(value.fontweight);
                        $('#selectFColor').val(value.color);
                        if ((pname.toLowerCase() !== 'all'.toLowerCase()) && (pname.indexOf("Head") > 0)) {
                            $('#selectFColorId').css('background-color', value.color);
                            console.log('getsectionhead return data: ' + data + ' r\n\ pid:' + pid + '   pname:  ' + pname);
                        }
                        $("#section1").css('color', value.color);

                        // alert('value.name: '+value.name+'  value.fontsize: '+value.fontsize);
                        // Header Row files in index fields
                        $("#" + value.name).html(value.text);
                        $('#' + value.name).css('font-size', value.fontsize + 'px');
                        $("#" + value.name).css('color', value.color);
                        $("#" + value.name).css("font-family", changeFirstCharecter(value.font));
                        $("#" + value.name).css("font-weight", value.fontweight);//$('#selectFWeight').val()

                    });
                }
                else {
                    alert('Error reading sectionhead table, please contact admin: \n' + obj.rtntxt);
                }
            }, //Ajax events
            error: function(xhr, status, error) {
                alert(error);
            }
        });
    } catch (e) {
        alert("exception  getsectionhead(pid: " +pid+" pname: " +pname ,e);
    }

}


/*** ****************************************************************
 * @param {type} txt
 * @returns {@exp;txt@call;replace}
 *              
 *** *****************************************************************/
function changeFirstCharecter(txt) {
    return txt.replace(/^(.)|\s(.)/g, function($1) {
        return $1.toUpperCase();
    });
}
/*** *************************************************************************
 * 
 * @param {type} id
 * @returns {saveSectionText}
 *** *************************************************************************/
function saveSectionText(id) {
    //alert('1  saveSectionText  id:  '+ id +'  html: '+$("#section1").html());
    //alert('2  saveSectionText  id:  '+ id +'  val: '+$("#section1").val());

    var fetchedText = ($("#section1").val().replace(/\'/g, ''));
    post_data = {
        'pname': id,
        'pid': GetProjectId(),
        'font': $('#selectFont').val(),
        'fontsize': $('#selectFSize').val(),
        'fontweight': $('#selectFWeight').val(),
        'color': $('#selectFColor').val(),
        'bgcolor': 'white',
        'text': fetchedText                     //$("#section1").val()
                // 'text': $("#" + id).html()
    };
    var jqxhr = $.post("php/savesectiontext.php", post_data, function(data) {
        //alert("success data:"+data);
        var obj = jQuery.parseJSON(data);
        //alert('savesectiontext:  ' + obj.status);
        $('#' + obj.name).val(obj.text);
        linkMore();
        //if(obj.status==true){
        //location.reload();
    }).error(function() {
        alert("error saveSectionText(" + id + ")");
    });
}
/*** ****************************************************************
 * @param {type} id
 * @returns {@exp;txt@call;replace}
 *              
 *** *****************************************************************/
function saveSectionHead(id) {

   // alert('Utilities.js   saveSectionHead  id:  ' + id + '  text:  ' + $("#section1").val());
    post_data = {
        'pname': id,
        'pid': GetProjectId(),
        'font': $('#selectFont').val(),
        'fontsize': $('#selectFSize').val(),
        'fontweight': $('#selectFWeight').val(),
        'color': $('#selectFColor').val(),
        'bgcolor': 'white',
        'text': $("#section1").val()
    };
    var jqxhr = $.post("php/savesectionhead.php", post_data, function(data) {
        //alert("success data:"+data);
        var obj = jQuery.parseJSON(data);
        //alert('1     saveSectionHead status rtn type:  ' + obj.status);
        getsectionhead(GetProjectId(), id);
        //alert('2     saveSectionHead status rtn type:  ' + obj.status);
        //if(obj.status==true){
    }).error(function() {
        alert("Error saveSectionHead(" + id + ")");
    });
}

/*** ***************************************************************
 * @param {type} divName
 * @param {type} itemId
 * @returns {undefined}
 **** **************************************************************/

var currentModal;
function openModal(divName, itemId) {

    // closeModal();
    console.log('openModal   393:  divName:  ' + divName + '    itemId: ' + itemId);
    if ($('#' + divName).length > 0) {
        currentModal = $('#' + divName).overlay({
            mask: {color: '#00ff00'},
            top: '0px',
            api: true
        }).load();

    }

}
/*** ********************************************************
 *** 
 *** @returns {undefined}
 *** *******************************************************/
function closeModal() {
   //alert("utilities.js closeModal currentModal: " + currentModal);

    if (currentModal) {
        if (currentModal.isOpened) {
            currentModal.close();
           // alert('inside closeModal');
        }
    }
    //$('#openButton').removeAttr('disabled');
}


/*** ************************************************************ ***
 *** @param {type} e
 *** 
 *** ************************************************************ ***/
$("#btnSave form").submit(function(e) {
   //alert(' btnSave form' + $('#section1').val()+' selectFont'+$('#selectFont').val());
    //alert('btnSave form selectFont' + $('#selectFont').val());
    // close the overlay
    triggers.eq(1).overlay().close();
    // get user input
    var input = $("input", this).val();
    // do something with the answer
    triggers.eq(1).html(input);
    // do not submit the form
    return e.preventDefault();

});
//******************************************
var triggers = $(".modalInput").overlay({
    // some mask tweaks suitable for modal dialogs
    mask: {
        color: '#ebecff',
        loadSpeed: 200,
        opacity: 0.9
    },
    closeOnClick: false,
    api: true
});
//******** Link More ************
function linkMore() {
    // alert('linkMore');
    var showChar = 500;
    var ellipsestext = "...";
    var moretext = "See More";
    var lesstext = "See Less";
    $('.comments-space').each(function() {
        var content = $(this).html();
        if (content.length > showChar) {
            var show_content = content.substr(0, showChar);
            var hide_content = content.substr(showChar, content.length - showChar);
            var html = show_content + '<span class="moreelipses">' + ellipsestext + '</span><span class="remaining-content"><span>' + hide_content + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }
    });
    $(".morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
    //************ End LinkMore *************
}
;
/*** ************************************************************ ***/
$(".slidetabs").tabs(".images > div", {
    //enable the "crass-fading" effect
    effect: 'fade',
    fadeOutSpeed: "slow",
    // start from the befinning after the last tab
    rotate: true
            //use the slideshow plugin. It accepts its own configuration 
}).slideshow();
/*** ************************************************************ ***/




