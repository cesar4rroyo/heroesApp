// const state = {
//     name: "Cesar",
//     logged: true,
// };

const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe("Pruebas en auhtReducer", () => {
    test("debe de retornar el estado por defectto", () => {
        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });
    test("debe autenticar y colocar el name del estado", () => {
        const action = {
            type: types.login,
            payload: {
                name: "Iris",
            },
        };
        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: true, name: "Iris" });
    });
    test("debe de borrar el name del usuario y el logged en false", () => {
        const action = {
            type: types.logout,
        };
        const state = authReducer({ logged: true, name: "Cesar" }, action);
        expect(state).toEqual({ logged: false });
    });
});
