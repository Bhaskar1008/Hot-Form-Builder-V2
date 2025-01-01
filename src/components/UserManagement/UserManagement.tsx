import React, { useEffect, useState } from 'react';
    import { fetchUsers, createUserIfNotExists } from '../../services/userService';

    const UserManagement: React.FC = () => {
      const [users, setUsers] = useState([]);

      useEffect(() => {
        const loadUsers = async () => {
          const usersData = await fetchUsers();
          setUsers(usersData);
        };

        loadUsers();
      }, []);

      return (
        <div className="user-management-container">
          <h2>User Management</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.email} - {user.role}</li>
            ))}
          </ul>
        </div>
      );
    };

    export default UserManagement;
