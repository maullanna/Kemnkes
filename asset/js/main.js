

(function ($) {
    "use strict";

    
    // var carousel = document.querySelector('.carousel');
    // var cellCount = 6;
    // var selectedIndex = 0;

    // function rotateCarousel() {
    // var angle = selectedIndex / cellCount * -360;
    // carousel.style.transform = 'translateZ(-800px) rotateY(' + angle + 'deg)';
    // }

    // var prevButton = document.querySelector('.previous-button');
    // prevButton.addEventListener( 'click', function() {
    // selectedIndex--;
    // rotateCarousel();
    // });

    // var nextButton = document.querySelector('.next-button');
    // nextButton.addEventListener( 'click', function() {
    // selectedIndex++;
    // rotateCarousel();
    // });

    // // Spinner
    // var spinner = function () {
    //     setTimeout(function () {
    //         if ($('#spinner').length > 0) {
    //             $('#spinner').removeClass('show');
    //         }
    //     }, 1);
    // };
    // spinner();
    
    
    // Initiate the wowjs
    //new WOW().init();


    // Sticky Navbar
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 300) {
    //         $('.sticky-top').css('top', '0px');
    //     } else {
    //         $('.sticky-top').css('top', '-100px');
    //     }
    // });
    
    
    // Back to top button
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 300) {
    //         $('.back-to-top').fadeIn('slow');
    //     } else {
    //         $('.back-to-top').fadeOut('slow');
    //     }
    // });
    // $('.back-to-top').click(function () {
    //     $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    //     return false;
    // });


    // Header carousel
    $(".header-carousel").owlCarousel({
        center : true,
        autoplay: true,
        smartSpeed: 1500,   
        items: 2,
        // dots: true,
        loop: true,
        nav : true,
        navText : [
            '<div class="banner-button prev-slide"><i class="fa-solid fa-angle-left "></i></div>',
            '<div class="banner-button next-slide"><i class="fa-solid fa-angle-right "></i></div>'
        ]
        
    });

    $('.banner-slick-carousel').slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: true,
      });

    // infogragis carousel
    $(".infogragis-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        items: 4,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa-solid fa-angle-left "></i>',
            '<i class="fa-solid fa-angle-right "></i>'
        ]
    });
    
    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }

        var header_navbar = document.querySelector(".navbar-sub");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("pinned");
        } else {
            header_navbar.classList.remove("pinned");
        }




        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if(backToTo){
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                backToTo.style.display = "flex";
            } else {
                backToTo.style.display = "none";
            }
        }
        
    };

    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    if(navbarToggler!= null){
        navbarToggler.addEventListener('click', function () {
            navbarToggler.classList.toggle("active");
        });
    }
    

   
    
    

    })(jQuery);

    
    
    $(document).ready(function () {

        $('#list_file').DataTable({
            "autoWidth": true,
            "dom": 'Plfrtip',
            "language": {
                "searchPanes": {
                    "emptyPanes": 'There are no panes to display. :/'
                }
            }
        });

        
        $('#list_images').DataTable({
            "autoWidth": true,
            "dom": 'Plfrtip',
            "language": {
                "searchPanes": {
                    "emptyPanes": 'There are no panes to display. :/'
                }
            }
        });

        $('#myModal').on('hidden.bs.modal', function () {
            // Load up a new modal...
            $('#myModalNew').modal('show')
          })

        $('#list_file thead th').each( function () {
            var number = $(this).index().toString();
            var n = number.search(rows);
            if (number.search(rows) == 0){
                var title = $('#ist_file thead th').eq( $(this).index() ).text();
                $(this).html( '<input type="text" placeholder="aaa" />' );
            };
        } ); 
        
        var url = window.location.origin;
        var url2 = window.location.href;
        
        var arr=url2.split('/');//arr[0]='example.com'
                       //arr[1]='event'
                       //arr[2]='14aD9Uxp?p=10'


        var table = $('#download-tables').DataTable({
            
            "processing": true,
            "responsive":true,
            "serverSide": true,
            "ordering": true, // Set true agar bisa di sorting
            "ajax":
            {
                "url": url+"/osdm/download/view_data_type/"+arr[6], // URL file untuk proses select datanya edit di sini bisa terjadi pergantian host
                "type": "POST"
            },
            "deferRender": true,
            "pageLength": 10,
            "aLengthMenu": [[5, 10, 50],[ 5, 10, 50]], // Combobox Limit
            "language" :{
                "url" : "//cdn.datatables.net/plug-ins/1.12.1/i18n/id.json",
                "sEmptyTable" : "Tidads"
            },
            "columns": [
                // {"data": 'No',
                // render: function (data, type, row, meta) {
                //         return meta.row + 1;
                // }
                // },
                { "data": "download_id"},
                { "data": "download_nm" }, // Tampilkan judul
                { "data": "download_file",
                    "render": 
                    function( data, type, row, meta ) {
                        return '<a href="'+url+'/download/'+encodeURIComponent(data)+'"><i class="fa fa-download"></i></a>';
                    }
                },
            ],
            
            //"order": [[0, 'desc']]
        });

        table.on('draw.dt', function () {
            var info = table.page.info();
            table.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + info.start;
            });
        });
        
        
        
        // table.on('order.dt search.dt', function () {
        //     let i = 1;
     
        //     t.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
        //         this.data(i++);
        //     });
        // }).draw();
        //alert( url[6] );
        // alert(arr[0]);
        // alert(arr[1]);
        // alert(arr[2]);
        // alert(arr[3]);
        // alert(arr[4]);
        // alert(url2);
        // alert(arr[6]);


        
        //$("#splide01-slide04").css('display','none');


    });
    
    $(".rs-openChatBtn.widget-close-btn-row").click(function(){
        // alert( "aaa" );
        $(".rs-openChat").css('display','block').popover();
        // $(".rs-openChat").show();
        // alert( "aaa" );
        // $('.rs-openChatBtnp .widget-close-btn').css('display','none');
        // $('.rs-openChatBtnp.widget-close-btn-row').hide();
        $(".rs-openChatBtn.widget-close-btn-row").css('display','none');
    });
    $(".rs-close.widget-close-btn").click(function(){
        $(".rs-openChat").css('display','none');
        $(".rs-openChatBtn.widget-close-btn-row").css('display','block').popover();
        
    });

function sop_search() {
    var query = document.querySelector('#accordion_search_bar').value;
    //console.log(query);
    // this wil grab all <li> elements from all <ul> elements on the page
    // however, you will want to specify a unique attribute for only the elements you wish to include
    // var elements = document.querySelectorAll('#accordionSOP ul > li');
    var elements = document.querySelectorAll('#accordionSOP > .accordion-item');
    console.log(elements);
    var parent1,parent2,parent3;
    var child1,child2;
    var find,find2;
    for (var i = 0; i < elements.length; i ++) {
        parent1 = elements[i].querySelectorAll('.accordion-item');
        console.log("parent1 : "+parent1.length);
        for(var j = 0; j<parent1.length;j++){
            parent2 = parent1[j].querySelectorAll('ul > li');
            console.log("parent2 : "+parent2.length);
            find = 0;
            for(var k = 0; k < parent2.length; k++){
                
                parent3 = parent2[k];
                if (parent3.innerText.toUpperCase().indexOf(query.toUpperCase()) !== -1){
                    parent3.style.display = '';
                    find++;
                }else{
                    parent3.style.display = 'none';
                }
            }
            console.log("banyak : "+find);
            parent2 = parent1[j].querySelector('.accordion-collapse');
            if(find > 0){
                console.log(parent1[j]);                
                parent2.classList.add('show');
                parent1[j].style.display = '';
            }else{
                parent2.classList.remove('show');
                parent1[j].style.display = 'none';
            }            
        }
        parent1 = elements[i].querySelector('.accordion-collapse');
        if(find2 > 0){
            parent1.classList.add('show');
        }else{
            parent1.classList.add('show');
        }

        
    //   var el = elements[i];
    //   parent1 = el.closest('.accordion-collapse');
    //   parent2 = parent1.closest('.accordion-item');
    //   // child1 = parent2.querySelector('.accordion-button.collapsed');
    //   parent3 = parent2.closest('.accordion-collapse');
    //   // child2 = parent3.querySelector('.accordion-button.collapsed');
    // // console.log("element : "+el.innerText+"parent : "+parent1.id+"parent2 : "+parent2.id+"parent 3 : "+parent3.id);
    //   if (el.innerText.toUpperCase().indexOf(query.toUpperCase()) !== -1){
    //     //console.log("S : "+el.innerText);
    //     el.style.display = '';
        
    //     parent1.classList.add('show');      
        
    //     // if(child1 != null){
    //     //     child1.classList.remove('collapsed');
    //     // }
        
    //     //parent2.classList.add('show');       
        
    //     // if(child2 != null){
    //     //     child2.classList.remove('collapsed');
    //     // }
    //     parent3.classList.add('show');
    //   }else if(i< elements.length+1){
    //     //console.log("S : "+el.innerText);
    //     el.style.display = 'none';
        
        
    //   }
      //console.log(i);
    }
}

     
