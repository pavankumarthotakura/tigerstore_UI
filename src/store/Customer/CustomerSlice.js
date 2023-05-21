import { action, thunk } from "easy-peasy";

const customerModel = {
      storeinfo: {},
      updateStoreInfo: action((state, payload) => {
        state.storeinfo = {};
        payload.forEach(val => state.storeinfo[val.id] = val);
      }),
      fetchALL : thunk(async (actions, {}, { injections }) => {
        debugger
        const { httpService } = injections;
        const val = await httpService.fetchAll();
        actions.updateStoreInfo(val);
      }),
      uploadFile : thunk(async (actions, payload, { injections }) => {
        const { httpService } = injections;
        const val = await httpService.uploadFile(payload.data);
        if(val) {
          actions.search(payload.search);
        }
      }),
      updateStore: thunk(async (actions, payload, { injections }) => {
        const { httpService } = injections;
        const val = await httpService.updateStore(payload.data);
        if(val) {
          actions.search(payload.search);
        }
      }),
      deleteStoreProduct: thunk(async (actions, payload, { injections }) => {
        const { httpService } = injections;
        const val = await httpService.deleteStoreProduct(payload.data);
        if(val) {
          actions.search(payload.search);
        }
      }),
      search: thunk(async (actions, payload, { injections }) => {
        const { httpService } = injections;
        const val = await httpService.search(payload);
        actions.updateStoreInfo(val);
      })
};

export default customerModel;