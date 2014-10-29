     $("form").submit(function() {
                alert('form submit  ColorPicker:');//+ColorPicker());
                var formData = new FormData($(this)[0]);
                //alert('submit: ' + formData);
                $.ajax({
                    url: 'php/publish.php',
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
                        if (obj.rtncode === 3000 || obj.rtncode === 3001 || obj.rtncode === 3002 || obj.rtncode === 3003) {
                            alert('obj.rtncode: ' + obj.rtncode + '  Desc: ' + obj.desc);
                        }
                        if (obj.rtncode === 0) {
                            alert('obj.rtncode: ' + obj.rtncode + ' Desc: ' + obj.desc);//   $('#containt').load('center.html');
                        }
                    }, //Ajax events
                    error: function(xhr, status, error) {
                        alert(error);
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                        return false;
                    }
                });
                $(this).close();
                return false;
            });
            $("#publishSettings").on("click", function() {
                alert('publishSettings');
            });
            $("#dialog").dialog({autoOpen: false,width:1000,height:330});
            $("#opener").click(function() {
                //$("#dialog").dialog('option','width',1200);
                $("#dialog").dialog("open");
                return false;
            });
            
      
	
