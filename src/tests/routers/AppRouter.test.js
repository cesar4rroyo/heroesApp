import React from "react";
import { shallow, mount } from "enzyme";
import AppRouter from "../../routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en <AppRouter />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };

    test("debe de mostrar el login si no está autenticado", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test("debe mostrar el componente de marvel si esta autenticado", () => {
        const context = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "Cesar",
            },
        };
        const wrapper = mount(
            <AuthContext.Provider value={context}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper.find(".navbar").exists()).toBe(true);
    });
});
