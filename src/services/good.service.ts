import { Good } from '../types/Good';
import { getData } from '../utils/httpClient';

export const getGoods = () => getData<Good[]>('/goods');
