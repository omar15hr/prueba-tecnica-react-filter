import { type User } from "../interfaces/types";

interface Props {
  users: User[];
  showColors: boolean;
  deleteUser: (email: string) => void;
}

export default function UsersList({ showColors, users, deleteUser }: Props) {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {

          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : 'transparent';

          return (
            <tr 
              key={user.email}
              style={{ backgroundColor: color }}
            >
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Borrar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
