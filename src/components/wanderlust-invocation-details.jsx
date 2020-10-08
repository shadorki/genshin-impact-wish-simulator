import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import StarsBar from './details-components/stars-bar';
import SubheadingSeparator from './details-components/subheading-separator';
import EventDurationHeading from './details-components/event-duration-heading'
import WanderlustInvocation from '../models/wanderlust-invocation'
import Table from './details-components/table'
import Title from './details-components/title'

export default function WanderlustInvocationDetails() {
  const wanderlust = new WanderlustInvocation()
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>| Standard Wish "Wanderlust <span className="gold">Invocation</span>"</h1>
        </Title>
        <SubheadingSeparator
          content="Wish Details"
        />
        <EventDurationHeading
          content="Permanent"
        />
        <Row>
          <Col xs="12">
          <p className="my-3">
            Wanderlust <span className="gold">Invocation</span> is a standard wish with no time limit. Non-promotional characters and weapons are available. <br/>
            In this wish, each 10-wish set is <span className="orange">guaranteed</span> to include at least one 4-star or above item
          </p>
          <p className="my-3">
            〓Rules〓
          </p>
          <p className="my-3">
              Base probability of winning 5-star item = <span className="orange">0.600%</span>; consolidated probability (incl. guarantee) = <span className="orange">1.600%</span>; guaranteed to win 5-star item at least once per <span className="orange">90</span> attempts. <br/>
              Base probability of winning 4-star item = <span className="orange">5.100%</span>; consolidated probability (incl. guarantee) = <span className="orange">13.000%</span>; guaranteed to win 4-star or above item at least once per <span className="orange">10</span> attempts. <br/>
              5-star weapons won in this wish include <span className="gold">Masterless Starglitter</span> ×10; 4-star weapons include <span className="gold">Masterless Starglitter</span> ×2; 3-star weapons include <span className="purple">Masterless Stardust</span> ×15.
          </p>
            <p className="my-3">
              〓Duplicate Characters〓
            </p>
            <p className="my-3">
              On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna</span> ×1 and <span className="orange">Masterless Starglitter</span> ×10; from the 8th time onwards it will be converted into <span className="orange">Masterless Starglitter</span> ×25.
              On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna</span> ×1 and <span className="gold">Masterless Starglitter</span> ×2; from the 8th time onwards it will be converted into <span className="gold">Masterless Starglitter</span> ×5.
            </p>
            <h4 className="my-3 brass">
              Items to wish for:
            </h4>
          </Col>
        </Row>
        <StarsBar
          starCount={5}
          content="Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)"
          bgColor="#dcbba5"
        />
        <Table
          items={wanderlust.getDrops(5)}
        />
        <StarsBar
          starCount={4}
          content="Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)"
          bgColor="#b6abbf"
        />
        <Table
          items={wanderlust.getDrops(4)}
        />
        <StarsBar
          starCount={3}
          content="Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)"
          bgColor="#a5bacc"
        />
        <Table
          items={wanderlust.getDrops(3)}
        />
      </Container>
    </div>
  )

}
