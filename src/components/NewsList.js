import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "../../node_modules/axios/index";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
  h1 {
    text-align: center;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=7b6f6d416b0f4b3e90bfa325491b4c8d`
    );
  }, [category]);

  if (loading) {
    return (
      <NewsListBlock>
        <h1>로딩중....</h1>
      </NewsListBlock>
    );
  }

  //아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }
  //에러가 발생했을 때
  if (error) {
    return (
      <NewsListBlock>
        <h1>에러발생!</h1>
      </NewsListBlock>
    );
  }

  //response 값이 유효할 때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem article={article} key={article.url} />
      ))}
      {/* <NewsItem article={articles} />
      <NewsItem article={articles} />
      <NewsItem article={articles} /> */}
    </NewsListBlock>
  );
};

export default NewsList;
