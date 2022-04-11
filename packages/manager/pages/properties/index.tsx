import styled from "styled-components";
import { Gallery, PageSection } from "@patternfly/react-core";
import Body from "../../components/layout/body";
import { AnyProps, Properties } from "../../components/models/props";
import AddProperty from "../../components/web-property/addProperty";
import WebProperty from "../../components/web-property/webProperty";
import { ComponentWithAuth } from "../../utils/auth.utils";
import { get, post } from "../../utils/api.utils";
import { getHost } from "../../utils/config.utils";

const meta = {
  title: "Your Web Properties ",
  breadcrumbs: [
    { path: "/", title: "Home" },
    { path: "/properties", title: "Properties" },
  ],
};

export const payload = {
  count: {
    all: true,
  },
};

export const getStaticProps = async () => {
  const host = getHost();
  const urlList = `${host}/webproperty/list`;
  const urlCount = `${host}/event/fetch/analytics/all`;
  const response = await Promise.all([await get<Properties>(urlList), await post<Properties>(urlCount, payload)]);
  const [propertyListResponse, deploymentCountResponse]: AnyProps = response;
  getPropertyListResponse(propertyListResponse, deploymentCountResponse);
  return {
    props: { webprop: propertyListResponse },
  };
};

function getPropertyListResponse(propertyListResponse: AnyProps, deploymentCountResponse: AnyProps) {
  for (let index in propertyListResponse) {
    let data = deploymentCountResponse.find(
      (property: AnyProps) => property.propertyName === propertyListResponse[index].webPropertyName
    );
    propertyListResponse[index].count = data?.count || 0;
  }
}

export const DividerComp = styled.hr`
  border-top: 1px solid var(--spaship-global--Color--bright-gray);
`;

const PropertiesListPage: ComponentWithAuth = ({ webprop }: Properties) => {
  return (
    <Body {...meta}>
      <PageSection isFilled>
        <br />
        <Gallery hasGutter>
          <AddProperty />
          <WebProperty webprop={webprop}></WebProperty>
        </Gallery>
        <br />
        <DividerComp />
      </PageSection>
    </Body>
  );
};

PropertiesListPage.authenticationEnabled = true;
export default PropertiesListPage;
