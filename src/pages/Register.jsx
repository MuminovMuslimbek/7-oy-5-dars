import React, { useState } from 'react';
import { backend } from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import show from '../assets/show.svg';
import hide from '../assets/hide.svg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();

  const validate = () => {
    if (!username || username.length < 5) {
      alert('Iltimos, to‘g‘ri username kiriting (kamida 5 ta belgi).');
      return false;
    }
    if (!email || !email.includes('@') || email.length < 7) {
      alert('Iltimos, to‘g‘ri email kiriting.');
      return false;
    }
    if (!password || password.length < 5 || password.length > 15) {
      alert('Iltimos, to‘g‘ri password kiriting (5-15 ta belgi).');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Parollar mos kelmayapti. Iltimos, tekshirib qayta kiriting.');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const user = { username, email, password };

    setLoading(true);

    backend
      .post('auth/signup', user, {
        headers: { 'Content-type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/login');
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Xatolik yuz berdi.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 mx-auto w-full max-w-[400px] h-lvh" >
      <h1 className="text-[30px]">Register</h1>
      <input className="input-bordered w-full input input-info" type="text" value={username} minLength={5} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username.." />
      <input className="input-bordered w-full input input-info" type="email" value={email} minLength={7} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email.." />
      <div className="flex justify-between items-center input-bordered w-full input input-info">
        <input className="w-full" type={isShow ? 'password' : 'text'} value={password} minLength={5} maxLength={15} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password.." />
        <img onClick={() => setIsShow(!isShow)} className="cursor-pointer" src={isShow ? show : hide} alt="toggle visibility" />
      </div>
      <input className="input-bordered w-full input input-info" type={isShow ? 'password' : 'text'} value={confirmPassword} minLength={5} maxLength={15} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password.." />
      <button type="submit" className="w-full uppercase btn btn-info btn-outline" disabled={loading} >
        {loading ? 'Loading..' : 'Register'}
      </button>
      <div className="flex justify-center items-center gap-[15px] mt-[-10px] w-full">
        <p className="text-[15px]">Already a member?</p>
        <Link to="/login" className="text-blue-500 hover:underline"> Login </Link>
      </div>
    </form>
  );
};

export default Register;
