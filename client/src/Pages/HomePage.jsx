import React, { useEffect, useReducer } from "react";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../Services/FoodService";
import Thumbnails from "../Components/Thumbnails";
import { useParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import Tags from "../Components/Tags";
const initialState = {
  foods: [],
  tags: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();
  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );
    console.log(tag); 
    const loadedFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();
    loadedFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm,tag]);
  return (
    <>
      <SearchBar />
      <Tags tags={tags} />
      <Thumbnails foods={foods} />
    </>
  );
}
