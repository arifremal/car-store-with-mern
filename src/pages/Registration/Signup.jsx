import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const Signup = () => {
    const {createUser}= useContext(AuthContext)
    const handleSignUp = event =>{
        event.preventDefault()
        const form=event.target;
        const email=form.email.value;
        const name=form.name.value;
        const password=form.password.value;
        console.log(name,email,password);
        createUser(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
        })
        .then( error=>console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="mr-12 w-1/2">
            
          <img src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
             <form onSubmit={handleSignUp} >
             <div className="form-control">
              <h1 className="text-3xl font-bold text-center">Registration now!</h1>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name='name'
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name='email'
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name='password'
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
  
                <input className="btn btn-primary" type="submit" value="SignUp" />
              </div>
             </form>
             <p  >Acccount? <Link to={'/login'} className='text-orange-500'>login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Signup;