import axios from "axios";


const initialState = {
  name: "",
  email: "",
  location: "",
};


const addUser = (data) => {
    axios
      .get("http://restapi.adequateshop.com/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        ...data
      })
      .then((res) => {
        // setTableData(res.data.data);
        // setTotalPages(res.data.total_pages);
      });

}

const changeTheNumber = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "EDIT":
      return state - 1;
    default:
      return state;
  }
};

export default changeTheNumber;
