$(document).ready( () => {
    const socket = io(); //1

    $('#updated_message').hide();

    socket.on('greeting', data => { //4
		console.log(data.msg);
        $('form').on('click', '#submit', e => {
                e.preventDefault();
                socket.emit('posting_form',
                    {
                        name: $('input:nth-of-type(1)').val(),
                        location: $('input:nth-of-type(2)').val(),
                        language: $('input:nth-of-type(3)').val(),
                        comment: $('textarea').val()
                    })
                $('input, textarea').each( (a, b) => { if(a != 4) $(b).val(null); });
        })

    });

    socket.on('updated_message', data => {
        $('#updated_message').show();
        $('#updated_message').append('<p>You emitted the following information to the server:</p>');
        for(var d in data) $('#updated_message').append(`<p>${d}: ${data[d]}</p>`);
    })

    socket.on('random_number', num => $('#updated_message').append(`Your lucky number emitted by the server is ${num}`) );

})