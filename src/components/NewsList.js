import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "../../node_modules/axios/index";

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
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          category === "all"
            ? `https://newsapi.org/v2/top-headlines?country=kr&apiKey=7b6f6d416b0f4b3e90bfa325491b4c8d`
            : `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=7b6f6d416b0f4b3e90bfa325491b4c8d`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <NewsListBlock>
        <h1>로딩중....</h1>
      </NewsListBlock>
    );
  }
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
