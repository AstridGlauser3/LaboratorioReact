import '../juego/juego.css'
import React , {useEffect , useState} from 'react'
import Single_Card from '../carta/carta'

const card_back = {"src": "https://images.photowall.com/products/60844/watercolor-textured-background.jpg?h=699&q=85"}
const card_Images = [
  { "src": "https://noticias.animeonegai.com/wp-content/uploads/2022/10/yotsuba.jpg", matched:false },
  { "src": "https://wallpapers-clan.com/wp-content/uploads/2023/01/chainsaw-man-pochita-pfp-1.jpg", matched:false },
  { "src": "https://e0.pxfuel.com/wallpapers/3/763/desktop-wallpaper-anime-girl-dress-blue-eyes-raining-water-drops-for-galaxy-s3-galaxy-note-ii-galaxy-nexus-alcatel-one-touch-idol-ultra-thumbnail.jpg", matched:false },
  { "src": "https://w0.peakpx.com/wallpaper/708/665/HD-wallpaper-nino-nakano-beautiful-the-quintessential-quintuplets.jpg", matched:false },
  { "src": "https://ih1.redbubble.net/image.2656638535.6194/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg", matched:false},
  { "src": "https://i.pinimg.com/originals/cf/06/b2/cf06b212e71940e5217dd82400fb287d.jpg", matched:false},
  { "src": "https://w0.peakpx.com/wallpaper/707/953/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg", matched:false},
  { "src": "https://c4.wallpaperflare.com/wallpaper/874/1022/515/anime-kaguya-sama-love-is-war-kaguya-shinomiya-hd-wallpaper-preview.jpg", matched:false}


]

export default function JUEGO_MEMORIA() {
  const [cartas, set_cartas] = useState([])
  const [turnos, set_turnos] = useState(0)
  const [juego_terminado, set_juego_terminado] = useState(false)
  const [PrimeraCarta, set_PrimeraCarta] = useState(null)
  const [SegundaCarta, set_SegundaCarta] = useState(null)
  const [off, set_off] = useState(false)

  function reiniciarCartas() {
    set_PrimeraCarta(null)
    set_SegundaCarta(null)
  }

  const cartaSeleccionadaOEmparejada = (card) => {
    return card === PrimeraCarta || card === SegundaCarta || card.matched;
  };
  

  
 
  

  function shuffle() {
    const newCards = card_Images.concat(card_Images)
    const shuffledCards = []
    while (newCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * newCards.length)
      shuffledCards.push({ ...newCards[randomIndex], id: Math.random() })
      newCards.splice(randomIndex, 1)
    }
    
    reiniciarCartas()
    set_cartas(shuffledCards)
    set_turnos(0)
    set_juego_terminado(false)
  }


    const Estado = () => {
    let cartas_contador = cartas.filter(card_element => {
      console.log(card_element.matched.toString());
      return card_element.matched;
    }).length;
  
    console.log(`Contador: ${cartas_contador}`);
    return cartas_contador;
  };

  //eleccion
  const ele = (card) => {
    if (!cartaSeleccionadaOEmparejada(card)) {
      PrimeraCarta ? set_SegundaCarta(card) : set_PrimeraCarta(card);
    }
  };
  

  
  useEffect(() => {
    if (PrimeraCarta && SegundaCarta && PrimeraCarta.src === SegundaCarta.src) {
      set_cartas((recartas) => {
        return recartas.map((card) => {
          if (card.src === PrimeraCarta.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      reiniciar_contador();
    }
  }, [PrimeraCarta, SegundaCarta]);


  useEffect(() => {
    if (PrimeraCarta && SegundaCarta && PrimeraCarta.src !== SegundaCarta.src) {
      set_off(true);
      setTimeout(() => {
        reiniciar_contador();
        set_off(false);
      }, 1000);
    }
  }, [PrimeraCarta, SegundaCarta]);



  const reiniciar_contador = () => {
    reiniciarCartas()
    set_turnos(nuevost => nuevost + 1)
    set_off(false)
  }

  console.log(cartas, turnos)

  useEffect(() => {
    shuffle()
  }, [])

  useEffect(() => {
    Estado()
  }, [PrimeraCarta, SegundaCarta])

  useEffect(() => {
    if (Estado() === 16) {
      set_juego_terminado(true);
    }
  }, [Estado()]);
  
  useEffect(() => {
    if (juego_terminado) {
      setTimeout(() => console.log(`Juego Finalizado: ${juego_terminado.toString()}`), 1000);
    }
  }, [juego_terminado]);
  

  return (
    <div className="Game" >
      <b><h1>JUEGO DE MEMORIA</h1></b>
      
     
      <p>Movimientos: {turnos}</p>
      <button onClick = {shuffle} >Nuevo Juego</button>
      <div className='juego_terminado' >{juego_terminado ? 'Juego Terminado' : ''}</div>
      <div className="card-grid">
        {cartas.map(card => (
          <Single_Card 
            key={card.id} 
            off={off}
            ele={ele}
            card={card} 
            card_flippedd={card === PrimeraCarta || card === SegundaCarta || card.matched}
            cardback = {card_back}
          />
        ))}
      </div>
    </div>
  )
}