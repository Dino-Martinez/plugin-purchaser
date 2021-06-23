const buttons = $('.card-btn')
const descriptions = $('.card-description')

descriptions.each(function() {
  $.data(this, "realHeight", $(this).height())
  $.data(this, "toggled", false)
}).css({ overflow: "hidden", height: "0px" })

buttons.click(function() {
  const degree = 180
  $(this).toggleClass('rotate')
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

const newForm = document.querySelector('#new-plugin') ?? document.querySelector('#edit-plugin')

if (newForm) {
  console.log('yup')
  newForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let plugin = {}
    const inputs = $('.form-input')
    for (const input of inputs) {
      plugin[input.name] = input.value
    }

    axios.post('/plugins', plugin).then(response => {
      console.log(response)
      window.location.replace(`/plugins/${response.data.plugin._id}`)
    }).catch(err => {
      const alert = $('#alert')
      alert.addClass('alert-warning')
      alert.append('<p>Oops, something went wrong! Please check your information and try again')
      alert.css('display', 'block')
      setTimeout(()=>{
        alert.css('display', 'none')
        alert.removeClass('alert-warning')
      }, 3000)
    })
  })
}
