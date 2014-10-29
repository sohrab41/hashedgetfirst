var userGlobalVar = null;
function getUserGlobalVar() {
    return userGlobalVar;
}
function validateUser(pid, user, pw) {
    try {
        var rtnValue='';
        //data to be sent to server
        post_data = {'pid': pid, 'user': user, 'pw': pw};
        //Ajax post data to server
       // alert('pid: '+pid+ '  user: '+ user +'  pw:'+pw);
        $.ajax({
            url: 'php/validateuser.php',
            type: "POST", 
            async: false, data: post_data, datatype: 'json',
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                 //alert('obj.status:  '+obj.status);
                if (obj.status === true) {
                    rtnValue=  obj['type'];
                   // alert('rtnValue:  '+rtnValue);
                   // Set global session
                     $.session.set('userType', rtnValue);
                     location.reload();
                    //return rtnValue;              
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
        alert("exception in login.js:" + err.message);
    }
    // alert("rtnValue: " + rtnValue);
    
    //return rtnValue;

}