import { Link } from "react-router-dom";

function UserCards({ user }) {
  console.log(user);
  const onDeleteHandler = (e) => {
    e.stopPropagation();
    alert(`Hello ${user.email}`);
  };
  return (
    <div className="justify-between bg-gray-100 my-2 inline-flex hover:bg-gray-200 cursor-pointer">
      <Link to="/login">
        <div className="py-4 px-4">
          <p>
            Nama : <span>{user.name}</span>
          </p>

          <p>
            Email : <span>{user.email}</span>
          </p>
        </div>
      </Link>
      <div className="self-center mx-4 border-solid border-2 border-red-500 hover:bg-red-500 ease-in-out duration-300 rounded-md">
        <button
          className="py-1 px-2 text-lg font-semibold text-red-500 hover:text-white ease-in-out duration-300"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCards;
