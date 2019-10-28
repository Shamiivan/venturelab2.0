$(window).scroll(function () {
    var top = $(window).scrollTop();
    console.log(top)
    if (top >= 300) {
        $("#navbar").addClass('bg-blue');
        $("#preventure").addClass('bg-pink');
        $("#contact").addClass('bg-mustard');
    } else if (top <= 300) {
        $("#navbar").removeClass('bg-blue');
        $("#preventure").removeClass('bg-pink');
        $("#contact").removeClass('bg-mustard');
    }
});

// $(window).scroll(function () {
//     let viewPortLevel = $(window).scrollTop();
//     console.log(viewPortLevel);
// });


$("#add-comment").click(function () {
    $("#comment-section").removeClass('blocked');
});