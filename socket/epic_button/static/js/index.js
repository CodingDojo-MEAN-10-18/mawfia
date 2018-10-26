$(document).ready( () => {

    const socket = io();

    socket.on('initialize', data => $('span').html(data));
    socket.on('update', data => $('span').html(data) );

    $('body').on('click', 'button:nth-of-type(1)', () => socket.emit('visit'));
    $('body').on('click', 'button:nth-of-type(2)', () => socket.emit('reset'));


})