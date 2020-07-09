import React from "react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import { Route, MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../components/search/SearchScreen";

describe("Pruebas en <SeaarchScreen />", () => {
    test("debe de mostrarse correctamente con valores por defecto", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
    });

    test("debde de mostrar a Batman y el input con el valor del queryString ", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find("input").prop("value")).toBe("batman");
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de mostrar un error si el hero no se encuentra", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman49347394"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find(".alert-danger").exists()).toBe(true);
    });

    test("debe de llamar el push del hisotry", () => {
        const history = {
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman49347394"]}>
                <Route
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change", {
            target: {
                name: "search",
                value: "batman",
            },
        });
        wrapper.find("form").prop("onSubmit")({
            preventDefault() {},
        });

        expect(history.push).toHaveBeenCalledWith("?q=batman");
    });
});
