import React from "react";
import LoginScreen from "../../components/login/LoginScreen";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("Pruebas en <LoginScreen />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };
    const history = {
        replace: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de realizar el dispatch y la navegacion", () => {
        const handleClick = wrapper.find("button").prop("onClick");
        handleClick();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: "Cesar",
            },
        });
        expect(history.replace).toHaveBeenCalledWith("/");
        localStorage.setItem("lastPath", "/dc");
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    });
});
