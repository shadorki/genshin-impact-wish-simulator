import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import StarsBar from './details-components/stars-bar';
import SubheadingSeparator from './details-components/subheading-separator';
import EventDurationHeading from './details-components/event-duration-heading'
import WanderlustInvocation from '../models/wanderlust-invocation'
import Table from './details-components/table'
import Title from './details-components/title'

export default function BeginnersWishDetails() {
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>| Beginners' <span className="gold">Wish</span></h1>
        </Title>
        <SubheadingSeparator
          content="Wish Details"
        />
        <EventDurationHeading
          content="No time limit (Closes after 20 wishes)"
        />
        <Row>
          <Col xs="12">
            <p className="my-3">
              Beginners' <span className="gold">Wish</span> has no time limit and is aimed at Travelers who have recently landed in Teyvat. Non-promotional characters and weapons are available. <br/>
              In Beginners' Wish, 10-wish sets cost <span className="orange">20%</span> less Acquaint Fate, and your first 10-wish set is guaranteedto include <span className="gold">"Chivalric Blossom" Noelle (Geo)</span>, and your second 10-wish set is guaranteed to include one <span className="orange">other</span> min. 4-star character! <br/>
              Beginners' Wish expires after <span className="orange">20</span> attempts. After the wish expires, the page will disappear.
            </p>
            <p className="my-3">
              〓Rules〓
            </p>
            <p className="my-3">
              Base probability of winning 5-star character = <span className="orange">0.600%</span> <br/>
              Base probability of winning 4-star character = <span className="orange">5.100%</span>; consolidated probability (incl. guarantee) = <span className="orange">13.000%</span>; guaranteed to win 4-star or above character at least once per <span className="orange">10</span> attempts <br/>
              3-star weapons won in this wish come with <span className="purple">Masterless Stardust</span> ×15
            </p>
            <p className="my-3">
              〓Duplicate Characters〓
            </p>
            <p className="my-3">
              On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna ×1</span> and <span className="gold">Masterless Starglitter</span> ×10; from the 8th time onwards it will be converted into <span className="gold">Masterless Starglitter</span> ×25 <br/>
              On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna ×1</span> and <span className="gold">Masterless Starglitter</span> ×2; from the 8th time onwards it will be converted into <span className="gold">Masterless Starglitter</span> ×5
            </p>
            <h4 className="my-3 brass">
              Items to wish for:
            </h4>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
