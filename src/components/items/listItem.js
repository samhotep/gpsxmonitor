import * as React from 'react';
import styled from 'styled-components';

export default function ListItem(props) {
  return (
    <Container>
      <Text>{props.text}</Text>
      <IdentityColor color={props.color}>
        <Text> </Text>
      </IdentityColor>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
`;

const IdentityColor = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props) => props.color || '#4788c7'};
  width: 8px;
  margin-right: 5px;
`;

const Text = styled.Text`
  text-align: center;
  color: #202020;
`;

let x = {
  success: true,
  list: [
    {
      id: 250,
      label: 'M09-UAP 935Z',
      group_id: 15,
      source: {
        id: 244,
        device_id: '866795035815966',
        model: 'bce_fms500_one',
        blocked: false,
        tariff_id: 2,
        phone: '256707653534',
        status_listing_id: null,
        creation_date: '2020-04-23',
        tariff_end_date: '2020-04-24',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 251,
      label: 'M10-UAR 662V',
      group_id: 15,
      source: {
        id: 245,
        device_id: '866795035826013',
        model: 'bce_fms500_one',
        blocked: false,
        tariff_id: 2,
        phone: '256707653531',
        status_listing_id: null,
        creation_date: '2020-04-23',
        tariff_end_date: '2020-04-24',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 274,
      label: 'UBG 066T Toyota Hillux',
      group_id: 5,
      source: {
        id: 268,
        device_id: '861230049838197',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256707653609',
        status_listing_id: null,
        creation_date: '2020-04-24',
        tariff_end_date: '2020-04-25',
      },
      tag_bindings: [],
      clone: false,
    },
    {
      id: 557,
      label: '2010104 - URA MALABA CUSTOMS',
      group_id: 2,
      source: {
        id: 4,
        device_id: '864626044880224',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256770420898',
        status_listing_id: null,
        creation_date: '2020-03-27',
        tariff_end_date: '2020-03-28',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 3282,
      label: '2010094 - URA LIRA GENSET',
      group_id: 2,
      source: {
        id: 991,
        device_id: '860922040727459',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256784301180',
        status_listing_id: null,
        creation_date: '2020-09-02',
        tariff_end_date: '2020-09-03',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 3369,
      label: '2010093 - URA ELEGU GENSET',
      group_id: 2,
      source: {
        id: 992,
        device_id: '860922041049242',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '256783849396',
        status_listing_id: null,
        creation_date: '2020-09-02',
        tariff_end_date: '2020-09-03',
      },
      tag_bindings: [],
      clone: true,
    },
    {
      id: 5013,
      label: '2010091 - URA BUSITEMA GENSET',
      group_id: 2,
      source: {
        id: 1341,
        device_id: '860922041069778',
        model: 'bce_fms500_lightplus',
        blocked: false,
        tariff_id: 2,
        phone: '882360012105187',
        status_listing_id: null,
        creation_date: '2020-12-04',
        tariff_end_date: '2020-12-05',
      },
      tag_bindings: [],
      clone: true,
    },
  ],
};
