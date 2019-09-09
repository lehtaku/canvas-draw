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

    /*
     * Toolbar
     */
    $('.color-btn').click(function () {
        $(this).addClass('active focus')
        $('.color-btn#' + ctx.strokeStyle.slice(1).toUpperCase()).removeClass('active focus')

        currentColor = '#' + $(this).attr('id')
        $('.size-dot').css('background-color', currentColor)
        ctx.strokeStyle = currentColor
    })

    $('.tool-btn').click(function () {
        $(this).addClass('active focus')
        $('.tool-btn#' + currentTool).removeClass('active focus')
        currentTool = $(this).attr('id')
    })

    $('.size-btn').click(function () {
        $(this).addClass('active')
        $('.size-btn#' + ctx.lineWidth).removeClass('active focus')
        let btnId = $(this).attr('id')
        ctx.lineWidth = parseInt(btnId)
    })

    /*
     * Canvas
     */
    $('#canvas-wrapper').mouseenter(function () {
        mouseDown = false
        if (currentTool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF'
        } else {
            ctx.strokeStyle = currentColor
        }
    })

    $('#drawCanvas').mousedown(function (event) {
        mouseDown = true
        let fixerNum = (ctx.lineWidth / 3)
        ctx.beginPath()
        ctx.arc(event.offsetX - fixerNum, event.offsetY - fixerNum, 1, 0, 2 * Math.PI)
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
        let fixerNum = (ctx.lineWidth / 3)
        ctx.beginPath()
        ctx.moveTo(fromX - fixerNum, fromY - fixerNum)
        ctx.lineTo(toX - fixerNum, toY - fixerNum)
        ctx.stroke()
    }

    $('#clear').click(function () {
        ctx.clearRect(0, 0, 800, 600)
    })

})
