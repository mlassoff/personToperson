$(document).ready(
    function()
    {
        $('#btnLookup').click(function(){
           lookup(); 
        });
       
    }
)

function lookup()
{
    var query = $('#lookUp').val();
    var queryType = $('#queryType').val();
    var url = "https://api.fullcontact.com/v2/person.json?"
    url += queryType;
    url += "=";
    url += query;
    
    $.ajax({
        type: 'POST',
        url: url,
        headers:{
            "X-FullContact-APIKey" : key
        }
    }).done(function(data){
        $('#result').html("")
        if(data.status==200)
        {
            console.log(data);
            try
            {
            var fullName = data.contactInfo.fullName;
            } catch(e)
            {
                var fullName = "No data";
            }
            try
            {
                var location = data.demographics.locationGeneral;
            } catch (e)
            {
                var location = "No data";
            }
             $('#result').append("<h1>" + fullName + "</h1>" + "<br/>");
            try{
                var photoURLs = data.photos;
            } catch(e)
            {
                $('#result').append("<p>No photo</p>");
            }
            $.each(photoURLs, function(i){
                $('#result').append("<img src='" + photoURLs[i].url + "'/>"); 
            });
            $('#result').append("<br/><h3>" + location + "</h3>");
            $('#result').append('<h2>Social Profiles</h2>');
            $.each(data.socialProfiles, function(i)
                  {
                        var profile = "<a href='" + data.socialProfiles[i].url;
                        
                        profile += "'><p>" + data.socialProfiles[i].typeName + "</p></a>";
                        $('#result').append(profile);    
            });
        
        }
    });
    
}

