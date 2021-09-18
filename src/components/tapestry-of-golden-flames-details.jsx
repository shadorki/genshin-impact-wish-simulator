import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import DetailsBox from "./details-components/details-box";
import StarsBar from "./details-components/stars-bar";
import SubheadingSeparator from "./details-components/subheading-separator";
import EventDurationHeading from "./details-components/event-duration-heading";
import TapestryOfGoldenFlames from "../models/tapestry-of-golden-flames";
import Table from "./details-components/table";
import Title from "./details-components/title";

export default function TapestryOfGoldenFlamesDetails() {
  const tapestry = new TapestryOfGoldenFlames();
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>
            | Event Wish "Tapestry of{" "}
            <span className="orange">Golden Flames</span>"
          </h1>
        </Title>
        <SubheadingSeparator content="Increased Drop Rates!" />
        <StarsBar
          starCount={5}
          content="Percentage of 5-Star Item Drops：50.000%"
          bgColor="#dcbba5"
        />
        <Row>
          <DetailsBox title={"yoimiya"} isWeapon={false} element={"pyro"} />
        </Row>
        <StarsBar
          starCount={4}
          content="Percentage of 4-Star Item Drops：50.000%"
          bgColor="#b6abbf"
        />
        <Row>
          <DetailsBox title={"sayu"} isWeapon={false} element={"wind"} />
          <DetailsBox title={"diona"} isWeapon={false} element={"cryo"} />
          <DetailsBox title={"xinyan"} isWeapon={false} element={"pyro"} />
        </Row>
        <SubheadingSeparator content="Wish Details" />
        <EventDurationHeading content="Limited Time Event" />
        <Row>
          <Col xs="12">
            <p className="my-3">
              Event Wish - Tapestry of{" "}
              <span className="orange">Golden Flames</span> is now available.
              During this event wish, tapestry 5-star character{" "}
              <span className="orange">
                "Frolicking Flames" Yoimiya (Pyro)
              </span>{" "}
              as well as 4-star characters{" "}
              <span className="teal">"Mujina Ninja" Sayu (Anemo)</span>,{" "}
              <span className="aqua">"Kätzlein Cocktail" Diona (Cryo)</span>, and{" "}
              <span className="orange">"Blazing Riff" Xinyan (Pyro)</span>{" "}
              will get a <span className="orange">huge drop-rate boost!</span>
              <br />
              <span className="orange">
                ※In most cases, tapestry base probability of all characters and
                weapons is evenly distributed. If there is a boost or guarantee
                in effect, please refer to the corresponding rules.
              </span>
              <br />
              <span>
                ※In most cases, tapestry base probability of all characters and
                weapons is evenly distributed. If tapestryre is a boost or
                guarantee in effect, please refer to tapestry corresponding
                rules.
              </span>
            </p>
            <p className="my-3">〓Rules〓</p>
            <p className="my-3">5-Star Items</p>
            <p className="my-3">
              For Event Wish - Tapestry of{" "}
              <span className="orange">Golden Flames</span>: Base probability of
              winning 5-star character = <span className="orange">0.600%</span>;
              consolidated probability (incl. guarantee) ={" "}
              <span className="orange">1.600%</span>; guaranteed to win 5-star
              character at least once per <span className="orange">90</span>{" "}
              attempts. <br />
              The first time you win a 5-star item in this event wish,
              tapestryre is a <span className="orange">50%</span> chance it will
              be tapestry promotional character{" "}
              <span className="orange">
                "Frolicking Flames" Yoimiya (Pyro)
              </span>
              . If tapestry first 5-star character you win in this event wish is
              not tapestry promotional character, then the next 5-star character
              you win is <span className="orange">guaranteed</span> to be
              tapestry promotional character.
            </p>
            <p className="my-3">4-Star Items</p>
            <p className="my-3">
              For Event Wish - Tapestry of{" "}
              <span className="orange">Golden Flames</span>: Base probability of
              winning 4-star item = <span className="orange">5.100%</span>;
              consolidated probability (incl. guarantee) ={" "}
              <span className="orange">13.000%</span>; guaranteed to win 4-star
              or above item at least once per <span className="orange">10</span>{" "}
              attempts. <br />
              The first time you win a 4-star item in this event wish,
              tapestryre is a <span className="orange">50%</span> chance it will
              be one of tapestry featured characters{" "}
              <span className="teal">"Mujina Ninja" Sayu (Anemo)</span>,{" "}
              <span className="aqua">"Kätzlein Cocktail" Diona (Cryo)</span>, and{" "}
              <span className="orange">"Blazing Riff" Xinyan (Pyro)</span>. If
              tapestry first 4-star item you win in this event wish is not one
              of the featured characters, tapestryn the next 4-star item you win
              is <span className="orange">guaranteed</span> to be a featured
              character.
            </p>
            <p className="my-3">
              4-star weapons won in this wish come with{" "}
              <span className="orange">Masterless Starglitter</span> ×2; 3-star
              weapons won in this wish come with{" "}
              <span className="purple">Masterless Stardust</span> ×15.
            </p>
            <p className="my-3">〓Duplicate Characters〓</p>
            <p className="my-3">
              On obtaining a 5-star character that you already own (whetapestryr
              obtained in a wish, redeemed at tapestry shop, or awarded by the
              game): The 2nd – 7th time you obtain tapestry character, it will
              be converted into{" "}
              <span className="purple">that character's Stella Fortuna</span> ×1
              and <span className="orange">Masterless Starglitter</span> ×10;
              from tapestry 8th time onwards it will be converted into{" "}
              <span className="orange">Masterless Starglitter</span> ×25.
            </p>
            <p className="my-3">
              On obtaining a 4-star character that you already own (whetapestryr
              obtained in a wish, redeemed at tapestry shop, or awarded by the
              game): The 2nd – 7th time you obtain tapestry character, it will
              be converted into{" "}
              <span className="purple">that character's Stella Fortuna</span> ×1
              and <span className="orange">Masterless Starglitter</span> ×2;
              from tapestry 8th time onwards it will be converted into{" "}
              <span className="orange">Masterless Starglitter</span> ×5.
            </p>
            <p className="my-3">
              ※ This is a character event wish. The wish guarantee count is
              accumulated within character event wishes only and is independent
              of tapestry guarantee counts of other types of wishes.
            </p>
            <h4 className="my-3 brass">Items to wish for:</h4>
          </Col>
        </Row>
        <StarsBar
          starCount={5}
          content="Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)"
          bgColor="#dcbba5"
        />
        <Table items={tapestry.getDrops(5)} />
        <StarsBar
          starCount={4}
          content="Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)"
          bgColor="#b6abbf"
        />
        <Table items={tapestry.getDrops(4)} />
        <StarsBar
          starCount={3}
          content="Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)"
          bgColor="#a5bacc"
        />
        <Table items={tapestry.getDrops(3)} />
      </Container>
    </div>
  );
}
