import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import AutoComplete from "./../autocomplete/autoComplete";
import { getTaxInfo, autoCompleteData, saveData } from "../services/taxService";
import { toast } from "react-toastify";
import Input from "../input/input";
import { change_Array_Element_Value, dateFormat } from "../../utils/utilities";
import MyDatePicker from "../datepicker/datePicker";
import Joi from "joi-browser";

const initialFormState = {
  RRN: "",
  letterDate: "",
  letterNumber: "",
  requestDate: "",
  bc: 0,
};

const schema = {
  RRN: Joi.string()
    .allow(null, "")
    .label("RRN"),
  rrn: Joi.string()
    .allow(null, "")
    .label("RRN"),
  letterNumber: Joi.string()
    .min(3)
    .required()
    .label("LetterNumber"),
  requestDate: Joi.number()
    .min(8)
    .required()
    .label("RequestDate"),
  bc: Joi.number()
    .min(0)
    .required()
    .label("BC"),
  letterDate: Joi.number()
    .min(Joi.ref("requestDate"))
    .required()
    .label("LetterDate")
    .error((errors) => {
      switch (errors[0].type) {
        case "number.min":
          errors[0].message = "تاریخ نامه می بایست بعد از تاریخ درخواست باشد";
          break;

        default:
      }
      return errors[0];
    }),
};
const TaxPage = () => {
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [form, setForm] = useState({ ...initialFormState });
  const [isupdating, setIsupdating] = useState(false);
  const [iswaiting, setWaiting] = useState(false);
  const [iswaitingforupdate, setWaitingforupdate] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const name = "aksid90381ldid)pod";
      const valid = sanitize(name);
      return valid;
    } catch (error) {
      alert(error);
    }
  }, []);

  const sanitize = (param) => {
    if (param === null || param === "") return false;

    const retVal = /^[A-Za-z0-9 -]*$/.test(param);
    if (!retVal) throw new Error("Exception message");

    return true;
  };

  const getData = async (name) => {
    try {
      setWaiting(true);
      clearErrors();
      const data = await getTaxInfo(name);
      if (data.length === 1) {
        const newValue = maskdata(data[0]);
        setForm((form) => ({ ...form, ...newValue }));
      } else {
        toast.info("نامه ای یافت نشد");
        setForm(initialFormState);
      }
    } catch (error) {
      console.log(error);
    }
    setWaiting(false);
  };

  const clearErrors = () => {
    setErrors({});
  };
  const gettaxinfo = async (e) => {
    e.preventDefault();
    await getData(searchInput);
  };

  const searchOnChange = async (e) => {
    const userInput = e.target.value;
    const data = await autoCompleteData(userInput);
    setSearchInput(userInput);
    setFilteredSearch(data);
  };

  const maskdata = (data) => {
    let retval = change_Array_Element_Value(
      data,
      undefined,
      undefined,
      "requestDate",
      (x) => {
        return dateFormat(x);
      }
    );

    return retval;
  };

  const setInput = (e) => {
    const { name, value } = e.target;
    const newValue = { [name]: value };
    return setForm((form) => ({ ...form, ...newValue }));
  };
  const validateForm = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(form, schema, options);

    const { error } = result;
    if (!error) return null;

    const errorData = {};
    for (let item of error.details) {
      const name = item.path[0];
      errorData[name] = item;
    }

    setErrors(errorData);
    return errorData;
  };

  const updateTax = async (e) => {
    try {
      e.preventDefault();
      const validateform = validateForm();
      if (validateform) return;
      clearErrors();
      setWaitingforupdate(true);
      await saveData(form);
      await toast.success("ثبت با موفقیت انجام پذیرفت");
      setIsupdating(false);
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات");
    }
    setWaitingforupdate(false);
  };
  return (
    <form className="rtl container ">
      <div className="row col-md-9 col-lg-7 mt-4 mb-5 mx-auto ">
        <div className="col-md-9 ">
          <AutoComplete
            filteredSearch={filteredSearch}
            onChange={searchOnChange}
            input={searchInput}
            setSearchInput={setSearchInput}
            setFilteredSearch={setFilteredSearch}
            getData={getData}
            Label="کد پیگیری"
            isautofocus={true}
            coreClass="ltr  text-left"
            labelColor="text-dark"
          />
        </div>
        <div className="col-md-3 ">
          <button
            className="btn btn-primary"
            style={{ marginTop: "30px" }}
            tabIndex="1"
            disabled={!searchInput}
            onClick={gettaxinfo}
          >
            جستجو
            <i
              className={
                "fa fa-spinner fa-spin mx-1 " +
                (iswaiting ? "visible" : "invisible")
              }
            ></i>
          </button>
        </div>
      </div>
      <hr className="rounded" />
      <div className="row col-md-7 mx-auto mt-4">
        <Input
          tabIndex="2"
          name="letterNumber"
          type="textare"
          labelcolor="text-dark"
          onChange={setInput}
          label="شماره نامه"
          coreClass="ltr  text-left col-sm-12 col-md-5 col-lg-4 d-sm-block d-md-inline-block"
          value={form.letterNumber}
          effect={false}
          disabled={!isupdating}
          errorClass="col-sm-12 col-md-7 col-lg-6 d-sm-block d-md-inline-block mx-2"
        />
      </div>
      <div className="row col-md-7 mx-auto mt-4">
        <MyDatePicker
          TabIndex="3"
          name="letterDate"
          label="تاریخ نامه"
          labelcolor="text-dark"
          coreClass="col-sm-12 col-md-5 col-lg-4 d-sm-block d-md-inline-block"
          value={
            form.letterDate !== ""
              ? moment(form.letterDate, "YYYY/MM/DD")
              : null
          }
          isGregorian={false}
          onChange={(value) => {
            setForm((form) => ({
              ...form,
              ...{ letterDate: value.format("YYYYMMDD") },
            }));
          }}
          timePicker={false}
          persianDigits={false}
          disabled={!isupdating}
          min={form.requestDate}
          error={errors.letterDate}
          errorClass="col-sm-12 col-md-7 col-lg-6 d-sm-block d-md-inline-block mx-2"
          //handleclick={handledateclick}
        />
      </div>
      <div className="row col-md-7 mx-auto mt-4">
        <Input
          tabIndex="4"
          name="bc"
          type="textare"
          labelcolor="text-dark"
          label="تعداد اقلام نامه"
          coreClass="ltr  text-left col-sm-12 col-md-5 col-lg-4 d-sm-block d-md-inline-block"
          value={form.bc}
          effect={false}
          disabled={true}
          errorClass="col-sm-12 col-md-7 col-lg-6 d-sm-block d-md-inline-block mx-2"
        />
      </div>
      <div className="row col-md-7 mx-auto mt-4">
        <MyDatePicker
          TabIndex="5"
          name="requestDate"
          label="تاریخ درخواست"
          labelcolor="text-dark"
          coreClass="col-sm-12 col-md-5 col-lg-4 d-sm-block d-md-inline-block"
          value={
            form.requestDate !== ""
              ? moment(form.requestDate, "YYYY/MM/DD")
              : null
          }
          isGregorian={false}
          onChange={(value) => {
            setForm((form) => ({
              ...form,
              ...{ requestDate: value.format("YYYYMMDD") },
            }));
          }}
          timePicker={false}
          persianDigits={false}
          disabled={true}
          errorClass="col-sm-12 col-md-7 col-lg-6 d-sm-block d-md-inline-block mx-2"
          //handleclick={handledateclick}
        />
      </div>

      <div className="row col-md-7 col-lg-6 mx-auto mt-2">
        <div className="col-md-6 ">
          <button
            className="btn btn-primary col-12 col-md-6  pull-right mt-3 "
            tabIndex="6"
            disabled={!form.requestDate}
            onClick={(e) => {
              e.preventDefault();
              setIsupdating(true);
            }}
          >
            ویرایش
          </button>
        </div>
        <div className=" col-md-6 ">
          <button
            className="btn btn-primary col-12 col-md-6 pull-right mt-3 "
            disabled={!isupdating}
            tabIndex="7"
            onClick={updateTax}
          >
            ثبت
            <i
              className={
                "fa fa-spinner fa-spin mx-1 " +
                (iswaitingforupdate ? "visible" : "invisible")
              }
            ></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaxPage;
