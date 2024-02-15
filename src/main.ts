document.addEventListener('DOMContentLoaded', function () {
  const $dropzone = document.getElementById('dropzone')!

  $dropzone.addEventListener('dragover', function (e) {
    e.preventDefault()

    console.log('called dragover event')
  })

  $dropzone.addEventListener('drop', function (e) {
    e.preventDefault()

    console.log('called drop event')
  })
})
