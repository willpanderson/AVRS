import {CartItemType} from '../@types';

export const onButtonPress = (
  outsideOpperation: (arg0: any) => void,
  insideOpperation: (arg0: any) => void,
  item: number,
  list: Array<CartItemType>,
) => {
  console.log('Clicked button');
  outsideOpperation(item);
  insideOpperation(list[item].count);
};
