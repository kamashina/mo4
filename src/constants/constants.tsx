import ListItem from 'components/List/List';
import List from 'components/List/List';
import React, {ReactNode} from 'react';
import {Text, View} from 'react-native';
import {IInventory, IScanned} from 'types/inventory';

export const SERVER_URL = 'http://192.168.26.75:8000/api/';

export const inventorySampleData: IInventory[] = [
  {
    id: 1,
    vedpos: 1,
    name: '123',
    place: 'place',
    kolvo: 1,
    placepriority: 1,
  },
  {
    id: 2,
    vedpos: 2,
    name: '312',
    place: 'place2',
    kolvo: 2,
    placepriority: 2,
  },
];

export type IColor = {
  status: 1 | 2 | 3 | 4;
  title: string;
  getContent: (
    inventory: (IScanned | Omit<IScanned, 'status'>) & {
      kolvo?: number;
      vedpos?: number;
    },
  ) => ReactNode;
  textColor: string;
  backgroundColor: string;
  type: 'success' | 'notInside' | 'over' | 'double';
};

export const scanResultModalColors: IColor[] = [
  {
    status: 1,
    title: 'В учете',
    getContent: item => (
      <View style={{flex: 1}}>
        <ListItem isFirst name="Статус" value="В учете" />
        <ListItem name="Инвентарный номер" value={item.inventoryNum} />
        <ListItem name="Место" value={item.place} />
        <ListItem name="Строка" value={item.vedpos} />
        <ListItem isLast name="Осталось" value={item.kolvo} />
      </View>
    ),
    textColor: '#228B22',
    backgroundColor: '#98FB98',
    type: 'success',
  },
  {
    status: 2,
    title: 'Не в учете',
    getContent: item => (
      <View style={{flex: 1, width: '100%'}}>
        <ListItem isFirst name="Статус" value="Не в учете" />
        <ListItem name="Инвентарный номер" value={item.inventoryNum} />
        <ListItem isLast name="Наименование" value={item.name} />
      </View>
    ),
    textColor: '#1E90FF',
    backgroundColor: '#87CEFA',
    type: 'notInside',
  },
  {
    status: 3,
    title: 'Сверх учета',
    getContent: item => (
      <View style={{flex: 1, width: '100%'}}>
        <ListItem name="Статус" value="Сверх учета" />
        <ListItem name="Инвентарный номер" value={item.inventoryNum} />
        <ListItem name="Наименование" value={item.name} />
      </View>
    ),
    textColor: '#FFFF00',
    backgroundColor: '#FFFF66',
    type: 'over',
  },
  {
    status: 4,
    title: 'Повторное считывание',
    getContent: item => (
      <View style={{flex: 1, width: '100%'}}>
        <ListItem isFirst isLast name="Статус" value="Повторное сканирование" />
        <Text>Предыдущее значение</Text>
        <ListItem
          isFirst
          isLast={item.position == null}
          name="Статус"
          value={
            //@ts-ignore
            scanResultModalColors.filter(res => res.status === item!.status)[0]
              .title
          }
        />
        {item.position != null ? (
          <>
            <ListItem name="Строка" value={item.position} />
            <ListItem name="Место" value={item.place} isLast />
          </>
        ) : null}
      </View>
    ),
    textColor: '#DC143C',
    backgroundColor: '#F08080',
    type: 'double',
  },
];
