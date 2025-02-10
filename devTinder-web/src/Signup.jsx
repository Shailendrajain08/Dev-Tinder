import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="flex justify-center my-2" >
        <div className="card bg-neutral text-neutral-content w-96 ">
          <div className="card-body justify-center">
            <h2 className="card-title justify-center">Register</h2>
            <div>
            <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                />
                </label>
                <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full"
                />
                </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full"
                />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="card-actions justify-center ">
              <button className="btn bg-base-300">Login</button>
            </div>
            <Link to="/login">Already have account</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
