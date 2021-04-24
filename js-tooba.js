$(function() {
    //to get images of main page from server
    $.ajax({
        type: 'GET',
        url: "http://localhost:8000/images",
        headers: {"Content-Type": "application/json"},
        async: false,
        success: function (typees) {
            for (var i = 0; i < typees.length; i++) {
                console.log(typees[i]);

                $('#image_of_page1').append($('<img>').attr({
                    src: './application/images/' + typees[i],
                    class: 'page_img'
                }));


            }
            console.log("success");


        },
        error: function () {
            console.log("error");
        }


    });

//to get images of albums(bottom part) from server
    $.ajax({
        type: 'GET',
        url: "http://localhost:8000/images",
        headers: {"Content-Type": "application/json"},
        async: false,
        success: function (typees) {
            // console.log(Array.isArray(typees));
            console.log(typees);

            for (var i = 0; i < typees.length; i++) {
                // console.log(typees[i]);
                $('#images_icon').append($('<img>').attr({
                    src: './application/images/' + typees[i], width: '10%', height: '100px',
                    class: 'icon_class', position: 'fixed'
                }));

            }

        },
        error: function () {
            console.log("error");
        }


    });
//to define function onclick for images on main page so when we click on them we will be refrenced to album part
    $("#image_of_page1 .page_img").click(function () {
        document.getElementById("img").src = this.src;

        $('#images_icon .icon_class').each(function (index1, icon1) {
            if (icon1.src == document.getElementById("img").src) {
                //to scroll bottom images in album in bottom part
                var leftPos = icon1.offsetLeft;
                document.getElementById('images_icon').scrollLeft = leftPos - 5 * icon1.width;
                // console.log(leftPos);

            }
        });


        //to show album part
        document.getElementById("card").style.visibility = "visible";
        document.getElementsByTagName("html")[0].style.overflowY = 'hidden';

        // console.log(document.getElementById("img").src);
        main_img_src = this.src;
        //to define function onclick for images at bottom part of album so when thay have become clicked, the chosen image will be shown at middle of album
        $('#images_icon .icon_class').each(function (indexx, icon) {
            icon.addEventListener("click", function () {
                var leftPos = icon.offsetLeft;
                document.getElementById('images_icon').scrollLeft = leftPos - 5 * icon.width;
                console.log(icon);
                document.getElementById('img').src = this.src;
                $('#images_icon .icon_class').each(function (indexx, elementt) {
                    elementt.style.border = '1px solid #D5E2D5';
                    elementt.style.width = '10%';
                    elementt.style.height = '100px';

                });
                this.style.border = '3px solid rgb(125, 134, 127)';
                this.style.width = '8%';
                this.style.height = '90px';


            });
        });
        //to specify the image that is chosen in icons with changing its border color and its size
        $('#images_icon .icon_class').each(function (index, element) {
            if (element.src == document.getElementById("img").src) {
                element.style.border = '3px solid rgb(125, 134, 127)';
                element.style.width = '8%';
                element.style.height = '90px';


            } else {
                element.style.border = '1px solid #D5E2D5';
                element.style.width = '10%';
                element.style.height = '100px';

            }
        });


    });
    var array_icon = [];
    //to push images of album in bottom part to an array to make it easier to define previouse and next functions
    $('#images_icon .icon_class').each(function (index, element) {
        array_icon.push(element);
    });
//to define previouse function
    $('#previouse').click(function () {
        var main_src = document.getElementById('img').src;
        // console.log("main src before loop" + main_src)
        for (var i = 0; i < array_icon.length; i++) {

            if (main_src == array_icon[i].src) {
                if (i > 0) {
                    // console.log("main" + main_src);
                    // console.log("icon" + array_icon[i].src);
                    var j = i - 1;
                    var leftPos = array_icon[j].offsetLeft;
                    document.getElementById('images_icon').scrollLeft = leftPos - 5 * array_icon[i].width;
                    document.getElementById('img').src = array_icon[j].src;
                    array_icon[i].style.border = '1px solid #D5E2D5';
                    array_icon[i].style.width = '10%';
                    array_icon[i].style.height = '100px';
                    array_icon[j].style.border = '3px solid rgb(125, 134, 127)';
                    array_icon[j].style.width = '8%';
                    array_icon[j].style.height = '90px';
                    break;
                }
            }
        }

    });
//to define function onclick of next button
    $('#next').click(function () {
        var main_src = document.getElementById('img').src;
        for (var i = 0; i < array_icon.length; i++) {
            if (main_src == array_icon[i].src) {
                if (i < array_icon.length - 1) {
                    var j = i + 1;
                    var leftPos = array_icon[j].offsetLeft;
                    //to scroll images(little images) at the bottom of album page when we click on next button
                    document.getElementById('images_icon').scrollLeft = leftPos - 5 * array_icon[i].width;
                    document.getElementById('img').src = array_icon[j].src;
                    array_icon[i].style.border = '1px solid #D5E2D5';
                    array_icon[i].style.width = '10%';
                    array_icon[i].style.height = '100px';
                    array_icon[j].style.border = '3px solid rgb(125, 134, 127)';
                    array_icon[j].style.width = '8%';
                    array_icon[j].style.height = '90px';
                    main_src = array_icon[j].src;
                    break;
                }
            }
        }

    });
    //define close function on click button of close on album
    $('#close').click(function () {
        document.getElementById("card").style.visibility = "hidden";
        document.getElementsByTagName("html")[0].style.overflowY = 'auto';
        document.getElementById("img").src = '';
    });

//to zoom image with id='img' (the main image in alnum page)
        new Zooming({
            // options...
        }).listen(document.getElementById('img'))

} );




