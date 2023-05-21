import React, { useEffect, useRef, useState } from "react";
import './mainAdmin.css';
import "react-datepicker/dist/react-datepicker.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import Table from "../components/Table";
import { notification } from "antd";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FiCalendar } from "react-icons/fi";
import { BiXCircle } from "react-icons/bi";

const MainAdamin = () => {
  const uploadRef = useRef();
  const uploadFile = useStoreActions(action => action.customer.uploadFile);
  const search = useStoreActions(action => action.customer.search);
  const storeinfo = useStoreState(state => state.customer.storeinfo);
  const updateStore = useStoreActions(action => action.customer.updateStore);
  const deleteStoreProduct = useStoreActions(action => action.customer.deleteStoreProduct);
  const [storeState, setStoreState] = useState(storeinfo);
  const [searchBody, setSearchBody] = useState({ store_id: 0, from: null, to: null, product_name: "" });
  const [from, setFrom] = useState(false);
  const [to, setTo] = useState(false);

  useEffect(() => { setStoreState(storeinfo) }, [storeinfo]);

  const onClickUpload = () => {
    const fileObj = uploadRef.current?.files && uploadRef.current?.files[0];
    if (!fileObj) {
      return;
    }

    if (fileObj && fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      uploadFile({ data: fileObj, search: searchBody });
    } else {
      notification.config({
        duration: 20,
      });
      notification.error({
        message: `File Error`,
        description: "Please Select Valid File",
      });
    }
    uploadRef.current.value = null;
  };

  useEffect(() => {
    search({ ...searchBody });
  }, [search]);

  const columns = [
    {
      title: 'S. no',
      key: "id",
      render: (record) => {
        return (
          <div className="m-0 p-0">
            {storeinfo && record && record.id && storeinfo[record.id] && storeinfo[record.id].id}
          </div>)
      }
    },
    {
      title: "store id",
      key: "store_id",
      render: (record) => {
        return (
          <div className="m-0 p-0">
            {record.isEditable ?
              <>
                <input value={record && record.store_id} type="number"
                  onChange={(e) => setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], store_id: e.target.value } })} />
              </> :
              <div>{record && record.store_id}</div>}
          </div>)
      }
    },
    {
      title: "SKU",
      key: "sku",
      render: (record) => {
        debugger
        return (
          <div className="m-0 p-0">
            {record.isEditable ?
              <>
                <input value={record && record.sku} type="number"
                  onChange={(e) => setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], sku: e.target.value } })} />
              </> :
              <div>{record && record.sku}</div>}
          </div>)
      }
    },
    {
      key: "product_name",
      title: "product name",
      render: (record) => {
        return (
          <div className="m-0 p-0">
            {record.isEditable ?
              <>
                <input value={record && record.product_name} type="text"
                  onChange={(e) => setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], product_name: e.target.value } })} />
              </> :
              <div>{record && record.product_name}</div>}
          </div>)
      }
    },
    {
      title: "price",
      key: "price",
      render: (record) => {
        return (
          <div className="m-0 p-0">
            {record.isEditable ?
              <>
                <input value={record && record.price} type="number"
                  onChange={(e) => setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], price: e.target.value } })} />
              </> :
              <div>{record && record.price}</div>}
          </div>)
      }

    },
    {
      title: "product date",
      dataIndex: "product_date",
      key: "product_date",
    },
    {
      title: "",
      key: "save/update",
      render: (record) => {
        return (
          <div className="m-0 p-0">
            {record && record.isEditable ?
              <div className="d-flex flex-row">
                <button className="btn btn-primary py-0"
                  onClick={() => {
                    updateStore({ data: { ...record }, search: searchBody });
                    setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], isEditable: false } })
                  }}>
                  save
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-primary py-0"
                  onClick={() => {
                    setStoreState({ ...storeState, [record.id]: { ...storeinfo[record.id], isEditable: false } })
                  }}>
                  Cancel
                </button>
              </div> :
              <div className="d-flex flex-row">
                <button className="btn btn-primary py-0"
                  onClick={() => setStoreState({ ...storeState, [record.id]: { ...storeState[record.id], isEditable: true } })}>
                  Edit
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-primary py-0"
                  onClick={() => {
                    deleteStoreProduct({ data: record.id, search: searchBody });
                    setStoreState({ ...storeState, [record.id]: { ...storeinfo[record.id], isEditable: false } })
                  }}>
                  delete
                </button>
              </div>
            }
          </div>)
      }
    }
  ];

  const onSearchChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchBody({ ...searchBody, [name]: value });
  }

  const onFinish = () => {
    search({ ...searchBody });
  }

  const reset = () => {
    setSearchBody({ store_id: 0, from: null, to: null, product_name: "" });
    search({ store_id: 0, from: null, to: null, product_name: "" });
  }

  return (
    <div className="container">
      <div className="row pt-2">
        <div className="col-3">
          <div className="form-row">
            <div className="form-group">
              <label>Store no ::</label>
              <input className="form-control" placeholder="id" name="store_id" autoComplete="off" value={searchBody.store_id || ''} onChange={onSearchChange} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="form-row">
            <div className="form-group">
              <label>product name ::</label>
              <input className="form-control" placeholder="name" name="product_name" autoComplete="off" value={searchBody.product_name || ''} onChange={onSearchChange} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="form-row">
            <div className="form-group">
              <label>Start From :</label>
              <div className="date-icon">
                <DatePicker className="form-control"
                  name="from"
                  open={from}
                  value={searchBody.from}
                  readOnly
                  onClickOutside={() => setFrom(!from)}
                  placeholderText="select date"
                  onChange={(event) => {
                    setSearchBody({ ...searchBody, "from": moment(event).format("YYYY-MM-DD") });
                    setFrom(!from);
                  }} format="YYYY-MM-DD " />
                {searchBody.from ? <div style={{ position: "absolute", marginTop: "5px", cursor: "pointer" }} onClick={() => setSearchBody({ ...searchBody, "from": null })}><BiXCircle size={25} /></div>
                  : <div style={{ position: "absolute", marginTop: "5px", cursor: "pointer" }} onClick={() => setFrom(!from)}><FiCalendar size={25} /></div>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <label>Strat to :</label>
          <div className="date-icon">
            <DatePicker
              className="form-control"
              clearButtonTitle="clear"
              name="to"
              readOnly
              placeholderText="select date"
              onClickOutside={() => setTo(!to)}
              value={searchBody.to}
              open={to}
              onChange={(event) => {
                setSearchBody({ ...searchBody, "to": event ? moment(event).format("YYYY-MM-DD").toString() : null });
                setTo(!to);
              }}
              format="YYYY-MM-DD" />
            {searchBody.to ? <div style={{ position: "absolute", marginTop: "5px", cursor: "pointer" }} onClick={() => setSearchBody({ ...searchBody, "to": null })}><BiXCircle size={25} /></div>
              : <div style={{ position: "absolute", marginTop: "5px", cursor: "pointer" }} onClick={() => setTo(!to)}><FiCalendar size={25} /></div>}
          </div>
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-10">
        </div>
        <div className="col-1">
          <button
            onClick={onFinish}
            type="button"
            class="btn btn-primary"
          >
            Search
          </button>
        </div>
        <div className="col-1">
          <button
            onClick={reset}
            type="button"
            class="btn btn-outline-primary"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="row pt-2">
        <Table theadData={columns} tbodyData={Object.values(storeState)}></Table>
      </div>
      <div className="row pt-4">
        <div className="col-6">
        </div>
        <div className="col-3" ></div>
        <div className="col-3" style={{ float: "right !important" }}>
          <div className="p-3">
            <input className="form-control p-1" type="file" ref={uploadRef} />
            <div className="pt-2 text-center">
              <button
                onClick={onClickUpload}
                type="button"
                className="btn btn-primary"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdamin;
