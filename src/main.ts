// Dropzone 방식 -> 그냥 dragover에 계속 css를 추가한거네. 그럼 leave발생해도 다시 enter가 나오니 css가 적용되고
// 근데 가끔 안되는게 있는데 아마 enter 후 leave가 발생해서 인듯
const $container = document.getElementById('app')

function isContainsFile(e: DragEvent) {
  return e.dataTransfer?.types.some((type) => type.toLowerCase() === 'files')
}

function noPropagation(e: DragEvent) {
  if (!isContainsFile(e)) {
    return false
  }

  e.stopPropagation()
  e.preventDefault()
}

function createDropzone() {
  const $dropzone = document.createElement('div')

  $dropzone.classList.add('dropzone')
  $dropzone.style.border = '1px solid #000000'
  $dropzone.style.height = '250px'

  $dropzone.addEventListener('dragenter', function (e) {
    console.log({
      event: 'dragenter',
      target: e.target,
      currentTarget: e.currentTarget,
    })

    const target = e.currentTarget as HTMLDivElement

    target.style.boxShadow = '0 0 10px 0 #00FF00'
  })

  $dropzone.addEventListener('dragleave', function (e) {
    console.log({
      event: 'dragleave',
      target: e.target,
      currentTarget: e.currentTarget,
    })

    const target = e.currentTarget as HTMLDivElement

    target.style.boxShadow = ''
  })

  $dropzone.addEventListener('dragover', function (e) {
    noPropagation(e)

    const target = e.currentTarget as HTMLDivElement

    target.style.boxShadow = '0 0 10px 0 #00FF00'
  })

  $dropzone.addEventListener('drop', function (e) {
    noPropagation(e)

    const target = e.currentTarget as HTMLDivElement

    target.style.boxShadow = ''
  })

  return $dropzone
}

function createChild() {
  const $child = document.createElement('div')

  $child.classList.add('child')

  $child.style.backgroundColor = '#FF0000'
  $child.style.width = '50px'
  $child.style.height = '50px'

  return $child
}

const $dropzone = createDropzone()
const $dropzoneWithChild = createDropzone()

const $child = createChild()

$dropzoneWithChild.appendChild($child)

$container?.appendChild($dropzone)
$container?.appendChild($dropzoneWithChild)
