import React, { useState } from "react";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "./apolloClient";
import { useTranslation } from "react-i18next";
import "./App.css";
import "./i18n";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
      info {
        next
        prev
        pages
      }
    }
  }
`;

const App = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const { t, i18n } = useTranslation();
  
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
  });

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error.message}</p>;

  const characters = data.characters.results;
  const totalPages = data.characters.info.pages;

  return (
    <div>
      <h1>{t("title")}</h1>

      {/* Filter Dropdowns */}
      <div className="filters">
        <select className="filter-element" onChange={(e) => setStatus(e.target.value)}>
          <option value="">{t("all")}</option>
          <option value="Alive">{t("alive")}</option>
          <option value="Dead">{t("dead")}</option>
          <option value="unknown">{t("unknown")}</option>
        </select>

        <select className="filter-element" onChange={(e) => setSpecies(e.target.value)}>
          <option value="">{t("all")}</option>
          <option value="Human">{t("human")}</option>
          <option value="Alien">{t("alien")}</option>
        </select>
      </div>

      {/* Character Grid */}
      <div className="grid">
        {characters.map((char) => (
          <div key={char.id} className="card">
            <img src={char.image} alt={char.name} className="card-img" />
            <div className="card-details">
            <h2>{char.name}</h2>
            <p>{t("status")}: {char.status}</p>
            <p>{t("species")}: {char.species}</p>
            <p>{t("gender")}: {char.gender}</p>
            <p>{t("origin")}: {char.origin.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            style={{
              margin: "5px",
              padding: "8px",
              background: page === index + 1 ? "blue" : "gray",
              color: "white",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Language Switcher */}
      <footer>
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("de")}>Deutsch</button>
      </footer>
    </div>
  );
};

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Root;
