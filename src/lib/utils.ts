import bcrypt from "bcryptjs"

export const encPassword = (password: string) => {
    try {
        const rounds = 10
        const hashedPassword = bcrypt.hash(password, rounds)
        return hashedPassword
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const verifyPassword = async (password: string, userPassword: string) => {
    try {
        const isPassMatch = await bcrypt.compare(password, userPassword)
        return isPassMatch
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}