import axios from "axios";
import type { NewDiary } from "../types";
const baseUrl = "/api/diaries";

export const getDiaries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addDiary = async (diary: NewDiary) => {
  const response = await axios.post(baseUrl, diary);
  return response.data;
};

export default {
  getDiaries,
  addDiary
};