function goLink (hash) {
    if (hash == "#calendar") {
        drawInteractiveCalendar('calendar');
    };
    if (hash == "#create") {
        createCalendar( );
    };
    if (hash == "#about") {
        goToAbout();
    };
};