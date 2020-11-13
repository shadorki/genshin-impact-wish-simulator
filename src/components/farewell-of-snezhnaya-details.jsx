import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import DetailsBox from './details-components/details-box';
import StarsBar from './details-components/stars-bar';
import SubheadingSeparator from './details-components/subheading-separator';
import EventDurationHeading from './details-components/event-duration-heading'
import FarewellOfSnezhnaya from '../models/farewell-of-snezhnaya'
import Table from './details-components/table'
import Title from './details-components/title'


export default function FarewellOfSnezhnayaDetails() {
  const farewell = new FarewellOfSnezhnaya()
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>| Event Wish "Farewell of Snezhnaya" </h1>
        </Title>
        <SubheadingSeparator
          content="Increased Drop Rates!"
        />
        <StarsBar
          starCount={5}
          content="Percentage of 5-Star Item Drops：50.000%"
          bgColor="#dcbba5"
        />
        <Row>
          <DetailsBox
            title={'tartaglia'}
            isWeapon={false}
            element={'water'}
          />
        </Row>
        <StarsBar
          starCount={4}
          content="Percentage of 4-Star Item Drops：50.000%"
          bgColor="#b6abbf"
        />
        <Row>
          <DetailsBox
            title={'diona'}
            isWeapon={false}
            element={'cryo'}
          />
          <DetailsBox
            title={'ningguang'}
            isWeapon={false}
            element={'geo'}
          />
          <DetailsBox
            title={'beidou'}
            isWeapon={false}
            element={'electric'}
          />
        </Row>
        <SubheadingSeparator
          content="Wish Details"
        />
        <EventDurationHeading
          content="Limited Time Event"
        />
        <Row>
          <Col xs="12">
            <p className="my-3">
              Event Wish "Farewell of Snezhnaya" is now available. During this event wish, the <span className="orange">event-exclusive</span> 5-star character <span className="aqua">"Childe" Tartaglia (Hydro)</span> as well as 4-star characters <span className="blue">"Kätzlein Cocktail" Diona (Cryo)</span>, <span className="purple">"Uncrowned Lord of Ocean" Beidou (Electro)</span>, and <span className="brass">"Eclipsing Star" Ningguang (Geo)</span> will get a <span className="orange">huge drop-rate boost!</span>
              <br/>
              <span className="orange">※ Of the above characters, the event-exclusive character will not be available in the standard wish "Wanderlust Invocation".</span>
            </p>
            <p className="my-3">
              〓Rules〓
            </p>
            <p className="my-3">
              5-Star Items
            </p>
            <p className="my-3">
              For Event Wish "Farewell of Snezhnaya": Base probability of winning 5-star character = <span className="orange">0.600%</span>; consolidated probability (incl. guarantee) = <span className="orange">1.600%</span>; guaranteed to win 5-star character at least once per <span className="orange">90</span> attempts. <br/>
            The first time you win a 5-star item in this event wish, there is a <span className="orange">50%</span> chance it will be the promotional character <span className="aqua"> "Childe" Tartaglia (Hydro)</span>. If the first 5-star character you win in this event wish is not the promotional character, then the next 5-star character you win is <span className="orange">guaranteed</span> to be the promotional character.
            </p>
            <p className="my-3">
              4-Star Items
            </p>
            <p className="my-3">
              For Event Wish "Farewell of Snezhnaya": Base probability of winning 4-star item = <span className="orange">5.100%</span>; base probability of winning 4-star character = <span className="orange">2.550%</span>, and base probability of winning 4-star weapon = <span className="orange">2.550%</span>; consolidated probability (incl. guarantee) of winning 4-star item = <span className="orange">13.000%</span>; guaranteed to win 4-star or above item at least once per <span className="orange">10</span> attempts. <br />
              The first time you win a 4-star item in this event wish, there is a <span className="orange">50%</span> chance it will be one of the featured characters  <span className="blue">"Kätzlein Cocktail" Diona (Cryo)</span>, <span className="purple">"Uncrowned Lord of Ocean" Beidou (Electro)</span>, and <span className="brass">"Eclipsing Star" Ningguang (Geo)</span>. If the first 4-star item you win in this event wish is not one of the featured characters, then the next 4-star item you win is <span className="orange">guaranteed</span> to be a featured character.
            </p>
            <p className="my-3">
              4-star weapons won in this wish come with <span className="orange">Masterless Starglitter</span> ×2; 3-star weapons won in this wish come with <span className="purple">Masterless Stardust</span> ×15.
            </p>
            <p className="my-3">
              〓Duplicate Characters〓
            </p>
            <p className="my-3">
              On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna</span> ×1 and <span className="orange">Masterless Starglitter</span> ×10; from the 8th time onwards it will be converted into <span className="orange">Masterless Starglitter</span> ×25.
            </p>
            <p className="my-3">
              On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the game): The 2nd – 7th time you obtain the character, it will be converted into <span className="purple">that character's Stella Fortuna</span> ×1 and <span className="orange">Masterless Starglitter</span> ×2; from the 8th time onwards it will be converted into <span className="orange">Masterless Starglitter</span> ×5.
            </p>
            <p className="my-3">
              ※ This is a character event wish. The wish guarantee count is accumulated within character event wishes only and is independent of the guarantee counts of other types of wishes.
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
          items={farewell.getDrops(5)}
        />
        <StarsBar
          starCount={4}
          content="Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)"
          bgColor="#b6abbf"
        />
        <Table
          items={farewell.getDrops(4)}
        />
        <StarsBar
          starCount={3}
          content="Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)"
          bgColor="#a5bacc"
        />
        <Table
          items={farewell.getDrops(3)}
        />
      </Container>
    </div>
  )
}
