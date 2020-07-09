import React from "react";
import { shallow, mount } from "enzyme";
import { PrivateRoute } from "../../auth/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <PrivateRoute />", () => {
    const props = {
        location: {
            pathname: "/marvel",
        },
    };

    Storage.prototype.setItem = jest.fn();

    test("debe de mostrar el componente si esta autenticado y guardar localStorage", () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        //el shallow no va funcionar porque es un HOC se remplaza por mount

        expect(wrapper.find("span").exists()).toBe(true);

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "lastPath",
            "/marvel"
        );
    });

    test("debe de bloquear el componente si no está autenticado", () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        //el shallow no va funcionar porque es un HOC se remplaza por mount

        expect(wrapper.find("span").exists()).toBe(false);
    });
});
