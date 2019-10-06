const initialState = {
    userList:[],
    loadingList:true
  }

  const UserListReducer=(state = initialState, action) => {
    switch(action.type) {
      case 'GET_LIST':
        return {
          userList: action.list,
          loadingList:false,
        }

      default:
        return state
    }
  }

export default UserListReducer;
