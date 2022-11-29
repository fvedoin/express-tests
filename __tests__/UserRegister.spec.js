const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/database");
const { upsert } = require("../src/user/User");
const User = require("../src/user/User");

beforeAll(() => {
    return sequelize.sync();
});

beforeEach(() => {
    return User.destroy({ truncate: true });
});

describe("User Registration", () => {
    const postValidUser = () => {
        return request(app)
            .post("/users")
            .send({
                username: "user1",
                email: "user1@mail.com",
                password: "password"
            });
    };

    it("returns 200 OK when signup request is valid", (done) => {
        postValidUser().then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("returns success message when signup request is valid", (done) => {
        postValidUser().then((response) => {
            expect(response.body.message).toBe("User created");
            done();
        });
    });

    it("saves the user to database", (done) => {
        postValidUser().then(() => {
            User.findAll().then((userList) => {
                expect(userList.length).toBe(1)
                done();
            });
        });
    });

    it("saves username and email to database", (done) => {
        postValidUser().then(() => {
            User.findAll().then((userList) => {
                const createdUser = userList[0];
                expect(createdUser.username).toBe("user1")
                expect(createdUser.email).toBe("user1@mail.com")
                done();
            });
        });
    });

    it("hashes the password in database", (done) => {
        postValidUser().then(() => {
            User.findAll().then((userList) => {
                const createdUser = userList[0];
                expect(createdUser.password).not.toBe("password")
                done();
            });
        });
    });
});
