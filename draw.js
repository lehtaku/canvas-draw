$(document).ready(function () {
    /*
     * Initializations
     */
    let currentColor = '#FF4136'
    let currentTool = 'brush'

    let ctx = document.getElementById('drawCanvas').getContext('2d')
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor

    let mouseDown = false
    let drawing = true
    let mouseX = 0
    let mouseY = 0

    $('.color-btn#' + ctx.strokeStyle.slice(1).toUpperCase()).addClass('active focus')
    $('.tool-btn#' + currentTool).addClass('active focus')
    $('.size-btn#' + ctx.lineWidth).addClass('active focus')
    $('.size-dot').css('background-color', ctx.strokeStyle)
    setCursor()


    function setCursor() {
        let fixingNum = ctx.lineWidth / 2
        if (currentTool === 'brush') {
            let cursorName = currentColor.toUpperCase().slice(1) + '-' + ctx.lineWidth + '.png'
            $('#canvas').css('cursor', `url('./cursors/${cursorName}') ${fixingNum} ${fixingNum}, auto`)
            ctx.strokeStyle = currentColor
        } else {
            $('#canvas').css('cursor', `url('./cursors/eraser.png') 8 40, auto`)
            ctx.strokeStyle = '#FFFFFF'
        }
    }

    /*
     * Toolbar
     */
    $('.color-btn').click(function () {
        $(this).addClass('active focus')
        $('.color-btn#' + ctx.strokeStyle.slice(1).toUpperCase()).removeClass('active focus')
        currentColor = '#' + $(this).attr('id')
        $('.size-dot').css('background-color', currentColor)
        ctx.strokeStyle = currentColor
        setCursor()
    })

    $('.tool-btn').click(function () {
        $(this).addClass('active focus')
        $('.tool-btn#' + currentTool).removeClass('active focus')
        currentTool = $(this).attr('id')
        setCursor()
    })

    $('.size-btn').click(function () {
        $(this).addClass('active')
        $('.size-btn#' + ctx.lineWidth).removeClass('active focus')
        let btnId = $(this).attr('id')
        ctx.lineWidth = parseInt(btnId)
       setCursor()
    })

    /*
     * Canvas
     */
    $('#canvas-wrapper')
        .mouseenter(function () {
        mouseDown = false
    })

    $('#drawCanvas').mousedown(function (event) {
        mouseDown = true
        ctx.beginPath()
        ctx.arc(event.offsetX, event.offsetY, 1, 0, 2 * Math.PI)
        ctx.stroke()

        mouseX = event.offsetX
        mouseY = event.offsetY
    }).mousemove(function (event) {
        if (mouseDown && drawing) {
            drawLine(mouseX, mouseY, event.offsetX, event.offsetY)
            mouseX = event.offsetX
            mouseY = event.offsetY
        }
    }).mouseup(function () {
        mouseDown = false
    })

    function drawLine(fromX, fromY, toX, toY) {
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.stroke()
    }

    $('#clear').click(function () {
        ctx.clearRect(0, 0, 800, 600)
    })

})
