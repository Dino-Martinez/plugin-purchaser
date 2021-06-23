const buttons = $('.card-btn')
const descriptions = $('.card-description')

descriptions.each(function() {
  console.log($(this).height())
  $.data(this, "realHeight", $(this).height())
  $.data(this, "toggled", false)
}).css({ overflow: "hidden", height: "0px" })

buttons.click(function() {
  const degree = 180
  $(this).toggleClass('rotate')
console.log($(this).height())
  var description = $(this).prev(".card-description")
  if (description.data("toggled")) {
    description.css('height', '0')
    $.data(description[0], "toggled", false)
  }
  else {
    description.css('height', description.data("realHeight"))
    $.data(description[0], "toggled", true)
  }
})
