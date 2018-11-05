$(document).ready( ()=>  {

    $("#select").on("click", "button", function() {

        if($(this).text() === "Login Form"){
            $("#registration").hide();
            $(this).hide();
            $("button:nth-of-type(2)").show();
            $("#login").show();
            $('.error').text(null);
        }
        else{
            $("#login").hide();
            $("#registration").show();
            $(this).hide();
            $("button:nth-of-type(1)").show();
            $('.error').text(null);
        }
    });

    if($('span').html() == 1){
        $("#login").hide();
        $("#registration").show();
        $('button:nth-of-type(2)').hide();
        $("button:nth-of-type(1)").show();
    }
    else if($('span').html() == 0){
        $("#registration").hide();
        $("#login").show();
        $('button:nth-of-type(1)').hide();
        $("button:nth-of-type(2)").show();
    }

});