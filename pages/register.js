
const register = () => {
    return (
        <div>
            <h1>Registration</h1>
            <form method="post" action="/home">
                <table>
                    <tr>
                        <td><label for="email">Email:</label></td>
                        <td><input type="email" name="email" required></input></td>
                    </tr>
                    <tr>
                        <td><label for="pwd">Password:</label></td>
                        <td><input type="password" name="pwd" required></input></td>
                    </tr>
                </table>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default register
