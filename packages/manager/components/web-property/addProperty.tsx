import { Card, EmptyState, EmptyStateVariant, Title } from "@patternfly/react-core";
import styled from "styled-components";

const AddPropertyBox = styled(Card)`
  border-radius: "8px";
  opacity: 1;
  height: -webkit-fill-available;
  height: -moz-available;
  height: stretch;
  .spaship-circle {
    -webkit-border-radius: 999px;
    -moz-border-radius: 999px;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    margin-top: 25px;
    margin-left: 25px;
    background: hsl(42, 98%, 54%);
    color: black;
    text-align: center;
    -webkit-transition: background 0.2s linear;
    -moz-transition: background 0.2s linear;
    -ms-transition: background 0.2s linear;
    -o-transition: background 0.2s linear;
    transition: background 0.2s linear;
    transition: color 0.2s linear;
    font: 64px arial, sans-serif;
  }

  .spaship-circle:hover {
    background: #333333;
    cursor: pointer;
  }

  .spaship-plus {
    line-height: 1.1em;
  }

  .spaship-plus:hover {
    color: white;
  }
`;

const AddProperty = () => {
  return (
    <>
      <Card isSelectable isRounded>
        <AddPropertyBox>
          <EmptyState variant={EmptyStateVariant.xs}>
            <div className="spaship-circle spaship-plus">&#43;</div>
            <br></br>
            <Title headingLevel="h5" size="md">
              New Web Property
            </Title>
          </EmptyState>
        </AddPropertyBox>
      </Card>
    </>
  );
};

export default AddProperty;
