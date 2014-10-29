/*******************************************
 *
 *  
 *******************************************/


///*** *****************************
///*** 
///*** *****************************
function GetProjectId() {
    return 10;
}
///*** *****************************
///*** 
///*** *****************************
function emptyModalDialogFiels() {

    $("#section1").val('');
    $('#selectFont').val('');
    $('#selectFSize').val('');
    $('#selectFWeight').val('');
    $('#selectFColor').val('');
    $("#selectBgColor").val('');
}
///*** *****************************
///*** 
///*** *****************************
function checkAllDialogFiledsNotEmpty() {

    var returnString = '';
    if ($("#section1").val().trim().length === 0)
        returnString = returnString + "Fill info text value \n";
    if ($('#selectFont').val().length === 0)
        returnString = returnString + "Font from dropdown \n";
    if ($('#selectFSize').val().length === 0)
        returnString = returnString + "Size from dropdown\n";
    if ($('#selectFWeight').val().length === 0)
        returnString = returnString + "Font weight from dropdown  \n";
    if ($('#selectFColor').val().length === 0)
        returnString = returnString + "Font color \from dropdownn";
    if ($("#selectBgColor").val().length === 0)
        returnString = returnString + "Background color \n";
    if (returnString.length > 0) {
        alert('Please fill the folowing fields : \n \n ' + returnString);
        //   alert('checkAllDialogFiledsNotEmpty  false returnString:'+returnString);
        return false;
    }
    return true;
}///*** *****************************
///*** 
///*** *****************************
function checkAllCreateFileds() {
    //alert('checkAllCreateFileds');
    var returnHeaderString = '';
    if ($("#section1").val().trim().length === 0)
        returnHeaderString = returnHeaderString + "Fill info text \n";
    if ($('#selectFont').val().length === 0)
        returnHeaderString = returnHeaderString + "Font from dropdown \n";
    if ($('#selectFSize').val().length === 0)
        returnHeaderString = returnHeaderString + "Size from dropdown\n";
    if ($('#selectFWeight').val().length === 0)
        returnHeaderString = returnHeaderString + "Font weight from dropdown  \n";
    if ($('#selectFColor').val().length === 0)
        returnHeaderString = returnHeaderString + "Font color from dropdownn \n";
    if ($("#selectBgColor").val().length === 0)
        returnHeaderString = returnHeaderString + "Text background color \n";

    var returnTextString = "";
    try {
        if ($("#section1text").val().trim().length === 0)
            returnTextString = returnTextString + "Fill info text value \n";
        if ($("#selectTextFont").val().length === 0)
            returnTextString = returnTextString + "Text font from dropdown \n";
        if ($("#selectTextFSize").val().length === 0)
            returnTextString = returnTextString + "Font size from dropdown\n";
        if ($("#selectTextFWeight").val().length === 0)
            returnTextString = returnTextString + "Font weight from dropdown  \n";
        if ($('#selectTextFColor').val().length === 0)
            returnTextString = returnTextString + "Font color from dropdown \n";
        if ($("#selectBgTextColor").val().length === 0)
            returnTextString = returnTextString + "Text background color \n";
    } catch (e) {
        alert("checkAllCreateFileds  exception:" + e);
    }

    var rtnStr = "";
    if (returnHeaderString.length > 0 || returnTextString.length > 0) {
        if (returnHeaderString.length > 0)
            rtnStr = rtnStr + 'Please fill the following fileds in Hedear Part: \n\n' + returnHeaderString + '\n\n';
        if (returnTextString.length > 0)
            rtnStr = rtnStr + 'Please fill the following fileds in Text Part : \n\n' + returnTextString;
        alert(rtnStr);
        return false;
    }
    return true;
}
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @returns {getsectionhead}             
 *** ************************************************************ ***/
function getnyhedsectiontext(pid, pname) {
    try {
        alert("nyhed.js getnyhedsectiontext(pid, pname)  pid:" + pid + '   pname: ' + pname);

        //alert("getnyhedsectiontext in nyher.js");
        post_data = {'pid': pid, 'pname': pname};
        $.ajax({
            url: 'php/getnyhedsectiontext.php',
            type: "POST", async: false, data: post_data, datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                if (obj.status === true) {
                    //alert('obj.outarray:  '+obj.outarray);
                    $.each(obj.outarray, function(index, val) {
                        //console.log(val.pid);
                        //alert('read from section text:  ' + val.text + '  val.name:  ' + val.name + "  obj.status:" + obj.status);
                        $("#" + val.name).html(val.text);
                        $("#section1").html(val.text);
                        $('#selectFont').val(val.font);
                        $('#selectFSize').val(val.fontsize);
                        $('#selectFWeight').val(val.fontweight);
                        $('#selectFColor').val(val.color);
                        // if it is not all It is just one, så  change color of sell 
                        //if (pname.toLowerCase() !== 'all'.toLowerCase() && (pname.indexOf("Head") < 0)) {
                        // alert('tak it');
                        $('#selectFColorId').css('background-color', val.color);
                        // }
                        $("#section1").css('color', val.color);
                        $('#' + val.name).css('font-size', val.color + 'px');
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
                alert(error);
            }
        });
    } catch (e) {
        alert("exception:" + e);
    }
}
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @returns {getsectionhead}             
 *** ************************************************************ ***/
function getnyhedsectionhead(pid, pname) {
    try {
        alert("nyhed.js getnyhedsectionhead(pid, pname)  pid:" + pid + '   pname: ' + pname);
        post_data = {'pid': pid, 'pname': pname};
        $.ajax({
            url: 'php/getnyhedsectionhead.php',
            type: "POST", async: false,
            data: post_data,
            datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                //alert("??????????    getnyhedsectionhead  obj.status:" + obj.status);
                if (obj.status === true) {
                    $.each(obj.outarray, function(index, val) {
                        alert("??????????    getnyhedsectionhead  success    id:" + val.id + "   pid:" + val.pid + "   name:" + val.name);

                        $("#" + val.name).html(val.text);
                        //if ((pname.toLowerCase() !== 'all'.toLowerCase()) && (pname.indexOf("Head") > 0))
                        $("#section1").html(val.text);
                        $('#selectFont').val(val.font);
                        $('#selectFSize').val(val.fontsize);
                        $('#selectFWeight').val(val.fontweight);
                        $('#selectFColor').val(val.color);
                        //if ((pname.toLowerCase() !== 'all'.toLowerCase()) && (pname.indexOf("Head") > 0)) {
                        $('#selectFColorId').css('background-color', val.color);
                        //console.log('getsectionhead return data: ' + data + ' r\n\ pid:' + pid + '   pname:  ' + pname);
                        // }
                        $("#section1").css('color', val.color);
                        $('#' + val.name).css('font-size', val.fontsize + 'px');
                        $("#" + val.name).css('color', val.color);
                        $("#" + val.name).css("font-family", changeFirstCharecter(val.font));
                        $("#" + val.name).css("font-weight", val.fontweight);//$('#selectFWeight').val()

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
        alert("exception:" + e);
    }

}
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @returns {getsectionhead}    
 * Get Header and text Fill fill accordion(URL:http://jqueryui.com/accordion/)         
 *** ************************************************************ ***/
function getnyhedsection(pid, pname) {
//alert("getnyhedsection");
    /* var myText="Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.";
     alert(myText.length);
     return;*/
    jQuery('#accordion').html('');
    try {
        post_data = {'pid': pid, 'pname': pname};
        console.log('--------------------> 1111111111111111111111111111111111111111111111111');
        $.ajax({
            url: 'php/getnyhedsection.php',
            type: "POST", async: false, data: post_data, datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                if (obj.status === true) {
                    $.each(obj.outarray, function(index, val) {

                        console.log("   id:" + val.id + "   pid:" + val.pid + "   name:" + val.name
                                + "   text:" + val.text + "   font:" + val.font + "   fontsize:" + val.fontsize + "   fontweight:" + val.fontweight + "   color:" + val.color + "   bgcolor:" + val.bgcolor
                                + "   tid:" + val.tid + "   tpid:" + val.tpid + "   tname:" + val.tname
                                + "   ttext:" + val.ttext + "   tfont:" + val.tfont + "   tfontsize:" + val.tfontsize + "   tfontweight:" + val.tfontweight + "   tcolor:" + val.tcolor + "   tbgcolor:" + val.tbgcolor
                                );

                        console.log('-------------------->  val.name:' + val.name);
                        //getnyhedsectionvalues(val.id, val.name);
                        var hederHeight = 15;
                        $("#accordion").append("<div   style='z-index:1; height:" + hederHeight + "px;'  id='" + val.name + "' class='modalInput' rel='#prompt' >" + val.text + "</div>");
                        $('#' + val.name).css('font', val.font);
                        $('#' + val.name).css('font-size', val.fontsize + 'px');
                        $("#" + val.name).css('color', val.color);
                        $("#" + val.name).css('background', val.bgcolor);
                        $("#" + val.name).css("font-family", changeFirstCharecter(val.font));
                        $("#" + val.name).css("font-weight", val.fontweight);

                        var divName = val.tname + "div";
                        //alert('nyhed.js  getnyhedsection  divName:' + divName);  //style='background:red;'
                        // Find Height of dropdown 
                        var dropdownHeight = 100;
                        var result = (val.ttext.length / 700)
                        dropdownHeight = (result + 1) * 100;
                        //alert('val.text:'+ val.ttext.length+'  val.text: '+( val.ttext.length/100) +'  result:'+ parseInt(result));
                        $("#accordion").append("<div style='z-index:1;  height:" + dropdownHeight + "px;' id='" + divName + "'</div>");
                        $("#" + divName).append("<p style='z-index:1;  height:" + dropdownHeight + "px;'  id='" + val.tname + "' class='modalInput' rel='#prompt'>" + val.ttext + "</p>");
                        $('#' + val.tname).css('font', val.tfont);
                        $('#' + val.tname).css('font-size', val.tfontsize + 'px');
                        $("#" + val.tname).css('color', val.tcolor);
                        $("#" + val.tname).css('background-color', val.tbgcolor);
                        $("#" + divName).css('background', val.tbgcolor);
                        $("#" + val.tname).css("font-family", changeFirstCharecter(val.tfont));
                        $("#" + val.tname).css("font-weight", val.tfontweight);
                        $("#accordion  p.modalInput").css({'height': '10px'});

                    });

                }
                else {
                    alert('Error reading sectionhead table, please contact admin: \n' + obj.rtntxt);
                }
                console.log('--------------------> 22222222222222222222222222222222222222222222222');
            }, //Ajax events
            error: function(xhr, status, error) {
                alert(error);
            }
        });
    } catch (e) {
        alert("exception:" + e);
    }
}
/*** ************************************************************ ***
 * @param {type} pid
 * @param {type} pname
 * @param {type} type
 * @returns {getsectionhead}             
 *** ************************************************************ ***/
function filloverlayfields(pid, pname, type) {
    //alert('filloverlayfields');
    try {
        var urlStr = "";
        if (pname.indexOf("Head") >= 0)
            urlStr = 'php/getnyhedsectionhead.php';
        else
            urlStr = 'php/getnyhedsectiontext.php';

        //alert('filloverlayfields type:' + type + '   pname:' + pname + '  URLStr:' + urlStr + ' pname:' + pname);

        post_data = {'pid': pid, 'pname': pname};
        $.ajax({
            url: urlStr, ////'php/getnyhedsection.php',
            type: "POST", async: false, data: post_data, datatype: 'json',
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                if (obj.status === true) {
                    $.each(obj.outarray, function(index, val) {
                        console.log("   id:" + val.id + "   pid:" + val.pid + "   name:" + val.name
                                + "   text:" + val.text + "   font:" + val.font + "   fontsize:" + val.fontsize + "   fontweight:" + val.fontweight + "   color:" + val.color + "   bgcolor:" + val.bgcolor
                                + "<BR> tid:" + val.tid + "   tpid:" + val.tpid + "   tname:" + val.tname
                                + "   ttext:" + val.ttext + "   tfont:" + val.tfont + "   tfontsize:" + val.tfontsize + "   tfontweight:" + val.tfontweight + "   tcolor:" + val.tcolor + "   tbgcolor:" + val.tbgcolor
                                );
                        console.log('-------------------->  val.name:' + val.name);
                        //getnyhedsectionvalues(val.id, val.name);
                        //alert("hear1  type:" + type);
                        $("#section1").css('color', val.color);
                        $('#selectFont').val(val.font);
                        $('#selectFSize').val(val.fontsize);
                        $('#selectFWeight').val(val.fontweight);
                        $('#selectBgColor').val(val.bgcolor);
                        $('#selectFColor').val(val.color);
                        //$("#section1").html(val.text);
                        $("#section1").val(val.text);
                        $('#selectFColorId').css('background', val.color);
                        $('#selectBgColorId').css('background', val.bgcolor);
                    });
                }
                else {
                    alert('Error reading sectionhead table, please contact admin: \n' + obj.rtntxt);
                }
            }, //Ajax events
            error: function(xhr, status, error) {
                alert('error in filloverlayfields: '+ error);
            }
        });
    } catch (e) {
        alert("exception:" + e);
    }
}
function getnyhedsectionvalues(pid, pname) {
    $("#accordion").append("<h6>Hello</h6>");

    console.log($("#" + pname).html());
}

/***************************************************
 **** 
 ****       @param {type} id
 ****       @returns {undefined}
 ***************************************************/
function saveNyhedSectionText(id) {
    if (!checkAllDialogFiledsNotEmpty())
        return;

    //alert('368 nyhed.js saveSectionText89:    id:  ' + id);
    try {
        post_data = {
            'pname': id,
            'pid': GetProjectId(),
            'font': $('#selectFont').val(),
            'fontsize': $('#selectFSize').val(),
            'fontweight': $('#selectFWeight').val(),
            'color': $('#selectFColor').val(),
            'bgcolor': $('#selectBgColor').val(),
            'text': $("#section1").val()
        };
        $.post("php/savenyhedsectiontext.php", post_data, function(data) {
            //alert("callback of php/savenyhedsectiontext.php data:"+data);
            var obj = jQuery.parseJSON(data);
            //alert('savenyhedsectionhead:  ' + obj.status);
            if (obj.status === true) {
                getnyhedsectiontext(post_data.pid, post_data.pname);
            }
            else {
                alert('savenyhedsectionText: error saving id:' + post_data.pname + '   status' + obj.status);
            }
        }).error(function() {
            alert("error");
        });
    } catch (e) {
        alert('Exception: e:' + e);
    }
}
/***************************************************
 **** @param {type} headid
 **** @param {type} textid
 **** @returns {undefined}
 ***************************************************/
function deleteNyhedSection(headid, textid) {


   post_data = {
        'pnamehead': headid,
        'pnametext': textid,
        'pid': GetProjectId()
    };
    try {
       $.post("php/deletesectiontextandhead.php", post_data, function(data) {
            //alert("callback of php/savenyhedsectiontext.php data:" + data+ '  status:'+status);
            var obj = jQuery.parseJSON(data);
            if (obj.status === true) {
                alert("Section text Deleted");
                //getnyhedsectiontext(post_data.pid,post_data.pname);
            }
            else {
                alert('nyheadjs  deletesectiontextandhead.php: error saving id:' + post_data.pname + '   status' + obj.status);
            }
        }).error(function(data, errorThrown)
        {
            alert('request failed :' + errorThrown + ' <---------------> ' + data.error);
        });


    } catch (e) {
        alert('Exception: e:' + e);
    }
}
/***************************************************
 **** @param {type} headid
 **** @param {type} textid
 **** @returns {undefined}
 ***************************************************/
function deleteNyhedSection_1(headid, textid) {
    post_data = {
        'pnamehead': headid,
        'pnametext': textid,
        'pid': GetProjectId()
    };
    try {
        $.ajax({
            url: 'php/deletesectiontextandhead.php',
            type: 'POST',
            //Sync
            async: false,
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false, // false for file upload
            processData: false,
            datatype: 'json', //   'text',  //     
            //Ajax events
            success: function(data) {
                var obj = jQuery.parseJSON(data);

                if (obj.status === true) {
                    alert("Text deleted  ");
                    //getnyhedsectiontext(post_data.pid,post_data.pname);
                }
                else {
                    alert('nyheadjs  deletesectiontextandhead.php: error saving id:' + post_data.pname + '   status' + obj.status);
                }
            }, //Ajax events
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert('error: '+error +'  msg:'+err.Message);
                return false;
            }
        });


    } catch (e) {
        alert('Exception: e:' + e);
    }
}
//*** ****************************************************** ***/
// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
/***  ****************************************************** ***/
function saveNyhedSectionHead(id) {
   // alert('298 ??  nyhed.js saveSectionHead  id:  ' + id + '>>>id>>>>' + $("textarea#section1").val());
    post_data = {
        'pname': id,
        'pid': GetProjectId(),
        'font': $('#selectFont').val(),
        'fontsize': $('#selectFSize').val(),
        'fontweight': $('#selectFWeight').val(),
        'color': $('#selectFColor').val(),
        'bgcolor': $('#selectBgColor').val(),
        'text': $("textarea#section1").val()
    };
    try {
        $.post("php/savenyhedsectionhead.php", post_data, function(data,status) {
            // alert("Data: " + data + "\nStatus: " + status);
            //alert("php/savenyhedsectionhead.php:   "+data+'   post_data.pname:'+post_data.pname);
            var obj = jQuery.parseJSON(data);
            if (obj.status == true) {
                getnyhedsectionhead(post_data.pid, post_data.pname);
            }
            else {
                alert('savenyhedsectionhead: error saving id:' + post_data.pname + '   status' + obj.status);
            }

        }).error(function(data, errorThrown) {
            alert('request failed :' + errorThrown + '  ' + data.error);
        });
    } catch (e) {
        alert('Exception: e:' + e);
    }
}
//*** ****************************************************** ***/
/***  ****************************************************** ***/
function CreateANews() {
   // alert('CreateANews');

    if (!checkAllCreateFileds())
        return;
    // All fileds in the Dialog are filled 
    try {
       // alert('before');

        post_data = {
            'pid': GetProjectId(),
            'font': $('#selectFont').val(),
            'fontsize': $('#selectFSize').val(),
            'fontweight': $('#selectFWeight').val(),
            'color': $('#selectFColor').val(),
            'bgcolor': $('#selectBgColor').val(),
            'text': $('#section1').val(),
            'newsfont': $('#selectTextFont').val(),
            'newsfontsize': $('#selectTextFSize').val(),
            'newsfontweight': $('#selectTextFWeight').val(),
            'newcolor': $('#selectTextFColor').val(),
            'newsbgcolor': $("#selectBgTextColor").val(),
            'newstext': $('#section1text').val()
        };
       // alert('before post data');
        $.post("php/createnyhed.php", post_data, function(data) {
           // alert("callback of php/createnyhed.php data:" + data);
            var obj = jQuery.parseJSON(data);
           // alert('CreateANews:  ' + obj.status);
            if (obj.status === true) {
                //  alert("Create nyhed ???????????????????????????????????");
                // getnyhedsection(GetProjectId(), 'all');
                location.reload();
            }
            else {
               alert('savenyhedsectionText: error saving id:'+post_data.pname+'   status'+ obj.status);
            }
        }).error(function(data, errorThrown) {
            alert('request failed :' + errorThrown + '  ' + data.error);
        });
    } catch (e) {
        alert('Exception(CreateANews): e:' + e);
    }

}

