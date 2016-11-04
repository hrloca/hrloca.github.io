import fetch from 'isomorphic-fetch';
import moment from 'moment';

const state = {};
const YYYYMMDD = () => moment().format("YYYYMMDD");

//////////////////////////////////////////////////

const check = (res) => {
  if (!res.ok) throw Error()
  return res
};

const toText = (res) => res.text();
const toJson = (res) => res.json();

