import { User } from "src/modules/user/entities/User"

type Override = Partial<User>

export const makeUser = ({ id, ...override }: Override) => {
    return new User(
        {
            email: 'teste@gmail.com',
            name: 'victor',
            password: '123456',
            login: 'login',
            ...override
        }, id
    )
}