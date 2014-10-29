
             /*** ************************************************************ ***
             * 
             * 
             *** ************************************************************ ***/
            $("#btnClose").click(function() {
                alert("button");
            });
            /*** ************************************************************ ***
             * @param {type} pid
             * @param {type} pname
             * @returns {getsectionhead}             
             *** ************************************************************ ***/
             function getsectiontext(pid,pname){
                try{
                    //alert("getsectiontext in center.js");
                    post_data = {'pid': pid, 'pname': pname};
                    $.ajax({
                        url: 'php/getsectiontext.php',
                        type: "POST", async: false, data: post_data, datatype: 'json',
                        //Ajax events
                        success: function(data) {
                            var obj = jQuery.parseJSON(data);
                            if (obj.status == true) {
                                //alert('obj.outarray:  '+obj.outarray);
                                $.each(obj.outarray, function(index, val) {
                                    //console.log(val.pid);
                                   //alert('read from section text:  '+val.text+'  val.name:  '+val.name)
                                    $("#" + val.name).html(val.text);
                                    if(pname.toLowerCase() !== 'all'.toLowerCase() && (pname.indexOf("Head")< 0))
                                      $("#section1").html(val.text);
                                    
                                    $('#selectFont').val(val.font);
                                    $('#selectFSize').val(val.fontsize);
                                    $('#selectFWeight').val(val.fontweight);
                                    $('#selectFColor').val(val.color);
                                    // if it is not all It is just one, så  change color of sell 
                                    if(pname.toLowerCase() !== 'all'.toLowerCase() && (pname.indexOf("Head")<0)){
                                       // alert('tak it');
                                     $('#selectFColorId').css('background-color', val.color);
                                    }
                                     $("#section1").css('color', val.color);
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
                            alert('error in center.js getsectiontext');
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
           /*function getsectionhead(pid,pname){
                try{
                    post_data = {'pid': pid, 'pname': pname};
                    $.ajax({
                        url: 'php/getsectionhead.php',
                        type: "POST", async: false, data: post_data, datatype: 'json',
                        //Ajax events
                        success: function(data) {
                            var obj = jQuery.parseJSON(data);
                            if (obj.status == true) {
                                $.each(obj.outarray, function(index, val) {
                                    //console.log(val.pid);
                                    $("#" + val.name).html(val.text);
                                    if((pname.toLowerCase() !== 'all'.toLowerCase()) && (pname.indexOf("Head")>0))
                                      $("#section1").html(val.text);
                                    $('#selectFont').val(val.font);
                                    $('#selectFSize').val(val.fontsize);
                                    $('#selectFWeight').val(val.fontweight);
                                    $('#selectFColor').val(val.color);
                                    if((pname.toLowerCase() !== 'all'.toLowerCase()) && ( pname.indexOf("Head")>0)){
                                      $('#selectFColorId').css('background-color', val.color);
                                      console.log('getsectionhead return data: '+  data  +' r\n\ pid:'+   pid+'   pname:  '+   pname);
                                    }
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
     
            }*/
            
           
            /*** ****************************************************************
             * @param {type} txt
             * @returns {@exp;txt@call;replace}
             *              
             *** *****************************************************************/
            function changeFirstCharecter(txt) {
                return txt.replace(/^(.)|\s(.)/g, function($1) {
                    return $1.toUpperCase( )
                });
            }
            /*** ************************************************************ ***
             * @param {type} dropDownType
             * @param {type} textDropDown
             * @param {type} titelDropDown
             * @returns {fillOneDopdownList}             
             * ************************************************************** ***/
              fillOneDopdownList1  = function(dropDownType, textDropDown, titelDropDown) {
                //console.log("-------------fillDopdownList ----------------");
                post_data = {'selectType': dropDownType};
                var selecttextfont = $(textDropDown);
                $(selecttextfont).html("");
                //Ajax post data to server
                selecttextfont.append($('<option></option>').val('').html(''));
                $.post('php/utilities.php', post_data, function(data, status) {
                    (jQuery).each(jQuery.parseJSON(data), function(key, value) {//JSON.parse(data) 
                        // console.log("Key:  " + key + "  Value:" + value);
                        if (dropDownType != 'rolltype')
                            value = value.toLowerCase();
                        selecttextfont.append($('<option></option>').val(value).html(value));

                    });
                });
                //console.log('fillDopdownList:  ' + dropDownType);
            }
            ;
             function saveSectionText(id){
             //alert('saveSectionText  id:  '+ id);
              post_data = {
                        'pname':        id,
                        'pid':          GetProjectId(),
                        'font':         $('#selectFont').val(),
                        'fontsize':     $('#selectFSize').val(),
                        'fontweight':   $('#selectFWeight').val(),
                        'color':        $('#selectFColor').val(),
                        'bgcolor':      'white',
                        'text':         $("#"+id).html()
                    };
                    //*** ****************************************************** ***/
                    // Assign handlers immediately after making the request,
                    // and remember the jqxhr object for this request
                    /***  ****************************************************** ***/
                    var jqxhr = $.post("php/savesectiontext.php", post_data, function(data) {
                        //alert("success data:"+data);
                        var obj = jQuery.parseJSON(data);
                        //alert('savesectiontext:  '+obj.status);
                        //if(obj.status==true){
                    }).error(function() {
                        alert("error");
                    });
             }
             //*** ****************************************************** ***/
             // Assign handlers immediately after making the request,
             // and remember the jqxhr object for this request
             /***  ****************************************************** ***/
                    
             function saveSectionHead(id){
              alert('saveSectionHead  id:  '+ id);
              post_data = {
                        'pname':        id,
                        'pid':          GetProjectId(),
                        'font':         $('#selectFont').val(),
                        'fontsize':     $('#selectFSize').val(),
                        'fontweight':   $('#selectFWeight').val(),
                        'color':        $('#selectFColor').val(),
                        'bgcolor':      'white',
                        'text':         $("#"+id).html()
                    };
                    var jqxhr = $.post("php/savesectionhead.php", post_data, function(data) {
                        //alert("success data:"+data);
                        var obj = jQuery.parseJSON(data);
                        alert('savesectiontext:  '+obj.status);
                        //if(obj.status==true){
                    }).error(function() {
                        alert("error");
                    });
             }
             
              /*** ***************************************************************
             * @param {type} divName
             * @param {type} itemId
             * @returns {undefined}
             **** **************************************************************/ 
            var currentModal;
            function openModal(divName, itemId) {
              alert('center.js openModal');
               console.log('openModal   393:  divName:  '+divName+'    itemId: '+itemId);
                if ($('#' + divName).length > 0) {
                    currentModal = $('#' + divName).overlay({
                        mask: {color: '#00ff00'},
                        top: '0px',
                        api: true
                    }).load();
                 
                }

            }
            
              /***            *** 
              *** @returns {undefined}
              *** ************************************************************ ***/
           /* function closeModal() {
                if (currentModal) {
                    if (currentModal.isOpened) {
                        currentModal.close();
                        alert('closeModal');
                    }
                }
                $('#openButton').removeAttr('disabled');
            }
            
            */
            
            /*******************************************
             *
             *  
             *******************************************/
            $(".modalInput").live('click', function(e) {
              console.log("center.js .modalInput live");  
              //  if(window.loadOverlay<1){
              //      window.loadOverlay++;
              //       console.log('modalInput).live    window.loadOverlay++:'+ window.loadOverlay++);
               
                 alert(".modalInput    244"    );
                    var id = $(this).attr('id');
                    //var text= $(this).attr('id').html();
                    window.selectedGalleryItemId = id;
                    //alert('open modal modalInput id :' + id);
                    if(id.indexOf("Head")>=0)
                        getsectionhead(GetProjectId(),window.selectedGalleryItemId);
                    else
                     getsectiontext(GetProjectId(),window.selectedGalleryItemId);
                    openModal('prompt', $(this).attr('id'));
                //}
                e.preventDefault();
            });
               /*** ************************************************************ ***
                ***
                *** 
                *** ************************************************************ ***/
                $("#btnSave form").submit(function(e) {
                    //alert(' btnSave form' + $('#section1').val()+' selectFont'+$('#selectFont').val());
                    alert('btnSave form selectFont' + $('#selectFont').val());
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
              function fillDopdownList_1(){
                   fillOneDopdownList('font', '#selectFont', '');
            fillOneDopdownList('fontcolor', '#selectFColor', '');
            fillOneDopdownList('fontsize', '#selectFSize', '');
            fillOneDopdownList('fontweight', '#selectFWeight', '');

              }
              
              //** *************************************************
                //** Function: 
                //**
                //** *************************************************
               /* window.a = a;
                $("#target").submit(function(e) {
                    alert('submit:  '+window.selectedGalleryItemId+"  target.submit  ");
                    //$('section1').html(); 
                    //alert(' btnSave form===>' + $('#section1').val() +'   btnSave form selectFont'+$('#selectFont').val());
                    alert('target btnSave form id: ' + $(this).parent().attr('id'));
                    alert('#selectFont:    ' + changeFirstCharecter($('#selectFont').val()));
                    $('#' + window.selectedGalleryItemId).css('font-size', $('#selectFSize').val() + 'px');
                    $('#' + window.selectedGalleryItemId).css('color', $('#selectFColor').val());
                    $('#' + window.selectedGalleryItemId).css("font-family", changeFirstCharecter($('#selectFont').val()));
                    $('#' + window.selectedGalleryItemId).css("font-weight", $('#selectFWeight').val());//$('#selectFWeight').val()
                    var itemId=window.selectedGalleryItemId;
                    if(itemId.indexOf("Head")>=0){
                       saveSectionHead(window.selectedGalleryItemId);
                       alert('saveSectionHead    id : '+window.selectedGalleryItemId.toLowerCase());
                    }   
                    else{
                       alert('saveSectionText   id : '+window.selectedGalleryItemId.toLowerCase()); 
                       saveSectionText(window.selectedGalleryItemId);
                    }   

                    closeModal();
                    window.selectedGalleryItemId = "";
                    return e.preventDefault();

                });
                */
                

