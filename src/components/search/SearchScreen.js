import React, { useMemo } from "react";
import queryString from "query-string";
import { heroes } from "../../data/heroes";
import { HeroCard } from "../../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation } from "react-router-dom";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);
    console.log(q);

    const [formValues, handleInputChange] = useForm({ search: q });

    const { search } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    };

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="search"
                            value={search}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>

                    {q === "" && (
                        <div className="alert alert-info">Search a hero</div>
                    )}
                    {q !== "" && heroesFiltered.length === 0 && (
                        <div className="alert alert-danger">
                            There is not results for: {q}
                        </div>
                    )}

                    <hr />
                    {heroesFiltered.map((heroe) => (
                        <HeroCard key={heroe.id} {...heroe} />
                    ))}
                </div>
            </div>
        </div>
    );
};
