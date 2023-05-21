import { createStore } from 'easy-peasy';
import HttpService from '../services/http.service';
import model from './model';

const httpService = new HttpService();

const store = createStore(model, {
  // 👇 injections are configured against the store
  injections: {
    httpService,
  }
});

export default store;