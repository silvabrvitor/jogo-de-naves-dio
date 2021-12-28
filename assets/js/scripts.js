function start() {
  // Inicio da função start()

  $('#inicio').hide()

  $('#fundoGame').append("<div id='bg-planet' class='anima-fundo2'></div>")
  $('#bg-planet').append("<div id='bg-planet2' class='anima-fundo3'></div>")
  $('#bg-planet2').append("<div id='bg-planet3' class='anima-fundo4'></div>")

  $('#bg-planet3').append("<div id='game'></div>")
  $('#game').append("<div id='jogador'></div>")
  gerarInimigo()
  $('#fundoGame').append("<div id='placar'></div>")

  //Principais variáveis do jogo

  var jogo = {}
  let elementsByClass = document.getElementsByClassName('inimigos')
  let posicaoInimigoX
  let posicaoInimigoY
  var pontos = 0
  var total = 0
  let retornoCollision
  var fimdejogo = false
  var podeAtirar = true
  var velocidade = 5
  var posicaoY = parseInt(Math.random() * 334)
  var TECLA = {
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    SPACE: 32,
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37
  }

  jogo.pressionou = []

  var somDisparo = document.getElementById('somDisparo')
  var somExplosao = document.getElementById('somExplosao')
  var musica = document.getElementById('musica')
  var somGameover = document.getElementById('somGameover')

  //Música em loop
  musica.addEventListener(
    'ended',
    function () {
      musica.currentTime = 0
      musica.play()
    },
    false
  )
  musica.play()

  //Verifica se o usuário pressionou alguma tecla

  $(document).keydown(function (e) {
    jogo.pressionou[e.which] = true
  })

  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false
    $('#jogador').css({
      'background-image': 'url(assets/img/player/player1.png)'
    })
  })

  //Game Loop

  jogo.timer = setInterval(loop, 30)

  function loop() {
    movejogador()
    moveInimigo(elementsByClass)
    colisao()
    placar()
  } // Fim da função loop()

  function colisao() {
    let posicaoJogadorX = parseInt($('#jogador').css('left'))
    let posicaoJogadorY = parseInt($('#jogador').css('top'))
    let jogadorCollision = $('#jogador').collision($('.inimigos'))
    if (jogadorCollision.length > 0) {
      explosao(posicaoJogadorX, posicaoJogadorY)
      somExplosao.play()
      jogadorCollision = 0

      gameOver()
    }
  }
  function shootCollision() {
    var colisao0 = $('#disparo').collision($('#inimigo0'))
    var colisao1 = $('#disparo').collision($('#inimigo1'))
    var colisao2 = $('#disparo').collision($('#inimigo2'))
    var colisao3 = $('#disparo').collision($('#inimigo3'))
    var colisao4 = $('#disparo').collision($('#inimigo4'))
    var colisao5 = $('#disparo').collision($('#inimigo5'))

    if (colisao0.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao0 = -1
      reposiciona('#inimigo0')
      return true
      //$('#disparo').remove()
    }
    if (colisao1.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao1 = -1
      reposiciona('#inimigo1')
      return true
      //$('#disparo').remove()
    }
    if (colisao2.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao2 = -1
      reposiciona('#inimigo2')
      return true
      // $('#disparo').remove()
    }
    if (colisao3.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao3 = -1
      reposiciona('#inimigo3')
      return true
      // $('#disparo').remove()
    }
    if (colisao4.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao4 = -1
      reposiciona('#inimigo4')
      return true
      //$('#disparo').remove()
    }
    if (colisao5.length > 0) {
      //somExplosao.play()
      pontos = pontos + 50
      total++
      colisao5 = -1
      reposiciona('#inimigo5')
      return true
      //$('#disparo').remove()
    }

    function reposiciona(elem) {
      posicaoInimigoX = parseInt($(elem).css('left'))
      posicaoInimigoY = parseInt($(elem).css('top'))
      somExplosao.play()
      explosao(posicaoInimigoX, posicaoInimigoY)

      posicaoY = parseInt(Math.random() * 550)
      $(elem).css('left', 890)
      $(elem).css('top', posicaoY)
    }
    // return false
  }

  function explosao(inimigoX, inimigoY) {
    //somExplosao.play()
    if ($('#explosao').css('left', '0') && $('#explosao').css('top', '0')) {
      $('#explosao').remove()
      $('#game').append("<div id='explosao' class='explosao'></div")

      $('#explosao').css('left', inimigoX)
      $('#explosao').css('top', inimigoY)
    }
    var tempoExplosao = window.setInterval(removeExplosao, 1000)

    //$('#explosao' + i).remove()
    function removeExplosao() {
      // div2.remove()
      window.clearInterval(tempoExplosao)
      tempoExplosao = null
      $('#explosao').remove()
    }
  } // Fim da fun��o explosao2()

  function movejogador() {
    if (jogo.pressionou[TECLA.UP_ARROW]) {
      var topo = parseInt($('#jogador').css('top'))
      $('#jogador').css('top', topo - 10)
      $('#jogador').css({
        'background-image': 'url(assets/img/player/player3.png)'
      })

      if (topo <= 0) {
        $('#jogador').css('top', topo + 10)
      }
    }

    if (jogo.pressionou[TECLA.DOWN_ARROW]) {
      var topo = parseInt($('#jogador').css('top'))
      $('#jogador').css('top', topo + 10)
      $('#jogador').css({
        'background-image': 'url(assets/img/player/player2.png)'
      })
      if (topo >= 560) {
        $('#jogador').css('top', topo - 10)
      }
    }

    if (jogo.pressionou[TECLA.SPACE]) {
      //Chama função Disparo
      disparo()
    }

    if (jogo.pressionou[TECLA.ARROW_RIGHT]) {
      var xRight = parseInt($('#jogador').css('left'))
      console.log(xRight)
      $('#jogador').css('left', xRight + 10)
      // $('#jogador').css({
      //   'background-image': 'url(assets/img/player/player1.png)'
      // })
      if (xRight >= 850) {
        $('#jogador').css('left', xRight - 10)
      }
    }

    if (jogo.pressionou[TECLA.ARROW_LEFT]) {
      var xRight = parseInt($('#jogador').css('left'))
      console.log(xRight)
      $('#jogador').css('left', xRight - 10)
      // $('#jogador').css({
      //   'background-image': 'url(assets/img/player/player1.png)'
      // })
      if (xRight <= 0) {
        $('#jogador').css('left', xRight + 10)
      }
    }
  } // fim da função movejogador()

  function gerarInimigo() {
    let posicaoY //= parseInt(Math.random() * 550)
    let i = 0

    setInterval(() => {
      if (i <= 5) {
        posicaoY = parseInt(Math.random() * 550)
        $('#game').append("<div id='inimigo" + i + "' class='inimigos'></div>")
        console.log('#inimigo' + i)
        $(String('#inimigo' + i)).css('left', 890)
        $(String('#inimigo' + i)).css('top', posicaoY)
        i = i + 1
      }
    }, 2000)
  }

  function moveInimigo(inimigo) {
    //let enemy = [] //'#' + String(inimigo)
    for (let i = 0; i < inimigo.length; i++) {
      posicaoX = parseInt($(inimigo[i]).css('left'))
      $(inimigo[i]).css('left', posicaoX - velocidade)
      //$('#' + String(inimigo[i])).css('top', posicaoY)
      //enemy.push(inimigo[i])
      if (posicaoX <= 0) {
        posicaoY = parseInt(Math.random() * 550)
        $(inimigo[i]).css('left', 890)
        $(inimigo[i]).css('top', posicaoY)
      }
    }
  }

  function disparo() {
    if (podeAtirar == true) {
      somDisparo.play()
      podeAtirar = false
      topo = parseInt($('#jogador').css('top'))
      posicaoX = parseInt($('#jogador').css('left'))
      tiroX = posicaoX + 33
      topoTiro = topo + 33
      $('#game').append("<div id='disparo' class='anima-disparo'></div>")
      $('#disparo').css('top', topoTiro)
      $('#disparo').css('left', tiroX)

      var tempoDisparo = window.setInterval(executaDisparo, 40)
    } //Fecha podeAtirar
    // var tempoDisparo = window.setInterval(executaDisparo, 90)

    //executaDisparo()
    function executaDisparo() {
      posicaoX = parseInt($('#disparo').css('left'))
      $('#disparo').css('left', posicaoX + 30)

      if (posicaoX > 900) {
        window.clearInterval(tempoDisparo)
        tempoDisparo = null
        $('#disparo').remove()
        $('#disparo').css('top', topoTiro)
        $('#disparo').css('left', tiroX)
        podeAtirar = true
      }
      if (shootCollision() == true) {
        console.log('*************************************')
        window.clearInterval(tempoDisparo)
        tempoDisparo = null
        $('#disparo').remove()
        $('#disparo').css('top', topoTiro)
        $('#disparo').css('left', tiroX)
        podeAtirar = true
      }
    } // Fecha executaDisparo()
  } // Fecha disparo()

  function placar() {
    $('#placar').html(
      '<h2> Pontos: ' + pontos + ' Total Inimigos: ' + total + '</h2>'
    )
  } //fim da função placar()

  //Função GAME OVER
  function gameOver() {
    fimdejogo = true
    musica.pause()
    somGameover.play()

    window.clearInterval(jogo.timer)
    jogo.timer = null
    podeAtirar = false
    $('#jogador').remove()
    $('#inimigo0').remove()
    $('#inimigo1').remove()
    $('#inimigo2').remove()
    $('#inimigo3').remove()
    $('#inimigo4').remove()
    $('#inimigo5').remove()
    $('#placar').remove()
    $('#bg-planet').remove()
    $('#bg-planet2').remove()
    $('#bg-planet3').remove()
    $('#game').remove()

    $('#fundoGame').append("<div id='fim'></div>")

    $('#fim').html(
      '<h1> Game Over </h1><p>Sua pontuação foi: ' +
        pontos +
        '</p>' +
        "<div id='reinicia'><h3>Jogar Novamente</h3></div>"
    )
    document.getElementById('fim').addEventListener('click', reiniciaJogo)
  } // Fim da função gameOver();
} // Fim da função start

//Reinicia o Jogo

function reiniciaJogo() {
  somGameover.pause()
  $('#fim').remove()
  fimdejogo = false
  start()
}
