import React from "react";
import { heroes } from "../../data/heroes";
import { HeroCard } from "../../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";

export const SearchScreen = () => {
    const heroesFiltered = heroes;

    const [formValues, handleInputChange] = useForm({ search: "" });

    const { search } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
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
                    <hr />
                    {heroesFiltered.map((heroe) => (
                        <HeroCard key={heroe.id} {...heroe} />
                    ))}
                </div>
            </div>
        </div>
    );
};
