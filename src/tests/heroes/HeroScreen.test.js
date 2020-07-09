import React from "react";
import HeroScreen from "../../heroes/HeroScreen";
import "@testing-library/jest-dom";
import { shallow, mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";

describe("Probando <HeroScreen />", () => {
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    };

    test("debe de mostrar componente redirect si no hay argumentos en la url ", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });
    test("debe de mostrar un hereo si el parámetro existe y se encuentra ", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find(".row").exists()).toBe(true);
    });

    test("debe de regresar a la pantalla anterior con PUSH ", () => {
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(historyMock.push).toHaveBeenCalledWith("/");
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test("debe de regresar a la pantalla anterior GoBACK", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        wrapper.find("button").prop("onClick")();
        expect(historyMock.push).toHaveBeenCalledTimes(0);
        expect(historyMock.goBack).toHaveBeenCalled();
    });

    test("debe de llamar el redirect su el hero no existe ", () => {
        const wrapper = mount(
            <MemoryRouter
                initialEntries={["/hero/marvel-spider9839848934983894938"]}
            >
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe("");
    });
});
