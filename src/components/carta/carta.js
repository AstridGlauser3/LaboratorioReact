import '../carta/carta.css';
import React from 'react';

export default function Single_Card({ card, ele, card_flippedd, off, cardback }) {
  const handle_Click = () => {
    if (!off) {
      ele(card);
    }
  };

  return (
    <div className="card">
      <div className={card_flippedd ? 'flipped' : 'not-flipped'}>
        <div className="card-front">
          <img className="image-card-dimensions" src={card.src} alt="card front" />
        </div>
        <img
          className="card-back"
          src={cardback.src}
          onClick={handle_Click}
          alt="card back"
        />
      </div>
    </div>
  );
}
