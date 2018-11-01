import React, { Component } from 'react';
import UserCard from './components/UserCard';

const usersMockUp = [
  {
    id: 1,
    name: 'John McCline',
    friends: [2, 5, 8],
  },
  {
    id: 2,
    name: 'Obi van Kenoby',
    friends: [1, 4, 8],
  },
  {
    id: 3,
    name: 'Jean-Claude Van Damme',
    friends: [2],
  },
  {
    id: 4,
    name: 'Alyssa Milano',
    friends: [1, 3],
  },
  {
    id: 5,
    name: 'Keanu Reeves',
    friends: [1, 8, 2, 3, 4],
  },
  {
    id: 6,
    name: 'Olivia Wilde',
    friends: [2, 3],
  },
  {
    id: 7,
    name: 'Hugh Laurie',
    friends: [1, 3, 8],
  },
  {
    id: 8,
    name: 'John McClane',
    friends: [1, 2, 3, 4, 5],
  },
  {
    id: 9,
    name: 'Mel Gibson',
    friends: [1],
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedUserId: null,
      users: [...usersMockUp],
    };
    this.selectUser = this.selectUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(id) {
    const { selectedUserId, users } = this.state;
    const newUsers = [...users].filter(user => user.id !== id)
      .map((user) => {
        const newUser = { ...user };
        const index = user.friends.indexOf(id);
        if (index !== -1) {
          newUser.friends.splice(index, 1);
        }
        return newUser;
      });
    if (selectedUserId === id) {
      this.setState({ selectedUserId: null, users: newUsers });
    } else {
      this.setState({ users: newUsers });
    }
  }

  selectUser(id) {
    this.setState({
      selectedUserId: id,
    });
  }

  findFriendsOfUserById(id) {
    const { users } = this.state;
    return users.find(user => user.id === id).friends;
  }

  findUserDataById(id) {
    const { users } = this.state;
    return users.find(user => user.id === id);
  }

  findAllFriends(id) {
    let friendsIDs;
    let friends = [];
    if (id) {
      friendsIDs = new Set(this.findFriendsOfUserById(id));
      friends = Array.from(friendsIDs, friendId => this.findUserDataById(friendId));
      friends.map(friend => friend.friends.map(friendOfFriend => friendsIDs.add(friendOfFriend)));
      friendsIDs.delete(id);
      friends = Array.from(friendsIDs, friendId => this.findUserDataById(friendId));
    }
    return friends;
  }

  render() {
    const { selectedUserId, users } = this.state;
    const friends = this.findAllFriends(selectedUserId);
    return (
      <section className="layout">
        <aside className="layout__left">
          <ul className="users">
            {users.map(user => (
              <UserCard
                user={user}
                isSelected={user.id === selectedUserId}
                key={user.id}
                onSelectUser={this.selectUser}
                onDeleteUser={this.deleteUser}
              />
            ))}
          </ul>
        </aside>
        <main className="layout__right">
          {selectedUserId
            ? (
              <div>
                Friends:
                <ol>
                  {friends.map(friend => <li key={friend.id}>{friend.name}</li>)}
                </ol>
              </div>
            )
            : <div>Choose the user to see his friends</div>
          }
        </main>
      </section>
    );
  }
}

export default App;
